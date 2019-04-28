import React, {Component} from 'react';
import axios from "axios/index";
import {
    BACK_END_SERVER_URL,
    BOOK_STATUS,
    BOOK_TYPE,
    BOOK_YEAR_MIN,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    URL_DOWNLOAD_FILE
} from "../../context";
// https://react.semantic-ui.com
import {Button, Container, Dropdown, Form, Image, Input, TextArea} from "semantic-ui-react";
import './BookEdit.css'


// BookEdit.propTypes = {
//     id: PropTypes.number,
//     language: PropTypes.object,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     authors: [],
//     translators: [],
//     genres: [],
//     type: PropTypes.string,
//     ageRestriction: PropTypes.string,
//     rating: 0,
//     year: -1,
//     status: PropTypes.string,
//     weight: PropTypes.string,
//     size: PropTypes.string,
//     pages: 0,
//     pictureUrl: PropTypes.string,
//     thumbnailUrl: PropTypes.string,
//     pdfUrl: PropTypes.string,
//     isbn: PropTypes.string,
//     publishingHouse: {},
//     producer: {},
//     importer: {},
//     price: 0,
//
//     // },
//     languageList: [],
//     yearList: [],
//     genreList: [],
//     genreSearchString: PropTypes.string,
//
//     authorList: [],
//     authorSearchString: PropTypes.string,
//     translatorList: [],
//     translatorSearchString: PropTypes.string,
//
//     publishingHouseList: [],
//     publishingHouseSearchString: PropTypes.string,
//
//     producerList: [],
//     producerSearchString: PropTypes.string,
//     importerList: [],
//     importerSearchString: PropTypes.string,
//
//     picture: PropTypes.string,
//     thumbnail: PropTypes.string,
//     pdf: PropTypes.string,
// }

class BookEdit extends Component {

    state = {
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
        pictureUrl: null,
        thumbnailUrl: null,
        pdfUrl: null,
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

        picture: null,
        thumbnail: null,
        pdf: null,

    };

    componentDidMount = () => {
        this.loadLanguageList();
        this.loadYearList();
    };

    handleChangeLanguage = (event, {value}) => {
        this.setState({language: value});
    };

    handleChangeTitle = (event) => {
        this.setState({title: event.target.value});
    };

    handleChangeDescription = (event) => {
        this.setState({description: event.target.value});
    };

    handleChangeYear = (event, {value}) => {
        this.setState({year: value});
    };

    handleChangeStatus = (event, {value}) => {
        this.setState({status: value});
    };

    handleChangeType = (event, {value}) => {
        this.setState({type: value});
    };

    handleChangeAgeRestriction = (event) => {
        this.setState({ageRestriction: event.target.value});
    };

    handleChangeRating = (event) => {
        this.setState({rating: event.target.value});
    };

    handleChangeWeight = (event) => {
        this.setState({weight: event.target.value});
    };

    handleChangeSize = (event) => {
        this.setState({size: event.target.value});
    };

    handleChangePages = (event) => {
        this.setState({pages: event.target.value});
    };

    handleChangeISBN = (event) => {
        this.setState({isbn: event.target.value});
    };

    handleChangePrice = (event) => {
        this.setState({price: event.target.value});
    };

    handleChangeGenres = (event, {searchQuery, value}) => {
        this.setState({genreSearchString: searchQuery, genres: value});
    };

