import React, {Component} from 'react';

import LanguageTumbler from "./LanguageTumbler";
import {Link} from "react-router-dom";
import './Header.css'
import {Container, Menu} from "semantic-ui-react";
import UserIcon from "./UserIcon";

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
                {/*<Container style={{backgroundColor: 'green'}}>*/}
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
                                content={(<Link to='/' >Library</Link>)}
                                onClick={this.handleItemClick}/>
                            <Menu.Item
                                name='news'
                                position='right'
                                active={this.state.activeItem === 'news'}
                                content={(<Link to='/news' >News</Link>)}
                                onClick={this.handleItemClick}/>

                            <Menu.Item
                                name='catalog'
                                active={this.state.activeItem === 'catalog'}
                                content={(<Link to='/catalog'>Catalog</Link>)}
                                onClick={this.handleItemClick}/>

                            <Menu.Item
                                name='news'
                                active={this.state.activeItem === 'news'}
                                content={(<Link to='/news'>News</Link>)}
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
                {/*<Row className="header-row">*/}
                {/*    <Container>*/}
                {/*        <Navbar collapseOnSelect className="top-navbar" expand="lg" bg="dark" variant="dark">*/}
                {/*            <Nav className="w-75 justify-content-between">*/}
                {/*                <LanguageTumbler/>*/}
                {/*                <Nav.Link>*/}
                {/*                    <NavLink to={`signIn`}*/}
                {/*                             style={{*/}
                {/*                                 textDecoration: 'none',*/}
                {/*                                 color: 'inhabit'*/}
                {/*                             }}*/}
                {/*                             activeClassName="active"*/}
                {/*                    >*/}
                {/*                        Sign In*/}
                {/*                    </NavLink>*/}
                {/*                </Nav.Link>*/}
                {/*                <Nav.Link>*/}
                {/*                    <NavLink to={`signUp`}*/}
                {/*                             style={{*/}
                {/*                                 textDecoration: 'none',*/}
                {/*                                 color: 'inhabit'*/}
                {/*                             }}*/}
                {/*                             activeClassName="active"*/}
                {/*                    >*/}
                {/*                        Sign Up*/}
                {/*                    </NavLink>*/}
                {/*                </Nav.Link>*/}
                {/*                <NavDropdown title="USERNAME" id="collasible-nav-dropdown">*/}
                {/*                    <NavDropdown.Item>*/}
                {/*                        <NavLink to={`profile`}*/}
                {/*                                 style={{*/}
                {/*                                     textDecoration: 'none',*/}
                {/*                                     color: 'inhabit'*/}
                {/*                                 }}*/}
                {/*                                 activeClassName="active"*/}
                {/*                        >*/}
                {/*                            Profile*/}
                {/*                        </NavLink>*/}
                {/*                    </NavDropdown.Item>*/}
                {/*                    <NavDropdown.Item>*/}
                {/*                        <NavLink to={`orders`}*/}
                {/*                                 style={{*/}
                {/*                                     textDecoration: 'none',*/}
                {/*                                     color: 'inhabit'*/}
                {/*                                 }}*/}
                {/*                                 activeClassName="active"*/}
                {/*                        >*/}
                {/*                            Orders*/}
                {/*                        </NavLink>*/}
                {/*                    </NavDropdown.Item>*/}
                {/*                    <NavDropdown.Item>*/}
                {/*                        <NavLink to={`bookmarks`}*/}
                {/*                                 style={{*/}
                {/*                                     textDecoration: 'none',*/}
                {/*                                     color: 'inhabit'*/}
                {/*                                 }}*/}
                {/*                                 activeClassName="active"*/}
                {/*                        >*/}
                {/*                            Bookmark*/}
                {/*                        </NavLink>*/}
                {/*                    </NavDropdown.Item>*/}
                {/*                    <NavDropdown.Divider/>*/}
                {/*                    <NavDropdown.Item>*/}
                {/*                        <NavLink to={`signOut`}*/}
                {/*                                 style={{*/}
                {/*                                     textDecoration: 'none',*/}
                {/*                                     color: 'inhabit'*/}
                {/*                                 }}*/}
                {/*                                 activeClassName="active"*/}
                {/*                        >*/}
                {/*                            Sign Out*/}
                {/*                        </NavLink>*/}
                {/*                    </NavDropdown.Item>*/}
                {/*                </NavDropdown>*/}
                {/*            </Nav>*/}
                {/*        </Navbar>*/}
                {/*        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"*/}
                {/*                className="bottom-navbar justify-content-between">*/}
                {/*            <Navbar.Brand href="/">Library</Navbar.Brand>*/}
                {/*            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>*/}
                {/*            <Navbar.Collapse id="responsive-navbar-nav">*/}
                {/*                <Nav className="mr-auto">*/}
                {/*                    <Nav.Link>*/}
                {/*                        <NavLink to={`news`}*/}
                {/*                                 style={{*/}
                {/*                                     textDecoration: 'none',*/}
                {/*                                     color: 'inhabit'*/}
                {/*                                 }}*/}
                {/*                                 activeClassName="active"*/}
                {/*                        >*/}
                {/*                            News*/}
                {/*                        </NavLink>*/}
                {/*                    </Nav.Link>*/}
                {/*                    <Nav.Link>*/}
                {/*                        <NavLink to={`catalog`}*/}
                {/*                                 style={{*/}
                {/*                                     textDecoration: 'none',*/}
                {/*                                     color: 'inhabit'*/}
                {/*                                 }}*/}
                {/*                                 activeClassName="active"*/}
                {/*                        >*/}
                {/*                            Catalog*/}
                {/*                        </NavLink>*/}
                {/*                    </Nav.Link>*/}
                {/*                    <NavDropdown title="Book" id="collasible-nav-dropdown-book">*/}
                {/*                        <NavDropdown.Item>*/}
                {/*                            <NavLink to={`book/edit`}*/}
                {/*                                     style={{*/}
                {/*                                         textDecoration: 'none',*/}
                {/*                                         color: 'inhabit'*/}
                {/*                                     }}*/}
                {/*                                     activeClassName="active"*/}
                {/*                            >*/}
                {/*                                Edit Book*/}
                {/*                            </NavLink>*/}
                {/*                        </NavDropdown.Item>*/}
                {/*                        <NavDropdown.Item>*/}

                {/*                        </NavDropdown.Item>*/}
                {/*                        <NavDropdown.Item>*/}

                {/*                        </NavDropdown.Item>*/}
                {/*                        <NavDropdown.Divider/>*/}
                {/*                    </NavDropdown>*/}
                {/*                </Nav>*/}
                {/*            </Navbar.Collapse>*/}
                {/*        </Navbar>*/}
                {/*    </Container>*/}
                {/*</Row>*/}
            </React.Fragment>
        );
    }
}

export default Header;