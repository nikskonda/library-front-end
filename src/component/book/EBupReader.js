import React, {Component} from 'react';
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, URL_DOWNLOAD_FILE} from "../../context";
import {Button, Container, Grid, GridColumn, Icon, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { ReactReader } from "react-reader";
import Slider from "@material-ui/lab/Slider";

class EBupReader extends Component {

    state = {
        pageNumber: 1,
        totalPage: 1,
        ePubUrl: null,
        bookId: null,
        value: 1,
        bookmark: 1,
        bookmarkId: null,
        bookmarkSuccessAlert: false,
        bookmarkErrorAlert: false,
    };

    componentWillMount() {

        axios
            .get(BACK_END_SERVER_URL + `/book/${this.props.match.params.bookId}`)
            .then(res => {
                console.log(res);
                this.setState({
                    ePubUrl: res.data.epubUrl,
                    bookId: res.data.id,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        axios
            .get(BACK_END_SERVER_URL + `/bookmark/book/${this.props.match.params.bookId}`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''}
                    }
                })
            .then(res => {
                console.log(res);
                this.setState(
                    {
                        // bookmark: res.data.page,
                        // bookmarkId: res.data.id,
                    }
                    // ,
                    // () => {
                    //     console.log(this.state.bookmark);
                    //     if (this.state.bookmark){
                    //         this.setState({pageNumber: this.state.bookmark});
                    //     }
                    // }
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    nextPage = () => {
        if (this.state.pageNumber < this.state.totalPage) {
            this.setState({
                pageNumber: this.state.pageNumber + 1,
                value: this.state.pageNumber + 1,
            })
        }

    };

    prevPage = () => {
        if (this.state.pageNumber > 1) {
            this.setState({
                pageNumber: this.state.pageNumber - 1,
                value: this.state.pageNumber - 1,
            })
        }

    };

    handleOnDocumentComplete = (totalPage) => {
        this.setState({totalPage: totalPage})
    };

    onDragEnd = () => {
        this.setState({pageNumber: this.state.value})
    };

    onChange = (event, value) => {
        this.setState({value: value})
    };

    saveBookmark = () => {
        axios
            .post(
                BACK_END_SERVER_URL + `/bookmark`,
                {
                    id: this.state.bookmarkId,
                    page: this.state.pageNumber,
                    book: {
                        id: this.state.bookId
                    }
                },
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    }
                }
            )
            .then(res => {
                this.setState({
                    bookmark: res.data.page,
                    bookmarkId: res.data.id,
                    bookmarkSuccessAlert: true,
                });

            })
            .catch((error) => {
                this.setState({
                    bookmarkErrorAlert: true,
                });
                console.log(error);
            });
    };

    render() {
        const alert =
            (<Message
                warning
                header='Book Not found'
                content='Plz change search query!'
            />);
        const bookmarkSuccessAlert =
            (<Message
                positive
                header='Bookmark successfully created!'
                content='qqqqqqqqqqqqqq!'
            />);
        const bookmarkErrorAlert =
            (<Message
                negative
                header={`Bookmark didn't creat!`}
                content='qqqqqqqqqqqqqq!'
            />);
        if (this.state.ePubUrl)
            console.log(BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.ePubUrl.replace(/\//g, '%2F'));
        return (this.state.ePubUrl ?
                <Container>
                    <Grid>
                        {this.state.bookmarkSuccessAlert ? bookmarkSuccessAlert : false}
                        {this.state.bookmarkErrorAlert ? bookmarkErrorAlert : false}
                        <Grid.Row>
                            <Link to='..'>
                                <Button labelPosition='left' icon floated='right'>
                                    <Icon name='arrow left'/>
                                    BACK
                                </Button>
                            </Link>
                            <Button
                                labelPosition='right'
                                icon floated='left'
                                onClick={this.saveBookmark}
                            >
                                {this.state.bookmark === this.state.pageNumber ? <Icon name='bookmark'/> :
                                    <Icon name='bookmark outline'/>}
                                Create Bookmark
                            </Button>
                        </Grid.Row>
                        <Grid.Row>
                            <div style={{ position: "relative", height: "100%" }}>
                                {" "}
                            <ReactReader
                                url={BACK_END_SERVER_URL + '/file/download/book/epub/1.epub'}
                                title={"Alice in wonderland"}
                                location={"epubcfi(/6/2[cover]!/6)"}
                                locationChanged={epubcifi => console.log(epubcifi)}
                                />
                            </div>
                        </Grid.Row>
                        <Grid.Row>
                            <GridColumn width={13}>
                                <Slider
                                    min={1}
                                    max={this.state.totalPage}
                                    step={1}
                                    value={this.state.value}
                                    aria-labelledby="label"
                                    onChange={this.onChange}
                                    onDragEnd={this.onDragEnd}
                                />
                            </GridColumn>
                            <GridColumn>
                                <Button.Group size='large'>
                                    <Button
                                        disabled={this.state.pageNumber === 1}
                                        onClick={this.prevPage}
                                    >PREV</Button>
                                    <Button.Or text={this.state.value}/>
                                    <Button
                                        disabled={this.state.pageNumber === this.state.totalPage}
                                        onClick={this.nextPage}
                                    >NEXT</Button>
                                </Button.Group>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
                </Container>

                : alert
        );
    };
}

export default EBupReader;