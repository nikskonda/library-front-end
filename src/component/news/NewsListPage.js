import React, {Component} from 'react';
import NewsList from "./NewsList";
import {BACK_END_SERVER_URL, DEFAULT_LANGUAGE_TAG, LOCAL_STORAGE_UI_LANGUAGE} from "../../context";
import queryString from "query-string/index";
import axios from "axios/index";
import {Container} from "semantic-ui-react";

class NewsListPage extends Component {

    state = {
        searchString:'',
        number: 1,
        size: 10,
        sort: 'creationDate',
        direction: 'DESC',
        newsLangTag: null,
        news: [],
        totalPages: 0,
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
    }

    componentDidMount() {
        this.setState({newsLangTag: this.getLangTagFromLocalStorage()}, this.loadNews);
    };


    getLangTagFromLocalStorage = () => {
        let lang = localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE);
        if (lang !== null) {
            lang = JSON.parse(lang);
        }
        if (lang === null || lang.tag === undefined) {
            return DEFAULT_LANGUAGE_TAG;
        }
        console.log(lang);
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
            }
        }
        this.props.history.push({search: queryString.stringify(params)});
        this.loadNews();

    };

    setActivePage = (page) => {
        this.setState({number: page}, this.changeUrl);
    };

    loadNews = () => {
        const params = {
            searchString: this.state.searchString,
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
            languageTag: this.state.newsLangTag,
        };
        axios
            .get(BACK_END_SERVER_URL + `/news`,
                {
                    params: params,
                }
            )
            .then(res => {
                this.setState({
                    number: res.data.number + 1,
                    news: res.data.content,
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
                <Container>
                    <NewsList
                        activePage={this.state.number}
                        news={this.state.news}
                        totalPages={this.state.totalPages}
                        setActivePage={this.setActivePage}
                    />
                </Container>
            </React.Fragment>
        );
    }
}

export default NewsListPage;