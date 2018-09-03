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
            scrollTop: div.scrollHeight * 2
            }, 500);
        }
     }

    render() {

        // let chat = this.props.messagesStore.messages.find(chat => {
        //     // console.log('INSIDE CHAT FIND:', chat);
        //     // console.log(chat.channel_id, chat.subscriber_id);
        //     // console.log(channel_id, subscriber_id);

        //     return chat.channel_id === this.props.channel_id
        //            && chat.subscriber_id === this.props.subscriber_id
        // });
        
        // if (!chat) {

        //     console.log('DialogMessagesContainer.js --> our chat is empty')
        //     chat = {
        //         messages: []
        //     };
        //     // return null;
        // }


        // const messages = chat.messages;


        const chats = this.props.messages;
        const messages = chats ? [...chats].reverse() : [];

        const dialogItems = messages.map((message, index) => (
            <DialogMessage {...message} key={index} />
        ));

        return (
            <div
                id="timeline-scroll"
                className="timeline"
                style={{overflowY: "scroll", height: this.state.viewportHeight + "px"}}
                ref={this.dialogMessagesContainerRef}
            >
                {
                    dialogItems.length > 0
                    ? dialogItems
                    : <p className="mx-auto mt-4 text-muted">Пусто...</p>
                }
            </div>
        );
    }
}
