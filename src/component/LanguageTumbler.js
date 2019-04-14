import React, {Component} from 'react';
import axios from "axios";
import Language from "./Language";

class LanguageTumbler extends Component {


    constructor(props) {
        super(props);
        this.state = {
            langs: null
        }
    }

    componentWillMount() {
        axios
            .get(`http://localhost:8888/language`)
            .then(res => {
                this.setState({langs: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        let body =
            (<div>
                <span>
                    UI language:
                    <Language langs={this.state.langs} localStorage={'uiLang'}/>
                </span>
                <span>
                    BOOK language:
                    <Language langs={this.state.langs} localStorage={'bookLang'}/>
                </span>
            </div>);
        return this.state.langs !== null ? body : false;
    }
}


export default LanguageTumbler;