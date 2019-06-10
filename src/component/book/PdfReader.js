import React, {Component} from 'react';
import {PDFReader} from "react-read-pdf";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, URL_DOWNLOAD_FILE} from "../../context";
import {Button, Container, Grid, GridColumn, Icon, Message} from "semantic-ui-react";
import axios from "axios";
import Slider from '@material-ui/lab/Slider';
import {Link} from "react-router-dom";
import {getLang, getStrings} from "../../l10n";
import './ReadingRoom.css';


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
            .catch(({response}) => {
                this.setState({
                    bookmarkErrorAlert: true,
                    errorTxt: response.data.message,
                });
            });
        this.isHasBookmark();
    }

    isHasBookmark = () => {
        if (localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN)){
            axios
                .get(BACK_END_SERVER_URL + `/bookmark/book/${this.props.match.params.bookId}`,
                    {
                        headers: {
                            'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                            'Content-type': 'application/json',
                            'Accept-Language': getLang()
                        }
                    })
                .then(res => {
                    console.log(res.data);
                    if (res.data!==''){
                        this.setState({
                            isHasBookmark:true,
                            bookmark: res.data.page?res.data.page:null,
                            bookmarkId: res.data.id});
                    }
                })
                .catch(({response}) => {
                    this.setState({isHasBookmark:false});
                });
        } else {
            this.setState({isHasBookmark:false});
        }
    };

    loadBookmark = () => {
        if (localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN)){
            axios
                .get(BACK_END_SERVER_URL + `/bookmark/book/${this.props.match.params.bookId}`,
                    {
                        headers: {
                            'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                            'Content-type': 'application/json',
                            'Accept-Language': getLang()
                        }
                    })
                .then(res => {
                    this.setState(
                        {
                            pageNumber: res.data.page?res.data.page:null,
                            value: res.data.page?res.data.page:null,
                            bookmark: res.data.page?res.data.page:null,
                            bookmarkId: res.data.id,
                        }
                    );

                })
                .catch(({response}) => {
                    this.setState({
                        bookmarkErrorAlert: true,
                        errorTxt: response.data.message,
                    });
                });
        }
    };


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
        this.setState({totalPage: totalPage});
    };

    onDragEnd = () => {
        this.setState({pageNumber: this.state.value})
    };

    onChange = (event, value) => {
        this.setState({value: value})
    };

    saveBookmark = () => {
        if (this.state.bookmark === this.state.pageNumber) return;
        axios
            .post(
                BACK_END_SERVER_URL + `/bookmark`,
                {
                    id: this.state.bookmarkId,
                    page: this.state.pageNumber,
                    type: 'PDF',
                    book: {
                        id: this.state.bookId
                    }
                },
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({
                    bookmarkErrorAlert: true,
                    errorTxt: response.data.message,
                });
            });
    };


    handleDismissSuccess = () => {
        this.setState({bookmarkSuccessAlert: false});
    };

    handleDismissError = () => {
        this.setState({bookmarkErrorAlert: false});
    };

    render() {
        let strings = getStrings();
        const alert =
            (<Message
                warning
                header={strings.error.book.notFound}
                content={this.state.errorText}
                onDismiss={this.handleDismissError}
            />);
        const bookmarkSuccessAlert =
            (<Message
                positive
                header={strings.success.bookmarkCreated}
                onDismiss={this.handleDismissSuccess}
            />);
        const bookmarkErrorAlert =
            (<Message
                negative
                header={strings.error.bookmark.didntCreate}
                content={this.state.errorText}
                onDismiss={this.handleDismissError}
            />);
        return (this.state.pdfUrl ?
                <Container id='readingRoom'>
                    <Grid>
                        {this.state.bookmarkSuccessAlert ? bookmarkSuccessAlert : false}
                        {this.state.bookmarkErrorAlert ? bookmarkErrorAlert : false}
                        <Grid.Row>
                            <Link to='..'>
                                <Button labelPosition='left' icon floated='right'>
                                    <Icon name='arrow left'/>
                                    {strings.readingRoom.back}
                                </Button>
                            </Link>
                            {localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN)?
                            <Button
                                labelPosition='right'
                                icon
                                floated='right'
                                onClick={this.saveBookmark}
                            >
                                {this.state.bookmark === this.state.pageNumber ? <Icon name='bookmark'/> :
                                    <Icon name='bookmark outline'/>}
                                {strings.readingRoom.createBookmark}
                            </Button> : false}
                            {this.state.isHasBookmark && this.state.bookmark !== this.state.pageNumber ? 
                            <Button
                                floated='right'
                                onClick={this.loadBookmark}
                            >
                                {strings.bookmarks.open}
                            </Button> : false}
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
                                    >{strings.readingRoom.prev}</Button>
                                    <Button.Or text={this.state.value}/>
                                    <Button
                                        disabled={this.state.pageNumber === this.state.totalPage}
                                        onClick={this.nextPage}
                                    >{strings.readingRoom.next}</Button>
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