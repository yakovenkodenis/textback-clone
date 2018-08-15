import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogListItem from './DialogListItem';


@withRouter
@observer
export default class DialogsList extends Component {

    truncate = (msg, n, useWordBoundary) => {
        if (msg.length <= n) { return msg; }
        let subString = msg.substr(0, n - 1);
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString
        ) + '...';
    }

    render() {

        const dialogs = this.props.dialogs.map((dialog, index) => {

            const { name, timeAgo, path, messages } = dialog;
            const bodyPreview = this.truncate(
                messages[messages.length - 1].body,
                26,
                true
            );


            const props = {
                name, timeAgo, bodyPreview, path
            }

            return <DialogListItem key={index} {...props} />;
        })

        return (
            <div className="list-group">
                {dialogs}                                               
            </div>
        );
    }
}