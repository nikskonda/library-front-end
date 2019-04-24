import React, {Component} from 'react';
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup'
import {NavLink} from "react-router-dom";
import {BACK_END_SERVER_URL, DEFAULT_LANGUAGE, DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_BOOK_LANGUAGE} from "../context";
import {Menu} from "semantic-ui-react";

class GenreList extends Component {

    state = {
        genres: [],
        activeGenre: null,
    };

    getLangFromLocalStorage = () => {
        let lang = localStorage.getItem(LOCAL_STORAGE_BOOK_LANGUAGE);
        if (lang !== null) {
            lang = JSON.parse(lang);
            if (lang.id !== undefined || lang.tag !== undefined || lang.name !== undefined) {
                return lang;
            }
        }
        return {name: DEFAULT_LANGUAGE, tag: DEFAULT_LANGUAGE_TAG};
    };

    componentWillMount() {
        axios({
            method: 'get',
            url: BACK_END_SERVER_URL + '/book/genre/popular',
            headers: {'Content-Type': 'application/json'},
            params: this.getLangFromLocalStorage()
        })
            .then(res => {
                this.setState({genres: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleItemClick = (e, {name}) => {
        this.setState({activeGenre: name});
    };

    render() {
        return (
            <Menu fluid vertical tabular>
                {this.state.genres.map(genre =>
                    <Menu.Item
                        key={genre.id}
                        name={genre.name}
                        active={this.state.activeGenre === genre.name}
                        onClick={this.handleItemClick}
                    />)
                }
            </Menu>
        );
    }
}

export default GenreList;