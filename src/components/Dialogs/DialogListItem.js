import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { toImage } from 'emojione';

import { datediff, unixtimeToDate } from '../../utils';


@inject('channelsStore')
@withRouter
@observer
export default class DialogsListItem extends Component {

    render() {

        const {
            name, last_active, bodyPreview,
            path, channel_type,
            history, match,
            // channelsStore
        } = this.props;

        const timeAgo = datediff(unixtimeToDate(last_active), new Date());

        

        return (
            <a
                className="list-group-item list-group-item-action flex-column align-items-start list-group-item-dialogs"
                style={{cursor: "pointer"}}
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
                <p
                    className="mb-1"
                    dangerouslySetInnerHTML={{
                        __html: toImage(bodyPreview)
                    }}
                />
            </a>
        );
    }
}
