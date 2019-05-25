import React, {Component} from 'react';
import BookList from "./BookList";
import GenreList from "./GenreList"
import {Button, Container, Grid, Input, Select} from "semantic-ui-react";
import queryString from 'query-string';
import {
    LOCAL_STORAGE_UI_LANGUAGE,
    BACK_END_SERVER_URL,
    DEFAULT_LANGUAGE_TAG,
    LOCAL_STORAGE_BOOK_LANGUAGE,
    PAGINATION_BOOKS_PER_ROW,
    PAGINATION_BOOKS_ROWS
} from "../../context";
import axios from "axios";
import './BookList.css'
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';


class BookCatalogPage extends Component {

    state = {
        searchString: '',
        number: 1,
        size: PAGINATION_BOOKS_PER_ROW*PAGINATION_BOOKS_ROWS,
        sort: 'rating',
        direction: 'DESC',
        genres: [],
        authors: [],
        bookLangTag: null,
        searchOptions: [
            {key: 'all', text: 'All', value: 'all'},
            {key: 'genre', text: 'genre', value: 'genre'},
            {key: 'author', text: 'author', value: 'author'},
        ],
        selectedSearchOption: 'all',
        books: [],
        totalPages: 0,

        errorText: 'default message',
    };

    componentDidMount() {
        this.setState({bookLangTag: this.getLangTagFromLocalStorage()}, this.loadBooks);
    };

    componentWillMount() {
        const params = queryString.parse(this.props.location.search);
        this.setState({
            searchString: params.searchString || this.state.searchString,
            number: params.number || this.state.number,
            size: params.size || this.state.size,
            sort: params.sort || this.state.sort,
            direction: params.direction || this.state.direction,
        });
        if (params.genres) this.state.genres.push(params.genres);
        if (params.authors) this.state.genres.push(params.authors);
    }


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

    changeUrl = (params) => {
        if (!params){
            params = {
                searchString: this.state.searchString,
                number: this.state.number,
                size: this.state.size,
                sort: this.state.sort,
                direction: this.state.direction,
                genres: this.state.genres,
                authors: this.state.authors,
            }
        }
        this.props.history.push({search: queryString.stringify(params)});
        this.loadBooks();
        window.scrollTo(0, 0)
    };

    addGenre = (genreName) => {
        this.setState({genres: genreName}, this.changeUrl);
        // this.state.genres.push(genreName);
        // this.changeUrl();
    };

    setGenres = (genres) => {
        this.setState({genres: genres}, this.changeUrl);
    };

    setActivePage = (page) => {
        this.setState({number: page}, this.changeUrl);
    };

    setSize = (size) => {
        this.setState({size: size}, this.changeUrl);
    };

    loadBooks = () => {
        const params = {
            searchString: this.state.searchString,
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
            genres: this.state.genres,
            authors: this.state.authors,
            bookLangTag: this.state.bookLangTag,
        };
        axios
            .get(BACK_END_SERVER_URL + `/book`,
                {
                    params: params,
                    paramsSerializer: params => {
                        return queryString.stringify(params)
                    }
                }
                )
            .then(res => {
                this.setState({
                    number: res.data.number + 1,
                    books: res.data.content,
                    totalPages: res.data.totalPages,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    changeSearchHandler = (event, {value}) =>{
        this.setState({searchString: value});
    };

    searchBooks = () => {
           let params = {
                searchString: this.state.searchString,
                number: 1,
                size: this.state.size,
                sort: this.state.sort,
                direction: this.state.direction,
                genres: [],
                authors: [],
            };
        this.changeUrl(params);

    };

    changeSearchOption = (event, {value}) => {
        this.setState({selectedSearchOption: value});
    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, ''));
        return (
            <div id='bookCatalog'>
                <Container>
                    <Grid>
                        <Grid.Column width={3} className='genreList'>
                            <GenreList selected={this.state.genres} addGenre={this.addGenre} setGenres={this.setGenres} lang={this.getLangTagFromLocalStorage()}/>
                        </Grid.Column>
                        <Grid.Column stretched width={13}>
                            <div className='searchBook'>
                                <Input
                                    fluid
                                    placeholder='Search...'
                                    action
                                    value={this.state.searchString}
                                    onChange={this.changeSearchHandler}
                                >
                                    <input/>
                                    <Select
                                        compact
                                        options={this.state.searchOptions}
                                        defaultValue='all'
                                        value={this.state.selectedSearchOption}
                                        onChange={this.changeSearchOption}
                                    />
                                    <Button
                                        type='submit'
                                        onClick={this.searchBooks}
                                    >
                                        {strings.book.search}
                                    </Button>
                                </Input>
                            </div>
                            <BookList
                                activePage={this.state.number}
                                books={this.state.books}
                                totalPages={this.state.totalPages}
                                setActivePage={this.setActivePage}
                                addGenre={this.addGenre}
                                size={this.state.size}
                                setSize={this.setSize}
                                errorText={this.state.errorText}
                            />
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default BookCatalogPage;
