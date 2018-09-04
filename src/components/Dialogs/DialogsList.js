import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogListItem from './DialogListItem';
import { truncate } from '../../utils';


@inject('messagesStore')
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogs: nextProps.dialogs
        });
    }

    filterDialogs = e => {
        const updatedDialogs = this.props.dialogs.filter(subscriber =>
            subscriber.name.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1
            ||
            subscriber.previewText.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1
        );

        this.setState({
            dialogs: updatedDialogs
        });
    }

    render() {

        const dialogs = this.state.dialogs   // <-- dialogs is an array of subscribers here
          .slice()
          .sort((d1, d2) => d1.message_preview.date < d2.message_preview.date)
          .map((dialog, index) => {

            const {
                name, path, channel_type,
                message_preview, unreadCount, unread, isActive,
            } = dialog;

            const bodyPreview =
                message_preview && (message_preview.text || message_preview.text === "")
                ? truncate(message_preview.text, 30, true)
                : 'Сообщений нет';

            const last_active = message_preview.date;

            const props = {
                name, last_active, bodyPreview, path, channel_type,
                unreadCount, unread, isActive
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

                {
                    dialogs && dialogs.length > 0
                    ? dialogs
                    : this.props.messagesStore.inProgress
                    ? <p className="text-muted">Загрузка...</p>
                    : <p className="text-muted">Диалогов пока нет</p>
                }
            </div>
        );
    }
}