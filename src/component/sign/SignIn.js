import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE,
    LOCAL_STORAGE_USER_DATA,
    OAUTH2_CLIENT_ID,
    OAUTH2_CLIENT_SECRET,
    OAUTH2_GRANT_TYPE_PASSWORD,
    OAUTH2_GRANT_TYPE_REFRESH_TOKEN
} from "../../context";
import axios from "axios";
import "./signIn.css"
import {Button, Container, Divider, Form, Grid, Message, SegmentGroup} from "semantic-ui-react";
import {getLang, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

const jwt = require('jsonwebtoken');

class SignIn extends Component {

        state = {
            username: '',
            password: '',
            expires_in: 0,

            usernameWasChanged: false,
            passwordWasChanged: false,

            authorities: [],
        };


        changeUsernameHandler = (event, {value}) => {
            this.setState({username: value, usernameWasChanged: true});
        };
    
        isValidUsername = (text) => {
            if (!this.state.usernameWasChanged) return {value: true};
            let username = this.state.username;
    
            let message = (<p className='errorMsg'>{text+' '+username.length}</p>);
            let value = true;
    
            if (!username) {
                value = false;
            } else {
                let re = /^[a-z]*$/;
                if (!re.test(username)) {
                    value = false;
                }
                if (username.length < 4) {
                    value = false;
                }
                if (username.length > 30) {
                    value = false;
                }
                
            }
            return {value: value, message: message};
        };
    
        changePasswordHandler = (event, {value}) => {
            this.setState({password: value, passwordWasChanged: true});
        };
    
        isValidPassword = (text) => {
            if (!this.state.passwordWasChanged) return {value: true};
            let password = this.state.password;
    
            let message = (<p className='errorMsg'>{text + password.length}</p>);
            let value = true;
    
            if (!password) {
                value = false;
            } else {
                if (password.length < 5) {
                    value = false;
                }
                if (password.length > 20) {
                    value = false;
                }
            }
            return {value: value, message: message};
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
                        'Accept-Language': getLang()
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
                this.setState({expires_in: res.data.expires_in, authorities: userData.authorities}, this.loadUserData);

                this.startRefreshCycle();
                // this.setState({books: this.state.books.concat(res.data.content)});
                this.props.changeAuthorizeStatus();
                this.props.history.push('/');

            })
            .catch(({response}) => {
                this.setState({errorMsg: response.data.error_description==='exception.notFound.user'?'Введены недействительные данные' : response.data.error_description});
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
                let userData = res.data;
                userData.authorities = this.state.authorities;
                localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(userData));
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

    handleDismiss = () => {
        this.setState({errorMsg: null});
    };

    wasChanged = () => {
        return this.state.usernameWasChanged &&
            this.state.passwordWasChanged ;
    };

    isDisableButton = () => {
        return this.isValidUsername().value &&
            this.isValidPassword().value && 
            this.wasChanged();
    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        return (
        <Container id='signIn'>
            <SegmentGroup 
                placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column >
                        {this.state.errorMsg?
                        <Message
                            className='errorBox'
                            onDismiss={this.handleDismiss}
                            error
                            header={strings.error.user.signIn}
                            content={this.state.errorMsg}
                        />:false}
                        <Form>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                label={strings.user.username}
                                placeholder={strings.user.username}
                                value={this.state.username}
                                onChange={this.changeUsernameHandler}
                                error={!this.isValidUsername().value}/>
                                {this.isValidUsername().value ? false : this.isValidUsername(strings.error.user.username).message}
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label={strings.user.password}
                                placeholder={strings.user.password}
                                type='password'
                                value={this.state.password}
                                onChange={this.changePasswordHandler}
                                error={!this.isValidPassword().value}/>
                                {this.isValidPassword().value ? false : this.isValidPassword(strings.error.user.password).message}
                            <Button
                                className='submit'
                                content={strings.user.signIn}
                                primary
                                onClick={this.signIn}
                                disabled={!this.isDisableButton()}
                            />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' textAlign='center'>
                        <Button 
                            className='redirect'
                                 content={strings.user.signUp}
                                icon='signup'
                                size='big'
                                onClick={() =>this.props.history.push('/signUp')}
                        />
                    </Grid.Column>
                </Grid>

                <Divider vertical>{strings.user.or}</Divider>
            </SegmentGroup>
        </Container>);
    }
}

export default withRouter(SignIn);
