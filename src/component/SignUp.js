import React, {Component} from 'react';
import {BACK_END_SERVER_URL} from "../context";
import axios from "axios";
import {Button, Container, Divider, Form, Grid, SegmentGroup} from "semantic-ui-react";

class SignUp extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        expires_in: 0
    };

    changeUsernameHandler = (event, {value}) => {
        this.setState({username: value});
    };

    changePasswordHandler = (event, {value}) => {
        this.setState({password: value});
    };

    changeConfirmPasswordHandler = (event, {value}) => {
        this.setState({confirmPassword: value});
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
                        // 'Accept-Language': locale.tag || ''
                    }
                }
            )
            .then(res => {
                this.props.history.push('/signIn');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (<Container>
            <SegmentGroup placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
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

                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Confirm Password'
                                type='password'
                                value={this.state.confirmPassword}
                                onChange={this.changeConfirmPasswordHandler}
                            />
                            <Button
                                content='Sign Up'
                                primary
                                disabled={this.state.password !== this.state.confirmPassword}
                                onClick={this.signUp}
                            />
                        </Form>
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' textAlign='center'>
                        <Button content='Sign In'
                                icon='signup'
                                size='big'
                                onClick={() => this.props.history.push('/signIn')}
                        />
                    </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
            </SegmentGroup>
        </Container>);
    }
}

export default SignUp;