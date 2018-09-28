import React, { Component } from 'react';

import MessageComposerForm from '../../Newsletter/New/MessageComposerForm';
import '../../Newsletter/New/AddButtonsModalStyles.css';


export default class MessageComposerModal extends Component {

    state = {
        messages: []
    }

    closeModal = () => {
        this.props.close();
    }

    render() {
        const { isMobile, edit } = this.props;

        return (
            <div
                id="add-buttons-modal-popup-id"
                className={`add-buttons-modal-popup`}
                style={{
                    display: this.props.isOpen ? 'block' : 'none'
                }}
            >

                <div
                    className={`add-buttons-modal-popup-content`}
                    id="add-buttons-modal-popup-content-id"
                    style={{
                        width: this.props.isMobile ? '100%' : '70%'
                    }}
                >
                    <div
                        className="add-buttons-modal-popup-header"
                    >
                        <span
                            onClick={this.closeModal}
                            className="add-buttons-modal-popup-close"
                        >
                                &times;
                        </span>
                        <h3 className="mt-4">
                            Изменить сообщение
                        </h3>
                    </div>
                    <div className="add-buttons-modal-popup-body">

                        <MessageComposerForm
                            isMobile={isMobile}
                            onStateChange={this.updateMessagesChain}
                            messages={this.state.messages}
                            edit={edit}
                            withoutSelfSending
                            modalSized
                        />

                    </div>
                    <div className="add-buttons-modal-popup-footer">
                    </div>
                </div>
            </div>
        );
    }
}
