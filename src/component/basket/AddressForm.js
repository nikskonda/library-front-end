import React, {Component} from 'react';
import {Button, Form, Message} from "semantic-ui-react";
import axios from "axios";
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE
} from "../../context";
import "./AddressForm.css"
import {getLang, getStrings, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

class AddressForm extends Component {

    state = {
        willNew: false,
        address: null,
        addressList: [],
        addressSearchString: '',

        showStateList: false,
        showCityList: false,

        country: {name: ''},
        countryList: [],
        countrySearchList: [],
        countrySearchString: '',

        state: {name: ''},
        stateList: [],
        stateSearchList: [],
        stateSearchString: '',

        city: {name: ''},
        cityList: [],
        citySearchList: [],
        citySearchString: '',


        firstName: '',
        lastName: '',
        postalCode: '',
        phone: '',
        addressDesc: '',

        userId: null,

        cityWasChanged: false,
        firstNameWasChanged: false,
        lastNameWasChanged: false,
        postalCodeWasChanged: false,
        phoneWasChanged: false,
        addressDescWasChanged: false,

        isValidAddress: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultAddress) {
            console.log(nextProps.defaultAddress);
            this.setState({
                country: nextProps.defaultAddress.city.state.country || this.state.country,
                state: nextProps.defaultAddress.city.state || this.state.state,
                city: nextProps.defaultAddress.city || this.state.city,
                firstName: nextProps.defaultAddress.firstName || this.state.firstName,
                lastName: nextProps.defaultAddress.lastName || this.state.lastName,
                postalCode: nextProps.defaultAddress.postalCode || this.state.postalCode,
                phone: nextProps.defaultAddress.phone || this.state.phone,
                addressDesc: nextProps.defaultAddress.address || this.state.addressDesc,
                showStateList: nextProps.defaultAddress.city.state.country ? true : false,
                showCityList: nextProps.defaultAddress.city.state ? true : false,
            }, this.loadCityAndState);
        }
        if (nextProps.userId && nextProps.userId !== this.state.userId) {
            this.setState({userId: nextProps.userId}, this.loadAddressList);
        }
    }

    componentWillMount() {
        this.loadAddressList();
        this.loadCountryList();
    }

    loadCityAndState(){
        this.loadStateList();
        this.loadCityList();
    }

    addressToText = (address) => {
        return address.address + ' ' + address.postalCode + ', ' + address.city.name + '/' + address.city.state.name + '/'
            + address.city.state.country.name + ', ' + address.firstName + ' ' + address.lastName + ' ' + address.phone;
    };

    loadAddressList = () => {
        let url = BACK_END_SERVER_URL + '/address/user/' + (this.props.userId ? this.props.userId : '');
        axios
            .get(url,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        'Accept-Language': getLang()
                    }
                })
            .then(res => {
                let array = [];
                res.data.map(address => array.push({
                    key: address.id,
                    text: this.addressToText(address),
                    value: address
                }));
                this.setState({
                    addressList: array,
                    addressSearchList: array,
                    willNew: array.length > 0 ? false : true,
                });

            })
            .catch(function (error) {
                console.log(error);
            });

    };

    changeAddressForm = () => {
        this.setState({willNew: !this.state.willNew}, this.loadCountryList)
    };


    handleChangeAddress = (event, {value}) => {
        this.setState({
            addressSearchString: '',
            address: value,
            isValidAddress: value ? true : false,
        });

    };

    handleSearchChangeAddress = (event, {searchQuery}) => {
        this.setState({addressSearchString: searchQuery});
        let newList = [];
        this.state.addressList.forEach(address => {
            if (address.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(address);
            }
        });
        this.setState({addressSearchList: newList});
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
                this.setState({countryList: array, countrySearchList: array});
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    handleChangeCountry = (event, {value}) => {
        this.setState({
            countrySearchString: '',
            country: value,
            showStateList: true,
            showCityList: false,
            state: {name: ''},
            city: {name: ''},
            countrySearchList: this.state.countryList,
        }, this.loadStateList);
    };

    handleSearchChangeCountry = (event, {searchQuery}) => {
        this.setState({countrySearchString: searchQuery});
        let newList = [];
        this.state.countryList.forEach(country => {
            if (country.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(country);
            }
        });

        this.setState({countrySearchList: newList});
    };

    loadStateList = () => {
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
                this.setState({stateList: array, stateSearchList: array});
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    handleChangeState = (event, {value}) => {
        this.setState({
            stateSearchString: '',
            state: value,
            showCityList: true,
            city: {name: ''},
            stateSearchList: this.state.stateList,
        }, this.loadCityList);
    };

    handleSearchChangeState = (event, {searchQuery}) => {
        this.setState({stateSearchString: searchQuery});
        let newList = [];
        this.state.stateList.forEach(state => {
            if (state.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(state);
            }
        });

        this.setState({stateSearchList: newList});
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
                res.data.map(city => array.push({
                    key: city.id,
                    text: city.name,
                    value: city
                }));
                this.setState({cityList: array, citySearchList: array});
            })
            .catch(function (error) {

            });

    };

    handleChangeCity = (event, {value}) => {
        this.setState({
            citySearchString: '',
            city: value,
            cityWasChanged: true,
            citySearchList: this.state.cityList,
        });
    };

    isValidCity = (text) => {
        if (!this.state.cityWasChanged) return {value: true};
        let message = (<p className='errorMsg'>{text}</p>);
        let value = true;
        let city = this.state.city;
        let state = this.state.state;
        let country = this.state.country;

        if (!city || !state || !country) {
            value = false;
        }
        console.log(city.name === '');
        if (city.name === '' || state.name === '' || country.name === '') {
            value = false;
            console.log("n"+city.name);
        }
        return {value: value, message: message};
    };

    handleSearchChangeCity = (event, {searchQuery}) => {
        this.setState({citySearchString: searchQuery});
        let newList = [];
        this.state.cityList.forEach(city => {
            if (city.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                newList.push(city);
            }
        });

        this.setState({citySearchList: newList});
    };

    handleChangeFirstName = (event, {value}) => {
        this.setState({firstName: value, firstNameWasChanged: true});
    };

    isValidFirstName = (text) => {
        if (!this.state.firstNameWasChanged) return {value: true};
        let firstName = this.state.firstName;

        let message = (<p className='errorMsg'>{text + firstName.length}</p>);
        let value = true;

        if (!firstName) {
            value = false;
        } else {
            if (firstName.length === 0) {
                value = false;
            }

            if (firstName.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeLastName = (event, {value}) => {
        this.setState({lastName: value, lastNameWasChanged: true});
    };

    isValidLastName = (text) => {
        if (!this.state.lastNameWasChanged) return {value: true};
        let lastName = this.state.lastName;

        let message = (<p className='errorMsg'>{text + lastName.length}</p>);
        let value = true;

        if (!lastName) {
            value = false;
        } else {
            if (lastName.length === 0) {
                value = false;
            }

            if (lastName.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangePostalCode = (event, {value}) => {
        this.setState({postalCode: value, postalCodeWasChanged: true});
    };

    isValidPostalCode = (text) => {
        if (!this.state.postalCodeWasChanged) return {value: true};
        let postalCode = this.state.postalCode;

        let message = (<p className='errorMsg'>{text + postalCode.length}</p>);
        let value = true;

        if (!postalCode) {
            value = false;
        } else {
            if (postalCode.length === 0) {
                value = false;
            }

            if (postalCode.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangePhone = (event, {value}) => {
        this.setState({phone: value, phoneWasChanged: true});
    };

    isValidPhone = (text) => {
        if (!this.state.phoneWasChanged) return {value: true};
        let phone = this.state.phone;

        let message = (<p className='errorMsg'>{text + phone.length}</p>);
        let value = true;

        if (!phone) {
            value = false;
        } else {
            if (phone.length === 0) {
                value = false;
            }

            if (phone.length > 30) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    handleChangeAddressDesc = (event, {value}) => {
        this.setState({addressDesc: value, addressDescWasChanged: true});
    };

    isValidAddressDesc = (text) => {
        if (!this.state.addressDescWasChanged) return {value: true};
        let addressDesc = this.state.addressDesc;

        let message = (<p className='errorMsg'>{text + addressDesc.length}</p>);
        let value = true;

        if (!addressDesc) {
            value = false;
        } else {
            if (addressDesc.length === 0) {
                value = false;
            }

            if (addressDesc.length > 400) {
                value = false;
            }
        }
        return {value: value, message: message};
    };

    returnAddress = () => {
        let address = this.state.address;
        if (this.state.willNew) {
            address = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.addressDesc,
                postalCode: this.state.postalCode,
                phone: this.state.phone,
                city: this.state.city,
            };
        }
        this.props.returnAddress(address);
    };

    wasChanged = () => {
        return (this.state.cityWasChanged  || (this.state.city && this.state.city.name!=='')) &&
            (this.state.firstNameWasChanged || this.state.firstName) &&
            (this.state.lastNameWasChanged || this.state.lastName) &&
                (this.state.phoneWasChanged || this.state.phone) &&
                    (this.state.postalCodeWasChanged || this.state.postalCode) &&
                        (this.state.addressDescWasChanged || this.state.addressDesc);
    };

    isDisableButton = () => {
        console.log("dis");
        return this.state.willNew ? 
            this.isValidCity(null).value &&
            this.isValidFirstName().value &&
            this.isValidLastName().value &&
            this.isValidPhone().value &&
            this.isValidPostalCode().value &&
            this.isValidAddressDesc().value &&
            this.wasChanged()
            : this.state.isValidAddress;
    };

    handleDismiss = () => {
        this.setState({errorMsg: null});
    };

    render() {
        let strings = getStrings();
        let address = strings.address;
        console.log(this.state);
        return (
            <div id='addressForm'>
                {this.state.errorMsg ?
                    <Message
                        className='errorBox'
                        onDismiss={this.handleDismiss}
                        error
                        header='Your user registration was successful'
                        content='You may now log-in with the username you have chosen'
                    /> : false}
                {this.state.addressList && this.state.addressList.length > 0 ?
                    <div>
                        <Button
                            className='newOrList'
                            onClick={this.changeAddressForm}
                        >
                            {!this.state.willNew ? address.addNewAddress : address.lastList}
                        </Button>
                    </div>
                    : false}
                {!this.state.willNew ?
                    <Form>
                        <Form.Dropdown
                            className='addressDropdown'
                            label={address.selectAddress}
                            onChange={this.handleChangeAddress}
                            onSearchChange={this.handleSearchChangeAddress}
                            options={this.state.addressSearchList}
                            placeholder={address.selectAddress}
                            search
                            searchQuery={this.state.addressSearchString}
                            selection
                            value={this.props.defaultAddress}
                        />
                    </Form>
                    :
                    <Form>
                        <Form.Group
                            widths='equal'
                        >
                            <Form.Dropdown
                                className='addressDropdown'
                                label={address.country}
                                fluid
                                onChange={this.handleChangeCountry}
                                onSearchChange={this.handleSearchChangeCountry}
                                options={this.state.countrySearchList}
                                placeholder={address.country}
                                search
                                searchQuery={this.state.countrySearchString}
                                selection
                                value={this.state.country}
                            />

                            <Form.Dropdown
                                className='addressDropdown'
                                disabled={!this.state.showStateList}
                                label={address.state}
                                fluid
                                onChange={this.handleChangeState}
                                onSearchChange={this.handleSearchChangeState}
                                options={this.state.stateSearchList}
                                placeholder={address.state}
                                search
                                searchQuery={this.state.stateSearchString}
                                selection
                                value={this.state.state}
                            />
                            <Form.Dropdown
                                className='addressDropdown'
                                disabled={!this.state.showCityList}
                                label={address.city}
                                fluid
                                onChange={this.handleChangeCity}
                                onSearchChange={this.handleSearchChangeCity}
                                options={this.state.citySearchList}
                                placeholder={address.city}
                                search
                                searchQuery={this.state.citySearchString}
                                selection
                                value={this.state.city}
                                error={!this.isValidCity().value}/>
                        </Form.Group>
                        {this.isValidCity().value ? false : this.isValidCity(strings.error.address.city).message}
                        <Form.Group>
                            <div
                                className='halfScreen'>
                                <Form.Input
                                    className='addressInput'
                                    label={address.firstName}
                                    placeholder={address.firstName}
                                    value={this.state.firstName}
                                    onChange={this.handleChangeFirstName}
                                    error={!this.isValidFirstName().value}/>
                                {this.isValidFirstName().value ? false : this.isValidFirstName(strings.error.address.firstName).message}
                            </div>
                            <div
                                className='halfScreen'>
                                <Form.Input
                                    className='addressInput'
                                    label={address.lastName}
                                    placeholder={address.lastName}
                                    value={this.state.lastName}
                                    onChange={this.handleChangeLastName}
                                    error={!this.isValidLastName().value}/>
                                {this.isValidLastName().value ? false : this.isValidLastName(strings.error.address.lastName).message}
                            </div>

                        </Form.Group>
                        <Form.Group>
                            <div
                                className='halfScreen'>
                                <Form.Input
                                    className='addressInput'
                                    label={address.phone}
                                    placeholder={address.phone}
                                    value={this.state.phone}
                                    onChange={this.handleChangePhone}
                                    error={!this.isValidPhone().value}/>
                                {this.isValidPhone().value ? false : this.isValidPhone(strings.error.address.phone).message}
                            </div>

                            <div
                                className='halfScreen'>
                                <Form.Input
                                    className='addressInput'
                                    label={address.postalCode}
                                    placeholder={address.postalCode}
                                    value={this.state.postalCode}
                                    onChange={this.handleChangePostalCode}
                                    error={!this.isValidPostalCode().value}/>
                                {this.isValidPostalCode().value ? false : this.isValidPostalCode(strings.error.address.postalCode).message}
                            </div>
                        </Form.Group>
                        <Form.TextArea
                            className='addressInput'
                            label={address.address}
                            placeholder={address.address}
                            value={this.state.addressDesc}
                            onChange={this.handleChangeAddressDesc}
                            error={!this.isValidAddressDesc().value}/>
                        {this.isValidAddressDesc().value ? false : this.isValidAddressDesc(strings.error.address.address).message}
                    </Form>}
                <div>
                    <Button
                        disabled={!this.isDisableButton()}
                        className='addressConfirmButton'
                        onClick={this.returnAddress}>
                        {address.confirm}
                    </Button>
                </div>

            </div>
        );
    };
}

export default AddressForm;
