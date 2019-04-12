import React, {Component} from 'react';
//https://github.com/axios/axios
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookCover from "./BookCover";

class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            page: 0
        }
    }

    loadNextTenBooks() {
        axios
            .get(`http://localhost:8888/book/`, {
                params: {
                    number: this.state.page,
                    size: 10
                }
            })
            .then(res => {
                console.log(res);
                this.setState({books: res.data.content});
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({page: this.state.page+1});
    }

    render() {
        let scrolling =
            (<InfiniteScroll
                // dataLength={items.length} //This is important field to render the next data
                next={this.loadNextTenBooks()}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>The End</b>
                    </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={this.refresh}
                pullDownToRefresh
                pullDownToRefreshContent={
                    <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                }>
                {this.state.books != null ? this.state.books.map((book) => <BookCover key={book.id} bookCover={book}/>) : false}
            </InfiniteScroll>);
        return (
            <div className='card-columns'>
                <InfiniteScroll
                    // dataLength={items.length} //This is important field to render the next data
                    next={this.loadNextTenBooks()}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>The End</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    // refreshFunction={this.refresh}
                    // pullDownToRefresh
                    // pullDownToRefreshContent={
                    //     <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                    // }
                    // releaseToRefreshContent={
                    //     <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                    // }
                >
                    {this.state.books != null ? this.state.books.map((book) => <BookCover key={book.id} bookCover={book}/>) : false}
                </InfiniteScroll>
                    {/*{this.state.books != null ? this.state.books.map((book) => <BookCover key={book.id} bookCover={book}/>) : false}*/}
            </div>

        );
    }
}

export default BookList;