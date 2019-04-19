import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LanguageTumbler from "./LanguageTumbler";
import {NavLink} from "react-router-dom";
import './Header.css'

class Header extends Component {


    render() {
        return (
            <Row className="header-row">
                <Container>
                    <Navbar collapseOnSelect className="top-navbar" expand="lg" bg="dark" variant="dark" >
                        <Nav className="w-75 justify-content-between">
                            <LanguageTumbler/>
                            <Nav.Link>
                                <NavLink to={`signIn`}
                                         style={{
                                             textDecoration: 'none',
                                             color: 'inhabit'
                                         }}
                                         activeClassName="active"
                                >
                                    Sign In
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to={`signUp`}
                                         style={{
                                             textDecoration: 'none',
                                             color: 'inhabit'
                                         }}
                                         activeClassName="active"
                                >
                                    Sign Up
                                </NavLink>
                            </Nav.Link>
                            <NavDropdown title="USERNAME" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    <NavLink to={`profile`}
                                             style={{
                                                 textDecoration: 'none',
                                                 color: 'inhabit'
                                             }}
                                             activeClassName="active"
                                    >
                                        Profile
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={`orders`}
                                             style={{
                                                 textDecoration: 'none',
                                                 color: 'inhabit'
                                             }}
                                             activeClassName="active"
                                    >
                                        Orders
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={`bookmarks`}
                                             style={{
                                                 textDecoration: 'none',
                                                 color: 'inhabit'
                                             }}
                                             activeClassName="active"
                                    >
                                        Bookmark
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item>
                                    <NavLink to={`signOut`}
                                             style={{
                                                 textDecoration: 'none',
                                                 color: 'inhabit'
                                             }}
                                             activeClassName="active"
                                    >
                                        Sign Out
                                    </NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="bottom-navbar justify-content-between">
                        <Navbar.Brand href="/">Library</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link >
                                    <NavLink to={`news`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'inhabit'
                                                    }}
                                                    activeClassName="active"
                                    >
                                        News
                                    </NavLink>
                                </Nav.Link>
                                <Nav.Link>
                                    <NavLink to={`catalog`}
                                                   style={{
                                                       textDecoration: 'none',
                                                       color: 'inhabit'
                                                   }}
                                                   activeClassName="active"
                                    >
                                    Catalog
                                    </NavLink>
                                </Nav.Link>
                                <NavDropdown title="Book" id="collasible-nav-dropdown-book">
                                    <NavDropdown.Item>
                                        <NavLink to={`editBook`}
                                                 style={{
                                                     textDecoration: 'none',
                                                     color: 'inhabit'
                                                 }}
                                                 activeClassName="active"
                                        >
                                            Edit Book
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>

                                    </NavDropdown.Item>
                                    <NavDropdown.Item>

                                    </NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </Row>
        );
    }
}

export default Header;