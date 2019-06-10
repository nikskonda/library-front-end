import React, {Component} from 'react';
import {Button, Modal} from "semantic-ui-react";
import {getStrings} from "../l10n";


class ModalYesNo extends Component {
    state = {
        header: '',
        content: '',
    };

    componentWillReceiveProps(nextProps) {
      this.setState({ header: nextProps.header , content: nextProps.content});
    }

    clickYes = () => {
        this.props.openClose();
        this.props.isConfirmed();
    };

    render() {
        let modal = getStrings().modal;
        return (
            <Modal size={this.props.size} open={this.props.open} onClose={this.props.openClose}>
                <Modal.Header>{this.props.header}</Modal.Header>
                <Modal.Content>
                    {this.props.content.map((p, index) => <p key={index}>{p}</p>)}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.openClose}>{modal.no}</Button>
                    <Button positive icon='checkmark' labelPosition='right' content={modal.yes} onClick={this.clickYes}/>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ModalYesNo;
