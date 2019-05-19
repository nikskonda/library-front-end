import React from 'react'
import {Step} from 'semantic-ui-react'
import {ORDER_STATUS} from "../../context";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

const statusList = new Map(ORDER_STATUS);

const dateSign = (dateString) => {
    // return <Moment>{this.state.newsCover.creationDate}</Moment>;
    let date = new Date(dateString);
    return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' +
        (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear();

};

const icon = (status) => {
    let value = statusList.get(status);
        return <Icon name={value.icon} size='large' color={value.color} />
};

const OrderStatusStep = (props) => (
    <Step.Group size='mini'>
        {props.statusList ? props.statusList.map((status) =>
            <Step
                key={status.id}
            >
                {icon(status.status)}
                <Step.Content>
                    <Step.Title>{statusList.get(status.status).text}</Step.Title>
                    <Step.Description>{dateSign(status.dateTime)}</Step.Description>
                </Step.Content>
            </Step>  )
        : false}

    </Step.Group>
);

export default OrderStatusStep;
