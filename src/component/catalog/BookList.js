import React, {Component} from 'react';
//https://github.com/axios/axios
import BookCover from "./BookCover";
import {Card, Dropdown, Icon, Message, Pagination} from "semantic-ui-react";
import {
    PAGINATION_BOOKS_PER_ROW,
    PAGINATION_BOOKS_ROWS,
    PAGINATION_BOUNDARY_RANGE,
    PAGINATION_COUNT_IN_DROPDOWN,
    PAGINATION_SIBLING_RANGE,
    PAGINATION_STEP_IN_DROPDOWN
} from "../../context";

class BookList extends Component {

    state = {
        defaultPage: 1,
        size: 1,
    };

    componentWillReceiveProps(nextProps) {
        let number = Number(nextProps.size);
        if (this.state.size !== number) {
            this.setState({size: number});
        }
    }

    handlePaginationChange = (event, {activePage}) => {
        this.props.setActivePage(activePage);
    };

    handleChangeSize = (event, {value}) => {
        this.props.setSize(value);
        this.setState({size: value});
    };

    loadSizeList = () => {
        let min = PAGINATION_BOOKS_ROWS * PAGINATION_BOOKS_PER_ROW;
        let attay = [];
        for (let i = 0; i < PAGINATION_COUNT_IN_DROPDOWN; i++) {
            let value = i * PAGINATION_STEP_IN_DROPDOWN + min;
            attay.push({key: value, text: value, value: value});
        }
        return attay;
    };

    render() {
        const alert =
            (<Message
                warning
                header='Books Not found'
                content={this.props.errorText}
            />);
        return (this.props.books) ?
            (<React.Fragment>
                <Card.Group itemsPerRow={this.state.itemPerRow}>
                    {this.props.books.map((book) =>
                        <BookCover
                            key={book.id}
                            bookCover={book}
                            addGenre={this.props.addGenre}
                        />)}
                </Card.Group>
                {this.props.books && this.props.books.length>0 ?
                <div className='booksPagination'>
                    <Pagination
                        activePage={this.props.activePage}
                        boundaryRange={PAGINATION_BOUNDARY_RANGE}
                        onPageChange={this.handlePaginationChange}
                        size='small'
                        siblingRange={PAGINATION_SIBLING_RANGE}
                        totalPages={this.props.totalPages}
                        ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                        firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                        lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                        prevItem={{content: <Icon name='angle left'/>, icon: true}}
                        nextItem={{content: <Icon name='angle right'/>, icon: true}}
                    />
                    <Dropdown
                        onChange={this.handleChangeSize}
                        options={this.loadSizeList()}
                        placeholder='size'
                        selection
                        value={this.state.size}
                    />
                </div> : false}
            </React.Fragment>)
            : alert;
    }


}

export default BookList;
