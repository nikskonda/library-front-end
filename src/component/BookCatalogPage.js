import React, {Component} from 'react';
import BookList from "./BookList";
import GenreList from "./GenreList"
import Header from "./Header";
import {Button, Container, Grid, Input, Segment, Select} from "semantic-ui-react";
import queryString from 'query-string';
import {DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_BOOK_LANGUAGE} from "../context";


class BookCatalogPage extends Component {

    state = {
        searchString: '',
        number: 1,
        size: 10,
        sort: 'rating',
        direction: 'DESC',
        genres: [],
        authors: [],
        searchOptions: [
            {key: 'all', text: 'All', value: 'all'},
            {key: 'genre', text: 'genre', value: 'genre'},
            {key: 'author', text: 'author', value: 'author'},
        ]
    };

    componentDidMount() {
        this.setState({bookLangTag: this.getLangTagFromLocalStorage});
        this.updateParams();
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

    updateParams = () => {
        this.setState({params: queryString.parse(this.props.location.search)});
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
        this.updateParams();
    };

    addGenre = (genre) => {
        this.state.genres.push(genre.name);
        this.updateParams();
    };

    setGenres = (genres) => {
        this.setState({genres: genres}, this.changeUrl);
    };

    setActivePage = (page) => {
        this.setState({number: page}, this.changeUrl);
    };


    render() {
        const params = {
            searchString: this.state.searchString,
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
            genres: this.state.genres,
            authors: this.state.authors,
        };
        console.log('rending page');
        return (

            <React.Fragment>
                <Header/>
                <Container>
                    <Grid>
                        <Grid.Column width={3}>
                            <GenreList location={this.props.location} addGenre={this.addGenre} setGenres={this.setGenres} lang={this.getLangTagFromLocalStorage()}/>
                        </Grid.Column>
                        <Grid.Column stretched width={13}>
                            <Input className='w-100' type='text' placeholder='Search...' action>
                                <input/>
                                <Select compact options={this.state.searchOptions} defaultValue='all'/>
                                <Button type='submit'>Search</Button>
                            </Input>
                            <BookList params={params} lang={this.getLangTagFromLocalStorage()} setActivePage={this.setActivePage}/>
                        </Grid.Column>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default BookCatalogPage;