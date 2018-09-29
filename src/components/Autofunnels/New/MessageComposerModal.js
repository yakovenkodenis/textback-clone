import React, { Component } from 'react';

import MessageComposerForm from '../../Newsletter/New/MessageComposerForm';
import '../../Newsletter/New/AddButtonsModalStyles.css';


export default class MessageComposerModal extends Component {

    state = {
        messages: [],
        title: '',
        id: 0,
    }

    componentDidMount() {
        this.setState({
            ...this.props.activeChain
        }, () => {
            console.log('ComposerModal did Mount', this.state);
        });
    }

    updateMessagesChain = messages => {
        this.setState({
            ...this.state,
            messages
        });
    }

    onTitleChange = e => {
        this.setState({
            ...this.state,
            title: e.target.value
        });
    }

    saveChain = () => {
        this.props.updateChainItem(this.state);
        this.closeModal();
    }

    closeModal = () => {
        this.setState({}, () => {
            this.props.close();
        });
    }

    render() {
        const { isMobile } = this.props;

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

                        <div className="form-group mx-5 mb-0 mt-2">
                            <input
                                type="text"
                                placeholder="Название сообщения"
                                className="form-control form-control-lg"
                                id="chainTitle"
                                value={this.state.title}
                                onChange={this.onTitleChange}
                            />
                        </div>

                        <MessageComposerForm
                            isMobile={isMobile}
                            onStateChange={this.updateMessagesChain}
                            messages={this.state.messages}
                            edit={true}
                            withoutSelfSending
                            modalSized
                        />

                        <button
                            className="btn btn-gradient-success btn-icon-text mr-2"
                            onClick={this.saveChain}
                        >
                            Сохранить
                        </button>

                    </div>
                    <div className="add-buttons-modal-popup-footer">
                    </div>
                </div>
            </div>
        );
    }
}
