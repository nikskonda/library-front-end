import React, {Component} from 'react';
import {Button, Dropdown, Form, Input, TextArea} from "semantic-ui-react";
import axios from "axios";
import {BACK_END_SERVER_URL, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN} from "../../context";

class AddressForm extends Component {

    state = {
        willNew: true,
        address: null,
        addressList: [],
        addressSearchString: '',

        showStateList: false,
        showCityList: false,

        country: null,
        countryList: [],
        countrySearchString: '',

        state: null,
        stateList: [],
        stateSearchString: '',

        city: null,
        cityList: [],
        citySearchString: '',

        firstName: '',
        lastName: '',
        postalCode: 0,
        phone: '',
        addressDesc: '',

    };

    componentWillMount() {
        this.loadAddressList();
        this.loadCountryList();
    }

    addressToText = (address) => {
        return address.address + ' ' + address.postalCode + ', ' + address.city.name + '/' + address.city.state.name + '/'
            + address.city.state.country.name + ', ' + address.firstName + ' ' + address.lastName + ' ' + address.phone;
    };

    loadAddressList = () => {
        axios
            .get(BACK_END_SERVER_URL + `/user/address`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(address => array.push({
                    key: address.id,
                    text: this.addressToText(address),
                    value: address
                }));
                this.setState({addressList: array});
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    changeAddressForm = () => {
        this.setState({willNew: !this.state.willNew}, this.loadCountryList())
    };

    AddressDropdown = () => (
        <Dropdown
            fluid
            onChange={this.handleChangeAddress}
            onSearchChange={this.handleSearchChangeAddress}
            options={this.state.addressList}
            placeholder='Select Address'
            search
            searchQuery={this.state.addressSearchString}
            selection
            //value={this.state.address}
        />
    );

    handleChangeAddress = (event, {value}) => {
        this.setState({addressSearchString: '', address: value});
    };

    handleSearchChangeAddress = (event, {searchQuery}) => {
        this.setState({addressSearchString: searchQuery});
        this.loadAddressList();
        let newList = [];
        this.state.addressList.map(address => {
            if (address.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(address);
            }
        });
        this.setState({addressList: newList});
    };


    loadCountryList = () => {
        axios
            .get(BACK_END_SERVER_URL + `/user/country`,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(country => array.push({
                    key: country.id,
                    text: country.name,
                    value: country
                }));
                this.setState({countryList: array});
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    CountryDropdown = () => (
        <Dropdown
            fluid
            onChange={this.handleChangeCountry}
            onSearchChange={this.handleSearchChangeCountry}
            options={this.state.countryList}
            placeholder='Select Country'
            search
            searchQuery={this.state.countrySearchString}
            selection
        />
    );

    handleChangeCountry = (event, {value}) => {
        this.setState({
            countrySearchString: '',
            country: value,
            showStateList: true,
            showCityList: false,
        }, this.loadStateList);
    };

    handleSearchChangeCountry = (event, {searchQuery}) => {
        this.setState({countrySearchString: searchQuery});
        this.loadAddressList();
        let newList = [];
        this.state.countryList.map(country => {
            if (country.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(country);
            }
        });

        this.setState({countryList: newList});
    };

    loadStateList = () => {
        console.log(this.state.country);
        axios
            .get(BACK_END_SERVER_URL + `/user/state/country/` + this.state.country.id,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(state => array.push({
                    key: state.id,
                    text: state.name,
                    value: state
                }));
                this.setState({stateList: array});
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    StateDropdown = () => (
        <Dropdown
            fluid
            onChange={this.handleChangeState}
            onSearchChange={this.handleSearchChangeState}
            options={this.state.stateList}
            placeholder='Select City'
            search
            searchQuery={this.state.stateSearchString}
            selection
            //value={this.state.address}
        />
    );

    handleChangeState = (event, {value}) => {
        this.setState({
            stateSearchString: '',
            state: value,
            showCityList: true,
        }, this.loadCityList);
    };

    handleSearchChangeState = (event, {searchQuery}) => {
        this.setState({stateSearchString: searchQuery});
        this.loadAddressList();
        let newList = [];
        this.state.stateList.map(state => {
            if (state.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(state);
            }
        });

        this.setState({stateList: newList});
    };


    loadCityList = () => {
        axios
            .get(BACK_END_SERVER_URL + `/user/city/state/` + this.state.state.id,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        // 'Accept-Language': locale.tag || ''
                    }
                })
            .then(res => {
                let array = [];
                console.log(res);
                res.data.map(city => array.push({
                    key: city.id,
                    text: city.name,
                    value: city
                }));
                this.setState({cityList: array});
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    CityDropdown = () => (
        <Dropdown
            fluid
            onChange={this.handleChangeCity}
            onSearchChange={this.handleSearchChangeCity}
            options={this.state.cityList}
            placeholder='Select State'
            search
            searchQuery={this.state.citySearchString}
            selection
            //value={this.state.address}
        />
    );

    handleChangeCity = (event, {value}) => {
        this.setState({citySearchString: '', city: value});
    };

    handleSearchChangeCity = (event, {searchQuery}) => {
        this.setState({citySearchString: searchQuery});
        this.loadAddressList();
        let newList = [];
        this.state.cityList.map(city => {
            if (city.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(city);
            }
        });

        this.setState({cityList: newList});
    };

    handleChangeFirstName = (event, {value}) => {
        this.setState({firstName: value});
    };

    handleChangeLastName = (event, {value}) => {
        this.setState({lastName: value});
    };

    handleChangePostalCode = (event, {value}) => {
        this.setState({postalCode: value});
    };

    handleChangePhone = (event, {value}) => {
        this.setState({phone: value});
    };

    handleChangeAddressDesc = (event, {value}) => {
        this.setState({addressDesc: value});
    };

    createOrder = () => {
        let address = this.state.address;
        if (this.state.willNew){
            address = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.addressDesc,
                postalCode: this.state.postalCode,
                phone: this.state.phone,
                city: {
                    id: this.state.city.id,
                    name: this.state.city.name,
                    state: {
                        id: this.state.state.id,
                        name: this.state.state.name,
                        country: {
                            id: this.state.country.id,
                            name: this.state.country.name,
                        }
                    }
                },
            };
        }
        this.props.createOrder(address);
    };

    render() {
        return (
            <React.Fragment>
                <Button
                    onClick={this.changeAddressForm}
                >
                    {this.state.willNew ? 'ADD NEW ADDRESS' : 'select from list of last addresses'}
                </Button>
                {!this.state.willNew ?
                    <Form>
                        <Form.Group>
                            <Form.Field
                                width={8}
                                label='producer'
                                control={this.AddressDropdown}/>
                        </Form.Group>
                    </Form>
                    :
                    <Form>
                        <Form.Group>
                            <Form.Field
                                width={5}
                                label='Country'
                                control={this.CountryDropdown}/>
                            {this.state.showStateList ?
                                <Form.Field
                                    width={5}
                                    label='State'
                                    control={this.StateDropdown}/>
                                : false}
                            {this.state.showCityList ?
                                <Form.Field
                                    width={5}
                                    label='City'
                                    control={this.CityDropdown}/>
                                : false}
                        </Form.Group>
                        <Form.Group>
                            <Form.Field
                                width={8}
                                label='firstName'
                                control={Input}
                                placeholder="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChangeFirstName}/>
                            <Form.Field
                                width={8}
                                label='lastName'
                                control={Input}
                                placeholder="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChangeLastName}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field
                                width={8}
                                label='phone'
                                control={Input}
                                placeholder="phone"
                                value={this.state.phone}
                                onChange={this.handleChangePhone}/>
                            <Form.Field
                                width={8}
                                label='postalCode'
                                type='number'
                                control={Input}
                                placeholder="postalCode"
                                value={this.state.postalCode}
                                onChange={this.handleChangePostalCode}/>
                        </Form.Group>
                        <Form.Field
                            control={TextArea}
                                    label='About'
                                    placeholder='address'
                            value={this.state.addressDesc}
                            onChange={this.handleChangeAddressDesc}/>
                    </Form>}
                <Form.Field
                    control={Button}
                    onClick={this.createOrder}
                >Create Order</Form.Field>
            </React.Fragment>
        );
    };
}

export default AddressForm;