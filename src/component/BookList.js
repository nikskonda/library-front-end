import React, {Component} from 'react';
//https://github.com/axios/axios
import axios from 'axios';
import BookCover from "./BookCover";
import {BACK_END_SERVER_URL, DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_BOOK_LANGUAGE} from "../context";
import {Button, Card, Icon, Input, Pagination, Select} from "semantic-ui-react";

class BookList extends Component {

    state = {
        itemPerRow: 4,
        column: 7,
        activePage: 1,
        boundaryRange: 2,
        siblingRange: 1,
        totalPages: 0,
        newsList: [],
        size: 0,
        books: [],
        totalElements: 0,
        pageRangeDisplayed: 5,
        searchOptions: [
            {key: 'all', text: 'All', value: 'all'},
            {key: 'genre', text: 'genre', value: 'genre'},
            {key: 'author', text: 'author', value: 'author'},
        ]
    };


    componentDidMount() {
        this.loadBooks();
    }

    handlePaginationChange = (event, {activePage}) => {
        console.log(activePage);
        this.setState({activePage: activePage}, this.loadNews);
    };

    getLangTagFromLocalStorage = () => {
        let lang = localStorage.getItem(LOCAL_STORAGE_BOOK_LANGUAGE);
        if (lang !== null) {
            lang = JSON.parse(lang);
        }
        if (lang === null || lang.tag === undefined) {
            return DEFAULT_LANGUAGE_TAG;
        }
        return lang.tag;
    };

    loadBooks = () => {
        axios
            .get(BACK_END_SERVER_URL + `/book`,
                {
                    params: {
                        sort: 'rating',
                        direction: 'DESC',
                        number: this.state.activePage - 1,
                        size: this.state.itemPerRow * this.state.column,
                        bookLangTag: this.getLangTagFromLocalStorage(),
                    }
                })
            .then(res => {
                this.setState({
                    activePage: res.data.number,
                    books: res.data.content,
                    size: res.data.size,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    render() {
        return (
            <React.Fragment>
                <div>
                    <Input className='w-100' type='text' placeholder='Search...' action>
                        <input/>
                        <Select compact options={this.state.searchOptions} defaultValue='all'/>
                        <Button type='submit'>Search</Button>
                    </Input>
                </div>
                <div>
                    <Card.Group itemsPerRow={this.state.itemPerRow}>
                        {this.state.books.map((book) => <BookCover key={book.id} bookCover={book}/>)}
                    </Card.Group>
                </div>
                <div>
                    <Pagination
                        activePage={this.state.activePage + 1}
                        boundaryRange={this.state.boundaryRange}
                        onPageChange={this.handlePaginationChange}
                        size='middle'
                        siblingRange={this.state.siblingRange}
                        totalPages={this.state.totalPages}
                        ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                        firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                        lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                        prevItem={{content: <Icon name='angle left'/>, icon: true}}
                        nextItem={{content: <Icon name='angle right'/>, icon: true}}

                    />
                </div>
            </React.Fragment>

        );
    }


}

export default BookList;