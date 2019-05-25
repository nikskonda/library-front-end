import React, {Component} from "react";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, URL_DOWNLOAD_FILE} from "../context";
import Files from "react-files";
import {Icon, Image} from "semantic-ui-react";
import './fileDropBox.css'

class FileDropBox extends Component {

    state = {
        firstFile: null,
        errorMsg: null,
    };

    loadToServer = () => {
        if (this.state.firstFile){
            let data = new FormData();
            data.append('file', this.state.firstFile);
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
                    console.log('@:'+res.data.fileName);
                })
                .catch(function (error) {
                    return error;
                });
        }
        else {
            if (this.props.defFileUrl){
                return this.props.defFileUrl;
            }
            else {
                return null;
            }
        }

    };

    onFilesChange = (files) => {
        this.setState({firstFile: files[files.length-1]},
            this.props.handleChangeFile(files[files.length-1]));

    };

    onFilesError = (error) => {
        console.log('error code ' + error.code + ': ' + error.message);
        this.setState({errorMsg: error.message});
    };

    clear = () => {
        this.setState({firstFile: null});
        this.props.removeFile();
    };

    isImg = () => {
        let accepts = this.props.accepts;
        for (let i=0; i<accepts.length; i++){
            if (accepts[i].includes('image')) return true;
        }
        return false;
    }

    render() {
        return (
            <div className='field'>
                {this.props.label ? <label>{this.props.label}</label> : false}
                <div className='fileDropBox'>
                    <Files
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        accepts={this.props.accepts}
                        //accepts={['image/*', '.pdf', 'audio/*']}
                        maxFile={1}
                        maxFileSize={10000000}
                        minFileSize={0}
                        clickable
                    >
                        {this.state.firstFile ?
                            <React.Fragment>
                                <Icon name='close' onClick={this.clear}/>
                                {this.isImg()?
                                <Image src={this.state.firstFile.preview.url} size='small'/>:
                                <Icon name='file pdf' size='massive' color='black'/>}
                            </React.Fragment>
                            :
                            (this.props.defFileUrl ?
                                    <React.Fragment>
                                        <Icon name='close' onClick={this.clear}/>
                                        {this.isImg()?
                                        <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + this.props.defFileUrl} size='small'/>:
                                        <Icon name='file pdf' size='massive' color='black'/>}
                                    </React.Fragment>
                                    :
                                    <div>
                                        <div>
                                            {this.props.textBox}
                                        </div>
                                        {this.state.errorMsg ?
                                            <div className='errorMsg'>{this.state.errorMsg}</div> : false}
                                    </div>
                            )}
                    </Files>

                </div>
            </div>);
    }
}

export default FileDropBox;