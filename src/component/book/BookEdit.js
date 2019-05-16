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
import ModalYesNo from './../ModalYesNo'

class BookEdit extends Component {

    state = {
        id: this.props.id,
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
        publishingHouse: null,
        producer: null,
        importer: null,
        count: 0,
        inLibraryUseOnly: false,


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

        header: '',
        content: [''],
        showModal: false,
        modalAction: null,
    };

    componentWillMount() {
        if (this.state.id) {
            this.loadBook();
        }
        this.handleSearchChangeGenres(null, {searchQuery: ''});
        this.handleSearchChangeAuthors(null, {searchQuery: ''});
        this.handleSearchChangeTranslators(null, {searchQuery: ''});
        this.handleSearchChangePublishingHouse(null, {searchQuery: ''});
        this.handleSearchChangeProducer(null, {searchQuery: ''});
        this.handleSearchChangeImporter(null, {searchQuery: ''});
    }

    loadBook = () => {
        axios
            .get(BACK_END_SERVER_URL + `/book/` + this.state.id,
                {
                    headers: {
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                console.log(res);
                this.setState({
                    language: res.data.language,
                    title: res.data.title,
                    description: res.data.description,
                    authors: res.data.authors,
                    translators: res.data.translators,
                    genres: res.data.genres,
                    type: res.data.type,
                    ageRestriction: res.data.ageRestriction,
                    rating: res.data.rating,
                    year: res.data.year,
                    status: res.data.status,
                    weight: res.data.weight,
                    size: res.data.size,
                    pages: res.data.pages,
                    pictureUrl: res.data.pictureUrl,
                    thumbnailUrl: res.data.thumbnailUrl,
                    pdfUrl: res.data.pdfUrl,
                    isbn: res.data.isbn,
                    publishingHouse: res.data.publishingHouse,
                    producer: res.data.producer,
                    importer: res.data.importer,
                    count: res.data.count,
                    inLibraryUseOnly: res.data.inLibraryUseOnly,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount() {
        this.loadLanguageList();
        this.loadYearList();
    };

    handleChange = (event, {value}) => {
        this.setState({[event.targer.name]: value});
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

    handleChangeAgeRestriction = (event, {value}) => {
        this.setState({ageRestriction: value});
    };

    handleChangeRating = (event, {value}) => {
        this.setState({rating: value});
    };

    handleChangeWeight = (event, {value}) => {
        this.setState({weight: value});
    };

    handleChangeSize = (event, {value}) => {
        this.setState({size: value});
    };

    handleChangePages = (event, {value}) => {
        this.setState({pages: value});
    };

    handleChangeISBN = (event, {value}) => {
        this.setState({isbn: value});
    };

    handleChangeCount = (event, {value}) => {
        this.setState({count: value});
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
        this.setState({
            newGenre: value,
            header: 'addgenre',
            content: ['addgenre', value],
            modalAction: this.addGenre,
        }, this.openClose);
    };

    addGenre = () =>{
        axios
            .post(BACK_END_SERVER_URL + `/book/genre`,
                {
                    name: this.state.newGenre
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
                    genreSearchString: '',
                    genreList: [{
                        key: res.data.id,
                        text: res.data.name,
                        value: res.data
                    }, ...this.state.genreList],
                    genres: [{
                        id: res.data.id,
                        name: res.data.name,
                    }, ...this.state.genres]
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleChangeInLibraryUseOnly = (event, {checked}) => {
        this.setState({inLibraryUseOnly: checked});
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

    handleAdditionProduser = (event, {value}) => {
        this.setState({
            newProduser: value,
            header: 'addProducer',
            content: ['addProducer', value],
            modalAction: this.addProducer,
        }, this.openClose);
    };

    addProducer = () =>{
        axios
            .post(BACK_END_SERVER_URL + `/book/organization`,
                {
                    title: this.state.newProduser
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
                    producerSearchString: '',
                    producerList: [{
                        key: res.data.id,
                        text: res.data.title,
                        value: res.data
                    }, ...this.state.producerList],
                    producer: {
                        id: res.data.id,
                        title: res.data.title,
                    },
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleAdditionImporter = (event, {value}) => {
        this.setState({
            newProduser: value,
            header: 'addImporter',
            content: ['addImporter', value],
            modalAction: this.addImporter,
        }, this.openClose);
    };

    addImporter = () =>{
        axios
            .post(BACK_END_SERVER_URL + `/book/organization`,
                {
                    title: this.state.newProduser
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
                    importerSearchString: '',
                    importerList: [{
                        key: res.data.id,
                        text: res.data.title,
                        value: res.data
                    }, ...this.state.producerList],
                    importer: {
                        id: res.data.id,
                        title: res.data.title,
                    },
                });
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
        let url = this.state.id ? '/book/' + this.state.id : '/book';
        let method = this.state.id ? 'put' : 'post';
        axios({
            method: method,
            url: BACK_END_SERVER_URL + url,
            headers: {
                'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                'Content-type': 'application/json',
                // 'Accept-Language': locale.tag || ''
            },
            data: {
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
                count: this.state.count,
                inLibraryUseOnly: this.state.inLibraryUseOnly,
            }
        })
            .then(res => {
                console.log(this.state);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    openClose = () => this.setState({showModal: !this.state.showModal});

    render() {
        return (
            <React.Fragment>
            <ModalYesNo size='tiny' header={this.state.header} content={this.state.content} open={this.state.showModal} openClose={this.openClose} isConfirmed={this.state.modalAction} />
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
                            control={Dropdown}
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
                                allowAdditions
                                additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                                onAddItem={this.handleAdditionGenre}
                            />
                        <Form.Field
                            width={6}
                            label='genres'
                            control={Dropdown}
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
                    </Form.Group>

                    <Form.Group>
                        <Form.Field
                            width={10}
                            label='translator'
                            control={Dropdown}

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
                                allowAdditions
                                additionLabel={<i style={{ color: 'red' }}>New Genre: </i>}
                                onAddItem={this.handleAdditionGenre}
                            />
                        <Form.Field
                            width={6}
                            label='year'
                            control={Dropdown}
                                fluid
                                clearable
                                onChange={this.handleChangeYear}
                                options={this.state.yearList}
                                placeholder='year'
                                selection
                                value={this.state.year}
                            />
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
                    {this.state.thumbnailUrl !== null ?
                        <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.state.thumbnailUrl}
                               size='small'/> : false}
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
                    <Form.Group>
                        <Form.Field
                            width={8}
                            type='number'
                            min={0}
                            max={100000}
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
                        <Form.Input
                            width={8}
                            label='pages'
                            type='number'
                            step={1}
                            min={0}
                            max={10000}
                            placeholder="pages"
                            value={this.state.pages}
                            onChange={this.handleChangePages}/>
                        <Form.Input
                            width={8}
                            type='number'
                            step={1}
                            min={0}
                            max={1000}
                            label='count'
                            placeholder="count"
                            value={this.state.count}
                            onChange={this.handleChangeCount}/>

                    </Form.Group>
                    <Form.Group>
                        <Form.Dropdown
                            width={8}
                            label='publishingHouse'
                                fluid
                                clearable
                                onChange={this.handleChangePublishingHouse}
                                onSearchChange={this.handleSearchChangePublishingHouse}
                                options={this.state.publishingHouseList}
                                placeholder='publishingHouse'
                                search
                                searchQuery={this.state.publishingHouseSearchString}
                                selection
                                value={this.state.publishingHouse}
                                allowAdditions
                                additionLabel={<i style={{ color: 'red' }}>New publishingHouse: </i>}
                                onAddItem={this.handleAdditionGenre}
                            />
                        <Form.Input
                            width={8}
                            label='isbn'
                            placeholder="isbn"
                            value={this.state.isbn}
                            onChange={this.handleChangeISBN}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Dropdown
                            width={8}
                            label='producer'
                                fluid
                                clearable
                                onChange={this.handleChangeProducer}
                                onSearchChange={this.handleSearchChangeProducer}
                                options={this.state.producerList}
                                placeholder='producer'
                                search
                                searchQuery={this.state.producerSearchString}
                                selection
                                value={this.state.producer}
                                allowAdditions
                                additionLabel={<i style={{ color: 'red' }}>New producer: </i>}
                                onAddItem={this.handleAdditionProduser}
                            />
                        <Form.Dropdown
                            width={8}
                            label='importer'
                                fluid
                                clearable
                                onChange={this.handleChangeImporter}
                                onSearchChange={this.handleSearchChangeImporter}
                                options={this.state.importerList}
                                placeholder='producer'
                                search
                                searchQuery={this.state.importerSearchString}
                                selection
                                value={this.state.importer}
                                allowAdditions
                                additionLabel={<i style={{ color: 'red' }}>New importer: </i>}
                                onAddItem={this.handleAdditionImporter}
                            />
                    </Form.Group>
                    <Form.Checkbox
                        label='inLibraryUseOnly'
                        checked={this.state.inLibraryUseOnly}
                        onClick={this.handleChangeInLibraryUseOnly}
                        />
                    <Button size='big' color='purple' fluid onClick={this.handleButtonSubmit}>Create BOOK!!!!</Button>
                </Form>
            </Container>
            </React.Fragment>
        );
    }
}

export default BookEdit;
