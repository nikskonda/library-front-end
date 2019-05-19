import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {
    BACK_END_SERVER_URL,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN,
    LOCAL_STORAGE_USER_DATA,
    OAUTH2_CLIENT_ID,
    OAUTH2_CLIENT_SECRET,
    OAUTH2_GRANT_TYPE_PASSWORD,
    OAUTH2_GRANT_TYPE_REFRESH_TOKEN
} from "../../context";
import axios from "axios";
import {Button, Container, Divider, Form, Grid, SegmentGroup} from "semantic-ui-react";

const jwt = require('jsonwebtoken');

class SignIn extends Component {

        state = {
            username: '',
            password: '',
            expires_in: 0
        };


    changeUsernameHandler = (event, {value}) => {
        this.setState({username: value});
    };

    changePasswordHandler = (event, {value}) => {
        this.setState({password: value});
    };

    formBody = (obj) => {
        let formBody = [];
        for (let property in obj) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(obj[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        return (formBody.join("&"));
    };

    signIn = () => {
        let details = {
            username: this.state.username,
            password: this.state.password,
            grant_type: OAUTH2_GRANT_TYPE_PASSWORD,
            client_id: OAUTH2_CLIENT_ID
        };

        // let locale = JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE));
        let client_secret = btoa(OAUTH2_CLIENT_ID + ':' + OAUTH2_CLIENT_SECRET);
        axios
            .post(
                BACK_END_SERVER_URL + `/oauth/token`,
                this.formBody(details)
                ,
                {
                    headers: {
                        'Authorization': 'Basic ' + client_secret,
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                        // 'Accept-Language': locale.tag || ''
                    }
                }
            )
            .then(res => {
                localStorage.setItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, res.data.access_token);
                localStorage.setItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN, res.data.refresh_token);
                let decoded = jwt.decode(res.data.access_token);
                let userData = {
                    username: decoded.user_name,
                    authorities: decoded.authorities,
                };
                localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(userData));
                this.loadUserData();
                this.setState({expires_in: res.data.expires_in});
                this.startRefreshCycle();
                // this.setState({books: this.state.books.concat(res.data.content)});
                this.props.changeAuthorizeStatus();
                this.props.history.push('/');

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    loadUserData = () => {
        axios
            .get(
                BACK_END_SERVER_URL + `/user/data`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(res.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    startRefreshCycle = () => {
        setTimeout(this.refreshToken.bind(this), (this.state.expires_in - 15) * 1000);
    };

    refreshToken = () => {
        console.log('try to get refresh token ' + new Date());
        let client_secret = btoa(OAUTH2_CLIENT_ID + ':' + OAUTH2_CLIENT_SECRET);
        if (localStorage.getItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN) !== null &&
            localStorage.getItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN) !== undefined) {
            let current = this;
            let data = {
                grant_type: OAUTH2_GRANT_TYPE_REFRESH_TOKEN,
                client_id: OAUTH2_CLIENT_ID,
                refresh_token: localStorage.getItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN)
            };

            axios
                .post(
                    BACK_END_SERVER_URL + `/oauth/token`,
                    this.formBody(data)
                    ,
                    {
                        headers: {
                            'Authorization': 'Basic ' + client_secret,
                            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                            // 'Accept-Language': locale.tag || ''
                        }
                    }
                )
                .then(res => {
                    localStorage.setItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, res.data.acces_token);
                    localStorage.setItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN, res.data.refresh_token);
                    current.setState({expires_in: res.data.expires_in});
                    current.startRefreshCycle();
                    console.log('success');
                })
                .catch(function (error) {
                    console.log('refresh failed');
                    console.log(error);
                });
        }
    };

    render() {
        return (<Container >
            <SegmentGroup  placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column >
                        <Form style={{margin: 30}}>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label='Username'
                                placeholder='Username'
                                value={this.state.username}
                                onChange={this.changeUsernameHandler}
                            />
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                value={this.state.password}
                                onChange={this.changePasswordHandler}
                            />

                            <Button
                                content='Sign In'
                                primary
                                onClick={this.signIn}
                            />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' textAlign='center'>
                        <Button content='Sign up'
                                icon='signup'
                                size='big'
                                onClick={() =>this.props.history.push('/signUp')}
                        />
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </SegmentGroup>
        </Container>);
    }
}

export default withRouter(SignIn);
