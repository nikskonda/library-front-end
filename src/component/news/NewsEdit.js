import React, {Component} from 'react';
import axios from "axios/index";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, URL_DOWNLOAD_FILE} from "../../context";
// https://react.semantic-ui.com
import {Button, Container, Dropdown, Form, Image, Input, TextArea} from "semantic-ui-react";
import './NewsEdit.css'


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
    };

    componentWillMount(){
        if (this.state.id){
            this.loadNews(this.state.id);
        }
    }

    loadNews = (id) => {
        axios
            .get(BACK_END_SERVER_URL + `/news/`+this.state.id,
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
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount = () => {
        this.loadLanguageList();
    };

    handleChangeLanguage = (event, {value}) => {
        this.setState({language: value});
    };


    handleChangeTitle = (event, {value}) => {
        this.setState({title: value});
    };

    handleChangeText = (event, {value}) => {
        this.setState({text: value});
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


    handleChangePictureFile = (event) => {
        this.setState({picture: event.target.files[0]});
    };

    handleChangeThumbnailFile = (event) => {
        this.setState({thumbnail: event.target.files[0]});
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

    handleButtonSubmit = () => {
        let url = this.state.id ? '/userList/'+this.state.id : '/userList';
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
                text: this.state.text,
                pictureUrl: this.state.pictureUrl,
                thumbnailUrl: this.state.thumbnailUrl, }
        })
            .then(res => {
                console.log("success id="+res.data.id);
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
                            label='text'
                            control={TextArea}
                            placeholder="text"
                            value={this.state.text}
                            onChange={this.handleChangeText}/>
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

                    <Button size='big' color='purple' fluid onClick={this.handleButtonSubmit}>Create NEWS!!!!</Button>
                </Form>
            </Container>
        );
    }

}


export default NewsEdit;

