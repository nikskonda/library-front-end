import React, {Component} from 'react';
import {PDFReader} from "react-read-pdf";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, URL_DOWNLOAD_FILE} from "../../context";
import {Button, Container, Grid, GridColumn, Icon, Message} from "semantic-ui-react";
import axios from "axios";
import Slider from '@material-ui/lab/Slider';
import {Link} from "react-router-dom";


class PdfReader extends Component {

    state = {
        pageNumber: 1,
        totalPage: 1,
        pdfUrl: null,
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
                this.setState({
                    pdfUrl: res.data.pdfUrl,
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
                        bookmark: res.data.page,
                        bookmarkId: res.data.id,
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
        return (this.state.pdfUrl ?
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
                            <PDFReader
                                url={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.pdfUrl}
                                page={this.state.pageNumber}
                                onDocumentComplete={this.handleOnDocumentComplete}
                            />
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

export default PdfReader;