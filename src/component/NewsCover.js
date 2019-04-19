import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class NewsCover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsCover: props.newsCover
        };
        this.userSign = this.userSign.bind(this);
        this.dateSign = this.dateSign.bind(this);
    }

    dateSign() {
        // return this.state.news.modificationDate === undefined ? this.state.news.creationDate : 'm:' + this.state.news.modificationDate;
        let date = new Date(this.state.newsCover.creationDate);
        let now = new Date();
        if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
            return date.getHours() + ':' + date.getMinutes();
        } else {
            return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
        }
    }

    userSign() {
        if (this.state.newsCover.creator.firstName === undefined && this.state.newsCover.creator.lastName === undefined) {
            return this.state.newsCover.creator.username;
        }
        if (this.state.newsCover.creator.firstName === undefined) {
            return this.state.newsCover.creator.lastName;
        }
        if (this.state.newsCover.creator.lastName === undefined) {
            return this.state.newsCover.creator.firstName;
        }
        return this.state.newsCover.creator.firstName + ' ' + this.state.newsCover.creator.lastName;
    }

    render() {
        return (
            <Card>

                <Card.Img variant="top" src="img/news.jpg"/>
                <Card.Body>
                    <NavLink to={`news/${this.state.newsCover.id}`}
                             style={{
                                 textDecoration: 'none',
                                 color: 'inhabit'
                             }}
                             activeClassName="active"
                    >
                        <Card.Title>{this.state.newsCover.title}</Card.Title>
                    </NavLink>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Row>
                        <Col>{this.dateSign()}</Col>
                        <Col>{this.userSign()}</Col>
                    </Row>
                </Card.Footer>
            </Card>
        );
    }
}


export default NewsCover;