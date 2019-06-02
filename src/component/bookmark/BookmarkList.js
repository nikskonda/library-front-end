import React, {Component} from 'react';
import {Card, Dropdown, Icon, Message, Pagination} from "semantic-ui-react";
import BookmarkCover from "./BookmarkCover";
import './Bookmark.css';
import {
    PAGINATION_BOOKMARKS_PER_ROW,
    PAGINATION_BOOKMARKS_ROWS,
    PAGINATION_BOUNDARY_RANGE,
    PAGINATION_COUNT_IN_DROPDOWN,
    PAGINATION_SIBLING_RANGE,
    PAGINATION_STEP_IN_DROPDOWN,
} from './../../context';

class BookmarkList extends Component {

    state = {
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
        let min = PAGINATION_BOOKMARKS_ROWS * PAGINATION_BOOKMARKS_PER_ROW;
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
                header='bookmarks Not found'
                content='Plz change search query!'
            />);
        return ( this.props.bookmarks ?
            <React.Fragment>
                <Card.Group itemsPerRow={PAGINATION_BOOKMARKS_PER_ROW}>
                    {this.props.bookmarks.map((bookmark) => <BookmarkCover key={bookmark.id} bookmark={bookmark}/>)}
                </Card.Group>
                {this.props.bookmarks && this.props.bookmarks.length>0 ?
                <div className='bookmarksPagination'>
                    <Pagination
                        activePage={this.props.number}
                        boundaryRange={PAGINATION_BOUNDARY_RANGE}
                        onPageChange={this.handlePaginationChange}
                        size='middle'
                        siblingRange={PAGINATION_SIBLING_RANGE}
                        totalPages={this.props.totalPages}
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}

                    />
                    <Dropdown
                            onChange={this.handleChangeSize}
                            options={this.loadSizeList()}
                            placeholder='size'
                            selection
                            value={this.state.size}
                        />
                </div> : false}
            </React.Fragment>
                : alert
        );
    }
}

export default BookmarkList;