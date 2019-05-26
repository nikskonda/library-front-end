import React from 'react'
import {Step} from 'semantic-ui-react'
import {DEFAULT_L10N_LANGUAGE, LOCAL_STORAGE_UI_LANGUAGE} from "../../context";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

const dateSign = (dateString) => {
    // return <Moment>{this.state.newsCover.creationDate}</Moment>;
    let date = new Date(dateString);
    return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' +
        (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear();

};


const OrderStatusStep = (props) => {
    let strings = new LocalizedStrings(L10N);
    strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);    let statusText = new Map(strings.orderStatus);
    return (
        <Step.Group size='mini'>
        {props.statusList ? props.statusList.map((status) =>
            <Step
                key={status.id}
            >
                <Icon
                    name={statusText.get(status.status).icon}
                    size='large'
                    color={statusText.get(status.status).color} />
                <Step.Content>
                    <Step.Title>{statusText.get(status.status).text}</Step.Title>
                    <Step.Description>{dateSign(status.dateTime)}</Step.Description>
                </Step.Content>
            </Step>  )
        : false}

    </Step.Group>
);
}
    

export default OrderStatusStep;
