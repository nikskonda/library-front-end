import React, {Component} from 'react';
//https://github.com/axios/axios
import axios from 'axios';
import BookCover from "./BookCover";
import InfiniteScroll from "react-infinite-scroller"

class BookList extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            // searchString: props.match.params.searchString || null : null,
            // genres: props.match.params.genres || null,
            books: [],
            currentPage: 0,
            currentSize: 1
        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8888/book`, {
                params: {
                    number: 0,
                    size: 10,
                    genres: this.state.genres
                }
            })
            .then(res => {
                console.log(res);
                this.setState({books: this.state.books.concat(res.data.content)});
            })
            .catch(function (error) {
                console.log(error);
            });
        // this.setState({page: this.state.page+1});
    }

    loadNextTenBooks() {
        console.log('hell');
        axios
            .get(`http://localhost:8888/book`, {
                params: {
                    number: this.state.lastPage,
                    size: 10,
                    genres: this.state.genres
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    books: this.state.books.concat(res.data.content),
                    lastPage: res.data.pageable.pageNumber + 1,
                    hasMore: !res.data.last,
                    total: res.data.total
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <div className='card-columns'>
                    {/*<LanguageSelect/>*/}
                    {/*<InfiniteScroll*/}
                    {/*    loadMore={this.loadNextTenBooks.bind(this)}*/}
                    {/*    hasMore={this.state.hasMore}*/}
                    {/*    loader={<div className="loader">Loading ...</div>}>*/}

                    {/*    <div className="tracks">*/}
                    {/*        {this.state.books != null ? this.state.books.map((book) => <BookCover key={book.id} bookCover={book}/>) : false}*/}
                    {/*    </div>*/}
                    {/*</InfiniteScroll>*/}
                    {this.state.books != null ? this.state.books.map((book) => <BookCover key={book.id}
                                                                                          bookCover={book}/>) : false}

                </div>
                <div>

                </div>
            </div>

        );
    }
}

export default BookList;