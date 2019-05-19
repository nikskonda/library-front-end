import React, {Component} from 'react';
import {
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN,
    LOCAL_STORAGE_USER_DATA
} from "../../context";
import {Container} from "semantic-ui-react";
import {withRouter} from "react-router";


class SignOut extends Component {

    componentDidMount(){
        localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
        localStorage.removeItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN);
        this.props.changeAuthorizeStatus();
        this.props.history.push('/');
    }

    render() {
        return (
            <Container>
                Good Bye!
            </Container>);
    }
}

export default withRouter(SignOut);