import React, {Component} from 'react';
import axios from "axios/index";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE
} from "../../context";
import {Button, Container, Dropdown, Form, Message, TextArea} from "semantic-ui-react";
import './NewsEdit.css'
import FileDropBox from "../FileDropBox";
import {Link} from "react-router-dom";
import {getLang, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

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

class NewsEdit extends Component {

    state = {
        id: this.props.match.params.newsId,
        language: null,
        title: '',
        text: '',
        creationDate: null,
        modificationDate: null,
        pictureUrl: null,
        thumbnailUrl: null,
        creator: null,

        picture: null,
        thumbnail: null,


        languageWasChanged: false,
        titleWasChanged: false,
        textWasChanged: false,
        thumbnailUrlWasChanged: false,
        pictureUrlWasChanged: false,


    };

    componentWillMount() {
        if (this.state.id) {
            this.loadNews(this.state.id);
        }
    }

    loadNews = (id) => {
        axios
            .get(BACK_END_SERVER_URL + `/news/` + this.state.id,
                {
                    headers: {
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                this.setState({
                    language: res.data.language,
                    title: res.data.title,
                    text: res.data.text,
                    pictureUrl: res.data.pictureUrl,
                    thumbnailUrl: res.data.thumbnailUrl,
                });
            })
            .catch(({response}) => {
                this.setState({errorText: response.data.message});
            });
    };

    componentDidMount = () => {
        this.loadLanguageList();
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

    handleChangeText = (event, {value}) => {
        this.setState({text: value, textWasChanged: true});
    };

    isValidText = (txt) => {
        if (!this.state.textWasChanged) return {value: true};
        let text = this.state.text;

        let message = (<p className='errorMsg'>{txt + text.length}</p>);
        let value = true;

        if (!text) {
            value = false;
        } else {
            if (text.length === 0) {
                value = false;
            }

            if (text.length > 10000) {
                value = false;
            }
        }

        return {value: value, message: message};
    };

    loadLanguageList = () => {
        axios
            .get(BACK_END_SERVER_URL + `/language`)
            .then(res => {
                let array = [];
                res.data.map(l => array.push({key: l.id, text: l.name, value: l}));
                this.setState({languageList: array});
            })
            .catch(({response}) => {
                this.setState({errorText: response.data.message});
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
                this.setState({errorText: response.data.message});
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
                this.setState({errorText: response.data.message});
            });
    };

    wasChanged = () => {
        if (this.state.id){
            return this.state.languageWasChanged ||
                this.state.titleWasChanged ||
                this.state.textWasChanged ||
                this.state.thumbnailUrlWasChanged ||
                this.state.pictureUrlWasChanged;
        }
        return this.state.languageWasChanged &&
            this.state.titleWasChanged &&
            this.state.textWasChanged &&
            this.state.thumbnailUrlWasChanged &&
            this.state.pictureUrlWasChanged;
    };


    handleButtonSubmit = () => {
        let url = this.state.id ? '/news/' + this.state.id : '/news';
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
                text: this.state.text,
                pictureUrl: this.state.pictureUrl,
                thumbnailUrl: this.state.thumbnailUrl,
            }
        })
            .then(res => {
                this.setState({id: res.data.id});
            })
            .catch(({response}) => {
                this.setState({errorText: response.data.message});
            });
    };

    removeThumbnailUrl = () => {
        this.setState({thumbnailUrl: null,})
    };

    removePictureUrl = () => {
        this.setState({pictureUrl: null,})
    };

    isDisableButton = () => {
        return this.isValidPicture().value && this.isValidThumbnail().value && this.isValidText().value && this.isValidLanguage().value && this.isValidTitle().value && this.wasChanged()
    };



    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        return (
            <Container>
                {this.state.errorText ?
                    <Message
                        warning
                        header={strings.news.notFound}
                        content={this.state.errorText}
                    />
                    : false}

                <Form id='newsEdit'>
                    <Form.Field
                        id='newsLangDropdown'
                        error={!this.isValidLanguage().value}
                        as={Dropdown}
                        button
                        className='icon'
                        floating
                        labeled
                        icon='world'
                        options={this.state.languageList}
                        text={this.state.language === null ? strings.news.lang: this.state.language.name}
                        onChange={this.handleChangeLanguage}
                    />
                    {this.isValidLanguage().value ? false : this.isValidLanguage(strings.error.news.language).message}

                    <Form.Input
                        label={strings.news.title}
                        placeholder={strings.news.title}
                        value={this.state.title}
                        onChange={this.handleChangeTitle}
                        error={!this.isValidTitle().value}
                    />
                    {this.isValidTitle().value ? false : this.isValidTitle(strings.error.news.title).message}


                    <Form.Field
                        label={strings.news.text}
                        control={TextArea}
                        placeholder={strings.news.text}
                        value={this.state.text}
                        onChange={this.handleChangeText}
                        error={!this.isValidText().value}
                    />
                    {this.isValidText().value ? false : this.isValidText(strings.error.news.text).message}

                    <FileDropBox
                        label={strings.news.thumbnail}
                        accepts={['image/*']}
                        defFileUrl={this.state.thumbnailUrl}
                        removeFile={this.removeThumbnailUrl}
                        handleChangeFile={this.handleChangeThumbnailFile}
                        textBox={strings.news.selectFile}
                    />

                    {this.isValidThumbnail().value ? false : this.isValidThumbnail(strings.error.news.thumbnail).message}

                    <FileDropBox
                        label={strings.news.picture}
                        accepts={['image/*']}
                        defFileUrl={this.state.pictureUrl}
                        removeFile={this.removePictureUrl}
                        handleChangeFile={this.handleChangePictureFile}
                        textBox={strings.news.selectFile}
                    />

                    {this.isValidPicture().value ? false : this.isValidPicture(strings.error.news.picture).message}

                    <div className='bottomButtons'>
                        <Button
                            content={strings.news.save}
                            icon='save'
                            labelPosition='right'
                            disabled={!this.isDisableButton()}
                            onClick={this.handleButtonSubmit}
                        />
                        {this.state.id ?
                            <Button
                                color='green'
                                content={strings.news.toNews}
                                icon='right arrow'
                                labelPosition='right'
                                as={Link}
                                to={'../../../news/' + this.state.id}
                            />
                            : false}
                    </div>

                </Form>
            </Container>
        );
    }

}

export default NewsEdit;
