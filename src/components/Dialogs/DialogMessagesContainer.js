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
            viewportHeight: document.documentElement.clientHeight - 250
        }

        this.dialogMessagesContainerRef = React.createRef();
    }

    componentDidMount() {
        // TODO think about responsiveness and number of messages in the message box
        window.onresize = e => {
            this.setState({
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

    render() {

        this.scrollSmoothToBottom();

        const messages = this.props.messagesStore.chat.messages;

        const dialogItems = messages.map((message, index) => (
            <DialogMessage {...message} key={index} />
        ));

        return (
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
        );
    }
}
