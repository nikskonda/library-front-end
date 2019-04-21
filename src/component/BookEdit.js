import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {BACK_END_SERVER_URL, BOOK_STATUS, BOOK_TYPE, BOOK_YEAR_MIN} from "../context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class BookEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // book: {
                id: null,
                language: null,
                title: '',
                description: '',
                authors: [],
                translators: [],
                genres: [],
                type: '',
                ageRestriction: '',
                rating: 0,
                year: 10,
                status: '',
                weight: '',
                size: '',
                pages: 0,
                pictureUrl: '',
                thumbnailUrl: '',
                pdfUrl: '',
                isbn: '',
                publishingHouse: null,
                producer: null,
                importer: null,
                price: 0,

            // },
            languageList: [],
            yearList: [],

        };

        this.loadLanguageList = this.loadLanguageList.bind(this);
        this.loadYearList = this.loadYearList.bind(this);


        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeStatus = this.handleChangeTitle.bind(this);
        this.handleChangeType = this.handleChangeTitle.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAgeRestriction = this.handleChangeAgeRestriction.bind(this);

        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleChangePages = this.handleChangePages.bind(this);
        this.handleChangeISBN = this.handleChangeISBN.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
    }


    componentDidMount() {
        this.loadLanguageList();
        this.loadYearList();
    }

    handleChangeLanguage(event){
        this.setState({language: event.target.value});
    }
    handleChangeTitle(event){
        this.setState({title: event.target.value});
    }
    handleChangeDescription(event){
        this.setState({description: event.target.value});
    }
    handleChangeYear(event){
        this.setState({year: event.target.value});
    }

    handleChangeStatus(event){
        this.setState({status: event.target.value});
    }

    handleChangeType(event){
        this.setState({type: event.target.value});
    }

    handleChangeAgeRestriction(event){
        this.setState({ageRestriction: event.target.value});
    }

    handleChangeRating(event){
        this.setState({rating: event.target.value});
    }

    handleChangeWeight(event){
        this.setState({weight: event.target.value});
    }

    handleChangeSize(event){
        this.setState({size: event.target.value});
    }

    handleChangePages(event){
        this.setState({pages: event.target.value});
    }

    handleChangeISBN(event){
        this.setState({isbn: event.target.value});
    }

    handleChangePrice(event){
        this.setState({price: event.target.value});
    }



    loadLanguageList(){
        axios
            .get(BACK_END_SERVER_URL+`language`)
            .then(res => {
                this.setState({languageList: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    loadYearList(){
        let max = (new Date()).getFullYear();
        for (let i = max; i >= BOOK_YEAR_MIN; i--) {
            this.state.yearList.push(i);
        }
    }

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group as={Row} controlId='bookForm.language'>
                        <Form.Label sm={3}>language</Form.Label>
                        <Form.Control as='select' onChange={this.handleChangeLanguage} sn={9}>
                            {this.state.languageList.map(lang => <option key={lang.id}>{lang.name}</option>)}
                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId="bookForm.title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' placeholder="enter title" value={this.state.title} onChange={this.handleChangeTitle}/>
                    </Form.Group>

                    <Form.Group controlId="bookForm.description">
                        <Form.Label>description</Form.Label>
                        <Form.Control as="textarea" rows="5" placeholder="enter description" value={this.state.description} onChange={this.handleChangeDescription}/>
                    </Form.Group>

                    <Form.Group controlId="bookForm.year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control as="select" multiple>
                            {this.state.yearList.map(year => <option key={year}>{year}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="bookForm.ageRestriction">
                        <Form.Label>ageRestriction</Form.Label>
                        <Form.Control type='text' placeholder="enter ageRestriction" value={this.state.ageRestriction} onChange={this.handleChangeAgeRestriction}/>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            TYPE
                        </Form.Label>
                        <Col sm={10}>
                            {BOOK_TYPE.map(type => (
                                <Form.Check onChange={this.handleChangeType}
                                    key={type.name}
                                    type="radio"
                                    label={type.name}
                                    name={type.name}
                                    id={type.name}
                                />
                            ))}
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}>
                                STATUS
                            </Form.Label>
                            <Col sm={10}>
                                {BOOK_STATUS.map(status => (
                                    <Form.Check onChange={this.handleChangeStatus}
                                        inline
                                        key={status.name}
                                        type="radio"
                                        label={status.name}
                                        name={status.name}
                                        id={status.name}
                                    />
                                ))}
                            </Col>
                        </Form.Group>
                    </fieldset>

                    <Form.Group controlId="bookForm.rating">
                        <Form.Label>rating</Form.Label>
                        <Form.Control type='number' placeholder="enter rating" value={this.state.rating} onChange={this.handleChangeRating}/>
                    </Form.Group>

                    <Form.Group controlId="bookForm.weight">
                        <Form.Label>weight</Form.Label>
                        <Form.Control type='text' placeholder="enter weight" value={this.state.weight} onChange={this.handleChangeWeight}/>
                    </Form.Group>
                    <Form.Group controlId="bookForm.size">
                        <Form.Label>size</Form.Label>
                        <Form.Control type='text' placeholder="enter size" value={this.state.size} onChange={this.handleChangeSize}/>
                    </Form.Group>
                    <Form.Group controlId="bookForm.pages">
                        <Form.Label>pages</Form.Label>
                        <Form.Control type='number' placeholder="enter pages" value={this.state.pages} onChange={this.handleChangePages}/>
                    </Form.Group>
                    <Form.Group controlId="bookForm.isbn">
                        <Form.Label>isbn</Form.Label>
                        <Form.Control type='text' placeholder="enter isbn" value={this.state.isbn} onChange={this.handleChangeISBN}/>
                    </Form.Group>
                    <Form.Group controlId="bookForm.price">
                        <Form.Label>price</Form.Label>
                        <Form.Control type='number' placeholder="enter price" value={this.state.price} onChange={this.handleChangePrice}/>
                    </Form.Group>

                </Form>;
            </Container>
        );
    }
}

export default BookEdit;

