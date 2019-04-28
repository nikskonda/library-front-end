import React, {Component} from 'react';
import axios from "axios/index";
import {BACK_END_SERVER_URL} from "../../context";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            news: null
        };
        this.getBody = this.getBody.bind(this);
        this.userSign = this.userSign.bind(this);
        this.dateSign = this.dateSign.bind(this);
    }

    componentWillMount() {
        axios
            .get(BACK_END_SERVER_URL+`/news/${this.state.id}`)
            .then(res => {
                this.setState({news: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    dateSign() {
        // return this.state.news.modificationDate === undefined ? this.state.news.creationDate : 'm:' + this.state.news.modificationDate;
        let date = new Date(this.state.news.creationDate);
        let now = new Date();
        if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
            return date.getHours() + ':' + date.getMinutes();
        } else {
            return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
        }
    }

    userSign() {
        if (this.state.news.creator.firstName === undefined && this.state.news.creator.lastName === undefined) {
            return this.state.news.creator.username;
        }
        if (this.state.news.creator.firstName === undefined) {
            return this.state.news.creator.lastName;
        }
        if (this.state.news.creator.lastName === undefined) {
            return this.state.news.creator.firstName;
        }
        return this.state.news.creator.firstName + ' ' + this.state.news.creator.lastName;
    }

    getBody(){
        return (
            <React.Fragment>
                <Row>
                    <Image src="../img/news.jpg" className="rounded" style={{maxHeight: 500}}/>
                </Row>
                <Row>
                    <h1>{this.state.news.title}</h1>
                </Row>
                <Row>
                    <p>{this.state.news.text}</p>
                </Row>
                <Row className='justify-content-between'>
                    <Col>
                        <small>{this.dateSign()}</small>
                    </Col>
                    <Col>
                        <small>{this.userSign()}</small>
                    </Col>
                </Row>
            </React.Fragment>

        );

    }

    render() {
        let notFount = <Alert variant='warning'>News not found</Alert>;
        return (
            <Container>
                {this.state.news === null ? notFount : this.getBody()}
            </Container>
        );
    }
}

export default News;