import React, {Component} from 'react';
import axios from "axios/index";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_USER_DATA, ROLE_ADMIN, URL_DOWNLOAD_FILE} from "../../context";
import {Container, Header, Icon, Image, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.newsId,
            news: null,
            errorText: null,
        };
        this.getBody = this.getBody.bind(this);
        this.userSign = this.userSign.bind(this);
        this.dateSign = this.dateSign.bind(this);
    }

    componentWillMount() {
        axios
            .get(BACK_END_SERVER_URL + `/news/${this.state.id}`)
            .then(res => {
                this.setState({news: res.data});
            })
            .catch(({response}) => {
                this.setState({errorText: response.data.message});
            });
    }

    dateSign() {
        // return this.state.userList.modificationDate === undefined ? this.state.userList.creationDate : 'm:' + this.state.userList.modificationDate;
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

    isAdmin() {
        let user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user) return user.includes(ROLE_ADMIN);
        else return false;
    }

    getText() {
        let text = this.state.news.text.split(/\n/g);
        return text.map((p, i) => <p key={i}>{p}</p>);
    }

    getBody() {
        return (
            <div
                className='newsBody'>


                <Header
                    as='h1'> {this.state.news.title}</Header>
                <Image
                    fluid
                    src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.news.pictureUrl}
                />

                {this.getText()}

                <div className='newsFooter'>
                    <div>
                        <Link
                            style={{cursor: this.isAdmin() ? 'pointer' : 'default'}}
                            className='linkToUser'
                            to={this.isAdmin() ? 'admin/user/settings/' + this.state.news.creator.id : false}
                        >
                            <Icon name='user'/>
                            {this.userSign()}
                        </Link>
                    </div>
                    <div>
                        {this.dateSign()}
                    </div>
                </div>
            </div>
        );

    }

    render() {
        const notFount =
            (
                <Message
                    className='errorMsg'
                    warning
                    header='News Not found'
                    content={this.state.errorText}
                />
            );
        return (
            <div id='news'>
                <Container>
                    {this.state.news === null ? notFount : this.getBody()}
                </Container>
            </div>);
    }
}

export default News;