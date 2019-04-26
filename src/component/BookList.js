import React, {Component} from 'react';
//https://github.com/axios/axios
import axios from 'axios';
import BookCover from "./BookCover";
import {BACK_END_SERVER_URL, DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_BOOK_LANGUAGE} from "../context";
import {Button, Card, Icon, Input, Pagination, Select} from "semantic-ui-react";

class BookList extends Component {

    state = {
        params: this.props.params,
        defaultPage: 1,
        activePage: 1,
        boundaryRange: 2,
        siblingRange: 1,
        totalPages: 0,
        newsList: [],
        size: 0,
        books: [],
        totalElements: 0,
        pageRangeDisplayed: 5,

    };


    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("shouldComponentUpdate");
    // }
    componentWillUpdate(nextProps, nextState){
        console.log("componentWillUpdate");
    }
    //
    // componentDidUpdate(prevProps, prevState){
    //     console.log("componentDidUpdate");
    // }

    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps");
    }

    componentWillMount(){
        console.log("componentWillMount");
        this.loadBooks();
    }


    handlePaginationChange = (event, {activePage}) => {
        this.props.setActivePage(activePage);
    };

    loadBooks = () => {
        let params = {
            searchString: this.state.params.searchString,
            number: this.state.params.number,
            size: this.state.params.size,

            direction: this.state.params.direction,
            sort: this.state.params.sort,

            bookLangTag: this.props.lang,
            genres: this.state.params.genres,
            authors: this.state.params.authors,
        };

        axios
            .get(BACK_END_SERVER_URL + `/book`, {params: params})
            .then(res => {
                console.log(res.data);
                this.setState({
                    activePage: res.data.number + 1,
                    books: res.data.content,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    render() {
        console.log("render");
        return (
            <React.Fragment>
                <Card.Group itemsPerRow={this.state.itemPerRow}>
                    {this.state.books.map((book) => <BookCover key={book.id} bookCover={book}/>)}
                </Card.Group>
                <Pagination
                    activePage={this.state.activePage}
                    boundaryRange={this.state.boundaryRange}
                    onPageChange={this.handlePaginationChange}
                    size='small'
                    siblingRange={this.state.siblingRange}
                    totalPages={this.state.totalPages}
                    ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                    firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                    lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                    prevItem={{content: <Icon name='angle left'/>, icon: true}}
                    nextItem={{content: <Icon name='angle right'/>, icon: true}}
                />
            </React.Fragment>

        );
    }


}

export default BookList;