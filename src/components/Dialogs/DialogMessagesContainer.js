import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogMessage from './DialogMessage';


@withRouter
@observer
export default class DialogMessagesContainer extends Component {
    render() {

        const dialogItems = this.props.messages.map((message, index) => (
            <DialogMessage {...message} key={index} />
        ));

        return (
            <div
                id="timeline-scroll"
                className="timeline"
                style={{overflowY: "scroll", height: (document.documentElement.clientHeight - 250) + "px"}}
            >
                {dialogItems}
            </div>
        );
    }
}
