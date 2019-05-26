import React, {Component} from 'react';
import {Button, Icon, Item, Label} from "semantic-ui-react";
import {BACK_END_SERVER_URL, URL_DOWNLOAD_FILE, LOCAL_STORAGE_UI_LANGUAGE, DEFAULT_L10N_LANGUAGE} from "../../context";
import {Link} from "react-router-dom";
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';


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
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        let basket = strings.basket;
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
                            {basket.count+goods.count}
                        </Label>
                    </Item.Meta>
                    <Item.Extra>
                        <Button
                            icon
                            labelPosition='right'
                            onClick={this.addOne}>
                            {basket.addOne}
                            <Icon name='plus'/>
                        </Button>
                        {goods.count > 1 ?
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.removeOne}>
                                {basket.removeOne}
                                <Icon name='minus'/>
                            </Button>
                            : false}
                        {goods.count === 1 ?
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.removeAll}>
                                {basket.remove}
                                <Icon name='minus'/>
                            </Button>
                            : false}
                        {goods.count > 1 ?
                            <Button
                                icon
                                labelPosition='right'
                                onClick={this.removeAll}>
                                {basket.removeAll}
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