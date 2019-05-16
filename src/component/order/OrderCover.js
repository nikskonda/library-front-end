import React, {Component} from 'react';
import {Button, Card, Icon, Image, Label, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {BACK_END_SERVER_URL,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    ORDER_STATUS,
    URL_DOWNLOAD_FILE,
    ORDER_STATUS_NEW,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_HANDED_OUT,
    ORDER_STATUS_AT_COURIER,
    ORDER_STATUS_RECEIVED,
    ORDER_STATUS_RETURN_TO_COURIER,
    ORDER_STATUS_RETURNED,
    ORDER_STATUS_CANCELLED} from "../../context";
import OrderStatusStep from "./OrderStatusStep";
import axios from "axios";

class OrderCover extends Component {

    state = {
        showDetails: false,
    };

    dateSign = () => {
        // return <Moment>{this.state.newsCover.creationDate}</Moment>;
        let date = new Date(this.props.order.creationDateTime);
        return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' +
            (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear();

    };

    address = () => {
        const address = this.props.order.address;
        if (address) {
            return address.address + ' ' + address.postalCode + ', ' + address.city.name + '/' + address.city.state.name + '/'
                + address.city.state.country.name + ', ' + address.firstName + ' ' + address.lastName + ' ' + address.phone;
            }
        return false;
    };

    changeShowDetails = () => {
        this.setState({showDetails: !this.state.showDetails});
    };

    getOrderDetailTable = (order) => {
        return (

            <Table basic='very' celled>
                <Table.Body>
                    {order.details.map(detail =>
                        <Table.Row>
                            <Table.Cell textAlign='center'>
                                <Link to={'../book/' + detail.book.id}>
                                    <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + detail.book.thumbnailUrl}
                                           size='small'/>
                                </Link>
                            </Table.Cell>
                            <Table.Cell
                                textAlign='center'
                                verticalAlign='middle'
                            >
                                <Link to={'../book/' + detail.book.id}>
                                    {detail.book.title}
                                </Link></Table.Cell>
                            <Table.Cell
                                textAlign='center'
                                verticalAlign='middle'
                            >{detail.count}</Table.Cell>
                            <Table.Cell
                                textAlign='center'
                                verticalAlign='middle'
                            >{detail.price}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell/>
                        <Table.HeaderCell>Total:</Table.HeaderCell>
                        <Table.HeaderCell>{order.totalPrice}</Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>);
    };

    cancelOrder = () => {
        axios
            .post(BACK_END_SERVER_URL + '/order/' + this.props.order.id + '/canceled',
                null,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.props.refresh();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    receiveOrder = () => {
        axios
            .post(BACK_END_SERVER_URL + '/order/' + this.props.order.id + '/received',
                null,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.props.refresh();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    confirmOrder = () => {
        axios
            .post(BACK_END_SERVER_URL + '/order/' + this.props.order.id + '/confirmed',
                null,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.props.refresh();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    addStatus = (status) => {
        let data = {
            status
        };
        axios
            .post(BACK_END_SERVER_URL + '/order/' + this.props.order.id + '/status',
                data,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.props.refresh();
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    returnOrder = () => {
        axios
            .post(BACK_END_SERVER_URL + '/order/' + this.props.order.id + '/returned',
                null,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.props.refresh();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handOutOrder = () => {
        this.addStatus(ORDER_STATUS_HANDED_OUT);
    };

    atCourierOrder = () => {
        this.addStatus(ORDER_STATUS_AT_COURIER);
    };

    returnToCourierOrder = () => {
        this.addStatus(ORDER_STATUS_RETURN_TO_COURIER);
    };

    buttonsForOrderControl = () => {
        let status = new Map(ORDER_STATUS);
        let result;
        let statusList = this.props.order.statusList;
        if (statusList[statusList.length - 1].status === (ORDER_STATUS_NEW)) {
            result = (
                <React.Fragment>
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.confirmOrder}>
                        <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                        {status.get(ORDER_STATUS_CONFIRMED).button}
                    </Button>
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.handOutOrder}>
                        <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                        {status.get(ORDER_STATUS_HANDED_OUT).button}
                    </Button>
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.cancelOrder}>
                        <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                        {status.get(ORDER_STATUS_CANCELLED).button}
                    </Button>
                </React.Fragment>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_CONFIRMED) {
            result = (
                <Button
                    icon
                    labelPosition='right'
                    onClick={this.atCourierOrder}>
                    <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                    {status.get(ORDER_STATUS_AT_COURIER).button}
                </Button>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_AT_COURIER) {
            result = (
                <Button
                    icon
                    labelPosition='right'
                    onClick={this.receiveOrder}>
                    <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                    {status.get(ORDER_STATUS_RECEIVED).button}
                </Button>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_RECEIVED) {
            result = (
                <React.Fragment>
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.returnToCourierOrder}>
                        <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                        {status.get(ORDER_STATUS_RETURN_TO_COURIER).button}
                    </Button>
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.returnOrder}>
                        <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                        {status.get(ORDER_STATUS_RETURNED).button}
                    </Button>
                </React.Fragment>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_RETURN_TO_COURIER) {
            result = (
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.returnOrder}>
                        <Icon name={status.get(ORDER_STATUS_RETURNED).icon}/>
                        {status.get(ORDER_STATUS_RETURNED).button}
                    </Button>
            );
        }

        return result;
    };


    render() {
        const order = this.props.order;
        return (
            <Card fluid>

                <Card.Content>
                    <Icon name='shopping cart' size='huge'/>
                    <OrderStatusStep statusList={order.statusList}/>

                    <Card.Description>{this.address()}</Card.Description>
                    <Card.Meta>{this.dateSign()}</Card.Meta>
                    {order.comment ? <p>{order.comment}</p> : false}

                    <Button
                        icon
                        labelPosition='left'
                        onClick={this.changeShowDetails}>
                        <Icon name='unordered list'/>
                        {this.state.showDetails ? 'hide details' : 'show details'}
                    </Button>
                    {this.buttonsForOrderControl()}
                    {this.state.showDetails ? this.getOrderDetailTable(order) : false}

                </Card.Content>
            </Card>
        );
    }
}


export default OrderCover;
