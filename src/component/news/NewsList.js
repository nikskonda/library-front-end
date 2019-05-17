import React, {Component} from 'react';
import NewsCover from "./NewsCover";
import {Card, Icon, Message, Pagination, Dropdown} from "semantic-ui-react";
import { PAGINATION_NEWS_PER_ROW, PAGINATION_BOUNDARY_RANGE, PAGINATION_SIBLING_RANGE, PAGINATION_NEWS_ROWS, PAGINATION_COUNT_IN_DROPDOWN, PAGINATION_STEP_IN_DROPDOWN } from '../../context';

class NewsList extends Component {


    state = {
        sizeList: [],
        size: 1,
    };

    componentWillMount() {
        this.loadSizeList();
    }

    componentWillReceiveProps(nextProps){
        let number = new Number(nextProps.size);
        if (this.state.size!==number){
            this.setState({size: number});
        }
    } 


    handleChangeSize = (event, {value}) => {
        this.props.setSize(value);
        this.setState({size: value});
    };

    handlePaginationChange = (event, {activePage}) => {
        this.props.setActivePage(activePage);
    };

    loadSizeList = () => {
        let min = PAGINATION_NEWS_ROWS*PAGINATION_NEWS_PER_ROW;
        let attay = [];
        for (let i = 0; i < PAGINATION_COUNT_IN_DROPDOWN; i++) {
            let value = i*PAGINATION_STEP_IN_DROPDOWN+min;
            attay.push({key:value, text: value, value: value});
        }
        return attay;
    };

    render() {
        const alert =
            (<Message
                warning
                header='News Not found'
                content={this.props.errorText}
            />);
        return ( this.props.news && this.props.news.length>0?
            <React.Fragment>
                <Card.Group itemsPerRow={PAGINATION_NEWS_PER_ROW} id='newsCardGroup'>
                    {this.props.news.map((news) => <NewsCover key={news.id} newsCover={news}/>)}
                </Card.Group>
                {this.props.news && this.props.news.length>0 
                ?
                    <div className='newsPagination'>
                        <Pagination
                            activePage={this.props.number}
                            boundaryRange={PAGINATION_BOUNDARY_RANGE}
                            onPageChange={this.handlePaginationChange}
                            size='small'
                            siblingRange={PAGINATION_SIBLING_RANGE}
                            totalPages={this.props.totalPages}
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
                    </div>
                : false}
                
            </React.Fragment>
                : alert
        );
    }
}

export default NewsList;