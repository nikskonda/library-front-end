import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import {DEFAULT_LANGUAGE} from "../context";

class Language extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonName: props.buttonName,
            langs: props.langs,
            localStorage: props.localStorage,
            selectedLang: null
        };
        this.changeLang = this.changeLang.bind(this);
        this.getLanguageFromLocalStorage = this.getLanguageFromLocalStorage.bind(this);
        this.setState({selectedLang: this.getLanguageFromLocalStorage()});
    }

    getLanguageFromLocalStorage() {
        let selectedLang = this.parseJSONfromLocalStorage(this.state.localStorage);
        if (selectedLang === null) {
            if (this.state.langs !== null) {
                for (let i = 0; i < this.state.langs.length; i++)
                    if (this.state.langs[i].name === DEFAULT_LANGUAGE) {
                        localStorage.setItem(this.state.localStorage, JSON.stringify(this.state.langs[i]));
                        break;
                    }
            }
            selectedLang = this.parseJSONfromLocalStorage(this.state.localStorage);
        }
        return selectedLang;
    }

    changeLang(lang) {
        localStorage.setItem(this.state.localStorage, JSON.stringify(lang));
        window.location.reload();
        // this.setState({selectedLang: lang})
    }

    parseJSONfromLocalStorage(name) {
        let entity = localStorage.getItem(name);
        if (entity === null || entity === undefined) {
            return null;
        } else {
            try {
                return JSON.parse(entity);
            } catch (e) {
                return null;
            }
        }
    }

    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    {this.state.buttonName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.state.langs !== null ? this.state.langs.map(lang =>
                        <Dropdown.Item
                            key={lang.id}
                            onClick={()=>this.changeLang(lang)}
                            active={this.state.selectedLang !== null && this.state.selectedLang.name === lang.name ? true : false}
                        >
                            {lang.name}
                        </Dropdown.Item>
                    ) : false}
                </Dropdown.Menu>
            </Dropdown>
            // <div className="dropdown">
            //     <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
            //         {lang !== null ? lang.name : false}
            //         <span className="caret"></span>
            //     </button>
            //     <ul className="dropdown-menu">
            //         {this.state.langs !== null ? this.state.langs.map(lang => <li key={lang.id}><a onClick={this.changeLang(lang)}> {lang.name} </a></li>) : false}
            //     </ul>
            // </div>
        );
    }
}


export default Language;
