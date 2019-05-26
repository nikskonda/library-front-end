import React, {Component} from 'react';
import "./AdminMenu.css";
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';
import {DEFAULT_L10N_LANGUAGE, LOCAL_STORAGE_UI_LANGUAGE} from "../../context";


class AdminHome extends Component {

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        return (
            <h1>{strings.adminMenu.welcome}</h1>
        );
    };
}

export default AdminHome;
