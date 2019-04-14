import React, { Component } from 'react';
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup'
import {NavLink} from "react-router-dom";

class GenreList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genres:null
        }
    }

    componentDidMount() {
        let lang = JSON.parse(localStorage.getItem('bookLang'))
        axios({
                method: 'get',
                url: 'http://localhost:8888/book/genre/popular',
                headers: { 'Content-Type' : 'application/json' },
                params: lang
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