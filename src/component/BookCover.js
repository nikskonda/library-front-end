import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class BookCover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookCover : props.bookCover
        }
    }


    render() {
        return (
            <div className="card">
                <NavLink to={`book/${this.state.bookCover.id}`}
                         style={{
                             textDecoration: 'none',
                             color: 'inhabit'
                         }}
                         activeClassName="active"
                >
                    <div className="card-body">
                        <p className="card-text">{this.state.bookCover.id}</p>
                        <p className="card-text">{this.state.bookCover.title}</p>
                        {/*<p className="card-text">{this.state.bookCover.}</p>*/}
                    </div>
                </NavLink>
            </div>
        );
    }
}

export default BookCover;