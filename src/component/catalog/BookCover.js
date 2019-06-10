import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import {Button, Card, Header, Image, Label, Popup} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    isHasRole,
    LOCAL_STORAGE_BASKET,
    LOCAL_STORAGE_UI_LANGUAGE,
    ROLE_OPERATOR,
    URL_DOWNLOAD_FILE
} from "../../context";
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

class BookCover extends Component {


    state = {
        bookCover: this.props.bookCover,
        countInBasket: 0,
    };

    componentWillMount() {
        const basketStr = localStorage.getItem(LOCAL_STORAGE_BASKET);
        let basket = [];
        if (basketStr) {
            basket = JSON.parse(basketStr);
            let flag = true;
            for (let i = 0; i < basket.length; i++) {
                if (basket[i].book.id === this.state.bookCover.id) {
                    this.setState({countInBasket: basket[i].count});
                    flag = false;
                    break;
                }
            }
            if (flag) {
                this.setState({countInBasket: 0});
            }
        } else {
            this.setState({countInBasket: 0});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({bookCover: nextProps.bookCover});
    }

    getAuthor = (author, i, array, book) => {
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
                    >{book.wiki}</Button> : false}

                <Button
                    fluid
                    as={Link}
                    to={`/catalog?authors=${authorName}`}
                >
                    {book.findByAuthor}
                </Button>
            </Popup>
        );
    };

    addBookToBasket = () => {
        if (this.state.bookCover.inLibraryUseOnly && !isHasRole(ROLE_OPERATOR)) {
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
                    this.setState({countInBasket: basket[i].count});
                    flag = false;
                    break;
                }
            }
            if (flag) {
                basket.push({book: this.state.bookCover, count: 1});
                this.setState({countInBasket: 1});
            }
        } else {
            basket.push({book: this.state.bookCover, count: 1});
            this.setState({countInBasket: 1});
        }
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(basket));
    };


    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        let bookCover = this.state.bookCover;
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
                                (author, i, array) => this.getAuthor(author, i, array, strings.book)) : false}
                            {bookCover.year && bookCover.year !== -1 ? ', ' + bookCover.year : false}
                        </Card.Meta>
                        <Card.Description>
                            {bookCover.ageRestriction ?
                                <p>{strings.book.ageRestriction}: {bookCover.ageRestriction}</p> : false}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra className='genres'>
                        {bookCover.genres === undefined ? false : bookCover.genres.map(genre => (
                            <Genre key={genre.id} genre={genre} addGenre={this.props.addGenre}/>))}
                    </Card.Content>
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
                                <Popup
                                    trigger={
                                        <Button
                                            className='greenButton'
                                            basic
                                            color='green'
                                            onClick={this.addBookToBasket}
                                        >{strings.book.toBusket}</Button>
                                    }
                                    content={strings.book.addedToBasket + this.state.countInBasket}
                                    on='hover'
                                    hideOnScroll
                                /> :
                                (isHasRole(ROLE_OPERATOR) ?
                                        <Popup
                                            trigger={
                                                <Button
                                                    style={{cursor: 'pointer'}}
                                                    className='redButton'
                                                    basic
                                                    color='red'
                                                    onClick={this.addBookToBasket}
                                                >
                                                    {strings.book.inLibraryUseOnly}
                                                </Button>

                                            }
                                            content={strings.book.addedToBasket + this.state.countInBasket}
                                            on='hover'
                                            hideOnScroll
                                        />
                                        :
                                        <Button
                                            style={{cursor: 'default'}}
                                            className='redButton'
                                            basic
                                            color='red'
                                        >
                                            {strings.book.inLibraryUseOnly}
                                        </Button>
                                )
                            }
                        </div>
                    </Card.Content>
                </Card>
            </React.Fragment>

        );
    }
}

class Genre extends Component {

    addGenre = () => {
        this.props.addGenre([this.props.genre.name]);
    };

    render() {
        let genre = this.props.genre;
        return <Label key={genre.id} basic onClick={this.addGenre}>{genre.name}</Label>;
    }

}

export default BookCover;
