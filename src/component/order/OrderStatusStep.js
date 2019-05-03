import React from 'react'
import {Label, Step} from 'semantic-ui-react'
import {ORDER_STATUS} from "../../context";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";


const dateSign = (dateString) => {
    // return <Moment>{this.state.newsCover.creationDate}</Moment>;
    let date = new Date(dateString);
    return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' +
        (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear();

};

const icon = (status) => {
    let list = new Map(ORDER_STATUS);
    if (status === list.get('cancelled')) {
        return <Icon name='ban' size='huge' color='red' />
    }
    return <Icon name='check' size='huge' color='green' />
};

const OrderStatusStep = (props) => (
    <Step.Group>
        {props.statusList.map((status) =>
            <Step
                key={status.id}
            >
                {icon(status.status)}
                <Step.Content>
                    <Step.Title>{status.status}</Step.Title>
                    <Step.Description>{dateSign(status.dateTime)}</Step.Description>
                </Step.Content>
            </Step>  )}

    </Step.Group>
);

export default OrderStatusStep;
