import React, {Component} from 'react';
import NewsList from "./NewsList";
import "./NewsList.css";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_UI_LANGUAGE,
    PAGINATION_NEWS_PER_ROW,
    PAGINATION_NEWS_ROWS
} from "../../context";
import queryString from "query-string/index";
import axios from "axios/index";
import {Container} from "semantic-ui-react";

class NewsListPage extends Component {

    state = {
        searchString:'',
        number: 1,
        size: PAGINATION_NEWS_PER_ROW*PAGINATION_NEWS_ROWS,
        sort: 'creationDate',
        direction: 'DESC',
        newsLangTag: null,
        news: [],
        totalPages: 0,
        errorText: null,
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
            return DEFAULT_L10N_LANGUAGE;
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
            }
        }
        this.setState({
            searchString: this.state.searchString,
                number: this.state.number,
                size: this.state.size,
                sort: this.state.sort,
                direction: this.state.direction,
        }, this.loadNews);
        this.props.history.push({search: queryString.stringify(params)});
        window.scrollTo(0, 400)
    };

    setActivePage = (page) => {
        this.setState({number: page}, this.changeUrl);
    };

    setSize = (size) => {
        this.setState({size: size, number: 1}, this.changeUrl);
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
        let langStr = localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE);
        if (langStr){
            langStr = JSON.parse(langStr).tag;
        } else {
            langStr = DEFAULT_L10N_LANGUAGE;
        }
        axios
            .get(BACK_END_SERVER_URL + `/news`,
                {
                    params: params,
                    headers: {"Accept-Language": langStr}
                }
            )
            .then(res => {
                this.setState({
                    number: res.data.number + 1,
                    news: res.data.content,
                    totalPages: res.data.totalPages,
                });
            })
            .catch(({response}) => {
                this.setState({errorText: response.data.message});
            });
    };


    render() {
        return (
            <React.Fragment>
                <Container
                    id='newsList'>
                    <NewsList  
                        activePage={this.state.number}
                        news={this.state.news}
                        totalPages={this.state.totalPages}
                        setActivePage={this.setActivePage}
                        size={this.state.size}
                        setSize={this.setSize}
                        errorText={this.state.errorText}
                    />
                </Container>
            </React.Fragment>
        );
    }
}

export default NewsListPage;