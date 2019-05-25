import React, {Component} from 'react';
import {Card, Icon, Message, Pagination, Dropdown} from "semantic-ui-react";
import OrderCover from "./OrderCover";
import { PAGINATION_BOUNDARY_RANGE, PAGINATION_SIBLING_RANGE, PAGINATION_ORDERS_ROWS, PAGINATION_ORDERS_PER_ROW, PAGINATION_COUNT_IN_DROPDOWN, PAGINATION_STEP_IN_DROPDOWN} from '../../context';

class OrderList extends Component {


    state = {
        size: 1,
    };

    componentWillReceiveProps(nextProps){
        let number = Number(nextProps.size);
        if (this.state.size!==number){
            this.setState({size: number});
        }
    } 

    handleChangeSize = (event, {value}) => {
        this.props.setSize(value);
        this.setState({size: value});
    };

    loadSizeList = () => {
        let min = PAGINATION_ORDERS_ROWS*PAGINATION_ORDERS_PER_ROW;
        let attay = [];
        for (let i = 0; i < PAGINATION_COUNT_IN_DROPDOWN; i++) {
            let value = i*PAGINATION_STEP_IN_DROPDOWN+min;
            attay.push({key:value, text: value, value: value});
        }
        return attay;
    };

    handlePaginationChange = (event, {activePage}) => {
        this.props.setActivePage(activePage);
        this.loadSizeList();
    };

    handlePaginationChange = (event, {activePage}) => {
        this.props.setActivePage(activePage);
    };

    

    render() {
        const alert =
            (<Message
                warning
                header='Orders Not found'
                content='Plz change search query!'
            />);
        return ( this.props.orders ?
            <React.Fragment>
                <Card.Group>
                    {this.props.orders.map((order) => <OrderCover key={order.id} order={order} refresh={this.props.refresh}/>)}
                </Card.Group>
                <div className='orderPagination'>
                    <Pagination
                        activePage={this.props.number}
                        boundaryRange={PAGINATION_BOUNDARY_RANGE}
                        onPageChange={this.handlePaginationChange}
                        size='small'
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
                </div>
                
            </React.Fragment>
                : alert
        );
    }
}

export default OrderList;