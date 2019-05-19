import React, {Component} from 'react';
import axios from "axios/index";
import {BACK_END_SERVER_URL} from "../../context";
import {Menu} from "semantic-ui-react";

class GenreList extends Component {

    state = {
        genres: [],
        activeGenre: '',
    };

    componentWillMount() {
        if (this.props.selected && this.props.selected.length>0 && this.props.selected[0]) {
            this.setState({activeGenre: this.props.selected[0]});
        }
        axios({
            method: 'get',
            url: BACK_END_SERVER_URL + '/book/genre/popular',
            headers: {'Content-Type': 'application/json'},
            params: {languageTag: this.props.lang}
        })
            .then(res => {
                this.setState({genres: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleItemClick = (e, {name}) => {
        if (this.state.activeGenre === name){
            this.props.setGenres([]);
            this.setState({activeGenre: ''});
        } else {
            this.props.setGenres([name]);
            this.setState({activeGenre: name});
        }

    };

    render() {
        return (
            <Menu fluid vertical tabular>
                {this.state.genres ? this.state.genres.map(genre =>
                    <Menu.Item
                        key={genre.id}
                        name={genre.name}
                        active={this.state.activeGenre.toLowerCase() === genre.name.toLowerCase()}
                        onClick={this.handleItemClick}
                    />) : false}
            </Menu>
        );
    }
}

export default GenreList;