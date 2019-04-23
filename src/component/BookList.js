import React, {Component} from 'react';
//https://github.com/axios/axios
import axios from 'axios';
import BookCover from "./BookCover";
import {BACK_END_SERVER_URL, DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_BOOK_LANGUAGE} from "../context";
import Pagination from 'react-paginate';
import {Input, Select} from "semantic-ui-react";
import {Button} from "react-bootstrap";

class BookList extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            // searchString: props.match.params.searchString || null : null,
            // genres: props.match.params.genres || null,
            books: [],
            activePage: 0,
            size: 20,
            totalElements: 0,
            totalPages: 0,
            pageRangeDisplayed: 5,
            options: [
                { key: 'all', text: 'All', value: 'all' },
                { key: 'genre', text: 'genre', value: 'genre' },
                { key: 'author', text: 'author', value: 'author' },
            ]
        };
        this.loadBooks = this.loadBooks.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.loadBooks();
    }

    handlePageChange(data) {
        this.setState({activePage: data.selected}, this.loadBooks);
    }

    getLangTagFromLocalStorage() {
        let lang = localStorage.getItem(LOCAL_STORAGE_BOOK_LANGUAGE);
        if (lang !== null) {
            lang = JSON.parse(lang);
        }
        if (lang === null || lang.tag === undefined) {
            return DEFAULT_LANGUAGE_TAG;
        }
        return lang.tag;
    }

    loadBooks() {
        axios
            .get(BACK_END_SERVER_URL + `/book`, {
                params: {
                    sort: 'rating',
                    direction: 'DESC',
                    number: this.state.activePage,
                    size: this.state.size,
                    bookLangTag: this.getLangTagFromLocalStorage(),
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    books: res.data.content,
                    size: res.data.size,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <React.Fragment>
                <Input className='w-100' type='text' placeholder='Search...' action>
                    <input />
                    <Select compact options={this.state.options} defaultValue='all' />
                    <Button type='submit'>Search</Button>
                </Input>
                <div className='card-columns'>
                    {this.state.books != null ? this.state.books.map((book) => <BookCover key={book.id}
                                                                                          bookCover={book}/>) : false}
                </div>
                <Pagination
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={this.state.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageChange}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                />
            </React.Fragment>

        );
    }


}

export default BookList;