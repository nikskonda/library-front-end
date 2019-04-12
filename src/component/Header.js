import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div>
                <NavLink to="/newsList" activeClassName="active">Go to News List</NavLink>
                <NavLink to="/bookList" activeClassName="active">Go to News List</NavLink>

            </div>
        );
    }
}

export default Header;