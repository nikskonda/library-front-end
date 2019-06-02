import React, {Component} from 'react';
import {
    BACK_END_SERVER_URL,
    DEFAULT_L10N_LANGUAGE,
    LOCAL_STORAGE_BASKET,
    LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN,
    LOCAL_STORAGE_UI_LANGUAGE
} from "../../context";
import axios from "axios";
import {Button, Container, Item, Message} from "semantic-ui-react";
import BasketItem from "./BasketItem";
import AddressForm from "./AddressForm";
import './Basket.css'
import {getLang, L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';


class BasketPage extends Component {

    state = {
        basket: [],
        totalPrice: 0,
        showAddressField: false,
        errorMsg: null,
    };

    componentWillMount() {
        const basketStr = localStorage.getItem(LOCAL_STORAGE_BASKET);
        let basket = [];
        if (basketStr) {
            basket = JSON.parse(basketStr);
            this.setState({basket: basket}, this.calcTotalPrice);
        }
    }


    calcTotalPrice() {
        let basket = this.state.basket;
        let total = 0;
        for (let i = 0; i < basket.length; i++) {
            total += (basket[i].book.price ? basket[i].book.price : 0) * basket[i].count;
        }
        this.setState({totalPrice: total});
    }

    updateBasket = (basket) => {
        localStorage.setItem(LOCAL_STORAGE_BASKET, JSON.stringify(basket));
        this.setState({basket: basket});
        this.calcTotalPrice();
    };

    addOne = (bookId) => {
        let basket = this.state.basket;
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].book.id === bookId) {
                basket[i].count++;
                break;
            }
        }
        this.updateBasket(basket);
    };

    removeOne = (bookId) => {
        let basket = this.state.basket;
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].book.id === bookId) {
                basket[i].count--;
                if (basket[i].count === 0) {
                    basket.splice(i, 1);
                }
                break;
            }
        }
        this.updateBasket(basket);
    };

    removeAll = (bookId) => {
        let basket = this.state.basket;
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].book.id === bookId) {
                basket.splice(i, 1);
                break;
            }
        }
        this.updateBasket(basket);
    };

    removeAllButOne = (bookId) => {
        let basket = this.state.basket;
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].book.id === bookId) {
                basket[i].count = 1;
                break;
            }
        }
        this.updateBasket(basket);
    };

    viewAddressFields = () => {
        this.setState({showAddressField: !this.state.showAddressField})
    };

    createOrder = (address) => {
        let order = {
            address: address,
            details: this.state.basket,
        };
        axios
            .post(BACK_END_SERVER_URL + '/order',
                order,
                {
                    headers: {
                        'Authorization': 'Bearer  ' + localStorage.getItem(LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN),
                        'Content-type': 'application/json',
                        'Accept-Language': getLang()
                    },
                }
            )
            .then(res => {
                this.props.history.push('/order/user')
            })
            .catch(({response}) => {
                this.setState({errorMsg: response.data.message});
            });
    };

    getAddress = (address) => {
        if (address){
            this.createOrder(address);
        }
    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);
        const alert =
            (<Message
                warning
                header={strings.error.basket.notFound}
            />);
        const errorMsg =
            (<Message
                warning
                header={strings.error.basket.notCreated}
                content={this.state.errorMsg}
            />);
        return (
            <div id='basket'>
                <Container>
                    {
                        this.state.basket && this.state.basket.length !== 0 ?
                            <React.Fragment>
                                {this.state.errorMsg?errorMsg:false}
                                <Item.Group divided>
                                    {this.state.basket.map((goods) =>
                                        <BasketItem
                                            key={goods.book.id}
                                            goods={goods}
                                            addOne={this.addOne}
                                            removeOne={this.removeOne}
                                            removeAll={this.removeAll}
                                            removeAllButOne={this.removeAllButOne}
                                        />
                                    )}
                                </Item.Group>
                                <Button
                                    className='showAddresButton'
                                    onClick={this.viewAddressFields}>
                                    {this.state.showAddressField? strings.basket.hide:strings.basket.checkout}
                                </Button>
                                {this.state.showAddressField ? <AddressForm returnAddress={this.getAddress}/> : false}
                            </React.Fragment>
                            :
                            alert
                    }
                </Container>
            </div>


        );
    }
}

export default BasketPage;
