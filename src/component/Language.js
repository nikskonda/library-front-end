import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react'
import {DEFAULT_LANGUAGE_TAG} from "../context";

class Language extends Component {


    state = {
        buttonName: this.props.buttonName,
        languageList: this.props.languageList,
        localStorage: this.props.localStorage,
        selectedLang: null
    };

    componentWillMount() {
        let lang = localStorage.getItem(this.state.localStorage);
        if (lang === null || lang === undefined){
            localStorage.setItem(this.state.localStorage, JSON.stringify((this.state.languageList.find((lang) => lang.key === DEFAULT_LANGUAGE_TAG)).value));
            lang = localStorage.getItem(this.state.localStorage);
        }
        this.setState({selectedLang: JSON.parse(lang)});
    };

    handleChangeLanguage = (e, {value}) => {
        if (value !== this.state.selectedLang){
            localStorage.setItem(this.state.localStorage, JSON.stringify(value));
            this.setState({selectedLang: value});
            window.location.reload();
        }

    };


    render() {
        return (
            <Dropdown
                button
                className='icon'
                floating
                icon='world'
                options={this.state.languageList}
                text={this.state.buttonName}
                onChange={this.handleChangeLanguage}
            />
        );
    }
}


export default Language;
