import React, {Component} from 'react';
import {Button, Container, Form, Input, Message} from "semantic-ui-react";
import AddressForm from "./basket/AddressForm";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN} from "../context";

class UserSettings extends Component {

    state = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        address: null,
        userData: null,
        addressWasSetted: false,
        userId: this.props.match.params.userId,
    };

    componentWillMount() {
        this.loadUserData();
    }

    changeFirstNameHandle = (event, {value}) => this.setState({firstName: value});

    changeLastNameHandle = (event, {value}) => this.setState({lastName: value});

    changeEmailHandle = (event, {value}) => this.setState({email: value});

    loadUserData = () => {
        let url = BACK_END_SERVER_URL + '/user/data/' + (this.state.userId?this.state.userId:'');
        axios
            .get(url,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                })
            .then(res => {
                console.log(res.data);
                this.setState({
                    userId: res.data.id,
                    userData: res.data,
                    username: res.data.username,
                    firstName: res.data.firstName || this.state.firstName,
                    lastName: res.data.lastName || this.state.lastName,
                    email: res.data.email || this.state.email,
                    registrationAddress: res.data.registrationAddress || this.state.address,
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
            registrationAddress: this.state.registrationAddress,
            authorities: this.state.userData.authorities,
        };
        axios
            .put(BACK_END_SERVER_URL + `/user/data/` + this.state.userData.id,
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
            .catch((error) => {
                console.log(error);
                this.setState({isErrorA: true});
            });
    };

    getAddress = (address) => {
        this.setState({
            registrationAddress: address,
            addressWasSetted: true,
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
                        label='username'
                        control={Input}
                        readOnly
                        placeholder="username"
                        value={this.state.username}/>
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
                    <AddressForm returnAddress={this.getAddress} defaultAddress={this.state.registrationAddress} userId={this.state.userId}/>
                    {this.state.userData ?
                        <Button
                            type='submit'
                            disabled={this.state.firstName === this.state.userData.firstName &&
                                this.state.lastName === this.state.userData.lastName &&
                                this.state.email === this.state.userData.email &&
                                !this.state.addressWasSetted && !this.state.address}
                            onClick={this.changeUserData}
                        >Change Data</Button>
                        : false}
                </Form>
            </Container>
        );
    };
}

export default UserSettings;
