import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogListItem from './DialogListItem';


@inject('messagesStore', 'channelsStore', 'subscribersStore')
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

    componentWillMount() {
        this.setState({
            dialogs: this.props.dialogs
        });
    }

    componentDidMount() {
        // const { messages } = this.props.messagesStore;

        console.log('GETTING MESSAGES!!!');

        // MESSAGE OBJECT EXAMPLE
        // channel_id: 9
        // chat_id: 63113727
        // date: 1535194570
        // is_attachment: false
        // message_id: 2259
        // owner: false
        // text : "/start"
        // update_date: null
        // user_id: 63113727
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogs: nextProps.dialogs
        });
    }

    truncate = (msg, n, useWordBoundary) => {
        if (msg.length <= n) { return msg; }
        let subString = msg.substr(0, n - 1);
        return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString
        ) + '...';
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

            const { name, path, /*messages,*/ channel_type, message_preview } = dialog;

            console.log('DialogsList.render(): [inside dialogs.map(...)]: ', dialog);

            console.log('PREVIEW', message_preview);

            const bodyPreview =
                // messages && messages.length > 0
                // ? this.truncate(
                //     messages[0].text,
                //     30, // maybe make this parameter dynamic based on screen size???
                //     true
                //   )
                // : 'Сообщений нет';
                message_preview && (message_preview.text || message_preview.text === "")
                ? this.truncate(message_preview.text, 30, true)
                : 'Сообщений нет';

            const last_active = message_preview.date;

            const props = {
                name, last_active, bodyPreview, path, channel_type
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