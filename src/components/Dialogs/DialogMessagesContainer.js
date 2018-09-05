import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import DialogMessage from './DialogMessage';


@inject('messagesStore')
@withRouter
@observer
export default class DialogMessagesContainer extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            viewportHeight: document.documentElement.clientHeight - 250,
            selectedMessages: [],
            afterDeletion: false
        }

        this.dialogMessagesContainerRef = React.createRef();
    }

    componentDidMount() {
        // TODO think about responsiveness and number of messages in the message box
        window.onresize = e => {
            this.setState({
                ...this.state,
                viewportHeight: document.documentElement.clientHeight - 250
            });
        }
        this.props.messagesStore.getMessages(this.props.channel_id, this.props.subscriber_id);

        this.scrollSmoothToBottom();

        this.props.messagesStore.setReadStatus(
            this.props.channel_id, this.props.subscriber_id
        ).then(() => {
            // call the state function passed from DialogsList???
            // make a reaction call ??
        });
    }

    componentWillUnmount() {
        window.onresize = undefined;
    }

    scrollSmoothToBottom = () => {
        const div = this.dialogMessagesContainerRef.current

        if (div) {
            $('#timeline-scroll').animate({
            scrollTop: div.scrollHeight * 999
            }, 500);
        }
    }

    onSelectMessage = (message, shouldAdd) => {
        let selectedMessages = this.state.selectedMessages;

        if (shouldAdd) {
            selectedMessages = [...selectedMessages, message];
        } else {
            selectedMessages = selectedMessages.filter(msg =>
                msg.message_id !== message.message_id
            );
        }

        this.setState({
            ...this.state,
            selectedMessages
        });
    }

    onDeleteMessages = () => {
        this.state.selectedMessages.forEach(message => {
            this.props.messagesStore.deleteMessage(
                message.channel_id, message.user_id, message.message_id
            );
        });

        this.setState({
            ...this.state,
            selectedMessages: [],
            afterDeletion: true
        });
    }

    render() {

        if (this.state.selectedMessages === 0) {
            this.scrollSmoothToBottom();
        }

        const messages = this.props.messagesStore.chat.messages;

        const dialogItems = messages.map((message, index) => (
            <DialogMessage
                {...message}
                key={index}
                afterDeletion={this.state.afterDeletion}
                onSelect={(shouldAdd) => { this.onSelectMessage(message, shouldAdd) }}
            />
        ));

        return (
            <React.Fragment>
                <div
                    id="timeline-scroll"
                    className="timeline"
                    style={{
                        overflowY: "scroll", height: this.state.viewportHeight + "px"
                    }}
                    ref={this.dialogMessagesContainerRef}
                >
                    {
                        dialogItems.length > 0
                        ? dialogItems
                        : this.props.messagesStore.inProgress
                        ? <p className="mx-auto mt-4 text-muted">Загрузка...</p>
                        : <p className="mx-auto mt-4 text-muted">Пусто...</p>
                    }
                </div>
                {
                    this.state.selectedMessages.length > 0 &&
                    <button
                        className="btn btn-md btn-inverse-info btn-fw mb-2"
                        onClick={this.onDeleteMessages}
                    >
                        {`Удалить ${this.state.selectedMessages.length} сообщений`}
                    </button>
                }
            </React.Fragment>
        );
    }
}
