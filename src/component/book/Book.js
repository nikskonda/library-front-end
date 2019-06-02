import React, {Component} from 'react';
import axios from "axios/index";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_BASKET, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE,
    LOCAL_STORAGE_USER_DATA, ROLE_LIBRARIAN,
    ROLE_OPERATOR,
    URL_DOWNLOAD_FILE
} from "../../context";
import {Button, Container, Header, Image, Message, Popup, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";
import {getLang, getStrings, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';
import ModalYesNo from "../ModalYesNo";
import {string} from "prop-types";

class Book extends Component {

    state = {
        id: this.props.id,
        book: null,
        showModalRemove: false,
    };

    componentWillMount() {
        axios
            .get(BACK_END_SERVER_URL + `/book/${this.state.id}`,
                {
                    headers:
                        {'Accept-Language': getLang()}
                })
            .then(res => {
                this.setState({book: res.data});
            })
            .catch(({response}) => {
                if (response) this.setState({errorText: response.data.message});
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
        if (this.state.book.description){
            let description = this.state.book.description.split(/\n/g);
            return description.map((p, i) => <p key={i}>{p}</p>);
        }
        return false;
    };

    isHasRole = (role) => {
        let user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user) {
            let roles = JSON.parse(user).authorities;
            if (roles && roles.includes(role)) {
                return true;
            }
        }
        return false;
    };

    removeBook = () => {
        axios
            .delete(BACK_END_SERVER_URL + `/book/${this.state.id}`, {
                headers: {
                    'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                    'Accept-Language': getLang()
                }
            })
            .then(res => {
                this.setState({wasRemoved: true});
            })
            .catch(({response}) => {
                this.setState({removeErrorText: response.data.message});
            });
    };

    openClose = () => this.setState({showModalRemove: !this.state.showModalRemove});

    getBody(book) {
        console.log(this.state.book);
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
                                style={{cursor: this.isHasRole(ROLE_OPERATOR) ? 'pointer' : 'default'}}
                                onClick={this.addBookToBasket}>
                                {this.state.book.inLibraryUseOnly ? book.inLibraryUseOnly : book.toBusket}
                            </Button>
                            {this.isHasRole(ROLE_OPERATOR) ?
                                <Button
                                    as={Link}
                                    to={`/admin/orderList?bookId=${this.state.book.id}`}>
                                    {book.findInOrders}
                                </Button> : false}
                            {this.isHasRole(ROLE_LIBRARIAN) ?
                                <React.Fragment>
                                    <Button
                                        as={Link}
                                        to={`/admin/edit/book/${this.state.book.id}`}>
                                        {book.edit}
                                    </Button>
                                    <Button
                                        onClick={this.openClose}>
                                        {book.remove}
                                    </Button>
                                    <ModalYesNo
                                        size='tiny'
                                        header='header'
                                        content={['content']}
                                        open={this.state.showModalRemove}
                                        openClose={this.openClose}
                                        isConfirmed={this.removeBook}/>
                                </React.Fragment>
                                : false}
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
                                    <Table.Cell>{(new Map(getStrings().bookType)).get(this.state.book.type).name}</Table.Cell>
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
                                    <Table.Cell>{this.state.book.year === -1 ? book.unknown : this.state.book.year}</Table.Cell>
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
                            {this.state.book.pdfUrl !== undefined ?
                                <Table.Row>
                                    <Table.Cell>{book.pdf}</Table.Cell>
                                    <Table.Cell><a
                                        href={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.book.pdfUrl}>{book.pdfDownload}</a></Table.Cell>
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
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        const notFount =
            (<Message
                warning
                header={strings.error.book.notFound}
                content={this.state.errorText ? this.state.errorText : null}
            />);
        const inBasket =
            (<Message
                success
                header={strings.success.success}
                content={strings.success.inBasket}
            />);
        const removed =
            (<Message
                success
                header={strings.success.success}
                content={strings.success.wasRemovedBook}
            />);
        const removeError =
            (<Message
                warning
                header={strings.error.error}
                content={this.state.removeErrorText ? this.state.removeErrorText : null}
            />);
        return (
            <Container>
                {this.state.wasRemoved ? removed : false}
                {this.state.isBasketSuccess ? inBasket : false}
                {this.state.removeErrorText ? removeError : false}
                {this.state.book === null ? notFount : this.getBody(strings.book)}
            </Container>
        );
    }
}

export default Book;
