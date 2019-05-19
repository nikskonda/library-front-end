import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import {Button, Card, Header, Image, Label, Popup} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    BACK_END_SERVER_URL,
    LOCAL_STORAGE_BASKET,
    LOCAL_STORAGE_USER_DATA,
    URL_DOWNLOAD_FILE,
    USER_ROLE_LIBRARIAN
} from "../../context";

class BookCover extends Component {


    state = {
        bookCover: this.props.bookCover,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({bookCover: nextProps.bookCover});
    }

    getAuthor = (author, i, array) => {
        let authorName = !author.firstName ?
            author.lastName :
            (!author.lastName ?
                author.firstName :
                author.firstName + ' ' + author.lastName);
        return (
            <Popup
                className='authorInfo'
                key={author.id}
                trigger={<span className='authorName'>{authorName + (i !== array.length - 1 ? ', ' : '')}</span>}
                hoverable
                on='click'
                hideOnScroll
            >
                <Header as='h4'>{authorName}</Header>
                {author.description !== undefined ? <p>{author.description}</p> : false}
                {author.wikiLink !== undefined ?
                    <Button
                        fluid
                        as='a'
                        href={author.wikiLink}
                    >WIKIPEDIA</Button> : false}

                <Button
                    fluid
                    as={Link}
                    to={`../../../../../catalog?authors=${authorName}`}
                >
                    Find All His Books
                </Button>
            </Popup>
        );
    };

    isLibrarian = () => {
        const user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user) return user.includes(USER_ROLE_LIBRARIAN);
        return false;
    };

    addBookToBasket = () => {
        if (this.state.bookCover.inLibraryUseOnly && !this.isLibrarian()) {
            return;
        }
        const basketStr = localStorage.getItem(LOCAL_STORAGE_BASKET);
        let basket = [];
        if (basketStr) {
            basket = JSON.parse(basketStr);
            let flag = true;
            for (let i = 0; i < basket.length; i++) {
                if (basket[i].book.id === this.state.bookCover.id) {
                    basket[i].count++;
                    flag = false;
                    break;
                }
            }
            if (flag) {
                basket.push({book: this.state.bookCover, count: 1});
            }
        } else {
            basket.push({book: this.state.bookCover, count: 1});
        }
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(basket));
    };

    isInBasket = () => {
        const basketStr = localStorage.getItem(LOCAL_STORAGE_BASKET);
        let basket = [];
        if (basketStr) {
            basket = JSON.parse(basketStr);
            for (let i = 0; i < basket.length; i++) {
                if (basket[i].book.id === this.state.bookCover.id) {
                    return <Card.Description>In Basket: {basket[i].count}</Card.Description>;
                }
            }
        }
        return false;
    };


    render() {
        let bookCover = this.state.bookCover
        return (
            <React.Fragment>
                <Card>
                    <Card.Content>
                        <Link to={'/book/' + bookCover.id}>
                            <Card.Header textAlign='center'>{bookCover.title.toUpperCase()}</Card.Header>
                            <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + bookCover.thumbnailUrl}/>
                        </Link>
                        <Card.Meta>
                            {bookCover.authors !== undefined ? bookCover.authors.map(
                                (author, i, array) => this.getAuthor(author, i, array)) : false}
                            {bookCover.year && bookCover.year !== -1 ? ', ' + bookCover.year : false}
                        </Card.Meta>
                        <Card.Description>
                            {bookCover.ageRestriction ? <p>ageRestriction: {bookCover.ageRestriction}</p> : false}
                        </Card.Description>
                        {this.isInBasket()}
                    </Card.Content>
                    <Card.Content extra className='genres'>
                        {bookCover.genres === undefined ? false : bookCover.genres.map(genre => (
                            <Genre key={genre.id} genre={genre} addGenre={this.props.addGenre}/>))}
                    </Card.Content>

                    {/*{bookCover.rating !== undefined && bookCover.rating !== 0 ?*/}
                    {/*    <Card.Content extra>*/}
                    {/*        <Rating icon='star'*/}
                    {/*                defaultRating={bookCover.rating / 10}*/}
                    {/*                maxRating={10}*/}
                    {/*                disabled*/}
                    {/*        />*/}
                    {/*    </Card.Content>*/}
                    {/*    : false}*/}
                    {bookCover.rating !== undefined && bookCover.rating !== 0 ?
                        <Card.Content extra className='rating'>
                            <StarRatings
                                id='ratingStars'
                                rating={bookCover.rating / 10}
                                starRatedColor='#809955'
                                numberOfStars={10}
                                starDimension='25px'
                                starSpacing='0'
                                name='rating'
                            />
                        </Card.Content>
                        : false}

                    <Card.Content extra>
                        <div className='ui two buttons addToBasket'>
                            {!bookCover.inLibraryUseOnly ?
                                <Button
                                    className='greenButton'
                                    basic
                                    color='green'
                                    onClick={this.addBookToBasket}
                                >To Busket</Button>
                                :
                                <Button
                                    style={{cursor: this.isLibrarian() ? 'pointer' : 'default'}}
                                    className='redButton'
                                    basic
                                    color='red'
                                    onClick={this.addBookToBasket}
                                >inLibraryUseOnly</Button>}
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

    render() {
        let genre = this.props.genre;
        return <Label key={genre.id} basic onClick={this.addGenre}>{genre.name}</Label>;
    }

}

export default BookCover;
