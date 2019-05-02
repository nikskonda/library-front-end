import React, {Component} from 'react';
import OrderList from "./OrderList";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN} from "../../context";
import queryString from "query-string";
import axios from "axios";
import {Container} from "semantic-ui-react";

class OrderListPage extends Component {

    state = {
        number: 1,
        size: 10,
        sort: 'creationDateTime',
        direction: 'DESC',

        totalPages: 0,

        status: null,
        bookId: this.props.match.params.bookId,
        userId: this.props.match.params.userId,

        orders: [],
    };

    componentWillMount() {
        const params = queryString.parse(this.props.location.search);
        this.setState({
            number: params.number || this.state.number,
            size: params.size || this.state.size,
            sort: params.sort || this.state.sort,
            direction: params.direction || this.state.direction,

            status: params.status || this.state.status,
        });
    }

    componentDidMount() {
        this.loadOrders();
    };

    changeUrl = (params) => {
        if (!params){
            params = {
                number: this.state.number,
                size: this.state.size,
                sort: this.state.sort,
                direction: this.state.direction,
                status: this.state.status,
            }
        }
        this.props.history.push({search: queryString.stringify(params)});
        this.loadOrders();

    };

    setActivePage = (page) => {
        this.setState({number: page}, this.changeUrl);
    };

    loadOrders = () => {
        console.log('hello');
        let url = BACK_END_SERVER_URL + `/order/`;
        if (this.state.userId){
            url = url.concat('user/'+this.state.userId);
        } else {
            if (this.state.bookId) {
                url = url.concat('book/'+this.state.bookId);
            } else {
                url = url.concat('user');
            }
        }
        console.log(url);
        this.loadOrdersByUrl(url);

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
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    render() {
        return (
            <React.Fragment>
                <Container>
                    <OrderList
                        activePage={this.state.number}
                        orders={this.state.orders}
                        totalPages={this.state.totalPages}
                        setActivePage={this.setActivePage}
                    />
                </Container>
            </React.Fragment>
        );
    }
}

export default OrderListPage;