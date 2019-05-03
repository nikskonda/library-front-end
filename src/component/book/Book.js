import React, {Component} from 'react';
import axios from "axios/index";
import {BACK_END_SERVER_URL, URL_DOWNLOAD_FILE} from "../../context";
import {Button, Container, Grid, Header, Image, Message, Popup, Rating, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";

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

    getBody() {
        return (

            <Grid>
                <Grid.Row>
                        <h1>{this.state.book.title + (this.state.book.year && this.state.book.year!==-1 ? ', ' + this.state.book.year : '')}</h1>
                    <div>
                        <Button.Group floated='left'>
                            {this.state.book.price ? <Button>Buy now {this.state.book.price}$</Button> : false}
                            {this.state.book.pdfUrl ? <Button>
                                <Link to={`/book/${this.state.book.id}/read/pdf`}>PDF READER</Link>
                            </Button> : false}
                            {this.state.book.ePubUrl ?
                                <Link to={`/book/${this.state.book.id}/read/epub`}><Button>EBUP
                                    READER</Button>Button></Link> : false}
                            <Button>Button for any action</Button>
                        </Button.Group>
                    </div>
                    <div>
                        {this.state.book.rating !== undefined && this.state.book.rating !== 0 ?
                            <Rating icon='star'
                                    defaultRating={this.state.book.rating / 10}
                                    maxRating={10}
                                    disabled
                            />
                            : false}
                        {this.state.book.rating !== undefined && this.state.book.rating !== 0 ?
                            <StarRatings
                                rating={this.state.book.rating / 10}
                                starRatedColor='#ffe623'
                                numberOfStars={10}
                                starDimension='17px'
                                starSpacing='0'
                                name='rating'
                            />
                            : false}
                    </div>
                    <div>
                        <Image src={BACK_END_SERVER_URL+URL_DOWNLOAD_FILE+this.state.book.pictureUrl} size='large' floated='right'/>
                        <p>{this.state.book.description}</p>
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <Table striped bordered size="sm">
                        <Table.Body>

                            {this.state.book.genres !== undefined ?
                                <Table.Row>
                                    <Table.Cell>Genre</Table.Cell>
                                    <Table.Cell>{this.state.book.genres.map((genre, i, list) => genre.name + (list.length - 1 !== i ? ', ' : ' '))}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }

                            {this.state.book.authors !== undefined ?
                                <Table.Row>
                                    <Table.Cell>authors</Table.Cell>
                                    <Table.Cell>{this.state.book.authors ? this.state.book.authors.map((author, i, array) => this.getAuthor(author, i, array)) : false}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.translators !== undefined ?
                                <Table.Row>
                                    <Table.Cell>translators</Table.Cell>
                                    <Table.Cell>{this.state.book.translators ? this.state.book.translators.map((translator, i, array) => this.getAuthor(translator, i, array)) : false}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.size !== undefined ?
                                <Table.Row>
                                    <Table.Cell>Size</Table.Cell>
                                    <Table.Cell>{this.state.book.size}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.type !== undefined ?
                                <Table.Row>
                                    <Table.Cell>type</Table.Cell>
                                    <Table.Cell>{this.state.book.type}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.ageRestriction  ?
                                <Table.Row>
                                    <Table.Cell>ageRestriction</Table.Cell>
                                    <Table.Cell>{this.state.book.ageRestriction}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.rating ?
                                <Table.Row>
                                    <Table.Cell>rating</Table.Cell>
                                    <Table.Cell>{this.state.book.rating}/100</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.year ?
                                <Table.Row>
                                    <Table.Cell>year</Table.Cell>
                                    <Table.Cell>{this.state.book.year===-1?' unknown' : this.state.book.year}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.status !== undefined ?
                                <Table.Row>
                                    <Table.Cell>status</Table.Cell>
                                    <Table.Cell>{this.state.book.status}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.weight !== undefined ?
                                <Table.Row>
                                    <Table.Cell>weight</Table.Cell>
                                    <Table.Cell>{this.state.book.weight}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.pages !== undefined ?
                                <Table.Row>
                                    <Table.Cell>pages</Table.Cell>
                                    <Table.Cell>{this.state.book.pages}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.isbn !== undefined ?
                                <Table.Row>
                                    <Table.Cell>ISBN</Table.Cell>
                                    <Table.Cell>{this.state.book.isbn}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.publishingHouse !== undefined ?
                                <Table.Row>
                                    <Table.Cell>publishingHouse</Table.Cell>
                                    <Table.Cell>{this.state.book.publishingHouse.title}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.producer !== undefined ?
                                <Table.Row>
                                    <Table.Cell>producer</Table.Cell>
                                    <Table.Cell>{this.state.book.producer.title}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.importer !== undefined ?
                                <Table.Row>
                                    <Table.Cell>importer</Table.Cell>
                                    <Table.Cell>{this.state.book.importer.title}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }
                            {this.state.book.price !== undefined ?
                                <Table.Row>
                                    <Table.Cell>price</Table.Cell>
                                    <Table.Cell>{this.state.book.price}</Table.Cell>
                                </Table.Row>
                                :
                                false
                            }

                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>
        );
    }


    render() {
        const notFount =
            (<Message
                warning
                header='Book Not found'
                content='Plz change search query!'
            />);
        return (
            <Container>
                {this.state.book === null ? notFount : this.getBody()}
            </Container>
        );
    }
}

export default Book;