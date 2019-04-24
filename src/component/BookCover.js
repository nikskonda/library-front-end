import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import {Button, Card, Grid, Header, Icon, Image, Popup, Rating} from "semantic-ui-react";

class BookCover extends Component {


    state = {
        bookCover: this.props.bookCover,
    };

    getAuthor = (author, i, array) => {
        return (
            <Popup
                trigger={<span className='user'>{author.firstName + ' ' + author.lastName + (i !== array.length - 1 ? ', ' : '')}</span>}
                   hoverable
                   on='click'
                   hideOnScroll
            >
                <Header as='h4'>{author.firstName + ' ' + author.lastName}</Header>
                {author.description !== undefined ? <p>{author.description}</p> : false}
                {author.wikiLink !== undefined ?
                    <a href={author.wikiLink}><Button fluid>WIKIPEDIA</Button></a> : false}
                <a href={'author/'+author.id}><Button fluid>Find All His Books</Button></a>
            </Popup>
        );
    };

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Content>
                        <Card.Header textAlign='center'>{this.state.bookCover.title}</Card.Header>
                        <Image src='/img/book.jpg'/>
                        <Card.Meta>
                            {this.state.bookCover.authors !== undefined ? this.state.bookCover.authors.map(
                                (author, i, array) => this.getAuthor(author, i, array)) : false}

                        </Card.Meta>
                        <Card.Description>Year is {this.state.bookCover.year === undefined ? 'unknown.' : this.state.bookCover.year}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {this.state.bookCover.rating !== undefined && this.state.bookCover.rating !== 0 ?

                            <Rating icon='star'
                                    defaultRating={3}
                                    maxRating={10}
                                    rating={this.state.bookCover.rating / 10}
                            />
                            : false}

                    </Card.Content>
                    <Card.Content extra>
                        {this.state.bookCover.rating !== undefined && this.state.bookCover.rating !== 0 ?
                            <StarRatings
                                rating={this.state.bookCover.rating / 10}
                                starRatedColor='#ffe623'
                                numberOfStars={10}
                                starDimension='17px'
                                starSpacing='0'
                                name='rating'
                            />
                            : false}
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            {this.state.bookCover.price !== undefined ?
                                <Button basic color='green'>Buy now {this.state.bookCover.price}$</Button> : false}
                            {this.state.bookCover.ageRestriction !== undefined ?
                                <Button basic color='red'>{this.state.bookCover.ageRestriction}</Button> : false}
                        </div>
                    </Card.Content>
                </Card>
            </React.Fragment>

        );
    }
}

export default BookCover;