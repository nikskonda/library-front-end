import React, {Component} from 'react';
import axios from "axios/index";
import {
    BACK_END_SERVER_URL,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_DATA,
    ROLE_ADMIN,
    ROLE_JOURNALIST,
    URL_DOWNLOAD_FILE
} from "../../context";
import {Container, Header, Icon, Image, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getLang, getStrings} from "../../l10n";
import ModalYesNo from "../ModalYesNo";

class News extends Component {

    state = {
            id: this.props.newsId,
            news: null,
            errorText: null,
            wasRemoved: false,
        };

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

    dateSign = () => {
        // return this.state.userList.modificationDate === undefined ? this.state.userList.creationDate : 'm:' + this.state.userList.modificationDate;
        let date = new Date(this.state.news.creationDate);
        let now = new Date();
        if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
            return date.getHours() + ':' + date.getMinutes();
        } else {
            return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
        }
    };

    userSign = () => {
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
    };

    getText = () => {
        let text = this.state.news.text.split(/\n/g);
        return text.map((p, i) => <p key={i}>{p}</p>);
    };

    isHasRole = (role) => {
        let user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user){
            let roles = JSON.parse(user).authorities;
            if (roles && roles.includes(role)){
                return true;
            }
        }
        return false;
    };

    openClose = () => this.setState({showModalRemove: !this.state.showModalRemove});

    removeNews = () => {
        axios
            .delete(BACK_END_SERVER_URL + `/news/${this.state.id}`, {
                headers: {
                    'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                    'Accept-Language': getLang()
                }
            })
            .then(res => {
                this.setState({wasRemoved: true});
            })
            .catch(({response}) => {
                this.setState({removeErrorText: response.data.message});
            });
    };

    getBody = () => {
        let strings = getStrings();
        return (
            <div
                className='newsBody'>
                <Header as='h1'>
                    {this.state.news.title}
                    {this.isHasRole(ROLE_JOURNALIST) ?
                        <React.Fragment>
                            <Link to={'/admin/edit/news/'+this.state.news.id}>({strings.news.edit})</Link>
                            <a onClick={this.openClose} style={{cursor: 'pointer'}}>({strings.news.remove})</a>
                            <ModalYesNo
                                size='tiny'
                                header={strings.modal.remove}
                                content={[strings.modal.removeNews + this.state.news.title+strings.modal.removeEnd]}
                                open={this.state.showModalRemove}
                                openClose={this.openClose}
                                isConfirmed={this.removeNews}/>
                        </React.Fragment>

                        : false}
                </Header>
                <Image
                    fluid
                    src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.news.pictureUrl}
                />

                {this.getText()}

                <div className='newsFooter'>
                    <div>
                        <Link
                            style={{cursor: this.isHasRole(ROLE_ADMIN) ? 'pointer' : 'default'}}
                            className='linkToUser'
                            to={this.isHasRole(ROLE_ADMIN) ? '/admin/user/settings/' + this.state.news.creator.id : false}
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

    };

    render() {
        let strings = getStrings();
        const notFount =
            (
                <Message
                    className='errorMsg'
                    warning
                    header={strings.error.news.notFound}
                    content={this.state.errorText ? this.state.errorText : null}
                />
            );
        const removed =
            (<Message
                success
                header={strings.success.success}
                content={strings.success.wasRemovedNews}
            />);
        const removeError =
            (<Message
                warning
                header={strings.error.error}
                content={this.state.removeErrorText ? this.state.removeErrorText : null}
            />);
        return (
            <div id='news'>
                <Container>
                    {this.state.wasRemoved ? removed : false}
                    {this.state.removeErrorText ? removeError : false}
                    {this.state.news === null ? notFount : this.getBody()}
                </Container>
            </div>);
    }
}

export default News;