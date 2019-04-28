import React, {Component} from 'react';
//https://github.com/axios/axios
import BookCover from "./BookCover";
import {Card, Icon, Message, Pagination} from "semantic-ui-react";

class BookList extends Component {

    state = {
        itemPerRow: 3,
        defaultPage: 1,
        boundaryRange: 2,
        siblingRange: 1,
        pageRangeDisplayed: 5,

    };


    handlePaginationChange = (event, {activePage}) => {
        this.props.setActivePage(activePage);
    };


    render() {
        const alert =
            (<Message
                warning
                header='Books Not found'
                content='Plz change search query!'
            />);
        return (this.props.books) ?
            (<React.Fragment>
                <Card.Group itemsPerRow={this.state.itemPerRow}>
                    {this.props.books.map((book) => <BookCover key={book.id} bookCover={book}/>)}
                </Card.Group>
                <Pagination
                    activePage={this.props.activePage}
                    boundaryRange={this.state.boundaryRange}
                    onPageChange={this.handlePaginationChange}
                    size='small'
                    siblingRange={this.state.siblingRange}
                    totalPages={this.props.totalPages}
                    ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                    firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                    lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                    prevItem={{content: <Icon name='angle left'/>, icon: true}}
                    nextItem={{content: <Icon name='angle right'/>, icon: true}}
                />
            </React.Fragment>)
            : alert;
    }


}

export default BookList;