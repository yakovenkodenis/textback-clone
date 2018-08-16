import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogListItem from './DialogListItem';


@withRouter
@observer
export default class DialogsList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dialogs: []
        };

        this.searchInputField = React.createRef();
    }

    truncate = (msg, n, useWordBoundary) => {
        if (msg.length <= n) { return msg; }
        let subString = msg.substr(0, n - 1);
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString
        ) + '...';
    }

    componentWillMount() {
        this.setState({
            dialogs: this.props.dialogs
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogs: nextProps.dialogs
        });
    }

    filterDialogs = e => {
        const updatedDialogs = this.props.dialogs.filter(dialog =>
            dialog.name.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1
            ||
            dialog.messages.map(msg => msg.body).join(" ").toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1
        );

        this.setState({
            dialogs: updatedDialogs
        });
    }

    render() {

        const dialogs = this.state.dialogs.map((dialog, index) => {

            const { name, timeAgo, path, messages, socialNetwork } = dialog;
            const bodyPreview = this.truncate(
                messages[messages.length - 1].body,
                26,
                true
            );


            const props = {
                name, timeAgo, bodyPreview, path, socialNetwork
            }

            return <DialogListItem key={index} {...props} />;
        });

        return (
            <div className="list-group">

                <div className="search-field d-none d-md-block">
                    <form className="d-flex align-items-center h-100">
                    <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                            <i
                                className="input-group-text mdi border-0 mdi-magnify bg-transparent"
                            />                
                        </div>
                        <input
                            ref={this.searchInputField}
                            type="text"
                            className="form-control bg-transparent border-0"
                            placeholder="Поиск..."
                            onChange={this.filterDialogs}
                        />
                    </div>
                    </form>
                </div>

                {dialogs}                                               
            </div>
        );
    }
}