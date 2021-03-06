import React, {Component} from 'react';
import queryString from "query-string";
import {
    BACK_END_SERVER_URL,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    PAGINATION_BOOKMARKS_PER_ROW,
    PAGINATION_BOOKMARKS_ROWS
} from "../../context";
import axios from 'axios'
import {Container} from "semantic-ui-react";
import BookmarkList from "./BookmarkList";
import './Bookmark.css';

class BookmarkListPage extends Component {

    state = {
        number: 1,
        size: PAGINATION_BOOKMARKS_PER_ROW*PAGINATION_BOOKMARKS_ROWS,
        sort: 'dateTime',
        direction: 'DESC',

        totalPages: 0,

        bookId: null,

        bookmarks: [],
    };

    componentWillMount() {
        const params = queryString.parse(this.props.location.search);
        this.setState({
            number: params.number || this.state.number,
            size: params.size || this.state.size,
            sort: params.sort || this.state.sort,
            direction: params.direction || this.state.direction,

        });
    }

    componentDidMount() {
        this.loadBookmarks();
    };

    changeUrl = (params) => {
        if (!params) {
            params = {
                number: this.state.number,
                size: this.state.size,
                sort: this.state.sort,
                direction: this.state.direction,
            }
        }
        this.props.history.push({search: queryString.stringify(params)});
        this.loadBookmarks();

    };

    setActivePage = (page) => {
        this.setState({number: page}, this.changeUrl);
    };

    setSize = (size) => {
        this.setState({size: size}, this.changeUrl);
    };

    loadBookmarks = () => {
        let url = BACK_END_SERVER_URL + `/bookmark/`;
        this.loadBookmarksByUrl(url);
    };



    loadBookmarksByUrl = (url) => {
        const params = {
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
        };

        axios
            .get(url,
                {
                    params: params,
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.setState({
                    number: res.data.number + 1,
                    bookmarks: res.data.content,
                    totalPages: res.data.totalPages,
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    setSize = (size) => {
        this.setState({size: size}, this.changeUrl);
    };

    render() {
        console.log(this.state);
        return (
            <Container id='bookmarkList'>
                <BookmarkList
                    activePage={this.state.number}
                    bookmarks={this.state.bookmarks}
                    totalPages={this.state.totalPages}
                    setActivePage={this.setActivePage}
                    size={this.state.size}
                    setSize={this.setSize}
                />
            </Container>
        );
    }
}

export default BookmarkListPage;