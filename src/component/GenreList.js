import React, {Component} from 'react';
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup'
import {NavLink} from "react-router-dom";
import {BACK_END_SERVER_URL, DEFAULT_LANGUAGE, DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_BOOK_LANGUAGE} from "../context";

class GenreList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genres:null
        }
    }

    getLangFromLocalStorage() {
        let lang = localStorage.getItem(LOCAL_STORAGE_BOOK_LANGUAGE);
        if (lang !== null) {
            lang = JSON.parse(lang);
            if (lang.id !== undefined || lang.tag !== undefined || lang.name !== undefined) {
                return lang;
            }
        }
        return {name:DEFAULT_LANGUAGE, tag: DEFAULT_LANGUAGE_TAG};


    }

    componentDidMount() {
        axios({
                method: 'get',
                url: BACK_END_SERVER_URL+'book/genre/popular',
                headers: { 'Content-Type' : 'application/json' },
                params: this.getLangFromLocalStorage()
            })
            .then(res => {
                console.log(res);
                this.setState({genres: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {
        return (
            <ListGroup>
                {this.state.genres !== null ? this.state.genres.map(genre =>
                    <ListGroup.Item key={genre.id}>
                        <NavLink to={`catalog?genres=${genre.name}`}
                                 style={{
                                     textDecoration: 'none',
                                     color: 'inhabit'
                                 }}
                                 activeClassName="active"
                        >
                            {genre.name}
                        </NavLink>
                    </ListGroup.Item>) : false }
            </ListGroup>
        );
    }
}

export default GenreList;