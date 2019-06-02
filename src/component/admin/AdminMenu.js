import React, {Component} from 'react';
import {Container, Menu, Segment} from "semantic-ui-react";
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import UserList from "./UserList";
import queryString from "query-string";
import AdminOrders from "./AdminOrders";
import UserSettings from "../UserSettings";
import "./AdminMenu.css";
import AdminHome from './AdminHome';
import NewsEdit from '../news/NewsEdit';
import BookEditPage from '../book/BookEditPage';
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';
import {
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_UI_LANGUAGE,
    LOCAL_STORAGE_USER_DATA,
    ROLE_ADMIN,
    ROLE_COURIER,
    ROLE_JOURNALIST,
    ROLE_LIBRARIAN,
    ROLE_OPERATOR
} from "../../context";


const HOME = 'home';
const USER_LIST = 'userList';
const ORDER_LIST = 'orderList';
const USER_SETTING = 'userSettings';
const BOOK_EDIT = 'bookEdit';
const NEWS_EDIT = 'newsEdit';

const LINKS = new Map([
    [HOME, {
        name: 'home',
        url: '/admin',
        value: 'Home',
    }],
    [USER_LIST, {
        name: 'userList',
        url: '/admin/userList',
        value: 'UserList',
    }],
    [ORDER_LIST, {
        name: 'orderList',
        url: '/admin/orderList',
        value: 'OrderList',
    }],
    [USER_SETTING, {
        name: 'userSettings',
        url: '/admin/user/settings',
        value: 'UserSettings',
    }],
    [BOOK_EDIT, {
        name: 'bookEdit',
        url: '/admin/edit/book',
        value: 'BookEdit',
    }],
    [NEWS_EDIT, {
        name: 'newsEdit',
        url: '/admin/edit/news',
        value: 'NewsEdit',
    }],
]);

class AdminMenu extends Component {

    state = {
        activeItem: 'home'
    };

    componentWillMount(){
        let url = this.props.location.pathname;
        console.log(url);
        Array.from(LINKS.values()).forEach(value => {
            if (value.name!==HOME && url.includes(value.url))
                this.setState({activeItem: value.name});
        });
    }

    changeUrl = (params) => {
        this.props.history.push({search: queryString.stringify(params)});
    };

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name},);
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
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        let adminMenu = strings.adminMenu;
        let menu = new Map(LINKS);
        return (
            <Container id='adminMenu'>
                <Menu attached='top' tabular>
                    <Menu.Item
                        as={Link}
                        to={menu.get(HOME).url}
                        name={menu.get(HOME).name}
                        active={this.state.activeItem === menu.get(HOME).name}
                        onClick={this.handleItemClick}>
                            {adminMenu.home}
                    </Menu.Item>
                    { this.isHasRole(ROLE_ADMIN) || this.isHasRole(ROLE_OPERATOR) ?
                    <Menu.Item
                        as={Link}
                        to={menu.get(USER_LIST).url}
                        name={menu.get(USER_LIST).name}
                        active={this.state.activeItem ===  menu.get(USER_LIST).name}
                        onClick={this.handleItemClick}>
                            {adminMenu.userList}
                    </Menu.Item> : false}
                    {this.state.activeItem === menu.get(USER_SETTING).name?
                        <Menu.Item
                            name={menu.get(USER_SETTING).name}
                            active={this.state.activeItem === menu.get(USER_SETTING).name}
                            onClick={this.handleItemClick}>
                            {adminMenu.userSettings}
                        </Menu.Item>
                    : false }
                    { this.isHasRole(ROLE_COURIER) || this.isHasRole(ROLE_OPERATOR) ?
                    <Menu.Item
                        as={Link}
                        to={menu.get(ORDER_LIST).url}
                        name={menu.get(ORDER_LIST).name}
                        active={this.state.activeItem ===  menu.get(ORDER_LIST).name}
                        onClick={this.handleItemClick}>
                            {adminMenu.orderList}
                    </Menu.Item> : false}
                    { this.isHasRole(ROLE_LIBRARIAN)?
                    <Menu.Item
                        as={Link}
                        to={menu.get(BOOK_EDIT).url}
                        name={menu.get(BOOK_EDIT).name}
                        active={this.state.activeItem ===  menu.get(BOOK_EDIT).name}
                        onClick={this.handleItemClick}>
                            {adminMenu.bookEdit}
                    </Menu.Item> : false}
                    { this.isHasRole(ROLE_JOURNALIST)?
                    <Menu.Item
                        as={Link}
                        to={menu.get(NEWS_EDIT).url}
                        name={menu.get(NEWS_EDIT).name}
                        active={this.state.activeItem === menu.get(NEWS_EDIT).name}
                        onClick={this.handleItemClick}>
                            {adminMenu.newsEDit}
                    </Menu.Item> : false}
                </Menu>
                <Segment attached='bottom'>
                    <Switch>
                        <Route exact path='/admin' component={AdminHome}/>
                        <Route path='/admin/userList' render={() => <UserList changeUrl={this.changeUrl} queryString={this.props.location.search}/>}/>
                        <Route path='/admin/orderList' render={() => <AdminOrders changeUrl={this.changeUrl} queryString={this.props.location.search}/>}/>
                        <Route path='/admin/user/settings/:userId' render={() => <UserSettings userId={this.props.match.params.userId}/>}/>
                        <Route path='/admin/edit/news/:newsId' component={NewsEdit}/>
                        <Route path='/admin/edit/news' component={NewsEdit}/>
                        <Route path='/admin/edit/book/:bookId' component={BookEditPage}/>
                        <Route path='/admin/edit/book' component={BookEditPage}/>
                        
                        
                    </Switch>
                </Segment>

            </Container>
        );
    };
}

export default AdminMenu;
