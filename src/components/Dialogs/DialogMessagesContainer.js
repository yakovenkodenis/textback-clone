import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

// import VisibilitySensor from 'react-visibility-sensor'; for infinite scroll

import DialogMessage from './DialogMessage';
import { nextTick } from '../../utils';



const scrollToTopPosition = (topPosition, parent, delay) => {
    $(parent).animate({
        scrollTop: topPosition
    }, delay);
}

const getTopPosition = el => $(el).offset().top;

let previousRoute = "";

@inject('messagesStore')
@withRouter
@observer
export default class DialogMessagesContainer extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            viewportHeight: document.documentElement.clientHeight - 400,
            selectedMessages: [],
            afterDeletion: false,
            loadingPrevious: false,
            allowedToLoadPrevious: false,
            offset: 0,   // for pagination
            limit: 25,    // for pagination
        }

        this.dialogMessagesContainerRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        previousRoute = this.props.location.pathname;
    }

    componentDidMount() {
        // TODO think about responsiveness and number of messages in the message box
        window.onresize = e => {
            this.setState({
                ...this.state,
                viewportHeight: document.documentElement.clientHeight - 250
            });
        }

        if (
            this.props.messagesStore.chat.messages.length === 0
            || previousRoute !== this.props.location.pathname
        ) {

            console.log('WE ARE LOADING NEW MESSAGES!!!')

            this.loadMessages()
              .then(() => {
                  nextTick(() => {
                      this.scrollSmoothToBottom();
                  });
              });
        } else {
            this.scrollSmoothToBottom();
        }

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

    loadMessages = () => {
        return this.props.messagesStore.getMessages(
            this.props.channel_id, this.props.subscriber_id /* offset and limit from state */
        ); /* .then( ... update the state (limits offsets etc) on load   ) */
    }

    // this function is for usage with VisibilitySensor and infinite scroll (with offsets and limits)
    loadPrevious = isVisible => {
        if (!isVisible || !this.state.allowedToLoadPrevious || this.state.loadingPrevious) return;

        const firstMessage = document.querySelectorAll('#timeline-scroll .timeline-wrapper')[0];
        const oldFirstMessageTopPosition = getTopPosition(firstMessage);

        this.setState({
            ...this.state,
            loadingPrevious: true
        });

        return this.loadMessages()
            .then(() => {
                nextTick(() => {
                    const messages = document.querySelector('#timeline-scroll');
                    const newFirstMessageTopPosition = getTopPosition(firstMessage);
                    const delay = 0;

                    if (firstMessage) {
                        scrollToTopPosition(
                            newFirstMessageTopPosition - oldFirstMessageTopPosition, messages, delay
                        );
                    }

                    this.setState({
                        ...this.state,
                        loadingPrevious: false
                    });
                });
            });
    }

    scrollSmoothToBottom = () => {
        const div = this.dialogMessagesContainerRef.current

        if (div) {
            $('#timeline-scroll.timeline').animate({
            scrollTop: div.scrollHeight * 999
            }, 1);
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
        // let scrollHeight = this.dialogMessagesContainerRef.current.scrollHeight;

        if (this.state.selectedMessages === 0) {
            this.scrollSmoothToBottom();
            // scrollHeight = this.state.scrollHeight;
        }

        const messages = this.props.messagesStore.chat.messages;

        const dialogItems = messages.map((message) => (
            <DialogMessage
                {...message}
                key={message.message_id}
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
