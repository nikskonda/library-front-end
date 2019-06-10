import React, {Component} from 'react';
import {Button, Dropdown, Icon, Item, Label} from "semantic-ui-react";
import axios from "axios";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_BASKET,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE,
    LOCAL_STORAGE_USER_DATA,
    ROLE_ADMIN,
    ROLE_LIBRARIAN, ROLE_OPERATOR, ROLE_USER,
    URL_DOWNLOAD_FILE,
    USER_AVATAR_DEFAULT
} from "../../context";
import ModalYesNo from "../ModalYesNo";
import {Link} from "react-router-dom";
import {getLang, getStrings, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

class UserItem extends Component {

    state = {
        roleList: [],
        basket: [],
    };

    componentWillMount(){
        this.loadBasket();
        let roles = new Map(getStrings().role);
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
                res.data.map(role => array.push({key: role.id, text: roles.get(role.authority).text, value: role.authority}));
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

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        let userL10n = strings.userList;
        let user = this.props.user;
        return (
            <Item>
                <Item.Image size='small' src={user.avatarUrl?BACK_END_SERVER_URL+URL_DOWNLOAD_FILE+user.avatarUrl:USER_AVATAR_DEFAULT}/>
                <Item.Content>
                    <Item.Header as='a'>{user.username}</Item.Header><br/>
                    {this.isHasRole(ROLE_ADMIN)?<RoleList roleList={this.state.roleList} user={user} refresh={this.props.refresh}/>:false}
                    <Item.Description>
                        <p>{this.name(user.firstName, user.lastName)}</p>
                        <p>{this.address(user.registrationAddress)}</p>
                    </Item.Description>
                    <Item.Extra>
                        {this.isHasRole(ROLE_OPERATOR)?
                        <Button
                            icon
                            labelPosition='right'
                            floated='right'
                            onClick={this.giveBooksFromBasket}
                            >
                            {userL10n.giveBook}
                            <Icon name='hand paper'/>
                        </Button> : false}
                        {this.isHasRole(ROLE_OPERATOR)?
                        <Button
                            as={Link}
                            to={`/admin/orderList?userId=${user.id}`}
                            icon
                            labelPosition='right'
                            floated='right'>
                            {userL10n.orders}
                            <Icon name='unordered list'/>
                        </Button>: false}
                        {this.isHasRole(ROLE_ADMIN) || this.isHasRole(ROLE_OPERATOR)?
                        <Button
                            as={Link}
                            to={`/admin/user/settings/${user.id}`}
                            icon
                            labelPosition='right'
                            floated='right'>
                            {userL10n.userSettings}
                            <Icon name='setting'/>
                        </Button>: false}
                        {this.isHasRole(ROLE_ADMIN)?
                        <Button
                            icon
                            labelPosition='right'
                            floated='right'
                            onClick={this.ban}
                        >
                            {!user.banned? userL10n.unban: userL10n.ban}
                            <Icon name='remove user'/>
                        </Button>: false}
                        {this.isHasRole(ROLE_ADMIN)?
                        <Button
                            icon
                            labelPosition='right'
                            floated='right'
                            onClick={this.clear}
                        >
                            {userL10n.clear}
                            <Icon name='ban'/>
                        </Button>: false}

                    </Item.Extra>
                </Item.Content>
            </Item>
        );
    };
}

class RoleList extends Component {

    state = {
        roleSearchString: '',
        newAuthority: 'USER',
        roleSearchList: [],
        showModal: false,
    };

    componentWillReceiveProps(nextProps) {
        let roleSearchList = [];

        nextProps.roleList.forEach(role => {
            let flag = true;
            nextProps.user.authorities.forEach(userRole => {if (userRole.authority===role.value) flag=false});
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
            this.props.roleList.forEach(role => {
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
        };
        axios
            .post(BACK_END_SERVER_URL + '/user/role',
                body,
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

    openClose = () => this.setState({showModal: !this.state.showModal});

    render() {
        let user = this.props.user;
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        let roleColor = new Map(strings.role);
        return (
            <React.Fragment>
                {user.authorities.map(role => <Role key={role.id} username={user.username} role={role} refresh={this.props.refresh} />)}
                {this.state.roleSearchList && this.state.roleSearchList.length>0 ? 
                <Dropdown
                    compact
                    onChange={this.handleChangeRole}
                    onSearchChange={this.handleSearchChangeRole}
                    options={this.state.roleSearchList}
                    search
                    searchQuery={this.state.roleSearchString}
                    selection
                    text={strings.userList.role}
                    value={this.state.newAuthority}
                    /> : false}
                <ModalYesNo size='tiny' header={strings.modal.role.header} content={[strings.modal.role.add, roleColor.get(this.state.newAuthority).text]} open={this.state.showModal} openClose={this.openClose} isConfirmed={this.addAuthority} />
            </React.Fragment>
            );
    };
}

class Role extends Component {

    state = {
        showModal: false,
    };

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
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        let roleColor = new Map(strings.role);
        let role = this.props.role;
        return (
            <React.Fragment>
                <ModalYesNo size='tiny' header={strings.modal.role.header} content={[strings.modal.role.remove, roleColor.get(role.authority).text]} open={this.state.showModal} openClose={this.openClose} isConfirmed={this.removeAuthority} />
                <Label as='a' tag color={roleColor.get(role.authority).color}>
                    {roleColor.get(role.authority).text}
                    {role.authority === ROLE_USER ? false : <Icon name='delete' onClick={this.openClose}/>}
                </Label>
            </React.Fragment>
            );
    };
}

export default UserItem;
