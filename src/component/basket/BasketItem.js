import React, {Component} from 'react';
import {Button, Icon, Item, Label} from "semantic-ui-react";
import {BACK_END_SERVER_URL, URL_DOWNLOAD_FILE} from "../../context";
import {Link} from "react-router-dom";


class BasketItem extends Component {

    state = {
        goods: this.props.goods,
    };

    addOne = () => {
        this.props.addOne(this.state.goods.book.id);
    };
    removeOne = () => {
        this.props.removeOne(this.state.goods.book.id);
    };
    removeAll = () => {
        this.props.removeAll(this.state.goods.book.id);
    };

    render() {
        const goods = this.state.goods;
        return (

            <Item>
                <Item.Image
                    src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + goods.book.thumbnailUrl}
                    as={Link}
                    to={'book/' + goods.book.id}
                />

                <Item.Content>
                    <Item.Header
                        as={Link}
                        to={'book/' + goods.book.id}>
                        {goods.book.title}
                    </Item.Header>


                    <Item.Meta>
                        <Label tag>
                            Count: {goods.count}
                        </Label>
                    </Item.Meta>
                    <Item.Extra>
                        <Button
                            icon
                            labelPosition='right'
                            onClick={this.addOne}>
                            Add One
                            <Icon name='plus'/>
                        </Button>
                        {goods.count > 1 ?
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.removeOne}>
                                Remove One
                                <Icon name='minus'/>
                            </Button>
                            : false}
                        {goods.count === 1 ?
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.removeAll}>
                                Remove
                                <Icon name='minus'/>
                            </Button>
                            : false}
                        {goods.count > 1 ?
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.removeAll}>
                                Remove All
                                <Icon name='remove'/>
                            </Button>
                            : false}
                    </Item.Extra>

                </Item.Content>
            </Item>
        );
    }
}


export default BasketItem;