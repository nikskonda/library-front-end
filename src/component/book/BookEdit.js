import React, {Component} from 'react';
import axios from "axios/index";
import {
    BACK_END_SERVER_URL,
    BOOK_YEAR_MIN,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE
} from "../../context";
// https://react.semantic-ui.com
import {Button, Container, Dropdown, Form, Input, Message, Modal, TextArea} from "semantic-ui-react";
import './BookEdit.css';
import './../Modal.css';
import FileDropBox from './../FileDropBox'
import ModalYesNo from './../ModalYesNo';
import {Link} from "react-router-dom";
import {getLang, getStrings, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';
import {instanceOf} from "prop-types";

class BookEdit extends Component {

    state = {
        id: this.props.id,
        language: null,
        title: '',
        description: '',
        authors: [],
        translators: [],
        genres: [],
        type: 'BOOK',
        ageRestriction: '',
        rating: 1,
        year: null,
        status: '',
        weight: '',
        size: '',
        pages: null,
        pictureUrl: null,
        thumbnailUrl: null,
        pdfUrl: null,
        isbn: '',
        publishingHouse: null,
        producer: null,
        importer: null,
        count: 1,
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
        showModalAddAuthor: false,
        showModalAddPH: false,

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
                        'Accept-Language': getLang()
                    },
                })
            .then(res => {
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
            .catch(({response}) => {
                this.setState({notFound: true, errorText: response.data.message})
            });
    };

    componentDidMount() {
        this.loadLanguageList();
        this.loadYearList();
    };

    handleChangeLanguage = (event, {value}) => {
        this.setState({language: value, languageWasChanged: true});
    };

    isValidLanguage = (text) => {
        if (!this.state.languageWasChanged) return {value: true};
        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;
        let language = this.state.language;

        if (!language) {
            value = false;
        }

        return {value: value, message: message};
    };

    handleChangeTitle = (event, {value}) => {
        this.setState({title: value, titleWasChanged: true});
    };

    isValidTitle = (text) => {
        if (!this.state.titleWasChanged) return {value: true};
        let title = this.state.title;

        let message = (<p className='errorMsg'>{text + title.length}</p>);
        let value = true;

        if (!title) {
            value = false;
        } else {
            if (title.length === 0) {
                value = false;
            }

            if (title.length > 255) {
                value = false;
            }
        }


        return {value: value, message: message};
    };

    handleChangeDescription = (event, {value}) => {
        this.setState({description: value, descriptionWasChanged:true});
    };

    isValidDescription= (text) => {
        if (!this.state.descriptionWasChanged) return {value: true};
        let description = this.state.description;

        let message = (<p className='errorMsg'>{text + description.length}</p>);
        let value = true;

        if (!description) {
            value = false;
        } else {
            if (description.length === 0) {
                value = false;
            }

            if (description.length > 3000) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeYear = (event, {value}) => {
        this.setState({year: value});
    };

    handleChangeType = ({value}) => {
        this.setState({type: value});
    };

    handleChangeAgeRestriction = (event, {value}) => {
        this.setState({ageRestriction: value, ageRestrictionWasChanged:true});
    };

    isValidAgeRestriction= (text) => {
        if (!this.state.ageRestrictionWasChanged) return {value: true};

        let ageRestriction = this.state.ageRestriction;

        let message = (<p className='errorMsg'>{text + ageRestriction.length}</p>);
        let value = true;

        if (!ageRestriction) {
            value = false;
        } else {
            if (ageRestriction.length === 0) {
                value = false;
            }

            if (ageRestriction.length > 255) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeRating = (event, {value}) => {
        if (!value) value=1;
        this.setState({rating: value, ratingWasChanged: true});
    };

    isValidRating= (text) => {
        if (!this.state.ratingWasChanged) return {value: true};

        let rating = this.state.rating;

        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;

        if (!rating) {
            value = false;
        } else {
            if (rating<0 && rating>100) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeWeight = (event, {value}) => {
        this.setState({weight: value});
    };

    handleChangeSize = (event, {value}) => {
        this.setState({size: value, sizeWasChanged:true});
    };

    isValidSize= (text) => {
        if (!this.state.sizeWasChanged) return {value: true};
        let size = this.state.size;

        let message = (<p className='errorMsg'>{text + size.length}</p>);
        let value = true;

        if (!size) {
            value = false;
        } else {
            if (size.length === 0) {
                value = false;
            }

            if (size.length > 255) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangePages = (event, {value}) => {
        this.setState({pages: value, pagesWasChanged:true});
    };

    isValidPages= (text) => {
        if (!this.state.pagesWasChanged) return {value: true};
        let pages = this.state.pages;

        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;

        if (!pages) {
            value = false;
        } else {
            if (pages<1) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeISBN = (event, {value}) => {
        this.setState({isbn: value, isbnWasChanged:true});
    };

    isValidISBN= (text) => {
        if (!this.state.isbnWasChanged) return {value: true};

        let isbn = this.state.isbn;

        let message = (<p className='errorMsg'>{text+isbn.length}</p>);
        let value = true;

        if (!isbn) {
            value = false;
        } else {
            if (isbn.length === 0) {
                value = false;
            }

            if (isbn.length > 255) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeCount = (event, {value}) => {
        this.setState({count: value, countWasChanged: true});
    };

    isValidCount= (text) => {
        if (!this.state.countWasChanged) return {value: true};
        let count = this.state.count;

        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;

        if (!count) {
            value = false;
        } else {
            if (count<1) {
                value = false;
            }
        }
        return {value: value, message: message};
    };
    
    handleChangeGenres = (event, {searchQuery, value}) => {
        this.setState({genreSearchString: '', genres: value, genresWasChanged: true});
    };

    isValidGenres= (text) => {
        if (!this.state.genresWasChanged) return {value: true};
        let genres = this.state.genres;

        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;

        if (!genres) {
            value = false;
        } else {
            if (genres.length<1) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleSearchChangeGenres = (event, {searchQuery}) => {
        this.setState({genreSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/genre`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
            });
    };

    handleAdditionGenre = (event, {value}) => {
        this.state.genres.pop();
        let genreModal = getStrings().modal.genre;
        this.setState({
            newGenre: value,
            header: genreModal.header,
            content: [genreModal.content, value],
            modalAction: this.addGenre,
        }, this.openClose);
    };

    addGenre = () => {
        console.log(this.state.genres);

        axios
            .post(BACK_END_SERVER_URL + `/book/genre`,
                {
                    name: this.state.newGenre
                },
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept-Language': getLang()
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
                }, this.handleSearchChangeGenres(null, {searchQuery: ''}));
            })
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
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
        this.setState({authors: value}, this.handleSearchChangeAuthors(null, {searchQuery: ''}));
    };

    handleChangeTranslators = (event, {searchQuery, value}) => {
        this.setState({translators: value}, this.handleSearchChangeTranslators(null, {searchQuery: ''}));
    };

    handleSearchChangeAuthors = (event, {searchQuery}) => {
        this.setState({authorSearchString: searchQuery});
        axios
            .get(BACK_END_SERVER_URL + `/book/author`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
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
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
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
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
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
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
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
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
            });
    };

    handleAdditionProducer = (event, {value}) => {
        let orgModal = getStrings().modal.org;
        this.setState({
            newProducer: value,
            header: orgModal.header,
            content: [orgModal.content, value],
            modalAction: this.addProducer,
        }, this.openClose);
    };

    addProducer = () => {
        axios
            .post(BACK_END_SERVER_URL + `/book/organization`,
                {
                    title: this.state.newProducer
                },
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept-Language': getLang()
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
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
            });
    };

    handleAdditionImporter = (event, {value}) => {
        let orgModal = getStrings().modal.org;
        this.setState({
            newImporter: value,
            header: orgModal.header,
            content: [orgModal.content, value],
            modalAction: this.addImporter,
        }, this.openClose);
    };

    addImporter = () => {
        axios
            .post(BACK_END_SERVER_URL + `/book/organization`,
                {
                    title: this.state.newImporter
                },
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept-Language': getLang()
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
                    }, ...this.state.importerList],
                    importer: {
                        id: res.data.id,
                        title: res.data.title,
                    },
                });
            })
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
            });
    };

    handleChangePictureFile = (file) => {
        this.setState({picture: file}, this.handleLoadFilePicture);
    };

    isValidThumbnail = (text) => {
        if (!this.state.thumbnailUrlWasChanged) return {value: true};
        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;
        let thumbnailUrl = this.state.thumbnailUrl;

        if (!thumbnailUrl) {
            value = false;
        }

        return {value: value, message: message};
    };

    handleChangeThumbnailFile = (file) => {
        this.setState({thumbnail: file}, this.handleLoadFileThumbnail);
    };

    isValidPicture = (text) => {
        if (!this.state.pictureUrlWasChanged) return {value: true};
        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;
        let pictureUrl = this.state.pictureUrl;

        if (!pictureUrl) {
            value = false;
        }

        return {value: value, message: message};
    };


    handleLoadFileThumbnail = () => {
        let data = new FormData();
        data.append('file', this.state.thumbnail);
        axios
            .post(BACK_END_SERVER_URL + `/file/upload`,
                data,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'form/data',
                        'Accept-Language': getLang()
                    },
                })
            .then(res => {
                this.setState({
                    thumbnailUrl: res.data.fileName, thumbnailUrlWasChanged: true
                })
            })
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
            });
    };

    handleLoadFilePicture = () => {
        let data = new FormData();
        data.append('file', this.state.picture);
        axios
            .post(BACK_END_SERVER_URL + `/file/upload`,
                data,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'form/data',
                        'Accept-Language': getLang()
                    },
                })
            .then(res => {
                this.setState({
                    pictureUrl: res.data.fileName, pictureUrlWasChanged: true
                })
            })
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
            });
    };

    handleChangePdfFile = (file) => {
        this.setState({pdf: file}, this.handleLoadFilePdf);
    };

    handleLoadFilePdf = () => {
        let data = new FormData();
        data.append('file', this.state.picture);
        axios
            .post(BACK_END_SERVER_URL + `/file/upload`,
                data,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'form/data',
                        'Accept-Language': getLang()
                    },
                })
            .then(res => {
                this.setState({
                    pdfUrl: res.data.fileName, pdfUrlWasChanged: true
                })
            })
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
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
                'Accept-Language': getLang()
            },
            data: {
                title: this.state.title,
                language: this.state.language,
                description: this.state.description,
                authors: this.state.authors,
                translators: this.state.translators,
                genres: this.state.genres,
                type: this.state.type,
                ageRestriction: this.state.ageRestriction===''?null:this.state.ageRestriction,
                rating: this.state.rating,
                year: this.state.year?this.state.year:-1,
                weight: this.state.weight===''?null:this.state.weight,
                size: this.state.size===''?null:this.state.size,
                pages: this.state.pages===''?null:this.state.pages,
                pictureUrl: this.state.pictureUrl,
                thumbnailUrl: this.state.thumbnailUrl,
                pdfUrl: this.state.pdfUrl,
                isbn: this.state.isbn===''?null:this.state.isbn,
                publishingHouse: this.state.publishingHouse,
                producer: this.state.producer,
                importer: this.state.importer,
                count: this.state.count,
                inLibraryUseOnly: this.state.inLibraryUseOnly,
            }
        })
            .then(res => {
                this.setState({id: res.data.id});
            })
            .catch(({response}) => {
                this.setState({errorAlert: true, errorText: response.data.message})
            });
    };

    openClose = () => this.setState({showModal: !this.state.showModal});
    openCloseAddAuthor = () => this.setState({showModalAddAuthor: !this.state.showModalAddAuthor, authorType: 'author'});
    openCloseAddTranslator = () => this.setState({showModalAddAuthor: !this.state.showModalAddAuthor, authorType: 'translator'});
    openCloseAddPH = () => this.setState({showModalAddPH: !this.state.showModalAddPH});

    isCreatedAuthor = (flag, searchQuery, type) => {
        if (flag) {
            if (type==='author'){
                this.state.authors.pop();
                this.handleSearchChangeAuthors(null, {searchQuery});
            } else {
                this.state.translators.pop();
                this.handleSearchChangeTranslators(null, {searchQuery});
            }

        } else {
            this.setState({showModalAddAuthor: false});
        }
    };

    isCreatedPH = (flag, searchQuery) => {
        if (flag) {
            this.handleSearchChangePublishingHouse(null, {searchQuery});
        } else {
            this.setState({showModalAddPH: false});
        }
    };

    removeThumbnailUrl = () => {
        this.setState({thumbnailUrl: null,})
    };

    removePictureUrl = () => {
        this.setState({pictureUrl: null,})
    };

    removePdfUrl = () => {
        this.setState({pdfUrl: null,})
    };

    removeEpubUrl = () => {
        this.setState({pictureUrl: null,})
    };


    isDisableButton = () => {
        return this.isValidISBN().value &&
            this.isValidCount().value &&
            this.isValidRating().value &&
            this.isValidAgeRestriction().value &&
            this.isValidTitle().value &&
            this.isValidGenres().value &&
            this.isValidDescription().value &&
            this.isValidLanguage().value &&
            this.isValidPages().value &&
            this.isValidSize().value &&
            this.isValidThumbnail().value &&
            this.isValidPicture().value &&
            (this.state.id || (
            this.state.languageWasChanged &&
            this.state.titleWasChanged &&
            this.state.descriptionWasChanged &&
            this.state.genresWasChanged &&
            this.state.thumbnailUrlWasChanged &&
            this.state.pictureUrlWasChanged));
    };

    getBookTypes = () => {
        let array = getStrings().bookType;
        return array.map(type => (
            <Form.Radio
                label={type[1].name}
                value={type[0]}
                checked={this.state.type === type[0]}
                onChange={this.handleChangeType}
            />
        ))
    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);

        const notFound = (
            <Message
                warning
                header={strings.error.book.notFound}
                content={this.state.errorText}
            />);

        const error = (
            <Message
                warning
                header={strings.error.error}
                content={this.state.errorText}
            />);

        return (
            <React.Fragment>
                {this.state.notFound?notFound:false}
                {this.state.errorAlert?error:false}
                <ModalYesNo size='tiny' header={this.state.header} content={this.state.content}
                            open={this.state.showModal} openClose={this.openClose}
                            isConfirmed={this.state.modalAction}/>
                <Container>
                    <Form id='bookEdit'>

                        <Dropdown

                            id="bookLangDropdown"
                            button
                            className='icon'
                            floating
                            labeled
                            icon='world'
                            options={this.state.languageList}
                            text={this.state.language === null ? strings.book.lang : this.state.language.name}
                            onChange={this.handleChangeLanguage}
                            error={!this.isValidLanguage().value}
                        />
                        {this.isValidLanguage().value ? false : this.isValidLanguage(strings.error.book.language).message}


                        <Form.Field
                            label={strings.book.title}
                            control={Input}
                            placeholder={strings.book.title}
                            value={this.state.title}
                            onChange={this.handleChangeTitle}
                            error={!this.isValidTitle().value}/>
                        {this.isValidTitle().value ? false : this.isValidTitle(strings.error.book.title).message}

                        <Form.Field
                            label={strings.book.description}
                            control={TextArea}
                            placeholder={strings.book.description}
                            value={this.state.description}
                            onChange={this.handleChangeDescription}
                            error={!this.isValidDescription().value}/>
                        {this.isValidDescription().value ? false : this.isValidDescription(strings.error.book.description).message}

                        <Form.Group>
                            <div className="threeFour">
                                <Form.Field
                                    label={strings.book.authors}
                                    control={Dropdown}

                                    lazyLoad
                                    multiple
                                    clearable
                                    onChange={this.handleChangeAuthors}
                                    onSearchChange={this.handleSearchChangeAuthors}
                                    options={this.state.authorList}
                                    placeholder={strings.book.authors}
                                    search
                                    searchQuery={this.state.authorSearchString}
                                    selection
                                    value={this.state.authors}
                                    allowAdditions
                                    additionLabel={<i style={{color: 'red'}}>{strings.book.createNew}</i>}
                                    onAddItem={this.openCloseAddAuthor}
                                />
                            </div>

                            <div className="oneFour">
                                <Form.Field
                                    label={strings.book.genres}
                                    control={Dropdown}

                                    lazyLoad
                                    multiple
                                    clearable
                                    onChange={this.handleChangeGenres}
                                    onSearchChange={this.handleSearchChangeGenres}
                                    options={this.state.genreList}
                                    placeholder={strings.book.genres}
                                    search
                                    searchQuery={this.state.genreSearchString}
                                    selection
                                    value={this.state.genres}
                                    allowAdditions
                                    additionLabel={<i style={{color: 'red'}}>{strings.book.createNew}</i>}
                                    onAddItem={this.handleAdditionGenre}
                                    error={!this.isValidGenres().value}/>
                                {this.isValidGenres().value ? false : this.isValidGenres(strings.error.book.genres).message}
                            </div>

                        </Form.Group>
                        <AddAuthorModal size='tiny' open={this.state.showModalAddAuthor} type={this.state.authorType}
                                        openClose={this.openCloseAddAuthor} isCreated={this.isCreatedAuthor}/>
                        <Form.Group>
                            <div className="threeFour">
                                <Form.Field
                                    label={strings.book.translators}
                                    control={Dropdown}

                                    lazyLoad
                                    multiple
                                    clearable
                                    onChange={this.handleChangeTranslators}
                                    onSearchChange={this.handleSearchChangeTranslators}
                                    options={this.state.translatorList}
                                    placeholder={strings.book.translators}
                                    search
                                    searchQuery={this.state.translatorSearchString}
                                    selection
                                    value={this.state.translators}
                                    allowAdditions
                                    additionLabel={<i style={{color: 'red'}}>{strings.book.createNew}</i>}
                                    onAddItem={this.openCloseAddTranslator}
                                />
                            </div>

                            <div className="oneFour">
                                <Form.Field
                                    label={strings.book.year}
                                    control={Dropdown}
                                    lazyLoad

                                    clearable
                                    onChange={this.handleChangeYear}
                                    options={this.state.yearList}
                                    placeholder={strings.book.year}
                                    selection
                                    value={this.state.year}
                                />
                            </div>

                        </Form.Group>

                        <Form.Group>
                            <div className="threeFour">
                                <Form.Field

                                    label={strings.book.ageRestriction}
                                    control={Input}
                                    placeholder={strings.book.ageRestriction}
                                    value={this.state.ageRestriction}
                                    onChange={this.handleChangeAgeRestriction}
                                    error={!this.isValidAgeRestriction().value}/>
                                {this.isValidAgeRestriction().value ? false : this.isValidAgeRestriction(strings.error.book.ageRestriction).message}
                            </div>

                            <div className="oneFour">
                                <Form.Field
                                    label={strings.book.rating}
                                    control={Input}
                                    type='number'
                                    pattern='\d*'
                                    min={0}
                                    max={100}
                                    step={1}
                                    placeholder={strings.book.rating}
                                    value={this.state.rating}
                                    onChange={this.handleChangeRating}
                                    error={!this.isValidRating().value}/>
                                {this.isValidRating().value ? false : this.isValidRating(strings.error.book.rating).message}
                            </div>
                        </Form.Group>

                        <FileDropBox
                            label={strings.book.thumbnail}
                            accepts={['image/*']}
                            defFileUrl={this.state.thumbnailUrl}
                            removeFile={this.removeThumbnailUrl}
                            handleChangeFile={this.handleChangeThumbnailFile}
                            textBox={strings.news.selectFile}
                        />
                        {this.isValidThumbnail().value ? false : this.isValidThumbnail(strings.error.book.thumbnail).message}

                        <FileDropBox
                            label={strings.book.picture}
                            accepts={['image/*']}
                            defFileUrl={this.state.pictureUrl}
                            removeFile={this.removePictureUrl}
                            handleChangeFile={this.handleChangePictureFile}
                            textBox={strings.book.selectFile}
                        />
                        {this.isValidPicture().value ? false : this.isValidPicture(strings.error.book.picture).message}

                        <FileDropBox
                            label={strings.book.pdf}
                            accepts={['.pdf']}
                            defFileUrl={this.state.pdfUrl}
                            removeFile={this.removePdfUrl}
                            handleChangeFile={this.handleChangePdfFile}
                            textBox={strings.book.selectFile}
                        />
                        <Form.Group inline>
                            <label>{strings.book.type}</label>
                            {this.getBookTypes()}
                        </Form.Group>

                        <Form.Group>
                            <div className='halfScreen'>
                                <Form.Field
                                    type='number'
                                    min={0}
                                    max={100000}
                                    label={strings.book.weight}
                                    control={Input}
                                    placeholder={strings.book.weight}
                                    value={this.state.weight}
                                    onChange={this.handleChangeWeight}/>
                            </div>


                            <div className='halfScreen'>
                                <Form.Field
                                    label={strings.book.size}
                                    control={Input}
                                    placeholder={strings.book.size}
                                    value={this.state.size}
                                    onChange={this.handleChangeSize}
                                    error={!this.isValidSize().value}/>
                                {this.isValidSize().value ? false : this.isValidSize(strings.error.book.size).message}
                            </div>

                        </Form.Group>
                        <Form.Group>
                            <div className='halfScreen'>
                                <Form.Input
                                    label={strings.book.pages}
                                    type='number'
                                    step={1}
                                    min={0}
                                    max={10000}
                                    placeholder={strings.book.pages}
                                    value={this.state.pages}
                                    onChange={this.handleChangePages}
                                    error={!this.isValidPages().value}/>
                                {this.isValidPages().value ? false : this.isValidPages(strings.error.book.pages).message}
                            </div>

                            <div className='halfScreen'>
                                <Form.Input
                                    type='number'
                                    step={1}
                                    min={0}
                                    max={1000}
                                    label={strings.book.count}
                                    placeholder={strings.book.count}
                                    value={this.state.count}
                                    onChange={this.handleChangeCount}
                                    error={!this.isValidCount().value}/>
                                {this.isValidCount().value ? false : this.isValidCount(strings.error.book.count).message}
                            </div>


                        </Form.Group>
                        <Form.Group>
                            <Form.Dropdown
                                lazyLoad
                                width={8}
                                label={strings.book.publishingHouse}
                                fluid
                                clearable
                                onChange={this.handleChangePublishingHouse}
                                onSearchChange={this.handleSearchChangePublishingHouse}
                                options={this.state.publishingHouseList}
                                placeholder={strings.book.publishingHouse}
                                search
                                searchQuery={this.state.publishingHouseSearchString}
                                selection
                                value={this.state.publishingHouse}
                                allowAdditions
                                additionLabel={<i style={{color: 'red'}}>{strings.book.createNew}</i>}
                                onAddItem={this.openCloseAddPH}
                            />
                            <AddPHModal size='tiny' open={this.state.showModalAddPH} openClose={this.openCloseAddPH}
                                        isCreated={this.isCreatedPH} title={this.state.publishingHouseSearchString}/>
                            <div className='halfScreen'>
                                <Form.Input
                                    label={strings.book.isbn}
                                    placeholder={strings.book.isbn}
                                    value={this.state.isbn}
                                    onChange={this.handleChangeISBN}
                                    error={!this.isValidISBN().value}/>
                                {this.isValidISBN().value ? false : this.isValidISBN(strings.error.book.isbn).message}
                            </div>

                        </Form.Group>

                        <Form.Group>
                            <Form.Dropdown
                                lazyLoad
                                width={8}
                                label={strings.book.producer}
                                fluid
                                clearable
                                onChange={this.handleChangeProducer}
                                onSearchChange={this.handleSearchChangeProducer}
                                options={this.state.producerList}
                                placeholder={strings.book.producer}
                                search
                                searchQuery={this.state.producerSearchString}
                                selection
                                value={this.state.producer}
                                allowAdditions
                                additionLabel={<i style={{color: 'red'}}>{strings.book.createNew}</i>}
                                onAddItem={this.handleAdditionProducer}
                            />
                            <Form.Dropdown
                                lazyLoad
                                width={8}
                                label={strings.book.importer}
                                fluid
                                clearable
                                onChange={this.handleChangeImporter}
                                onSearchChange={this.handleSearchChangeImporter}
                                options={this.state.importerList}
                                placeholder={strings.book.producer}
                                search
                                searchQuery={this.state.importerSearchString}
                                selection
                                value={this.state.importer}
                                allowAdditions
                                additionLabel={<i style={{color: 'red'}}>{strings.book.createNew}</i>}
                                onAddItem={this.handleAdditionImporter}
                            />
                        </Form.Group>
                        <Form.Checkbox
                            label={strings.book.inLibraryUseOnly}
                            checked={this.state.inLibraryUseOnly}
                            onClick={this.handleChangeInLibraryUseOnly}
                        />
                        <div className='bottomButtons'>
                            <Button
                                content={strings.book.save}
                                icon='save'
                                labelPosition='right'
                                disabled={!this.isDisableButton()}
                                onClick={this.handleButtonSubmit}
                            />
                            {this.state.id ?
                                <Button
                                    color='green'
                                    content={strings.book.toBook}
                                    icon='right arrow'
                                    labelPosition='right'
                                    as={Link}
                                    to={'/book/' + this.state.id}
                                />
                                : false}
                        </div>
                    </Form>
                </Container>
            </React.Fragment>
        );
    }
}

class AddPHModal extends Component {
    state = {
        title: '',
        siteLink: '',
        description: '',
    };

    componentWillReceiveProps(nextProps) {
        this.setState({title: nextProps.title})
    }

    handleChangeTitle = (event, {value}) => {
        this.setState({title: value, titleWasChanged: true});
    };

    isValidTitle = (text) => {
        if (!this.state.titleWasChanged) return {value: true};
        let title = this.state.title;

        let message = (<p className='errorMsg'>{text + title.length}</p>);
        let value = true;

        if (!title) {
            value = false;
        } else {
            if (title.length === 0) {
                value = false;
            }

            if (title.length > 40) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeDesc = (event, {value}) => {
        this.setState({description: value, descriptionWasChanged: true});
    };

    isValidDesc = (text) => {
        if (!this.state.descriptionWasChanged || !this.state.description) return {value: true};
        let description = this.state.description;

        let message = (<p className='errorMsg'>{text + description.length}</p>);
        let value = true;

        if (!description) {
            value = false;
        } else {
            if (description.length === 0) {
                value = false;
            }

            if (description.length > 600) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeSiteLink = (event, {value}) => {
        this.setState({siteLink: value, siteLinkWasChanged:true});
    };

    isValidSiteLink = (text) => {
        if (!this.state.siteLinkWasChanged || !this.state.siteLink) return {value: true};
        let siteLink = this.state.siteLink;

        let message = (<p className='errorMsg'>{text + siteLink.length}</p>);
        let value = true;

        if (!siteLink) {
            value = false;
        } else {
            if (siteLink.length === 0) {
                value = false;
            }

            if (siteLink.length > 255) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    successCreated = () => {
        this.props.isCreated(true, this.state.title);
        this.props.openClose();
    };

    createPH = () => {
        axios({
            method: 'POST',
            url: BACK_END_SERVER_URL + '/book/publishingHouse',
            headers: {
                'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                'Content-type': 'application/json',
                'Accept-Language': getLang()
            },
            data: {
                title: this.state.title === '' ? null : this.state.title,
                description: this.state.description === '' ? null : this.state.description,
                wikiLink: this.state.wikiLink === '' ? null : this.state.wikiLink,
            }
        })
            .then(res => {
                this.successCreated();
            })
            .catch((error) => {

            });


    };

    isDisabled = () => {
        return this.isValidTitle().value &&
            this.isValidDesc().value &&
            this.isValidSiteLink().value &&
            (this.state.titleWasChanged);
    };

    render() {
        let strings = getStrings();
        return (
            <Modal id='modal' size={this.props.size} open={this.props.open} onClose={this.props.openClose}>
                <Modal.Header>{strings.modal.publishingHouse.header}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Input
                                fluid
                                label={strings.modal.publishingHouse.title}
                                placeholder={strings.modal.publishingHouse.title}
                                value={this.state.title}
                                onChange={this.handleChangeTitle}
                                error={!this.isValidTitle().value}/>
                            {this.isValidTitle().value ? false : this.isValidTitle(strings.modal.publishingHouse.errorTitle).message}
                            <Form.TextArea
                                label={strings.modal.publishingHouse.description}
                                placeholder={strings.modal.publishingHouse.description}
                                value={this.state.description}
                                onChange={this.handleChangeDesc}
                                error={!this.isValidDesc().value}/>
                            {this.isValidDesc().value ? false : this.isValidDesc(strings.modal.publishingHouse.errorDescription).message}
                            <Form.Input
                                fluid
                                label={strings.modal.publishingHouse.siteLink}
                                placeholder={strings.modal.publishingHouse.siteLink}
                                value={this.state.siteLink}
                                onChange={this.handleChangeSiteLink}
                                error={!this.isValidSiteLink().value}/>
                            {this.isValidSiteLink().value ? false : this.isValidSiteLink(strings.modal.publishingHouse.errorSiteLink).message}
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.openClose}>{strings.modal.cancel}</Button>
                    <Button positive icon='checkmark' labelPosition='right' content={strings.modal.create} onClick={this.createPH} disabled={!this.isDisabled()}/>
                </Modal.Actions>
                <Modal.Actions>
                </Modal.Actions>
            </Modal>
        );
    }
}

class AddAuthorModal extends Component {

    state = {
        firstName: '',
        lastName: '',
        description: '',
        wikiLink: '',
    };

    handleChangeFirstName = (event, {value}) => {
        this.setState({firstName: value, firstNameWasChanged: true});
    };

    isValidFirstName = (text) => {
        if (!this.state.firstNameWasChanged) return {value: true};
        let firstName = this.state.firstName;

        let message = (<p className='errorMsg'>{text + firstName.length}</p>);
        let value = true;

        if (!firstName) {
            value = false;
        } else {
            if (firstName.length === 0) {
                value = false;
            }

            if (firstName.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeLastName = (event, {value}) => {
        this.setState({lastName: value, lastNameWasChanged:true});
    };

    isValidLastName = (text) => {
        if (!this.state.lastNameWasChanged) return {value: true};
        let lastName = this.state.lastName;

        let message = (<p className='errorMsg'>{text + lastName.length}</p>);
        let value = true;

        if (!lastName) {
            value = false;
        } else {
            if (lastName.length === 0) {
                value = false;
            }

            if (lastName.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeDesc = (event, {value}) => {
        this.setState({description: value, descriptionWasChanged:true});
    };

    isValidDesc = (text) => {
        let description = this.state.description;
        if (!this.state.descriptionWasChanged || !description) return {value: true};

        let message = (<p className='errorMsg'>{text + description.length}</p>);
        let value = true;

        if (!description) {
            value = false;
        } else {
            if (description.length === 0) {
                value = false;
            }

            if (description.length > 500) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeWikiLink = (event, {value}) => {
        this.setState({wikiLink: value, wikiLinkWasChanged:true});
    };

    isValidWikiLink = (text) => {
        let wikiLink = this.state.wikiLink;
        if (!this.state.wikiLinkWasChanged || !wikiLink) return {value: true};


        let message = (<p className='errorMsg'>{text + wikiLink.length}</p>);
        let value = true;

        if (!wikiLink) {
            value = false;
        } else {
            if (wikiLink.length === 0) {
                value = false;
            }

            if (wikiLink.length > 255) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    successCreated = () => {
        this.props.isCreated(true, this.state.firstName + ' ' + this.state.lastName, this.props.type);
        this.props.openClose();
    };

    createAuthor = () => {
        axios({
            method: 'POST',
            url: BACK_END_SERVER_URL + '/book/author',
            headers: {
                'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                'Content-type': 'application/json',
                'Accept-Language': getLang()
            },
            data: {
                firstName: this.state.firstName === '' ? null : this.state.firstName,
                lastName: this.state.lastName === '' ? null : this.state.lastName,
                description: this.state.description === '' ? null : this.state.description,
                wikiLink: this.state.wikiLink === '' ? null : this.state.wikiLink,
            }
        })
            .then(res => {
                this.successCreated();
            })
            .catch(({response}) => {
                this.setState({errorText: response.data.message});
            });


    };

    isDisabled = () => {
        return this.isValidWikiLink().value &&
            this.isValidDesc().value &&
            this.isValidLastName().value &&
            this.isValidFirstName().value &&
            (this.state.firstNameWasChanged || this.state.lastNameWasChanged);
    };

    render() {
        let strings = getStrings();
        return (
            <Modal id='modal' size={this.props.size} open={this.props.open} onClose={this.props.openClose}>
                <Modal.Header>{strings.modal.author.header}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Group>
                                <div className='halfWindow'>
                                    <Form.Input
                                        fluid
                                        label={strings.modal.author.firstName}
                                        placeholder={strings.modal.author.firstName}
                                        value={this.state.firstName}
                                        onChange={this.handleChangeFirstName}
                                        error={!this.isValidFirstName().value}/>
                                    {this.isValidFirstName().value ? false : this.isValidFirstName(strings.modal.author.errorFirstName).message}
                                </div>

                                <div className='halfWindow'>
                                    <Form.Input
                                        fluid
                                        label={strings.modal.author.lastName}
                                        placeholder={strings.modal.author.lastName}
                                        value={this.state.lastName}
                                        onChange={this.handleChangeLastName}
                                        error={!this.isValidLastName().value}/>
                                    {this.isValidLastName().value ? false : this.isValidLastName(strings.modal.author.errorLastName).message}
                                </div>


                            </Form.Group>
                            <Form.TextArea
                                label={strings.modal.author.description}
                                placeholder={strings.modal.author.description}
                                value={this.state.description}
                                onChange={this.handleChangeDesc}
                                error={!this.isValidDesc().value}/>
                            {this.isValidDesc().value ? false : this.isValidDesc(strings.modal.author.errorDescription).message}

                            <Form.Input
                                fluid
                                label={strings.modal.author.wikiLink}
                                placeholder={strings.modal.author.wikiLink}
                                value={this.state.wikiLink}
                                onChange={this.handleChangeWikiLink}
                                error={!this.isValidWikiLink().value}/>
                            {this.isValidWikiLink().value ? false : this.isValidWikiLink(strings.modal.author.errorWikiLink).message}
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.openClose}>{strings.modal.cancel}</Button>
                    <Button
                        positive
                            icon='checkmark'
                            labelPosition='right'
                            content={strings.modal.author.create}
                            onClick={this.createAuthor}
                            disabled={!this.isDisabled()}/>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default BookEdit;
