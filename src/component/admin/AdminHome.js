import React, {Component} from 'react';
import "./AdminMenu.css";
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';
import {LOCAL_STORAGE_UI_LANGUAGE} from "../../context";


class AdminHome extends Component {

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, ''));
        return (
            <h1>{strings.adminMenu.welcome}</h1>
        );
    };
}

export default AdminHome;
