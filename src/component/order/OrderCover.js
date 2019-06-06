import React, {Component} from 'react';
import {Button, Card, Icon, Image, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE,
    LOCAL_STORAGE_USER_DATA,
    ORDER_STATUS_AT_COURIER,
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_HANDED_OUT,
    ORDER_STATUS_NEW,
    ORDER_STATUS_RECEIVED,
    ORDER_STATUS_RETURN_TO_COURIER,
    ORDER_STATUS_RETURNED,
    ROLE_COURIER,
    ROLE_LIBRARIAN,
    URL_DOWNLOAD_FILE,
    ROLE_OPERATOR
} from "../../context";
import OrderStatusStep from "./OrderStatusStep";
import axios from "axios";
import {L10N, getLang} from "../../l10n"
import LocalizedStrings from 'react-localization';

class OrderCover extends Component {

    state = {
        showDetails: false,
        totalBooks: 0,
    };

    componentWillMount(){
        let totalCount = 0;
        this.props.order.details.forEach(detail => {
            totalCount+=detail.count;
        });
        this.setState({totalBooks: totalCount});
    }

    dateSign = () => {
        // return <Moment>{this.state.newsCover.creationDate}</Moment>;
        let date = new Date(this.props.order.creationDateTime);
        return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' +
            (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear();

    };

    address = () => {
        const address = this.props.order.address;
        if (address) {
            return <React.Fragment>
            {address.address + ' ' + address.postalCode + ', ' + address.city.name + '/' + address.city.state.name + '/'
                + address.city.state.country.name + ', '}<b>{address.firstName + ' ' + address.lastName }</b> {' ' + address.phone}
            </React.Fragment>;
            }
        return false;
    };

    changeShowDetails = () => {
        this.setState({showDetails: !this.state.showDetails});
    };

    getOrderDetailTable = (order) => {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        return (
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
                                className='bookTitle'
                            >
                                <Link to={'../book/' + detail.book.id}>
                                    {detail.book.title.toUpperCase()}
                                </Link></Table.Cell>
                            <Table.Cell
                                textAlign='center'
                                verticalAlign='middle'
                                className='bookCount'
                            >{detail.count}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell className='total'>{strings.orders.total}:</Table.HeaderCell>
                        <Table.HeaderCell className='bookCount'>{this.state.totalBooks}</Table.HeaderCell>
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
                        'Accept-Language': getLang()
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
                        'Accept-Language': getLang()
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
                        'Accept-Language': getLang()
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
                        'Accept-Language': getLang()
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
                        'Accept-Language': getLang()
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

    isOwner = () => {
        let user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user && this.props.order.user) return JSON.parse(user).username===this.props.order.user.username;
        else return false;
    }

    isHasRole = (role) => {
        let user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user) {
            let roles = JSON.parse(user).authorities;
            if (roles && roles.includes(role)) {
                return true;
            }
        }
        return false;
    };

    buttonsForOrderControl = () => {
        let result;
        let statusList = this.props.order.statusList;
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        let statusText = new Map(strings.orderStatus);
        if (statusList[statusList.length - 1].status === (ORDER_STATUS_NEW)) {
            result = (
                <React.Fragment>
                    {this.isHasRole(ROLE_OPERATOR)?
                        <React.Fragment>
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.confirmOrder}>
                                <Icon name={statusText.get(ORDER_STATUS_CONFIRMED).icon}/>
                                {statusText.get(ORDER_STATUS_CONFIRMED).button}
                            </Button>
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.handOutOrder}>
                                <Icon name={statusText.get(ORDER_STATUS_HANDED_OUT).icon}/>
                                {statusText.get(ORDER_STATUS_HANDED_OUT).button}
                            </Button>
                    </React.Fragment>: false}
                    {this.isHasRole(ROLE_OPERATOR)||this.isOwner()?
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.cancelOrder}>
                        <Icon name={statusText.get(ORDER_STATUS_CANCELLED).icon}/>
                        {statusText.get(ORDER_STATUS_CANCELLED).button}
                    </Button> :false}
                </React.Fragment>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_CONFIRMED) {
            result = (
                <React.Fragment>
                    {this.isHasRole(ROLE_OPERATOR)?
                    <Button
                            icon
                            labelPosition='right'
                            onClick={this.handOutOrder}>
                            <Icon name={statusText.get(ORDER_STATUS_HANDED_OUT).icon}/>
                            {statusText.get(ORDER_STATUS_HANDED_OUT).button}
                        </Button> : false}
                    {this.isHasRole(ROLE_COURIER) || this.isHasRole(ROLE_OPERATOR)?
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.atCourierOrder}>
                        <Icon name={statusText.get(ORDER_STATUS_AT_COURIER).icon}/>
                        {statusText.get(ORDER_STATUS_AT_COURIER).button}
                    </Button> : false}
                </React.Fragment>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_HANDED_OUT) {
            result = (
                <React.Fragment>
                    {this.isOwner()?
                    <Button
                            icon
                            labelPosition='right'
                            onClick={this.returnToCourierOrder}>
                            <Icon name={statusText.get(ORDER_STATUS_RETURN_TO_COURIER).icon}/>
                            {statusText.get(ORDER_STATUS_RETURN_TO_COURIER).button}
                        </Button> : false}
                        {this.isHasRole(ROLE_OPERATOR)?
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.returnOrder}>
                        <Icon name={statusText.get(ORDER_STATUS_RETURNED).icon}/>
                        {statusText.get(ORDER_STATUS_RETURNED).button}
                    </Button> : false}
                </React.Fragment>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_AT_COURIER) {
            result = 
                this.isOwner()?
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.receiveOrder}>
                        <Icon name={statusText.get(ORDER_STATUS_RECEIVED).icon}/>
                        {statusText.get(ORDER_STATUS_RECEIVED).button}
                    </Button> : false;
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_RECEIVED) {
            result = (
                <React.Fragment>
                    {this.isOwner()?
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.returnToCourierOrder}>
                        <Icon name={statusText.get(ORDER_STATUS_RETURN_TO_COURIER).icon}/>
                        {statusText.get(ORDER_STATUS_RETURN_TO_COURIER).button}
                    </Button> : false}
                    {this.isHasRole(ROLE_OPERATOR)?
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.returnOrder}>
                        <Icon name={statusText.get(ORDER_STATUS_RETURNED).icon}/>
                        {statusText.get(ORDER_STATUS_RETURNED).button}
                    </Button>:false}
                </React.Fragment>
            );
        }
        if (statusList[statusList.length - 1].status === ORDER_STATUS_RETURN_TO_COURIER) {
            result = this.isHasRole(ROLE_OPERATOR)?
                    <Button
                        icon
                        labelPosition='right'
                        onClick={this.returnOrder}>
                        <Icon name={statusText.get(ORDER_STATUS_RETURNED).icon}/>
                        {statusText.get(ORDER_STATUS_RETURNED).button}
                    </Button> : false;
        }

        return result;
    };


    render() {
        const order = this.props.order;
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        return (
            <Card fluid>
                <Card.Content className='order'>
                    <OrderStatusStep statusList={order.statusList}/>
                    <Card.Description className='address'>{this.address()}</Card.Description>
                    <Card.Description className='address'>{this.address()}</Card.Description>
                    <Card.Meta className='date'>{this.dateSign()}</Card.Meta>
                    {order.comment ? <p>{order.comment}</p> : false}

                    <Button
                        floated='right'
                        icon
                        labelPosition='left'
                        onClick={this.changeShowDetails}>
                        <Icon name='unordered list'/>
                        {this.state.showDetails ? strings.orders.hideDetails : strings.orders.showDetails}
                    </Button>
                    {this.buttonsForOrderControl()}
                    {this.state.showDetails ? this.getOrderDetailTable(order) : false}

                </Card.Content>
            </Card>
        );
    }
}


export default OrderCover;
