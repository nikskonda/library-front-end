import React, {Component} from 'react';
import BookList from "./BookList";
import GenreList from "./GenreList"
import {Button, Container, Grid, Input, Select} from "semantic-ui-react";
import queryString from 'query-string';
import {BACK_END_SERVER_URL, DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_BOOK_LANGUAGE} from "../../context";
import axios from "axios";


class BookCatalogPage extends Component {

    state = {
        searchString: '',
        number: 1,
        size: 10,
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
        books: [],
        totalPages: 0,
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
            genres: params.genres || this.state.genres,
            authors: params.authors || this.state.authors,
        });
        if (!params.genres) this.state.genres.push(params.genres);
        if (!params.authors) this.state.genres.push(params.authors);
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
        this.state.genres.push(genreName);
        this.changeUrl();
    };

    setGenres = (genres) => {
        this.setState({genres: genres}, this.changeUrl);
    };

    setActivePage = (page) => {
        this.setState({number: page}, this.changeUrl);
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

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Grid>
                        <Grid.Column width={3}>
                            <GenreList location={this.props.location} addGenre={this.addGenre} setGenres={this.setGenres} lang={this.getLangTagFromLocalStorage()}/>
                        </Grid.Column>
                        <Grid.Column stretched width={13}>
                            <Input className='w-100' type='text' placeholder='Search...' action value={this.state.searchString} onChange={this.changeSearchHandler}>
                                <input/>
                                <Select compact options={this.state.searchOptions} defaultValue='all'/>
                                <Button
                                    type='submit'
                                    onClick={this.searchBooks}
                                >Search</Button>
                            </Input>
                            <BookList
                                activePage={this.state.number}
                                books={this.state.books}
                                totalPages={this.state.totalPages}
                                setActivePage={this.setActivePage}
                                addGenre={this.addGenre}
                            />
                        </Grid.Column>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default BookCatalogPage;
