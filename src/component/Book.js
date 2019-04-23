import React, {Component} from 'react';
import axios from "axios";
import {BACK_END_SERVER_URL} from "../context";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import StarRatings from "react-star-ratings";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Table from "react-bootstrap/Table";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

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
                console.log(res);
                this.setState({book: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getAuthor(author){
        let popover =(
            <Popover id="popover-basic" title={author.name}>
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

    getBody() {
        return (
            <div>
                <div>
                    <div className='float-right'>
                        <div>
                            <Image src="../img/big_book.png" className="rounded" style={{maxHeight: 500}}/>
                        </div>
                        <div style={{alignItem: 'center'}}>
                            <StarRatings
                                rating={this.state.book.rating / 10}
                                starRatedColor='red'
                                numberOfStars={10}
                                starDimension='20px'
                                starSpacing='0'
                                name='rating'
                            />
                        </div>

                    </div>
                    <div>
                        <h1>{this.state.book.title}</h1>
                        <div>
                            {this.state.book.authors !== null ? this.state.book.authors.map(
                                (author) => this.getAuthor(author)) : false}
                            {this.state.book.year !== null ? this.state.book.year : false}
                        </div>

                        <ButtonGroup>
                            <Button variant="primary">Buy now {this.state.book.price}$</Button>
                            <Button variant="primary">Read Now</Button>
                            <Button variant="primary">Button for any action</Button>
                        </ButtonGroup>
                    </div>
                    <div>
                        <p>{this.state.book.description}</p>
                    </div>
                </div>
                <hr/>
                <div className='open_book'>
                    <Table striped bordered hover size="sm">
                        <tbody>
                        {this.state.book.size !== undefined ?
                            <tr>
                                <td>Size</td>
                                <td>{this.state.book.size}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.genres !== undefined ?
                            <tr>
                                <td>Genre</td>
                                <td>{this.state.book.genres.map((genre, i, list) => genre.name + (list.length - 1 !== i ? ', ' : ' '))}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.translator !== undefined ?
                            <tr>
                                <td>translator</td>
                                <td>{this.state.book.translator.map((translator, i, list) => (translator.firstName + ' ' + translator.lastName + (list.length - 1 !== i ? ', ' : ' ')))}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.type !== undefined ?
                            <tr>
                                <td>type</td>
                                <td>{this.state.book.type}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.ageRestriction !== undefined ?
                            <tr>
                                <td>ageRestriction</td>
                                <td>{this.state.book.ageRestriction}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.rating !== undefined ?
                            <tr>
                                <td>rating</td>
                                <td>{this.state.book.rating}/100</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.year !== undefined ?
                            <tr>
                                <td>year</td>
                                <td>{this.state.book.year}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.status !== undefined ?
                            <tr>
                                <td>status</td>
                                <td>{this.state.book.status}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.weight !== undefined ?
                            <tr>
                                <td>weight</td>
                                <td>{this.state.book.weight}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.pages !== undefined ?
                            <tr>
                                <td>pages</td>
                                <td>{this.state.book.pages}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.isbn !== undefined ?
                            <tr>
                                <td>ISBN</td>
                                <td>{this.state.book.isbn}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.publishingHouse !== undefined ?
                            <tr>
                                <td>publishingHouse</td>
                                <td>{this.state.book.publishingHouse.title}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.producer !== undefined ?
                            <tr>
                                <td>producer</td>
                                <td>{this.state.book.producer.title}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.importer !== undefined ?
                            <tr>
                                <td>importer</td>
                                <td>{this.state.book.importer.title}</td>
                            </tr>
                            :
                            false
                        }
                        {this.state.book.price !== undefined ?
                            <tr>
                                <td>price</td>
                                <td>{this.state.book.price}</td>
                            </tr>
                            :
                            false
                        }

                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }


    render() {
        let notFount = <Alert variant='warning'>Book not found</Alert>;
        return (
            <Container>
                {this.state.book === null ? notFount : this.getBody()}
            </Container>
        );
    }
}

export default Book;