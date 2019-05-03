import React, {Component} from 'react';
import {LOCAL_STORAGE_BASKET, LOCAL_STORAGE_OAUTH2_ACCESS_TOKEN} from "../context";
import axios from "axios";
import {Container, Item, Message, Statistic} from "semantic-ui-react";
import BasketItem from "./BasketItem";

class BasketPage extends Component {

    state = {
        basket: [],
        totalPrice: 0,
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
            total += (basket[i].book.price?basket[i].book.price:0) * basket[i].count;
        }
        this.setState({totalPrice: total});
    }

    loadOrdersByUrl = (url) => {
        const params = {
            number: this.state.number,
            size: this.state.size,
            sort: this.state.sort,
            direction: this.state.direction,
            status: this.state.status,
        };

        axios
            .get(url,
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
                    orders: res.data.content,
                    totalPages: res.data.totalPages,
                });
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

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
                        </React.Fragment>
                        :
                        alert
                }

            </Container>

        );
    }
}

export default BasketPage;