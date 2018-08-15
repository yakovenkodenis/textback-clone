import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class DialogsList extends Component {

    render() {

        const {
            name, timeAgo, bodyPreview, path,
            history
        } = this.props;

        return (
            <a
                className="list-group-item list-group-item-action flex-column align-items-start list-group-item-dialogs"
                style={{cursor: "pointer"}}
                onClick={() => {
                    history.push(`/admin/dialogs${path}`)
                }}
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{name}</h5>
                    <small className="text-muted">{timeAgo}</small>
                </div>
                <p className="mb-1">{bodyPreview}</p>
            </a>
        );
    }
}
