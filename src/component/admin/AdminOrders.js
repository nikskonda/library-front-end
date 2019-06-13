import React, {Component} from 'react';
import queryString from "query-string";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE
} from "../../context";
import axios from "axios";
import OrderList from "../order/OrderList";
import {Dropdown} from "semantic-ui-react";
import "./../order/OrderList.css"
import {getStrings, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';
import {withRouter} from 'react-router-dom'

class AdminOrders extends Component {

    state = {
        number: 1,
        size: 10,
        sort: 'creationDateTime',
        direction: 'DESC',

        totalPages: 0,

        status: 'ALL',

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
        }, this.loadOrders);
    }

    changeUrl = (params) => {
        if (!params){
            params = {
                number: this.state.number,
                size: this.state.size,
                sort: this.state.sort,
                direction: this.state.direction,
                status: this.state.status,
                bookId: this.state.bookId,
                userId: this.state.userId,
            }
        }
        this.setState({
                number: params.number,
                size: params.size,
                sort: params.sort,
                direction: params.direction,
                status: params.status,
                bookId: params.bookId,
                userId: params.userId,
        }, this.loadOrders);
        this.props.history.push({search: queryString.stringify(params)});
        this.loadOrders();

    };

    setActivePage = (page) => {
        this.setState({number: page}, this.loadOrders);
    };

    setSize = (size) => {
        this.setState({size: size, number: 1}, this.loadOrders);
    };

    loadOrders = () => {
        let url = BACK_END_SERVER_URL + `/order`;
        if (this.state.userId) {
            url = url.concat('/user/' + this.state.userId);
        } else {
            if (this.state.bookId) {
                url = url.concat('/book/' + this.state.bookId);
            }
        }
        this.loadOrdersByUrl(url);
        this.props.changeUrl();
    };


    loadOrdersByUrl = (url) => {
        const params = {
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
            status: this.state.status==='ALL'?null:this.state.status,
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
                console.log(res);
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

    statusOptions = (orderStatus, all) => {
        let array = [{key: all, text: all, value: 'ALL'}];

        orderStatus.forEach(status => array.push({key: status[0], text: status[1].text, value: status[0]}));
        // Array.from( new Map(ORDER_STATUS).values()).map((value, i) => array.push({key: i, text: value.text, value: value.text}));
        return array;
    };

    handleChangeStatus = (e, {value}) => {
        this.setState({status: value, number: 1}, this.loadOrders);
    };

    setUserId = (id) => {
        this.setState({status: 'ALL', number: 1, userId: id}, this.changeUrl);
    }

    render() {
        let strings = getStrings();
        return (
            <div id='orderList'>
                <Dropdown
                    fluid
                    selection
                    defaultValue={'ALL'}
                    options={this.statusOptions(strings.orderStatus, strings.orders.all)}
                    onChange={this.handleChangeStatus}
                /> 
                <OrderList
                        activePage={this.state.number}
                        orders={this.state.orders}
                        totalPages={this.state.totalPages}
                        setActivePage={this.setActivePage}
                        refresh={this.loadOrders}
                        size={this.state.size}
                        setSize={this.setSize}
                        errorText={this.state.errorText}
                        setUserId={this.setUserId}
                />
            </div>
        );
    };
}

export default withRouter(AdminOrders);
