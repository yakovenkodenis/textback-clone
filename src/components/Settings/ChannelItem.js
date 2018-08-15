import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class ChannelItem extends Component {
    render() {

        const { 
            isConnected,
            modalId,
            channelName
        } = this.props;

        return (
            <div className="list-group-item d-flex justify-content-between align-items-center">
                {channelName}
                <span
                    className={
                        `badge ${isConnected ? "badge-success" : "badge-primary"} badge-pill badge-font-large`
                    }
                    style={{cursor: "pointer"}}
                    data-toggle="modal"
                    data-target={`#${modalId}`}
                    data-whatever="not yet."
                >
                    {isConnected ? 'Подключено' : 'Подключить'}
                </span>
            </div>
        )
    }
}
