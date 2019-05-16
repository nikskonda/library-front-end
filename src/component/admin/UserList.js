import React, {Component} from 'react';
import {Button, Container, Icon, Item, Message, Pagination} from "semantic-ui-react";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN} from "../../context";
import queryString from "query-string";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import UserItem from "./UserItem";

class UserList extends Component {

    state = {
        searchString: '',
        number: 1,
        size: 10,
        sort: 'username',
        direction: 'ASC',
        userList: [],
        totalPages: 0,
        itemPerRow: 3,
        boundaryRange: 2,
        siblingRange: 1,
    };

    componentWillMount() {
        const params = queryString.parse(this.props.queryString);
        this.setState({
            searchString: params.searchString || this.state.searchString,
            number: params.number || this.state.number,
            size: params.size || this.state.size,
            sort: params.sort || this.state.sort,
            direction: params.direction || this.state.direction,
        }, this.loadUserList);
    }

    handlePaginationChange = (event, {activePage}) => {
        this.setState({number: activePage}, this.loadUserList);

    };

    loadUserList = () => {
        const params = {
            searchString: this.state.searchString,
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
        };
        axios
            .get(BACK_END_SERVER_URL + `/user/search`,
                {
                    params: params,
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.setState({
                    number: res.data.number + 1,
                    userList: res.data.content,
                    totalPages: res.data.totalPages,
                },
                    this.props.changeUrl(
                        {
                            searchString: this.state.searchString,
                            number: this.state.number,
                            size: this.state.size,
                            sort: this.state.sort,
                            direction: this.state.direction,
                        }
                    ));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleSearchClick = () => {
        this.loadUserList();
    };

    handleSearchChange = (event, {value}) => this.setState({searchString: value});

    render() {
        const alert =
            (<Message
                warning
                header='Users Not found'
                content='Plz change search query!'
            />);
        return (this.state.userList ?
                <React.Fragment>
                    <Input type='text'
                           placeholder='Search...'
                           action
                           value={this.state.searchString}
                           onChange={this.handleSearchChange}>
                        <input/>
                        <Button
                            type='submit'
                            onClick={this.handleSearchClick}
                        >Search</Button>
                    </Input>
                    <Item.Group divided>
                        {this.state.userList.map((user) => <UserItem key={user.id} user={user} refresh={this.loadUserList}/>)}
                    </Item.Group>
                    <Pagination
                        activePage={this.state.number}
                        boundaryRange={this.state.boundaryRange}
                        onPageChange={this.handlePaginationChange}
                        size='small'
                        siblingRange={this.state.siblingRange}
                        totalPages={this.state.totalPages}
                        ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                        firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                        lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                        prevItem={{content: <Icon name='angle left'/>, icon: true}}
                        nextItem={{content: <Icon name='angle right'/>, icon: true}}

                    />
                </React.Fragment>
                : alert
        );
    }
}

export default UserList;
