import React, {Component} from 'react';
import {Dropdown, Image} from "semantic-ui-react";
import {LOCAL_STORAGE_USER_DATA, USER_AVATAR_DEFAULT, LOCAL_STORAGE_UI_LANGUAGE} from "../../context";
import {Link} from "react-router-dom";
import { string } from 'prop-types';
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';


  


class UserIcon extends Component {

    state = {
        isAuthorize: false,
        username: '',
        avatar: ''
    };

    componentWillMount() {
        this.setState({isAuthorize: this.props.isAuthorize});
        if (this.props.isAuthorize){
            this.loadUserData();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthorize!==this.state.isAuthorize) {
            this.setState({isAuthorize: nextProps.isAuthorize});
        }
        if (nextProps.isAuthorize){
            this.loadUserData();
        }
    }

    loadUserData = () => {
        let user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user !== null && user !== undefined) {
            user = JSON.parse(user);
            this.setState({isAuthorize: true});
            this.setState({username: user.username, avatar: user.avatar});
        }
    };


    

        

    render() {
        console.log(this.state);
        let string = new LocalizedStrings(L10N);
        string.setLanguage(JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, ''));
        let options = [
            {key: 'user', text: (<Link to='/account'>{string.menu.account}</Link>), icon: 'user'},
            {key: 'orders', text: (<Link to='/order/user'>{string.menu.orders}</Link>), icon: 'shopping cart'},
            {key: 'bookmarks', text: (<Link to='/bookmarks'>{string.menu.bookmarks}</Link>), icon: 'bookmark'},
            {key: 'settings', text: (<Link to='/user/settings'>{string.menu.settings}</Link>), icon: 'settings'},
            {key: 'sign-out', text: (<Link to='/signOut'>{string.menu.signOut}</Link>), icon: 'sign out'},
        ];
        return this.state.isAuthorize ? 
        <Dropdown className='authorized' trigger={
            <span>
                <Image avatar src={this.state.avatar ? this.state.avatar : USER_AVATAR_DEFAULT}/> {this.state.username}
            </span>
        } options={options} pointing='top left'/> 
        : 
        <Link className='unauthorized' to='/signIn'>{string.menu.signIn}</Link>;
    };
}

export default UserIcon;
