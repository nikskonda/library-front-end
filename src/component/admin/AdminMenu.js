import React, {Component} from 'react';
import {Container, Input, Menu, Segment} from "semantic-ui-react";
import {Route, Switch} from "react-router";
import {Link} from "react-router-dom";
import UserList from "./UserList";
import queryString from "query-string";
import OrderListPage from "../order/OrderListPage";
import AdminOrders from "./AdminOrders";
import UserSettings from "../UserSettings";

class AdminMenu extends Component {

    state = {
        activeItem: 'home'
    };

    changeUrl = (params) => {
        this.props.history.push({search: queryString.stringify(params)});
    };

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name},);
    };

    UserListComponent = () => <UserList changeUrl={this.changeUrl} queryString={this.props.location.search}/>;

    OrderListComponent = () => <AdminOrders changeUrl={this.changeUrl} queryString={this.props.location.search}/>;

    Home = () => <h1>Welcome to admin panel</h1>;

    UserSettings = () => <UserSettings userId={this.props.match.params.userId}/>;

    render() {
        return (
            <Container>
                <Menu attached='top' tabular>
                    <Menu.Item
                        as={Link}
                        to='../../../../admin/'
                        name='home'
                        active={this.state.activeItem === 'home'}
                        onClick={this.handleItemClick}/>
                    <Menu.Item
                        as={Link}
                        to='../admin/userList'
                        name='userList'
                        active={this.state.activeItem === 'userList'}
                        onClick={this.handleItemClick}/>
                    <Menu.Item
                        as={Link}
                        to='../admin/orderList'
                        name='orders'
                        active={this.state.activeItem === 'orders'}
                        onClick={this.handleItemClick}
                    />
                    {this.state.activeItem === 'userSettings'?
                        <Menu.Item
                            name='userSettings'
                            active={this.state.activeItem === 'userSettings'}
                            onClick={this.handleItemClick}
                        />
                    : false }
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input
                                transparent
                                icon={{name: 'search', link: true}}
                                placeholder='Search users...'
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached='bottom'>
                    <Switch>
                        <Route exact path='/admin' component={this.Home}/>
                        <Route path='/admin/userList' component={this.UserListComponent}/>
                        <Route path='/admin/orderList' component={this.OrderListComponent}/>
                        <Route path='/admin/user/settings/:userId' component={UserSettings}/>
                    </Switch>
                </Segment>

            </Container>
        );
    };
}

export default AdminMenu;
