import React, {Component} from 'react';
import {Button, Container, Form, Message} from "semantic-ui-react";
import AddressForm from "./basket/AddressForm";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, LOCAL_STORAGE_UI_LANGUAGE} from "../context";
import {withRouter} from 'react-router-dom';
import './UserSettings.css';
import {getLang, L10N} from "../l10n"
import LocalizedStrings from 'react-localization';

class UserSettings extends Component {

    state = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        address: null,
        userData: null,

        userId: this.props.match.params.userId,

        firstNameWasChanged: false,
        lastNameWasChanged: false,
        emailWasChanged: false,
        addressWasChanged: false,

    };

    componentWillMount() {
        this.loadUserData();
    }

    changeFirstNameHandle = (event, {value}) => this.setState({firstName: value, firstNameWasChanged: true});

    isValidFirstName = (text) => {
        if (!this.state.firstNameWasChanged) return {value: true};
        let firstName = this.state.firstName;

        let message = (<p className='errorMsg'>{text + firstName.length}</p>);
        let value = true;
        if (!firstName && firstName !== '') {
            value = false;
        } else {

            if (firstName.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    changeLastNameHandle = (event, {value}) => this.setState({lastName: value, lastNameWasChanged: true});

    isValidLastName = (text) => {
        if (!this.state.lastNameWasChanged) return {value: true};
        let lastName = this.state.lastName;

        let message = (<p className='errorMsg'>{text + lastName.length}</p>);
        let value = true;

        if (!lastName && lastName !== '') {
            value = false;
        } else {

            if (lastName.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    changeEmailHandle = (event, {value}) => this.setState({email: value, emailWasChanged: true});

    isValidEmail = (text) => {
        if (!this.state.emailWasChanged) return {value: true};
        let email = this.state.email;

        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;

        if (!email) {

            value = email === '';
        } else {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            value = re.test(email);
        }
        return {value: value, message: message};
    };

    loadUserData = () => {
        let url = BACK_END_SERVER_URL + '/user/data/' + (this.state.userId ? this.state.userId : '');
        axios
            .get(url,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        'Accept-Language': getLang()
                    },
                })
            .then(res => {
                this.setState({
                    userId: res.data.id,
                    userData: res.data,
                    username: res.data.username,
                    firstName: res.data.firstName || '',
                    lastName: res.data.lastName || '',
                    email: res.data.email || '',
                    registrationAddress: res.data.registrationAddress || this.state.address,
                })
            })
            .catch(({response}) => {
                this.setState({isErrorA: true, errorMsg: response.data.message});
            });
    };

    changeUserData = () => {
        let params = {
            username: this.state.username,
            avatarUrl: this.state.userData.avatarUrl,
            // firstName: this.state.firstName === '' ? null : this.state.firstName,
            // lastName: this.state.lastName === '' ? null : this.state.lastName,
            email: this.state.email === '' ? null : this.state.email,
            registrationAddress: this.state.registrationAddress,
        };
        axios
            .put(BACK_END_SERVER_URL + `/user/data/` + this.state.userData.id,
                params,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        'Accept-Language': getLang()
                    },
                })
            .then(res => {
                this.setState({
                    userData: res.data,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    isSuccess: true,
                })
            })
            .catch(({response}) => {
                this.setState({isErrorA: true, errorMsg: response.data.message});
            });
    };

    getAddress = (address) => {
        this.setState({
            registrationAddress: address,
            addressWasChanged: true,
        });
    };

    wasChanged = () => {
        return this.state.firstNameWasChanged ||
            this.state.lastNameWasChanged ||
            this.state.emailWasChanged ||
            this.state.addressWasChanged;
    };

    isDisableButton = () => {

        return this.isValidEmail().value &&
        this.wasChanged();
            // this.isValidFirstName().value &&
            // this.isValidLastName().value &&
            
    };

    handleDismissE = () => {
        this.setState({isErrorA: false});
    };
    handleDismissS = () => {
        this.setState({isSuccess: false});
    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, ''));
        const successAlert =
            (<Message
                onDismiss={this.handleDismissS}
                success
                header={strings.success.success}
                content={strings.success.userData}
            />);
        const errorAlert =
            (<Message
                onDismiss={this.handleDismissE}
                error
                header={strings.error.error}
                content={this.state.errorMsg}
            />);
        return (
            <Container id='userSettings'>
                {this.state.isSuccess ? successAlert : false}
                {this.state.isErrorA ? errorAlert : false}
                <Form>
                    <Form.Input
                        label={strings.user.username}
                        readOnly
                        placeholder={strings.user.username}
                        value={this.state.username}/>
                    {/*<Form.Input
                        label={strings.user.firstName}
                        placeholder={strings.user.firstName}
                        value={this.state.firstName}
                        onChange={this.changeFirstNameHandle}
                        error={!this.isValidFirstName().value}/>
                    {this.isValidFirstName().value ? false : this.isValidFirstName(strings.error.user.firstName).message}

                    <Form.Input
                        label={strings.user.lastName}
                        placeholder={strings.user.lastName}
                        value={this.state.lastName}
                        onChange={this.changeLastNameHandle}
                        error={!this.isValidLastName().value}/>
                    {this.isValidLastName().value ? false : this.isValidLastName(strings.error.user.lastName).message} */}

                    <AddressForm returnAddress={this.getAddress} defaultAddress={this.state.registrationAddress}
                                 userId={this.state.userId}/>
                    <Form.Input
                        label={strings.user.email}
                        placeholder={strings.user.email}
                        value={this.state.email}
                        onChange={this.changeEmailHandle}
                        error={!this.isValidEmail().value}/>
                    {this.isValidEmail().value ? false : this.isValidEmail(strings.error.user.email).message}
                    {this.state.userData ?
                        <Button
                            className='submitButton'
                            type='submit'
                            disabled={!this.isDisableButton()}
                            onClick={this.changeUserData}
                        >{strings.user.changeData}</Button>
                        : false}
                </Form>
            </Container>
        );
    };
}

export default withRouter(UserSettings);
