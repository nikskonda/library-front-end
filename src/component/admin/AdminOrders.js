import React, {Component} from 'react';
import queryString from "query-string";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, ORDER_STATUS} from "../../context";
import axios from "axios";
import OrderList from "../order/OrderList";
import {Dropdown} from "semantic-ui-react";

class AdminOrders extends Component {

    state = {
        number: 1,
        size: 10,
        sort: 'creationDateTime',
        direction: 'DESC',

        totalPages: 0,

        status: null,

        bookId: null,
        userId: null,

        orders: [],
    };


    componentWillMount() {
        const params = queryString.parse(this.props.queryString);
        this.setState({
            number: params.number || this.state.number,
            size: params.size || this.state.size,
            sort: params.sort || this.state.sort,
            direction: params.direction || this.state.direction,
            bookId: params.bookId,
            userId: params.userId,
            status: params.status || this.state.status,
        }, this.loadOrders());
    }

    setActivePage = (page) => {
        this.setState({number: page}, this.loadOrders());
    };

    loadOrders = () => {

        let url = BACK_END_SERVER_URL + `/order/`;
        console.log(url);
        if (this.state.userId) {
            url = url.concat('user/' + this.state.userId);
        } else {
            if (this.state.bookId) {
                url = url.concat('book/' + this.state.bookId);
            } else {
                url = url.concat('user');
            }
        }
        this.loadOrdersByUrl(url);
        this.props.changeUrl(
            {
                number: this.state.number,
                size: this.state.size,
                sort: this.state.sort,
                direction: this.state.direction,
                status: this.state.status,
            }
        )
    };


    loadOrdersByUrl = (url) => {
        const params = {
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
            status: this.state.status,
        };

        axios
            .get(url,
                {
                    params: params,
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.setState({
                    number: res.data.number + 1,
                    orders: res.data.content,
                    totalPages: res.data.totalPages,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    statusOptions = () => {
        let array = [];
        Array.from( new Map(ORDER_STATUS).values()).map(value => array.push({key: value, text: value, value: value}));
        return array;
    };

    handleChangeStatus = (e, {value}) => {
        this.setState({status: value}, this.loadOrders());
    };

    render() {
        return (
            <React.Fragment>
                <Dropdown
                    placeholder='Select status'
                    fluid
                    selection
                    options={this.statusOptions()}
                    onChange={this.handleChangeStatus}
                />
                <OrderList
                    activePage={this.state.number}
                    orders={this.state.orders}
                    totalPages={this.state.totalPages}
                    setActivePage={this.setActivePage}
                    refresh={this.loadOrders}
                />
            </React.Fragment>
        );
    };
}

export default AdminOrders;