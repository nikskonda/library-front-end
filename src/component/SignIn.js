import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE,
    OAUTH2_CLIENT_ID,
    OAUTH2_CLIENT_SECRET,
    OAUTH2_GRANT_TYPE_PASSWORD, OAUTH2_GRANT_TYPE_REFRESH_TOKEN
} from "../context";
import axios from "axios";

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            expires_in: 0
        };
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    changeUsernameHandler(event) {
        this.setState({username: event.target.value});
    }

    changePasswordHandler(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" value={this.state.username}
                                  onChange={this.changeUsernameHandler}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password}
                                  onChange={this.changePasswordHandler}/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.signIn}>
                    Submit
                </Button>
            </Form>
        );
    }

    formBody(obj) {
        let formBody = [];
        for (let property in obj) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(obj[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        return (formBody.join("&"));
    }

    signIn() {
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
                `http://localhost:8888/oauth/token`,
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
                console.log(res);
                localStorage.setItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, res.data.acces_token);
                localStorage.setItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN, res.data.refresh_token);

                this.setState({expires_in: res.data.expires_in});
                this.startRefreshCycle();
                // this.setState({books: this.state.books.concat(res.data.content)});
            })
            .catch(function (error) {
                console.log(error);
            });
        //     let current = this;
        //     return this.http(req).then(response => {
        //     current.localStorage.access_token = response.data.access_token;
        //     current.localStorage.refresh_token = response.data.refresh_token;
        //     let tokenInfo = current.tokenService.getInfo();
        //     current.localStorage.username = tokenInfo.user_name;
        //     current.localStorage.authorities = tokenInfo.authorities;
        //     current.delay = response.data.expires_in;
        //     current.startRefreshCycle();
        //     return response;
        // });
    }

    startRefreshCycle() {
        setTimeout(this.refreshToken.bind(this), (this.state.expires_in - 15) *1000);
    }

    refreshToken() {
        console.log('try to get refresh token ' + new Date());
        // let locale = this.localStorage.getItem('NG_TRANSLATE_LANG_KEY');
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
                    `http://localhost:8888/oauth/token`,
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
                    console.log(res);
                    localStorage.setItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN, res.data.acces_token);
                    localStorage.setItem(LOCAL_STORAGE_OAUTH2_REFRESH_TOKEN, res.data.refresh_token);

                    current.setState({expires_in: res.data.expires_in});
                    current.startRefreshCycle();
                    console.log('success');
                    // this.setState({books: this.state.books.concat(res.data.content)});
                })
                .catch(function (error) {
                    console.log('refresh failed');
                    console.log(error);
                });
        }
    }
}

export default SignIn;