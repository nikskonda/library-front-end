import React, {Component} from 'react';
import {Dropdown, Image} from "semantic-ui-react";
import {LOCAL_STORAGE_USER_DATA, USER_AVATAR_DEFAULT} from "../../context";
import {Link} from "react-router-dom";


const Trigger = props => (
    <span>
        <Image avatar src={props.avatarUrl ? props.avatarUrl : USER_AVATAR_DEFAULT}/> {props.username}
    </span>
);

const options = [
    {key: 'user', text: (<Link to='/account'>Account</Link>), icon: 'user'},
    {key: 'orders', text: (<Link to='/order/user'>Orders</Link>), icon: 'shopping cart'},
    {key: 'bookmarks', text: (<Link to='/bookmarks'>Bookmarks</Link>), icon: 'bookmark'},
    {key: 'settings', text: (<Link to='/user/settings'>Settings</Link>), icon: 'settings'},
    {key: 'sign-out', text: (<Link to='/signOut'>Sign Out</Link>), icon: 'sign out'},
];

const Authorize = props => (
    <Dropdown className='authorized' trigger={<Trigger username={props.username}/>} options={options} pointing='top left'/>);

const NotAuthorize = () => (<Link className='unauthorized' to='signIn'> Sign In / Sing Up </Link>);

class UserIcon extends Component {

    state = {
        isAuthorize: false,
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
        return this.state.isAuthorize ? <Authorize username={this.state.username} avatar={this.state.avatar}/> : <NotAuthorize/>;
    };
}

export default UserIcon;
