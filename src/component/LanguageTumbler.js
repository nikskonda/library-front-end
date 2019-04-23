import React, {Component} from 'react';
import axios from "axios";
import Language from "./Language";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_BOOK_LANGUAGE, LOCAL_STORAGE_UI_LANGUAGE} from "../context";

class LanguageTumbler extends Component {


    constructor(props) {
        super(props);
        this.state = {
            langs: null
        }
    }

    componentWillMount() {
        axios
            .get(BACK_END_SERVER_URL+`/language`)
            .then(res => {
                this.setState({langs: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        let body =
            (<React.Fragment>
                <span>
                    <Language buttonName={'UI language'} langs={this.state.langs} localStorage={LOCAL_STORAGE_UI_LANGUAGE}/>
                </span>
                <span style={{marginRight: 20}}>
                    <Language buttonName={'Book language'}langs={this.state.langs} localStorage={LOCAL_STORAGE_BOOK_LANGUAGE}/>
                </span>
            </React.Fragment>);
        return this.state.langs !== null ? body : false;
    }
}


export default LanguageTumbler;