import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { toImage } from 'emojione';

import { datediff, unixtimeToDate } from '../../utils';


@withRouter
@observer
export default class DialogsListItem extends Component {

    render() {

        const {
            name, last_active, bodyPreview,
            unreadCount, unread,
            path, channel_type,
            history, match, isActive
        } = this.props;

        const timeAgo = datediff(unixtimeToDate(last_active), new Date());

        

        return (
            <a
                className="list-group-item list-group-item-action flex-column align-items-start list-group-item-dialogs"
                style={{
                    cursor: "pointer",
                    backgroundColor: isActive ? "#e9ecef" : unread ? "#f8f9fa" : "#fff",
                }}
                onClick={() => {
                    history.push(`/admin/dialogs/${match.params.currentFilter}/${path}`)
                }}
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                        {
                            channel_type === 'viber'
                              ? <span className="text-muted">{`${channel_type.charAt(0)}`}  </span>
                              : channel_type
                              ? <span className="text-muted"><i className={`mdi mdi-${channel_type.toLowerCase()}`} />  </span>
                              : null
                        }
                        {name}
                    </h5>
                    <small className="text-muted">{timeAgo}</small>
                </div>
                <div className="d-flex justify-content-between">
                    <p
                        className={`mb-1 ${unread ? "font-weight-bold" : ""}`}
                        dangerouslySetInnerHTML={{
                            __html: toImage(bodyPreview)
                        }}
                    />
                    {
                        unreadCount && unreadCount > 0
                        ? <div className="badge-sm badge-success badge-pill my-auto">{unreadCount}</div>
                        : null
                    }
                </div>
            </a>
        );
    }
}
