import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };

    }

    changeUsernameHandler(event){
        this.setState({username: event.target.value});
    }

    changePasswordHandler(event){
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={this.state.username} onChange={this.changeUsernameHandler}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.changePasswordHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.signIn}>
                    Submit
                </Button>
            </Form>
        );
    }

    signIn(username, password, grant_type) {
        let locale = this.localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        let client_secret = btoa('devglan-client:devglan-secret');
        let req = {
            url: 'http://localhost:8888/oauth/token',
            method: 'POST',
            redirect_url: 'http://localhost:8888',
            data: httpParamSerializer({
                grant_type,
                username,
                password,
                client_id: 'devglan-client',
            }),
            headers: {

                Authorization: 'Basic ' + client_secret,
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Accept-Language': locale

            }
        };
        let current = this;
        return this.http(req).then(response => {
        current.localStorage.access_token = response.data.access_token;
        current.localStorage.refresh_token = response.data.refresh_token;
        let tokenInfo = current.tokenService.getInfo();
        current.localStorage.username = tokenInfo.user_name;
        current.localStorage.authorities = tokenInfo.authorities;
        current.delay = response.data.expires_in;
        current.startRefreshCycle();
        return response;
    });
    }

startRefreshCycle() {
    this.timeout(this.refreshToken.bind(this), 20 * 1000);
}

    refreshToken() {
    console.log('try to get refresh token '+new Date());
    let locale = this.localStorage.getItem('NG_TRANSLATE_LANG_KEY');
    let client_secret = btoa('devglan-client:devglan-secret');
    if (this.localStorage.getItem('refresh_token')!==null && this.localStorage.getItem('refresh_token')!==undefined) {
        let current = this;
        let req = {
            url: 'http://localhost:8888/oauth/token',
            method: 'POST',
            redirect_url: 'http://localhost:8888',
            data: this.httpParamSerializer(
                {
                    grant_type: 'refresh_token',
                    client_id: 'devglan-client',
                    refresh_token: this.localStorage.getItem('refresh_token')
                }),
            headers: {
                Authorization: 'Basic ' + client_secret,
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Accept-Language': locale
            }
        };
        return current.http(req)
            .then(response => {
                current.localStorage.access_token = response.data.access_token;
                current.localStorage.refresh_token = response.data.refresh_token;
                let tokenInfo = current.tokenService.getInfo();
                current.localStorage.username = tokenInfo.user_name;
                current.localStorage.authorities = tokenInfo.authorities;
                current.delay = response.data.expires_in;
                current.startRefreshCycle();
                console.log('success');
                return response;
            })
            .catch( response => {
                console.log('fail');
                this.state.go('sign-out');
            });
    }
}
export default SignIn;