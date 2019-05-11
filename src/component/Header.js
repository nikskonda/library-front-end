import React, {Component} from 'react';

import LanguageTumbler from "./LanguageTumbler";
import {Link} from "react-router-dom";
import './Header.css'
import {Container, Label, Menu} from "semantic-ui-react";
import UserIcon from "./UserIcon";
import {LOCAL_STORAGE_BASKET} from "../context";

class Header extends Component {

    state = {
        activeItem: 'home',
    };


    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
    };


    render() {
        return (
            <React.Fragment>
                <Container>
                    <Menu secondary>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <LanguageTumbler/>
                            </Menu.Item>
                            <Menu.Item>
                                <UserIcon/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <Menu secondary>
                        <Menu.Menu>
                            <Menu.Item
                                name='home'
                                active={this.state.activeItem === 'home'}
                                as={Link}
                                to='/'
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='news'
                                position='right'
                                active={this.state.activeItem === 'userList'}
                                as={Link}
                                to='/news'
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='catalog'
                                active={this.state.activeItem === 'catalog'}
                                as={Link}
                                to='/catalog'
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='basket'
                                active={this.state.activeItem === 'basket'}
                                as={Link}
                                to='/basket'
                                onClick={this.handleItemClick}>
                                Basket
                                {localStorage.getItem(LOCAL_STORAGE_BASKET) && JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET)).length>0?
                                <Label color='red' floating>
                                    {JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET)).length}
                                </Label>
                                    :false}
                            </Menu.Item>
                            <Menu.Item
                                name='admin'
                                active={this.state.activeItem === 'admin'}
                                as={Link}
                                to='/admin'
                                onClick={this.handleItemClick}/>
                        </Menu.Menu>


                        {/*<Menu.Item*/}
                        {/*    name='friends'*/}
                        {/*    active={activeItem === 'friends'}*/}
                        {/*    onClick={this.handleItemClick}*/}
                        {/*/>*/}
                        {/*<Menu.Menu position='right'>*/}
                        {/*    <Menu.Item>*/}
                        {/*        <Input icon='search' placeholder='Search...'/>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item*/}
                        {/*        name='logout'*/}
                        {/*        active={activeItem === 'logout'}*/}
                        {/*        onClick={this.handleItemClick}*/}
                        {/*    />*/}
                        {/*</Menu.Menu>*/}
                    </Menu>
                </Container>
            </React.Fragment>
        );
    }
}

export default Header;