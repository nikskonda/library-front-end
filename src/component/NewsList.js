import React, {Component} from 'react';
import axios from "axios";
import {BACK_END_SERVER_URL} from "../context";
import NewsCover from "./NewsCover";
import Pagination from 'react-paginate';
import CardColumns from "react-bootstrap/CardColumns";

class NewsList extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            news: [],
            activePage: 0,
            size: 20,
            totalElements: 0,
            totalPages: 0,
            pageRangeDisplayed: 5
        };
        this.loadNews = this.loadNews.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.loadNews();
    }

    handlePageChange(data) {
        this.setState({activePage: data.selected}, this.loadNews);
    }

    loadNews(){
        axios
            .get(BACK_END_SERVER_URL+`/news`, {
                params: {
                    sort: 'creationDate',
                    direction: 'DESC',
                    number: this.state.activePage,
                    size: this.state.size
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    news: res.data.content,
                    size: res.data.size,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <CardColumns>
                    {this.state.news != null ? this.state.news.map((news) => <NewsCover key={news.id} newsCover={news}/>) : false}
                </CardColumns>
                    <Pagination
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        pageCount={this.state.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageChange}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        activeClassName={'active'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                    />
            </React.Fragment>
        );
    }
}

export default NewsList;