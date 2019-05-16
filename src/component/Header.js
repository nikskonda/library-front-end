import React, {Component} from 'react';

import LanguageTumbler from "./LanguageTumbler";
import {Link} from "react-router-dom";
import './Header.css'
import {Container, Label, Menu} from "semantic-ui-react";
import UserIcon from "./UserIcon";
import {LOCAL_STORAGE_BASKET} from "../context";

const HOME = 'home';
const NEWS = 'news';
const CATALOG = 'catalog';
const BASKET = 'basket';
const ADMIN = 'admin';

const links = new Map([
    [HOME, {
        name: 'home',
        url: '/',
        value: 'Home',
    }],
    [NEWS, {
        name: 'news',
        url: '/news',
        value: 'News',
    }],
    [CATALOG, {
        name: 'catalog',
        url: '/catalog',
        value: 'Catalog',
    }],
    [BASKET, {
        name: 'basket',
        url: '/basket',
        value: 'Basket',
    }],
    [ADMIN, {
        name: 'admin',
        url: '/admin',
        value: 'Admin',
    }],
]);

class Header extends Component {

    state = {
        activeItem: 'home',
        url: '/',
        countInBasket: 0,
    };

    componentWillMount(){
        let url = window.location.pathname;
        Array.from(links.values()).map(value => {
                if (value.name!==HOME && url.includes(value.url))
                    this.setState({activeItem: value.name});
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({url:nextProps.url});
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
    };

    cheackBasket = () => {
        if (localStorage.getItem(LOCAL_STORAGE_BASKET)){
            this.setState({countInBasket:JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET)).length });
        } else {
            this.setState({countInBasket: 0});
        }
    }

    render() {
        console.log();
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
                                name={links.get(HOME).name}
                                active={this.state.activeItem === links.get(HOME).name}
                                as={Link}
                                to={links.get(HOME).url}
                                onClick={this.handleItemClick}>
                                {links.get(HOME).value}
                            </Menu.Item>
                            <Menu.Item
                                name={links.get(NEWS).name}
                                active={this.state.activeItem === links.get(NEWS).name}
                                as={Link}
                                to={links.get(NEWS).url}
                                onClick={this.handleItemClick}>
                                {links.get(NEWS).value}
                            </Menu.Item>
                            <Menu.Item
                                name={links.get(CATALOG).name}
                                active={this.state.activeItem === links.get(CATALOG).name}
                                as={Link}
                                to={links.get(CATALOG).url}
                                onClick={this.handleItemClick}>
                                {links.get(CATALOG).value}
                            </Menu.Item>
                            <Menu.Item
                                name={links.get(BASKET).name}
                                active={this.state.activeItem === links.get(BASKET).name}
                                as={Link}
                                to={links.get(BASKET).url}
                                onClick={this.handleItemClick}>
                                {links.get(BASKET).value}
                                {this.state.countInBasket>0 ?
                                    <Label color='green' floating>
                                        {this.state.countInBasket}
                                    </Label>
                                :false}
                            </Menu.Item>
                            <Menu.Item
                                name={links.get(ADMIN).name}
                                active={this.state.activeItem === links.get(ADMIN).name}
                                as={Link}
                                to={links.get(ADMIN).url}
                                onClick={this.handleItemClick}>
                                {links.get(ADMIN).value}
                            </Menu.Item>
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
