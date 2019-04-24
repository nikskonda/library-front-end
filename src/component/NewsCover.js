import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Card, Icon, Image} from "semantic-ui-react";

class NewsCover extends Component {


    state = {
        newsCover: this.props.newsCover
    };


    dateSign = () => {
        // return this.state.news.modificationDate === undefined ? this.state.news.creationDate : 'm:' + this.state.news.modificationDate;
        let date = new Date(this.state.newsCover.creationDate);
        let now = new Date();
        if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
            return date.getHours() + ':' + date.getMinutes();
        } else {
            return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
        }
    };

    userSign = () => {
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
    };

    render() {
        return (
            <Card>
                <Image src='img/news.jpg'/>
                <Card.Content>
                    <Card.Header>
                        <Link to={'news/' + this.state.newsCover.id}>{this.state.newsCover.title}</Link>
                    </Card.Header>
                    <Card.Meta>Added {this.dateSign()}</Card.Meta>
                    <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                        {this.userSign()}
                    </a>
                </Card.Content>
            </Card>
        );
    }
}


export default NewsCover;