import React, {Component} from 'react';
import {Button, Container, Form, Input, Message} from "semantic-ui-react";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN} from "../context";

class UserSettings extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        userData: null,
        userId: null,
    };


    componentWillMount() {
        this.loadUserData();
    }

    changeFirstNameHandle = (event, {value}) => {
        this.setState({firstName: value});
    };

    changeLastNameHandle = (event, {value}) => {
        this.setState({lastName: value});
    };

    changeEmailHandle = (event, {value}) => {
        this.setState({email: value});
    };

    loadUserData = () => {
        axios
            .get(BACK_END_SERVER_URL + `/user/data/`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                this.setState({
                    userId: res.data.id,
                    userData: res.data,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    changeUserData = () => {
        let params = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.userData.username,
        };
        axios
            .put(BACK_END_SERVER_URL + `/user/data/` + this.state.userId,
                params,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
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
            .catch(function (error) {
                console.log(error);
                this.setState({isErrorA: true});
            });
    };

    render() {
        const successAlert =
            (<Message
                success
                header='Success'
                content='qwer123'
            />);
        const errorAlert =
            (<Message
                error
                header='Error'
                content='qwer123'
            />);
        return (
            <Container>
                {this.state.isSuccess ? successAlert : false}
                {this.state.isErrorA ? errorAlert : false}
                <Form>
                    <Form.Field
                        className='w-100'
                        label='First Name'
                        control={Input}
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.changeFirstNameHandle}/>
                    <Form.Field
                        className='w-100'
                        label='lastName'
                        control={Input}
                        placeholder="lastName"
                        value={this.state.lastName}
                        onChange={this.changeLastNameHandle}/>
                    <Form.Field
                        className='w-100'
                        label='email'
                        control={Input}
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.changeEmailHandle}/>
                    {this.state.userData ?
                        <Button
                            type='submit'
                            disabled={this.state.firstName === this.state.userData.firstName && this.state.lastName === this.state.userData.lastName && this.state.email === this.state.userData.email}
                            onClick={this.changeUserData}
                        >Change Data</Button>
                        : false}
                </Form>
            </Container>
        );
    };
}

export default UserSettings;