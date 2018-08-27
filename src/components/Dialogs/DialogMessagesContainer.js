import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogMessage from './DialogMessage';


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

        const container = this.dialogMessagesContainerRef.current;
        container.scrollTop = container.scrollHeight;
    }

    componentWillUnmount() {
        window.onresize = undefined;
    }

    render() {
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
