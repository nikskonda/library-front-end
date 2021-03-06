import React, {Component} from 'react';
import {BACK_END_SERVER_URL, DEFAULT_L10N_LANGUAGE, LOCAL_STORAGE_UI_LANGUAGE} from "../../context";
import axios from "axios";
import {Button, Container, Divider, Form, Grid, Message, SegmentGroup} from "semantic-ui-react";
import "./signIn.css"
import {L10N, getLang} from "../../l10n"
import LocalizedStrings from 'react-localization';

class SignUp extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        expires_in: 0,
        errorMsg: null,

        usernameWasChanged: false,
        passwordWasChanged: false,
        confirmPasswordWasChanged: false,
        
    };

    changeUsernameHandler = (event, {value}) => {
        this.setState({username: value, usernameWasChanged: true});
    };

    isValidUsername = (text) => {
        if (!this.state.usernameWasChanged) return {value: true};
        let username = this.state.username;

        let message = (<p className='errorMsg'>{text + username.length}</p>);
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

    changeConfirmPasswordHandler = (event, {value}) => {
        this.setState({confirmPassword: value, confirmPasswordWasChanged: true});
    };

    isValidConfirmPassword = (text) => {
        if (!this.state.confirmPasswordWasChanged) return {value: true};
        let password = this.state.confirmPassword;

        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;

        if (!password) {
            value = false;
        } else {
            if (password !== this.state.password) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    signUp = () => {
        let body = {
            username: this.state.username,
            password: this.state.password,
        };

        axios
            .post(
                BACK_END_SERVER_URL + `/user`,
                body,
                {
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept-Language': getLang()
                    }
                }
            )
            .then(res => {
                this.props.history.push('/signIn');
            })
            .catch(({response}) => {
                this.setState({errorMsg: response.data.message});
            });
    };

    handleDismiss = () => {
        this.setState({errorMsg: null});
    };

    wasChanged = () => {
        return this.state.usernameWasChanged &&
            this.state.passwordWasChanged &&
            this.state.confirmPasswordWasChanged;
    };

    isDisableButton = () => {
        return this.isValidUsername().value &&
            this.isValidPassword().value && 
            this.isValidConfirmPassword().value &&
            this.wasChanged();
    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        return (<Container id='signIn'>
            <SegmentGroup placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        {this.state.errorMsg?
                            <Message
                                className='errorBox'
                                onDismiss={this.handleDismiss}
                                error
                                header={strings.error.user.signUp}
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

                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label={strings.user.confirmPassword}
                                type='password'
                                placeholder={strings.user.confirmPassword}
                                value={this.state.confirmPassword}
                                onChange={this.changeConfirmPasswordHandler}
                                error={!this.isValidConfirmPassword().value}/>
                                    {this.isValidConfirmPassword().value ? false : this.isValidConfirmPassword(strings.error.user.confirmPassword).message}
                            <Button
                                className='submit'
                                content={strings.user.signUp}
                                primary
                                disabled={!this.isDisableButton()}
                                onClick={this.signUp}
                            />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' textAlign='center'>
                        <Button
                                className='redirect'
                                content={strings.user.signIn}
                                icon='signup'
                                size='big'
                                onClick={() => this.props.history.push('/signIn')}
                        />
                    </Grid.Column>
                </Grid>

                <Divider vertical>{strings.user.or}</Divider>
            </SegmentGroup>
        </Container>);
    }
}

export default SignUp;