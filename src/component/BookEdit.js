import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {
    BACK_END_SERVER_URL,
    BOOK_STATUS,
    BOOK_TYPE,
    BOOK_YEAR_MIN,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN
} from "../context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// https://react.semantic-ui.com
import {Dropdown} from "semantic-ui-react";

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
                year: -1,
                status: '',
                weight: '',
                size: '',
                pages: 0,
                pictureUrl: '',
                thumbnailUrl: '',
                pdfUrl: '',
                isbn: '',
                publishingHouse: {},
                producer: {},
                importer: {},
                price: 0,

            // },
            languageList: [],
            yearList: [],
            genreList: [],
            genreSearchString: '',

            authorList: [],
            authorSearchString: '',
            translatorList: [],
            translatorSearchString: '',

            publishingHouseList: [],
            publishingHouseSearchString: '',

            producerList: [],
            producerSearchString: '',
            importerList: [],
            importerSearchString: '',

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

        this.handleChangeGenres = this.handleChangeGenres.bind(this);
        this.handleSearchChangeGenres = this.handleSearchChangeGenres.bind(this);

        this.handleChangeAuthors = this.handleChangeAuthors.bind(this);
        this.handleChangeTranslators = this.handleChangeTranslators.bind(this);
        this.handleSearchChangeAuthors = this.handleSearchChangeAuthors.bind(this);
        this.handleSearchChangeTranslators = this.handleSearchChangeTranslators.bind(this);

        this.handleChangePublishingHouse = this.handleChangePublishingHouse.bind(this);
        this.handleSearchChangePublishingHouse = this.handleSearchChangePublishingHouse.bind(this);

        this.handleChangeProducer = this.handleChangeProducer.bind(this);
        this.handleChangeImporter = this.handleChangeImporter.bind(this);
        this.handleSearchChangeProducer = this.handleSearchChangeProducer.bind(this);
        this.handleSearchChangeImporter = this.handleSearchChangeImporter.bind(this);

    }


    componentDidMount() {
        this.loadLanguageList();
        this.loadYearList();
    }

    handleChangeLanguage(event, {value}){
        this.setState({language: value});
    }

    handleChangeTitle(event){
        this.setState({title: event.target.value});
    }

    handleChangeDescription(event){
        this.setState({description: event.target.value});
    }

    handleChangeYear(event, {value}){
        this.setState({year: value});
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

    handleChangeGenres(event, {searchQuery, value}){
        this.setState({genreSearchString: searchQuery, genres:value});
    }

    handleSearchChangeGenres(event, {searchQuery}){
        this.setState({genreSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL+`book/genre`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params:{
                        searchString: searchQuery
                    }
                })
            .then(res => {
                console.log(res);
                let array = [];
                res.data.map(g => array.push({key: g.id, text: g.name, value: g}));
                this.setState({genreList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleAdditionGenre(event, {value}){
        if (window.confirm('add new genre&&&')){
            axios
                .post(BACK_END_SERVER_URL+`book/genre`,
                    {
                        name: value
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                            'Content-type': 'application/json; charset=utf-8',
                        }
                    }
                )
                .then(res => {
                    console.log(res);
                    this.setState({genreList: [{key: res.data.id, text: res.data.name, value:res.data}, ...this.state.genreList]});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    loadLanguageList(){
        axios
            .get(BACK_END_SERVER_URL+`language`)
            .then(res => {
                let array = [];
                res.data.map(l => array.push({key: l.id, text: l.name, value: l}));
                this.setState({languageList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    loadYearList(){
        let max = (new Date()).getFullYear();
        for (let i = max; i >= BOOK_YEAR_MIN; i--) {
            this.state.yearList.push({text:i, value:i});
        }
    }


    handleChangeAuthors(event, {searchQuery, value}){
        this.setState({authorSearchString: searchQuery, authors:value});
    }
    handleChangeTranslators(event, {searchQuery, value}){
        this.setState({translatorSearchString: searchQuery, translators:value});
    }
    handleSearchChangeAuthors(event, {searchQuery}){
        this.setState({authorSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL+`book/author`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params:{
                        searchString: searchQuery
                    }
                })
            .then(res => {
                console.log(res);
                let array = [];
                res.data.map(a => array.push({key: a.id, text: a.firstName+' '+a.lastName, value: a}));
                this.setState({authorList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSearchChangeTranslators(event, {searchQuery}){
        this.setState({translatorSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL+`book/author`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params:{
                        searchString: searchQuery
                    }
                })
            .then(res => {
                console.log(res);
                let array = [];
                res.data.map(a => array.push({key: a.id, text: a.firstName+' '+a.lastName, value: a}));
                this.setState({translatorList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChangePublishingHouse(event, {searchQuery, value}){
        this.setState({publishingHouseSearchString: '', publishingHouse:value});
    }
    handleSearchChangePublishingHouse(event, {searchQuery}){
        this.setState({publishingHouseSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL+`book/publishingHouse`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params:{
                        searchString: searchQuery
                    }
                })
            .then(res => {
                console.log(res);
                let array = [];
                res.data.map(ph => array.push({key: ph.id, text: ph.title, value: ph}));
                this.setState({publishingHouseList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChangeProducer(event, {searchQuery, value}){
        this.setState({producerSearchString: '', producer:value});
    }
    handleChangeImporter(event, {searchQuery, value}){
        this.setState({importerSearchString: '', importer:value});
    }
    handleSearchChangeProducer(event, {searchQuery}){
        this.setState({producerSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL+`book/organization`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params:{
                        searchString: searchQuery
                    }
                })
            .then(res => {
                console.log(res);
                let array = [];
                res.data.map(org => array.push({key: org.id, text: org.title, value: org}));
                this.setState({producerList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSearchChangeImporter(event, {searchQuery}){
        this.setState({importerSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL+`book/organization`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params:{
                        searchString: searchQuery
                    }
                })
            .then(res => {
                console.log(res);
                let array = [];
                res.data.map(org => array.push({key: org.id, text: org.title, value: org}));
                this.setState({importerList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.state);
        return (
            <Container>
                <Form>

                    <Form.Group as={Row} controlId='bookForm.language'>
                        <Form.Label sm={3}>language</Form.Label>
                        <Dropdown
                            button
                            className='icon'
                            floating
                            labeled
                            icon='world'
                            options={this.state.languageList}
                            text={this.state.language === null ? 'Select Language' : this.state.language.name}
                            onChange={this.handleChangeLanguage}
                        />
                    </Form.Group>

                    <Form.Group controlId="bookForm.title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' placeholder="enter title" value={this.state.title} onChange={this.handleChangeTitle}/>
                    </Form.Group>

                    <Form.Group controlId="bookForm.description">
                        <Form.Label>description</Form.Label>
                        <Form.Control as="textarea" rows="5" placeholder="enter description" value={this.state.description} onChange={this.handleChangeDescription}/>
                    </Form.Group>

                    <Form.Group controlId="bookForm.genres">
                        <Form.Label>Genres</Form.Label>
                        <Dropdown
                            fluid
                            multiple
                            onChange={this.handleChangeGenres}
                            onSearchChange={this.handleSearchChangeGenres}
                            options={this.state.genreList}
                            placeholder='genres'
                            search
                            searchQuery={this.state.genreSearchString}
                            selection
                            value={this.state.genres}
                            allowAdditions
                            additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                            onAddItem={this.handleAdditionGenre}
                        />
                    </Form.Group>

                    <Form.Group controlId="bookForm.authors">
                        <Form.Label>Authors</Form.Label>
                        <Dropdown
                            fluid
                            multiple
                            onChange={this.handleChangeAuthors}
                            onSearchChange={this.handleSearchChangeAuthors}
                            options={this.state.authorList}
                            placeholder='authors'
                            search
                            searchQuery={this.state.authorSearchString}
                            selection
                            value={this.state.authors}
                            // allowAdditions
                            // additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                            // onAddItem={this.handleAdditionGenre}
                        />
                    </Form.Group>

                    <Form.Group controlId="bookForm.translators">
                        <Form.Label>translators</Form.Label>
                        <Dropdown
                            fluid
                            multiple
                            onChange={this.handleChangeTranslators}
                            onSearchChange={this.handleSearchChangeTranslators}
                            options={this.state.translatorList}
                            placeholder='translators'
                            search
                            searchQuery={this.state.translatorSearchString}
                            selection
                            value={this.state.translators}
                            // allowAdditions
                            // additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                            // onAddItem={this.handleAdditionGenre}
                        />
                    </Form.Group>

                    <Form.Group controlId="bookForm.year">
                        <Form.Label>year</Form.Label>
                        <Dropdown
                            fluid
                            onChange={this.handleChangeYear}
                            options={this.state.yearList}
                            placeholder='year'
                            selection
                            value={this.state.year}
                        />
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

                    <Form.Group controlId="bookForm.publishingHouse">
                        <Form.Label>publishingHouse</Form.Label>
                        <Dropdown
                            fluid
                            onChange={this.handleChangePublishingHouse}
                            onSearchChange={this.handleSearchChangePublishingHouse}
                            options={this.state.publishingHouseList}
                            placeholder='publishingHouse'
                            search
                            searchQuery={this.state.publishingHouseSearchString}
                            selection
                            text={this.state.publishingHouse.title}
                            value={this.state.publishingHouse}
                            allowAdditions
                            // additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                            // onAddItem={this.handleAdditionGenre}
                        />
                    </Form.Group>

                    <Form.Group controlId="bookForm.producer">
                        <Form.Label>producer</Form.Label>
                        <Dropdown
                            fluid
                            onChange={this.handleChangeProducer}
                            onSearchChange={this.handleSearchChangeProducer}
                            options={this.state.producerList}
                            placeholder='producer'
                            search
                            searchQuery={this.state.producerSearchString}
                            selection
                            value={this.state.producer}
                            // allowAdditions
                            // additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                            // onAddItem={this.handleAdditionGenre}
                        />
                    </Form.Group>

                    <Form.Group controlId="bookForm.importer">
                        <Form.Label>importer</Form.Label>
                        <Dropdown
                            fluid
                            onChange={this.handleChangeImporter}
                            onSearchChange={this.handleSearchChangeImporter}
                            options={this.state.importerList}
                            placeholder='producer'
                            search
                            searchQuery={this.state.importerSearchString}
                            selection
                            value={this.state.importer}
                            // allowAdditions
                            // additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                            // onAddItem={this.handleAdditionGenre}
                        />
                    </Form.Group>

                </Form>
            </Container>
        );
    }
}

export default BookEdit;

