import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class DialogsListItem extends Component {

    render() {

        const {
            name, timeAgo, bodyPreview,
            path, socialNetwork,
            history, match
        } = this.props;

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
                            socialNetwork === 'viber'
                              ? <span className="text-muted">{`${socialNetwork.charAt(0)}`}  </span>
                              : <span className="text-muted"><i className={`mdi mdi-${socialNetwork}`} />  </span>      
                        }
                        {name}
                    </h5>
                    <small className="text-muted">{timeAgo}</small>
                </div>
                <p className="mb-1">{bodyPreview}</p>
            </a>
        );
    }
}
