import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import StarRatings from 'react-star-ratings';
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class BookCover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookCover: props.bookCover,
            border: ['primary','secondary','success','danger','warning','info','dark','light']
        };
        this.getRandomBorder = this.getRandomBorder.bind(this);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomBorder(){
        return this.state.border[this.getRandomInt(this.state.border.length)];
    }

    getAuthor(author){
        console.log(author);
        let popover =(
            <Popover id="popover-basic" title={author.firstName+' '+author.lastName}>
                <a href='#'>{author.description}</a>
            </Popover>)
        ;

        return (
            <OverlayTrigger ket={author.id} trigger="hover" placement="bottom" overlay={popover}>
                <NavLink to={`book/author/${author.id}`}
                         style={{
                             textDecoration: 'none',
                             color: 'inhabit'
                         }}
                         activeClassName="active"
                         key={author.id}
                >
                    {author.firstName + ' ' + author.lastName + ', '}
                </NavLink>
            </OverlayTrigger>);
    }

    render() {
        return (
            <Card border={this.getRandomBorder()}>
                <NavLink to={`book/${this.state.bookCover.id}`}
                         style={{
                             textDecoration: 'none',
                             color: 'inhabit'
                         }}
                         activeClassName="active"
                >
                    <Card.Header style={{textAlign:'center'}}>{this.state.bookCover.title}</Card.Header>
                    <Card.Img variant="top" src="img/book.jpg"/>
                </NavLink>
                    {/*{this.state.bookCover.author !== null ? this.state.bookCover.author.map(author => <Badge variant="success">{author.firstName+' '+author.lastName}</Badge>) : false}*/}
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        {this.state.bookCover.authors !== undefined ? this.state.bookCover.authors.map(
                            (author, i, list) => this.getAuthor(author)) : false}
                    </ListGroupItem>
                    <ListGroupItem>Year: {this.state.bookCover.year === undefined ? 'unknown.' : this.state.bookCover.year}</ListGroupItem>
                    {this.state.bookCover.ageRestriction !== undefined ?<ListGroupItem>{this.state.bookCover.ageRestriction}</ListGroupItem>: false}
                </ListGroup>
                {this.state.bookCover.price !== undefined ? <Button className="w-100" variant="primary">Buy now {this.state.bookCover.price}$</Button> : false}
                {this.state.bookCover.rating !== undefined && this.state.bookCover.rating !== 0 ? <Card.Footer style={{textAlign: 'center'}}>
                    {/*Rating: {this.state.bookCover.rating}/100*/}
                    <StarRatings
                        rating={this.state.bookCover.rating/10}
                        starRatedColor='red'
                        numberOfStars={10}
                        starDimension='20px'
                        starSpacing='0'
                        name='rating'
                    />
                </Card.Footer> : false }
            </Card>
        );
    }
}

export default BookCover;