    handleSearchChangeGenres = (event, {searchQuery}) => {
        this.setState({genreSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/genre`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params: {
                        searchString: searchQuery
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(g => array.push({key: g.id, text: g.name, value: g}));
                this.setState({genreList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleAdditionGenre = (event, {value}) => {
        if (window.confirm('add new genre&&&')) {
            axios
                .post(BACK_END_SERVER_URL + `/book/genre`,
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
                    this.setState({
                        genreList: [{
                            key: res.data.id,
                            text: res.data.name,
                            value: res.data
                        }, ...this.state.genreList]
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    loadLanguageList = () => {
        axios
            .get(BACK_END_SERVER_URL + `/language`)
            .then(res => {
                let array = [];
                res.data.map(l => array.push({key: l.id, text: l.name, value: l}));
                this.setState({languageList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    loadYearList = () => {
        let max = (new Date()).getFullYear();
        for (let i = max; i >= BOOK_YEAR_MIN; i--) {
            this.state.yearList.push({text: i, value: i});
        }
    };

    handleChangeAuthors = (event, {searchQuery, value}) => {
        this.setState({authorSearchString: searchQuery, authors: value});
    };

    handleChangeTranslators = (event, {searchQuery, value}) => {
        this.setState({translatorSearchString: searchQuery, translators: value});
    };

    handleSearchChangeAuthors = (event, {searchQuery}) => {
        this.setState({authorSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/author`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params: {
                        searchString: searchQuery
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(a => array.push({key: a.id, text: a.firstName + ' ' + a.lastName, value: a}));
                this.setState({authorList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleSearchChangeTranslators = (event, {searchQuery}) => {
        this.setState({translatorSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/author`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params: {
                        searchString: searchQuery
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(a => array.push({key: a.id, text: a.firstName + ' ' + a.lastName, value: a}));
                this.setState({translatorList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleChangePublishingHouse = (event, {searchQuery, value}) => {
        this.setState({publishingHouseSearchString: '', publishingHouse: value});
    };

    handleSearchChangePublishingHouse = (event, {searchQuery}) => {
        this.setState({publishingHouseSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/publishingHouse`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params: {
                        searchString: searchQuery
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(ph => array.push({key: ph.id, text: ph.title, value: ph}));
                this.setState({publishingHouseList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleChangeProducer = (event, {searchQuery, value}) => {
        this.setState({producerSearchString: '', producer: value});
    };

    handleChangeImporter = (event, {searchQuery, value}) => {
        this.setState({importerSearchString: '', importer: value});
    };

    handleSearchChangeProducer = (event, {searchQuery}) => {
        this.setState({producerSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/organization`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params: {
                        searchString: searchQuery
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(org => array.push({key: org.id, text: org.title, value: org}));
                this.setState({producerList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleSearchChangeImporter = (event, {searchQuery}) => {
        this.setState({importerSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/organization`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    },
                    params: {
                        searchString: searchQuery
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(org => array.push({key: org.id, text: org.title, value: org}));
                this.setState({importerList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleChangePictureFile = (event) => {
        this.setState({picture: event.target.files[0]});
    };

    handleChangeThumbnailFile = (event) => {
        this.setState({thumbnail: event.target.files[0]});
    };

    handleChangePdfFile = (event) => {
        this.setState({pdf: event.target.files[0]});
    };

    handleLoadFilePicture = (event) => {
        let data = new FormData();
        data.append('file', this.state.picture);
        axios
            .post(BACK_END_SERVER_URL + `/file/upload`,
                data,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'form/data',
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                this.setState({
                    pictureUrl: res.data.fileName
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleLoadFileThumbnail = (event) => {
        let data = new FormData();
        data.append('file', this.state.thumbnail);
        axios
            .post(BACK_END_SERVER_URL + `/file/upload`,
                data,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'form/data',
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                this.setState({
                    thumbnailUrl: res.data.fileName
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleLoadFilePdf = (event) => {
        let data = new FormData();
        data.append('file', this.state.pdf);
        axios
            .post(BACK_END_SERVER_URL + `/file/upload`,
                data,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'form/data',
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                this.setState({
                    pdfUrl: res.data.fileName
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleButtonSubmit = () => {
        axios
            .post(BACK_END_SERVER_URL + `/book`,
                {
                    title: this.state.title,
                    language: this.state.language,
                    description: this.state.description,
                    authors: this.state.authors,
                    translators: this.state.translators,
                    genres: this.state.genres,
                    type: this.state.type,
                    ageRestriction: this.state.ageRestriction,
                    rating: this.state.rating,
                    year: this.state.year,
                    status: this.state.status,
                    weight: this.state.weight,
                    size: this.state.size,
                    pages: this.state.pages,
                    pictureUrl: this.state.pictureUrl,
                    thumbnailUrl: this.state.thumbnailUrl,
                    pdfUrl: this.state.pdfUrl,
                    isbn: this.state.isbn,
                    publishingHouse: this.state.publishingHouse,
                    producer: this.state.producer,
                    importer: this.state.importer,
                    price: this.state.price,
                },
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                this.setState({
                    pdfUrl: res.data.fileName
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group>
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

                    <Form.Group>
                        <Form.Field
                            className='w-100'
                            label='title'
                            control={Input}
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.handleChangeTitle}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            className='w-100'
                            label='description'
                            control={TextArea}
                            placeholder="description"
                            value={this.state.description}
                            onChange={this.handleChangeDescription}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            width={10}
                            label='authors'
                            control={this.AuthorDropdown}/>
                        <Form.Field
                            width={6}
                            label='genres'
                            control={this.GenreDropdown}/>

                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            width={10}
                            label='translator'
                            control={this.TranslatorDropdown}/>
                        <Form.Field
                            width={6}
                            label='year'
                            control={this.YearDropdown}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            width={10}
                            label='ageRestriction'
                            control={Input}
                            placeholder="ageRestriction"
                            value={this.state.ageRestriction}
                            onChange={this.handleChangeAgeRestriction}/>
                        <Form.Field
                            width={6}
                            label='rating'
                            control={Input}
                            type='number'
                            pattern='\d*'
                            min={0}
                            max={100}
                            step={1}
                            placeholder="rating"
                            value={this.state.rating}
                            onChange={this.handleChangeRating}/>
                    </Form.Group>

                    <Form.Group>
                        <div className="input-group file-loader">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile01"
                                       aria-describedby="inputGroupFileAddon01"
                                       onChange={this.handleChangeThumbnailFile}/>
                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose Thumbnail
                                    file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon01"
                                        onClick={this.handleLoadFileThumbnail}
                                        disabled={this.state.thumbnail === null}>Upload Thumbnail
                                </button>
                            </div>
                        </div>
                    </Form.Group>
                    {this.state.thumbnailUrl !== null ? <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.thumbnailUrl} size='small'/> : false}
                    <br/>
                    <Form.Group>
                        <div className="input-group file-loader">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile02"
                                       aria-describedby="inputGroupFileAddon02"
                                       onChange={this.handleChangePictureFile}/>
                                <label className="custom-file-label" htmlFor="inputGroupFile02">Choose picture
                                    file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon02"
                                        onClick={this.handleLoadFilePicture}
                                        disabled={this.state.picture === null}>Upload picture
                                </button>
                            </div>
                        </div>
                    </Form.Group>
                    {this.state.pictureUrl !== null ?
                        <div>
                            <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.pictureUrl}/>
                        </div> : false}
                    <br/>
                    <Form.Group>
                        <div className="input-group file-loader">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile03"
                                       aria-describedby="inputGroupFileAddon03"
                                       onChange={this.handleChangePdfFile}/>
                                <label className="custom-file-label" htmlFor="inputGroupFile03">Choose pdf file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03"
                                        onClick={this.handleLoadFilePdf} disabled={this.state.pdf === null}>Upload pdf
                                </button>
                            </div>
                        </div>
                    </Form.Group>
                    {this.state.pdfUrl !== null ?
                        <div>
                            <a href={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.pdfUrl}> YourPdfFile</a>
                        </div> : false}
                    <br/>
                    <Form.Group inline>
                        <label>type</label>
                        {BOOK_TYPE.map(type => (
                            <Form.Radio
                                label={type.name}
                                value={type.name}
                                checked={this.state.type === type.name}
                                onChange={this.handleChangeType}
                            />
                        ))}

                    </Form.Group>
                    <Form.Group inline>
                        <label>status</label>
                        {BOOK_STATUS.map(status => (
                            <Form.Radio
                                label={status.name}
                                value={status.name}
                                checked={this.state.status === status.name}
                                onChange={this.handleChangeStatus}
                            />
                        ))}
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            width={8}
                            type='number'
                            min={0}
                            max={100}
                            label='weight'
                            control={Input}
                            placeholder="weight"
                            value={this.state.weight}
                            onChange={this.handleChangeWeight}/>
                        <Form.Field
                            width={8}
                            label='size'
                            control={Input}
                            placeholder="size"
                            value={this.state.size}
                            onChange={this.handleChangeSize}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field
                            width={8}
                            label='pages'
                            type='number'
                            step={1}
                            min={0}
                            max={10000}
                            control={Input}
                            placeholder="pages"
                            value={this.state.pages}
                            onChange={this.handleChangePages}/>
                        <Form.Field
                            width={8}
                            type='number'
                            step={1}
                            min={0}
                            max={10000}
                            label='price'
                            control={Input}
                            placeholder="price"
                            value={this.state.price}
                            onChange={this.handleChangePrice}/>

                    </Form.Group>
                    <Form.Group>
                        <Form.Field
                            width={8}
                            label='publishingHouse'
                            control={this.PublishingHouseDropdown}/>
                        <Form.Field
                            width={8}
                            label='isbn'
                            control={Input}
                            placeholder="isbn"
                            value={this.state.isbn}
                            onChange={this.handleChangeISBN}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            width={8}
                            label='producer'
                            control={this.ProducerDropdown}/>
                        <Form.Field
                            width={8}
                            label='importer'
                            control={this.ImporterDropdown}/>
                    </Form.Group>

                    <Button size='big' color='purple' fluid onClick={this.handleButtonSubmit}>Create BOOK!!!!</Button>
                </Form>
            </Container>
        );
    }

    GenreDropdown = () => (
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
            additionLabel={<i style={{color: 'red'}}>New Genre: </i>}
            onAddItem={this.handleAdditionGenre}
        />
    );

    AuthorDropdown = () => (
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
    );

    TranslatorDropdown = () => (
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
        />);

    YearDropdown = () => (
        <Dropdown
            fluid
            onChange={this.handleChangeYear}
            options={this.state.yearList}
            placeholder='year'
            selection
            value={this.state.year}
        />
    );

    PublishingHouseDropdown = () => (
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
    );
    ProducerDropdown = () => (
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
    );
    ImporterDropdown = () => (
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
    );

}


export default BookEdit;

