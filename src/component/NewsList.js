import React, {Component} from 'react';
import axios from "axios";
import {BACK_END_SERVER_URL} from "../context";
import NewsCover from "./NewsCover";
import {Card, Icon, Pagination} from "semantic-ui-react";

class NewsList extends Component {


    state = {
        itemPerRow:2,
        column: 7,
        activePage: 1,
        boundaryRange: 2,
        siblingRange: 1,
        totalPages: 0,
        newsList: [],
        size: 0,
    };

    componentWillMount() {
        this.loadNews();
    }

    handlePaginationChange = (event, {activePage}) => {
        console.log(activePage);
        this.setState({activePage: activePage}, this.loadNews);
    };

    loadNews = () => {
        axios
            .get(BACK_END_SERVER_URL + `/news`, {
                params: {
                    sort: 'creationDate',
                    direction: 'DESC',
                    number: this.state.activePage-1,
                    size: this.state.itemPerRow * this.state.column,
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    activePage: res.data.number,
                    newsList: res.data.content,
                    size: res.data.size,
                    totalElements: res.data.totalElements,
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
                <Card.Group itemsPerRow={this.state.itemPerRow}>
                    {this.state.newsList.map((news) => <NewsCover key={news.id} newsCover={news}/>)}
                </Card.Group>
                <Pagination
                    activePage={this.state.activePage+1}
                    boundaryRange={this.state.boundaryRange}
                    onPageChange={this.handlePaginationChange}
                    size='middle'
                    siblingRange={this.state.siblingRange}
                    totalPages={this.state.totalPages}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}

                />
            </React.Fragment>
        );
    }
}

export default NewsList;