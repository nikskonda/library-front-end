import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

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
                        <Image src="img/book.jpg" rounded />
                        <p className="card-text">{this.state.bookCover.title}</p>
                        {this.state.bookCover.author !== null ? this.state.bookCover.author.map(author => <Badge variant="success">{author.firstName+' '+author.lastName}</Badge>) : false}
                        {/*<p className="card-text">{this.state.bookCover.}</p>*/}
                        <Row className="justify-content-between">
                            <span>
                                Year: {this.state.bookCover.year}
                            </span>
                            <span>
                                Rating: {this.state.bookCover.rating}/100
                            </span>
                        </Row>

                        <Row className="justify-content-between">
                            <span>
                                {this.state.bookCover.price}$
                            </span>
                            <span>
                                <h1>{this.state.bookCover.ageRestriction}</h1>
                            </span>
                        </Row>
                    </div>
                </NavLink>
            </div>
        );
    }
}

export default BookCover;