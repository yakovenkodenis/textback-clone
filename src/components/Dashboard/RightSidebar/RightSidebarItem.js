import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';

import { datediff, unixtimeToDate, truncate } from '../../../utils';


@withRouter
export default class RightSidebarItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            active: false
        };
    }

    goToRoute = e => {
        const first_name = this.props.first_name.toLowerCase();
        const last_name = this.props.last_name.toLowerCase();
        const { subscriber_id } = this.props;
        const path = `/admin/dialogs/all/${first_name}-${last_name}-${subscriber_id}`;

        this.props.history.push(path);
    }

    render() {
        const {
            message_preview,
            image, subscriber_id,
            first_name, last_name,
            channel_type,
            unread, unreadCount
        } = this.props;

        const name = `${first_name} ${last_name}`;

        const vkHack = channel_type.toLowerCase() === "vk" ? subscriber_id+"" : null;

        const timeAgo = datediff(unixtimeToDate(message_preview.date), new Date(), true);

        return (
            <li
                className={`list ${ this.state.active ? "active" : ""}`}
                onClick={this.goToRoute}
                style={{cursor: "pointer"}}
                onMouseEnter={() => { this.setState({ active: true }); }}
                onMouseLeave={() => { this.setState({ active: false }); }}
            >
                <div className="profile">
                    <Avatar
                        vkontakteId={vkHack}
                        name={name} round={true} size={50} src={image}
                    />
                    {/*<span className="online"></span>*/}
                </div>
                <div className="info">
                    <p>{name}</p>
                    <p className={`${unread ? "font-weight-bold" : ""}`}>
                        {truncate(message_preview.text, 35, true)}
                    </p>
                </div>
                {
                    unreadCount && unreadCount > 0
                    ? <div className="badge badge-success badge-pill my-auto mx-2">{unreadCount}</div>
                    : null
                }
                <small className="text-muted my-auto">{timeAgo}</small>
            </li>
        );
    }
}
