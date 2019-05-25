import React, {Component} from 'react';
import axios from "axios/index";
import {
    LOCAL_STORAGE_UI_LANGUAGE,
    BACK_END_SERVER_URL,
    LOCAL_STORAGE_BASKET,
    LOCAL_STORAGE_USER_DATA,
    URL_DOWNLOAD_FILE,
    ROLE_LIBRARIAN
} from "../../context";
import {Button, Container, Header, Image, Message, Popup, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            book: null
        };
        this.getBody = this.getBody.bind(this);
    }

    componentWillMount() {
        axios
            .get(BACK_END_SERVER_URL + `/book/${this.state.id}`)
            .then(res => {
                this.setState({book: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
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
                trigger={<span
                    className='user'>{authorName + (i !== array.length - 1 ? ', ' : '')}</span>}
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

    isLibrarian = () => {
        const user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user) return user.includes(ROLE_LIBRARIAN);
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
                if (basket[i].book.id === this.state.book.id) {
                    basket[i].count++;
                    flag = false;
                    break;
                }
            }
            if (flag) {
                basket.push({book: this.state.book, count: 1});
            }
        } else {
            basket.push({book: this.state.book, count: 1});
        }
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(basket));
        this.setState({isBasketSuccess: true});
    };

    getDesc = () => {
        let description = this.state.book.description.split(/\n/g);
        return description.map((p, i) => <p key={i}>{p}</p>);
    };
    

    getBody(book) {
        return (
            <div id='book'>
                <div className='firstPart'>
                    <div className='imgAndRating'>
                        <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.book.pictureUrl}
                               size='medium'/>
                        {this.state.book.rating !== undefined && this.state.book.rating !== 0 ?
                            <div className='rating'>
                                <StarRatings
                                    id='ratingStars'
                                    rating={this.state.book.rating / 10}
                                    starRatedColor='#809955'
                                    numberOfStars={10}
                                    starDimension='25px'
                                    starSpacing='0'
                                    name='rating'
                                />
                            </div>
                            : false}
                    </div>
                    <div>
                        <Header
                            as='h1'>{this.state.book.title.toUpperCase() + (this.state.book.year && this.state.book.year !== -1 ? ', ' + this.state.book.year : '')}</Header>
                        <div className='buttonGroup'>
                            <Button
                                className={this.state.book.inLibraryUseOnly ? 'redButton' : 'greenButton'}
                                style={{cursor: this.isLibrarian() ? 'pointer' : 'default'}}
                                onClick={this.addBookToBasket}>
                                {this.state.book.inLibraryUseOnly ? book.inLibraryUseOnly : book.toBusket}
                            </Button>
                            {this.isLibrarian() ?
                                <React.Fragment>
                                    <Button
                                        as={Link}
                                        to={`/admin/orderList?bookId=${this.state.book.id}`}>
                                        {book.findInOrders}
                                    </Button>
                                    <Button
                                        as={Link}
                                        to={`/admin/edit/book/${this.state.book.id}`}>
                                        {book.edit}
                                    </Button>
                                </React.Fragment> : false}
                            {this.state.book.pdfUrl ?
                                <Button
                                    as={Link}
                                    to={`/book/${this.state.book.id}/read/pdf`}>
                                    {book.readPdf}
                                </Button>
                                : false}
                            {this.state.book.ePubUrl ?
                                <Button
                                    as={Link}
                                    to={`/book/${this.state.book.id}/read/epub`}>
                                    {book.readEpub}
                                </Button>
                                : false}
                        </div>

                        {this.getDesc()}
                    </div>


                </div>
                <div>
                    <Table
                        striped
                        size="small">
                        <Table.Body>

                            {this.state.book.genres !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.genres}</Table.Cell>
                                    <Table.Cell>{this.state.book.genres.map((genre, i, list) => genre.name + (list.length - 1 !== i ? ', ' : ' '))}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }

                            {this.state.book.authors !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.authors}</Table.Cell>
                                    <Table.Cell>{this.state.book.authors ? this.state.book.authors.map((author, i, array) => this.getAuthor(author, i, array, book)) : false}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.translators !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.translators}</Table.Cell>
                                    <Table.Cell>{this.state.book.translators ? this.state.book.translators.map((translator, i, array) => this.getAuthor(translator, i, array, book)) : false}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.size !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.size}</Table.Cell>
                                    <Table.Cell>{this.state.book.size}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.type !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.type}</Table.Cell>
                                    <Table.Cell>{this.state.book.type}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.ageRestriction ?
                                <Table.Row>
                                    <Table.Cell>{book.ageRestriction}</Table.Cell>
                                    <Table.Cell>{this.state.book.ageRestriction}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.rating ?
                                <Table.Row>
                                    <Table.Cell>{book.rating}</Table.Cell>
                                    <Table.Cell>{this.state.book.rating}/100</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.year ?
                                <Table.Row>
                                    <Table.Cell>{book.year}</Table.Cell>
                                    <Table.Cell>{this.state.book.year === -1 ? ' unknown' : this.state.book.year}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
            
                            {this.state.book.weight !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.weight}</Table.Cell>
                                    <Table.Cell>{this.state.book.weight}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.pages !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.pages}</Table.Cell>
                                    <Table.Cell>{this.state.book.pages}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.isbn !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.isbn}</Table.Cell>
                                    <Table.Cell>{this.state.book.isbn}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.publishingHouse !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.publishingHouse}</Table.Cell>
                                    <Table.Cell>{this.state.book.publishingHouse.title}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.producer !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.producer}</Table.Cell>
                                    <Table.Cell>{this.state.book.producer.title}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.importer !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.importer}</Table.Cell>
                                    <Table.Cell>{this.state.book.importer.title}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        );
    }


    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, ''));
        
        const notFount =
            (<Message
                warning
                header='Book Not found'
                content='Plz change search query!'
            />);
        const inBasket =
            (<Message
                success
                header='Book In Basket'
                content='Plz change search query!'
            />);
        return (
            <Container>
                {this.state.isBasketSuccess ? inBasket : false}
                {this.state.book === null ? notFount : this.getBody(strings.book)}
            </Container>
        );
    }
}

export default Book;
