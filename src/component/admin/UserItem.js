import React, {Component} from 'react';
import {Button, Icon, Item} from "semantic-ui-react";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, URL_DOWNLOAD_FILE} from "../../context";

class UserItem extends Component {

    state = {};

    address = (address) => {
        if (address) {
            return address.address + ' ' + address.postalCode + ', ' + address.city.name + '/' + address.city.state.name + '/'
                + address.city.state.country.name + ', ' + address.firstName + ' ' + address.lastName + ' ' + address.phone;
        }
        return false;

    };

    name = (firstName, lastName) => {
        if (firstName && lastName) {
            return firstName + ' ' + lastName;
        } else {
            return firstName ? firstName + ' ' : '' + lastName ? lastName : '';
        }
    };

    ban = () => {
        axios
            .post(BACK_END_SERVER_URL + '/user/ban',
                this.props.user.username,
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

    clear = () => {
        axios
            .post(BACK_END_SERVER_URL + '/user/clear',
                this.props.user.username,
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

    render() {
        let user = this.props.user;
        return (
            <Item>
                <Item.Image size='small' src={user.avatarUrl?BACK_END_SERVER_URL+URL_DOWNLOAD_FILE+user.avatarUrl:'https://react.semantic-ui.com/images/wireframe/image.png'}/>
                <Item.Content>
                    <Item.Header as='a'>{user.username}</Item.Header>
                    <Item.Description>
                        <p>{this.name(user.firstName, user.lastName)}</p>
                        <p>{this.address(user.address)}</p>
                    </Item.Description>
                    <Item.Extra>
                        <Button
                            icon
                            labelPosition='right'
                            floated='right'
                            onClick={this.ban}
                        >
                            {!user.banned?'unBan':'Ban'}
                            <Icon name='ban'/>
                        </Button>
                        <Button
                            icon
                            labelPosition='right'
                            floated='right'
                            onClick={this.clear}
                        >
                            To Clear
                            <Icon name='ban'/>
                        </Button>

                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    };
}

export default UserItem;