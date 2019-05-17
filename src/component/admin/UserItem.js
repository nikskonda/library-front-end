import React, {Component} from 'react';
import {Button, Icon, Item, Label, Dropdown} from "semantic-ui-react";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, URL_DOWNLOAD_FILE, ROLE, LOCAL_STORAGE_BASKET} from "../../context";
import ModalYesNo from "../ModalYesNo";
import {Link} from "react-router-dom";

class UserItem extends Component {

    state = {
        roleList: [],
        basket: [],
    };

    componentWillMount(){
        this.loadBasket();
        axios
            .get(BACK_END_SERVER_URL + '/user/role',
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                let array = [];
                res.data.map(role => array.push({key: role.id, text: role.authority, value: role.authority}));
                this.setState({roleList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    loadBasket = () => {
        const basketStr = localStorage.getItem(LOCAL_STORAGE_BASKET);
        let basket = [];
        if (basketStr) {
            basket = JSON.parse(basketStr);
            this.setState({basket: basket});
        }
    };

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

    giveBooksFromBasket = () => {
        let order = {
            details: this.state.basket,
            user: {
                username: this.props.user.username,
            }
        };
        axios
            .post(BACK_END_SERVER_URL + '/order/handOut',
                order,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                console.log('success!');
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
                    <Item.Header as='a'>{user.username}</Item.Header><br/>
                    <RoleList roleList={this.state.roleList} user={user} refresh={this.props.refresh}/>
                    <Item.Description>
                        <p>{this.name(user.firstName, user.lastName)}</p>
                        <p>{this.address(user.registrationAddress)}</p>
                    </Item.Description>
                    <Item.Extra>
                        <Button
                            icon
                            labelPosition='right'
                            floated='right'
                            onClick={this.giveBooksFromBasket}
                            >
                            giveBooksFromBasket
                            <Icon name='ban'/>
                        </Button>
                        <Button
                            as={Link}
                            to={`../../../admin/orderList?userId=${user.id}`}
                            icon
                            labelPosition='right'
                            floated='right'>
                            ORDERS
                            <Icon name='ban'/>
                        </Button>
                        <Button
                            as={Link}
                            to={`../admin/user/settings/${user.id}`}
                            icon
                            labelPosition='right'
                            floated='right'>
                            UserSettings
                            <Icon name='ban'/>
                        </Button>
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

class RoleList extends Component {

    state = {
        roleSearchString: '',
        newAuthority: '',
        roleSearchList: [],
        showModal: false,
    };

    componentWillReceiveProps(nextProps) {
        let roleSearchList = [];

        nextProps.roleList.map(role => {
            let flag = true;
            nextProps.user.authorities.map(userRole => {if (userRole.authority===role.text) flag=false});
            if (flag){
                roleSearchList.push(role);
            }
        });
      this.setState({ roleSearchList: roleSearchList});
    }

    handleChangeRole = (event, {searchQuery, value}) => {
        this.setState({roleSearchString: '', newAuthority: value, showModal:true });
    };

    handleSearchChangeRole = (event, {searchQuery}) => {
        this.setState({roleSearchString: searchQuery});
        let roleSearchList = [];
        if (!searchQuery || searchQuery===''){
            roleSearchList = this.props.roleList;
        } else {
            this.props.roleList.map(role => {
                if (role.text.includes(searchQuery.toUpperCase())){
                    roleSearchList.push(role);
                }
            })
        }
        this.setState({roleSearchList: roleSearchList});
    };

    addAuthority = () => {
        let body = {
            username: this.props.user.username,
            authority: this.state.newAuthority,
        }
        axios
            .post(BACK_END_SERVER_URL + '/user/role',
                body,
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

    openClose = () => this.setState({showModal: !this.state.showModal});

    render() {
        let user = this.props.user;
        return (
            <React.Fragment>
                {user.authorities.map(role => <Role key={role.id} username={user.username} role={role} refresh={this.props.refresh} />)}
                <Dropdown
                    compact
                    onChange={this.handleChangeRole}
                    onSearchChange={this.handleSearchChangeRole}
                    options={this.state.roleSearchList}
                    placeholder='role'
                    search
                    searchQuery={this.state.roleSearchString}
                    selection
                    text='select new role'
                    value={this.state.newAuthority}
                    />
                <ModalYesNo size='tiny' header='header' content={['content']} open={this.state.showModal} openClose={this.openClose} isConfirmed={this.addAuthority} />
            </React.Fragment>
            );
    };
}

class Role extends Component {

    state = {
        showModal: false,
    }

    removeAuthority = () => {
        axios({
            method: 'delete',
            url: BACK_END_SERVER_URL + '/user/role',
            headers: {
                'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                'Content-type': 'application/json',
                // 'Accept-Language': locale.tag || ''
            },
            data: {
                username: this.props.username,
                authority: this.props.role.authority,
            }
        })
            .then(res => {
                this.props.refresh();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    openClose = () => this.setState({showModal: !this.state.showModal});

    render() {
        let roleColor = new Map(ROLE);
        let role = this.props.role;
        return (
            <React.Fragment>
                <ModalYesNo size='tiny' header='header' content={['content']} open={this.state.showModal} openClose={this.openClose} isConfirmed={this.removeAuthority} />
                <Label as='a' tag color={roleColor.get(role.authority).color}>
                    {roleColor.get(role.authority).text}
                    <Icon name='delete' onClick={this.openClose}/>
                </Label>
            </React.Fragment>
            );
    };
}

export default UserItem;
