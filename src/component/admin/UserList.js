import React, {Component} from 'react';
import {Button, Dropdown, Icon, Item, Message, Pagination} from "semantic-ui-react";
import axios from "axios";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE,
    PAGINATION_BOUNDARY_RANGE,
    PAGINATION_COUNT_IN_DROPDOWN,
    PAGINATION_SIBLING_RANGE,
    PAGINATION_STEP_IN_DROPDOWN,
    PAGINATION_USERS_PER_ROW,
    PAGINATION_USERS_ROWS
} from "../../context";
import queryString from "query-string";
import Input from "semantic-ui-react/dist/commonjs/elements/Input";
import UserItem from "./UserItem";
import './UserList.css';
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

class UserList extends Component {

    state = {
        searchString: '',
        number: 1,
        size: 10,
        sort: 'username',
        direction: 'ASC',
        userList: [],
        totalPages: 0,
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
            .catch(({response}) => {
                this.setState({errorText: response.data.message});
            });
    };

    handleSearchClick = () => {
        this.loadUserList();
    };

    handleSearchChange = (event, {value}) => this.setState({searchString: value});


    handleChangeSize = (event, {value}) => {
        this.setState({size: value}, this.loadUserList);
    };

    loadSizeList = () => {
        let min = PAGINATION_USERS_ROWS*PAGINATION_USERS_PER_ROW;
        let attay = [];
        for (let i = 0; i < PAGINATION_COUNT_IN_DROPDOWN; i++) {
            let value = i*PAGINATION_STEP_IN_DROPDOWN+min;
            attay.push({key:value, text: value, value: value});
        }
        return attay;
    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        const alert =
            (<Message
                warning
                header='Users Not found'
                content={this.state.errorText}
            />);
        return (
            <div id='userList'>
                        <Input
                            className='search'
                        type='text'
                            placeholder={strings.userList.searchPlaceholder}
                            action
                            fluid
                            clearable
                            value={this.state.searchString}
                            onChange={this.handleSearchChange}>
                            <input/>
                            <Button
                                type='submit'
                                onClick={this.handleSearchClick}
                            >{strings.userList.search}</Button>
                        </Input>
                        {this.state.userList ?
                        <React.Fragment>
                            <Item.Group divided>
                                {this.state.userList.map((user) => <UserItem key={user.id} user={user} refresh={this.loadUserList}/>)}
                            </Item.Group>
                            <div className='userPagination'>
                    <Pagination
                        activePage={this.state.number}
                        boundaryRange={PAGINATION_BOUNDARY_RANGE}
                        onPageChange={this.handlePaginationChange}
                        size='small'
                        siblingRange={PAGINATION_SIBLING_RANGE}
                        totalPages={this.state.totalPages}
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    />
                    <Dropdown
                            onChange={this.handleChangeSize}
                            options={this.loadSizeList()}
                            placeholder='size'
                            selection
                            value={Number(this.state.size)}
                        />
                </div>
                         </React.Fragment>
            : alert}
        </div>);
    }
}

export default UserList;
