import React, {Component} from 'react';
import axios from "axios";
import Language from "./Language";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_BOOK_LANGUAGE, LOCAL_STORAGE_UI_LANGUAGE} from "../../context";

class LanguageTumbler extends Component {


    constructor(props) {
        super(props);
        this.state = {
            languageList: null
        }
    }

    componentWillMount() {
        axios
            .get(BACK_END_SERVER_URL + `/language`)
            .then(res => {
                let array = [];
                res.data.map((lang) => array.push(
                    {
                        key: lang.tag,
                        text: lang.name,
                        value: lang
                    }
                ));
                this.setState({languageList: array});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let body =
            (<React.Fragment>
                <span>
                     <Language
                         buttonName={'UI language'}
                         languageList={this.state.languageList}
                         localStorage={LOCAL_STORAGE_UI_LANGUAGE}/>
                    <Language
                        buttonName={'Book language'}
                        languageList={this.state.languageList}
                        localStorage={LOCAL_STORAGE_BOOK_LANGUAGE}/>
                </span>

            </React.Fragment>);
        return this.state.languageList !== null ? body : false;
    }
}


export default LanguageTumbler;
