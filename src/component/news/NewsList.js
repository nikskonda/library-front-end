import React, {Component} from 'react';
import NewsCover from "./NewsCover";
import {Card, Icon, Message, Pagination} from "semantic-ui-react";

class NewsList extends Component {


    state = {
        itemPerRow: 3,
        column: 7,
        boundaryRange: 2,
        siblingRange: 1,
    };


    handlePaginationChange = (event, {activePage}) => {
        this.props.setActivePage(activePage);
    };



    render() {
        const alert =
            (<Message
                warning
                header='News Not found'
                content='Plz change search query!'
            />);
        return ( this.props.news ?
            <React.Fragment>
                <Card.Group itemsPerRow={this.state.itemPerRow}>
                    {this.props.news.map((news) => <NewsCover key={news.id} newsCover={news}/>)}
                </Card.Group>
                <Pagination
                    activePage={this.props.number}
                    boundaryRange={this.state.boundaryRange}
                    onPageChange={this.handlePaginationChange}
                    size='middle'
                    siblingRange={this.state.siblingRange}
                    totalPages={this.props.totalPages}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}

                />
            </React.Fragment>
                : alert
        );
    }
}

export default NewsList;