import React, {Component} from 'react';
import {BACK_END_SERVER_URL, LOCAL_STORAGE_BASKET, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN} from "../../context";
import axios from "axios";
import {Button, Container, Item, Message, Statistic} from "semantic-ui-react";
import BasketItem from "./BasketItem";
import AddressForm from "./AddressForm";

class BasketPage extends Component {

    state = {
        basket: [],
        totalPrice: 0,
        showAddressField: false,
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
                        // 'Accept-Language': locale.tag || ''
                    },
                }
            )
            .then(res => {
                this.props.history.push('/order/user')
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    getAddress = (address) => {
        if (address){
            this.createOrder(address);
        }
    };

    render() {
        const alert =
            (<Message
                warning
                header='Your Basket is empty'
                content='Plz change search query!'
            />);
        return (
            <Container>
                {
                    this.state.basket && this.state.basket.length !== 0 ?
                        <React.Fragment>
                            <Item.Group divided>
                                {this.state.basket.map((goods) =>
                                    <BasketItem
                                        key={goods.book.id}
                                        goods={goods}
                                        addOne={this.addOne}
                                        removeOne={this.removeOne}
                                        removeAll={this.removeAll}
                                    />
                                )}
                            </Item.Group>
                            <Statistic>
                                <Statistic.Value>{this.state.totalPrice}</Statistic.Value>
                                <Statistic.Label>Total</Statistic.Label>
                            </Statistic>
                            <Button
                                onClick={this.viewAddressFields}>
                                OFORMIT
                            </Button>
                            {this.state.showAddressField ? <AddressForm returnAddress={this.getAddress}/> : false}
                        </React.Fragment>
                        :
                        alert
                }

            </Container>

        );
    }
}

export default BasketPage;
