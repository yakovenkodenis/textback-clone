import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogMessage from './DialogMessage';


@withRouter
@observer
export default class DialogMessagesContainer extends Component {

    state = {
        viewportHeight: document.documentElement.clientHeight - 250
    }

    componentDidMount() {
        // TODO think about responsiveness and number of messages in the message box
        window.onresize = e => {
            this.setState({
                viewportHeight: document.documentElement.clientHeight - 250
            });
        }
    }

    componentWillUnmount() {
        window.onresize = undefined;
    }

    render() {

        const dialogItems = this.props.messages.map((message, index) => (
            <DialogMessage {...message} key={index} />
        ));

        return (
            <div
                id="timeline-scroll"
                className="timeline"
                style={{overflowY: "scroll", height: this.state.viewportHeight + "px"}}
            >
                {dialogItems}
            </div>
        );
    }
}
