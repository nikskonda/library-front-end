import React, {Component} from 'react';
import {Card, Image, Label} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {ORDER_STATUS} from "../../context";

class OrderCover extends Component {

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

    render() {
        const order = this.props.order;
        return (
            <Card fluid>

                <Card.Content>
                    <Image src='../img/book.jpg' floated='left' size='small'/>
                    <Card.Header>
                        <Link to={`../book/` + order.book.id}>{order.book.title}</Link>
                    </Card.Header>
                    {this.status()}
                    <Card.Meta>{this.dateSign()}</Card.Meta>
                    {order.comment ? <p>{order.comment}</p> : false}
                </Card.Content>
            </Card>
        );
    }
}


export default OrderCover;