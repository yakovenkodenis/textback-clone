import React, { Component } from 'react';
import { observer } from 'mobx-react';

import MessageComposerForm from '../../Newsletter/New/MessageComposerForm';
import '../../Newsletter/New/AddButtonsModalStyles.css';


@observer
export default class MessageComposerModal extends Component {

    state = {
        messages: [],
        title: '',
        id: 0,

        sendTime: {
            unit: 'hour',
            measure: 3
        }
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

        this.setState({
            ...this.props.activeChain,
            activeChain: this.props.activeChain
        }, () => {
            console.log('MessageComposerModal did Mount', this.state.activeChain);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateMessagesChain = (messages) => {
        if (this._isMounted) {
            this.setState({
                ...this.state,
                messages
            });
        }
    }

    onTitleChange = e => {
        this.setState({
            ...this.state,
            title: e.target.value
        });
    }

    onSendTimeChange = e => {
        this.setState({
            ...this.state,
            sendTime: {
                ...this.state.sendTime,
                [e.target.name]: e.target.value
            }
        });
    }

    saveChain = () => {
        if (this._isMounted) {
            this.setState({
                ...this.state,
                edit: true
            }, () => {
                console.log('SAVE CHAIN: ', this.state.messages);
                this.props.updateChainItem(this.state);
                this.closeModal();
            });
        }
    }

    getMessagesFromState = () => {
        const { messages } = this.state;

        console.log('getMessagesFromState: ', messages);
        return messages;
    }

    closeModal = () => {
        // this.setState({}, () => {
            this.props.close();
        // });
    }

    render() {
        const { isMobile } = this.props;
        const modalDisplayStyle = {
            display: this.props.isOpen ? 'block' : 'none'
        };
        const modalSizeStyle = {
            width: this.props.isMobile ? '100%' : '70%'
        };

        return (
            <div
                id="add-buttons-modal-popup-id"
                className={`add-buttons-modal-popup`}
                style={modalDisplayStyle}
            >

                <div
                    className={`add-buttons-modal-popup-content`}
                    id="add-buttons-modal-popup-content-id"
                    style={modalSizeStyle}
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
                        {
                            this.state.messages.length > 0
                            && <MessageComposerForm
                                isMobile={isMobile}
                                onStateChange={this.updateMessagesChain}
                                messages={this.state.messages}
                                edit={this.state.edit}
                                withoutSelfSending
                                modalSized
                            />
                        }

                        <button
                            className="btn btn-gradient-success btn-icon-text mr-2 mb-1"
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
