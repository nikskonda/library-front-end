import React, {Component} from 'react';
import {Button, Card, Icon, Image, Label, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, ORDER_STATUS, URL_DOWNLOAD_FILE} from "../../context";
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

    status = () => {
        let status = new Map(ORDER_STATUS);
        if (this.props.order.status === status.get('new')) {
            return (
                <Label as='a' color='red' tag>{this.props.order.status}</Label>
            );
        }
        if (this.props.order.status === status.get('in_progress')) {
            return (
                <Label as='a' color='violet' tag>{this.props.order.status}</Label>
            );
        }
        if (this.props.order.status === status.get('completed')) {
            return (
                <Label as='a' color='green' tag>{this.props.order.status}</Label>
            );
        }
    };

    address = () => {
        const address = this.props.order.address;
        return address.address + ' ' + address.postalCode + ', ' + address.city.name + '/' + address.city.state.name + '/'
            + address.city.state.country.name + ', ' + address.firstName + ' ' + address.lastName+' ' + address.phone;
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
                                        <Image src={BACK_END_SERVER_URL+URL_DOWNLOAD_FILE+detail.book.thumbnailUrl} size='small'/>
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
            .post(BACK_END_SERVER_URL+'/order/'+this.props.order.id+'/cancel',
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
                this.props.changeOrder(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                        <Icon name='unordered list' />
                        {this.state.showDetails ? 'hide details' : 'show details'}
                    </Button>
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.cancelOrder}>
                        <Icon name='ban' />
                        Cancel
                    </Button>
                    {this.state.showDetails ? this.getOrderDetailTable(order) : false}

                </Card.Content>
            </Card>
        );
    }
}


export default OrderCover;