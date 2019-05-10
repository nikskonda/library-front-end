import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import {Button, Card, Header, Image, Label, Popup, Rating} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_BASKET, URL_DOWNLOAD_FILE} from "../../context";

class BookCover extends Component {


    state = {
        bookCover: this.props.bookCover,
    };

    getAuthor = (author, i, array) => {
        return (
            <Popup
                key={author.id}
                trigger={<span
                    className='user'>{author.firstName + ' ' + author.lastName + (i !== array.length - 1 ? ', ' : '')}</span>}
                hoverable
                on='click'
                hideOnScroll
            >
                <Header as='h4'>{author.firstName + ' ' + author.lastName}</Header>
                {author.description !== undefined ? <p>{author.description}</p> : false}
                {author.wikiLink !== undefined ?
                    <a href={author.wikiLink}><Button fluid>WIKIPEDIA</Button></a> : false}
                <a href={'author/' + author.id}><Button fluid>Find All His Books</Button></a>
            </Popup>
        );
    };

    addBookToBasket = () =>{
        const basketStr = localStorage.getItem(LOCAL_STORAGE_BASKET);
        let basket = [];
        if (basketStr){
            basket = JSON.parse(basketStr);
            let flag = true;
            for (let i=0; i<basket.length; i++){
                if (basket[i].book.id===this.state.bookCover.id){
                    basket[i].count++;
                    flag = false;
                    break;
                }
            }
            if (flag){
                basket.push({book: this.state.bookCover, count: 1});
            }
        } else {
            basket.push({book: this.state.bookCover, count: 1});
        }
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(basket));
    };

    isInBasket = () =>{
        const basketStr = localStorage.getItem(LOCAL_STORAGE_BASKET);
        let basket = [];
        if (basketStr){
            basket = JSON.parse(basketStr);
            for (let i=0; i<basket.length; i++){
                if (basket[i].book.id===this.state.bookCover.id){
                    return <Card.Description>In Basket: {basket[i].count}</Card.Description>;
                }
            }
        }
        return false;
    };



    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Content>
                        <Link to={'/book/' + this.state.bookCover.id}>
                            <Card.Header textAlign='center'>{this.state.bookCover.title}</Card.Header>
                            <Image src={BACK_END_SERVER_URL+URL_DOWNLOAD_FILE+this.state.bookCover.thumbnailUrl}/>
                        </Link>
                        <Card.Meta>
                            {this.state.bookCover.authors !== undefined ? this.state.bookCover.authors.map(
                                (author, i, array) => this.getAuthor(author, i, array)) : false}

                        </Card.Meta>
                        <Card.Description>Year
                            is {this.state.bookCover.year || this.state.bookCover.year === -1 ? 'unknown.' : this.state.bookCover.year}</Card.Description>
                        {this.state.bookCover.genres === undefined ? false : this.state.bookCover.genres.map(genre => (<Genre key={genre.id} genre={genre} addGenre={this.props.addGenre} />))}
                        {this.isInBasket()}
                    </Card.Content>

                    {this.state.bookCover.rating !== undefined && this.state.bookCover.rating !== 0 ?
                        <Card.Content extra>
                            <Rating icon='star'
                                    defaultRating={this.state.bookCover.rating / 10}
                                    maxRating={10}
                                    disabled
                            />
                        </Card.Content>
                        : false}


                    {this.state.bookCover.rating !== undefined && this.state.bookCover.rating !== 0 ?
                        <Card.Content extra>
                            <StarRatings
                                rating={this.state.bookCover.rating / 10}
                                starRatedColor='#ffe623'
                                numberOfStars={10}
                                starDimension='17px'
                                starSpacing='0'
                                name='rating'
                            />
                        </Card.Content>
                        : false}

                    <Card.Content extra>
                        <div className='ui two buttons'>
                            {this.state.bookCover.price !== undefined ?
                                <Button
                                    basic
                                    color='green'
                                    onClick={this.addBookToBasket}
                                >Buy now {this.state.bookCover.price}$</Button> : false}
                            {this.state.bookCover.ageRestriction !== undefined ?
                                <Button basic color='red'>{this.state.bookCover.ageRestriction}</Button> : false}
                        </div>
                    </Card.Content>
                </Card>
            </React.Fragment>

        );
    }
}

class Genre extends Component {

    addGenre = () => {
        this.props.addGenre(this.props.genre.name);
    };

    render(){
        let genre=this.props.genre;
        return  <Label key={genre.id} basic onClick={this.addGenre}>{genre.name}</Label>;
    }

}

export default BookCover;