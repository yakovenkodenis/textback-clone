import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import $ from 'jquery';

import MessageComposerModal from './MessageComposerModal';


class Messages extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isMessagesComposerModalOpen: false,
            activeMessageChain: 0,
            messages: []
        };
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips

        this.setState({
            ...this.state,
            messages: [
                { id: 'id1', time: 'Через 3 часа', active: true, name: 'Полезный контент' },
                { id: 'id2', time: 'Через 2 часа', active: false, name: 'Ненавязчивая продажа' },
                { id: 'id3', time: 'Через 4 часа', active: true, name: 'Сообщение #7' }
            ]
        });
    }

    handleOnAddMessage = e => {

        const msg = { key: `${Math.random()}`, time: 'Через 3 часа', active: true, name: `Сообщение #${Math.random()}` };

        this.setState({
            ...this.state,
            messages: [
                ...this.state.messages,
                msg
            ]
        });
    }

    openMessagesModal = (index) => {
        this.setState({
            ...this.state,
            activeMessageChain: this.state.messages[index],
            isMessagesComposerModalOpen: true
        });
    }

    closeMessagesModal = () => {
        this.setState({
            ...this.state,
            isMessagesComposerModalOpen: false
        });
    }

    renderTableRow = (message) => {
        return (
            <tr key={message.id}>
                <td><u>{message.time}</u></td>

                <td className="d-flex justify-content-center mb-1">
                    <div
                        className="form-check form-check-flat form-check-primary my-auto">
                        <label className="form-check-label my-auto">
                            <input
                                type="checkbox" className="form-check-input"
                                defaultChecked={message.active}
                            />
                            <i className="input-helper"></i>
                        </label>
                    </div>
                </td>

                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <i className="mdi mdi-drag-vertical"
                            style={{transform: 'scale(1.6)', cursor: 'pointer'}}
                        />
                    </div>
                </td>

                <td>{message.name}</td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer"}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Изменить"
                            onClick={() => { this.openMessagesModal(message.id); }}
                        >
                            <i className="mdi mdi-pencil-box-outline" />
                        </label>
                        <label
                            className="badge badge-danger my-auto mx-2"
                            style={{cursor: "pointer"}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Удалить"
                        >
                            <i className="mdi mdi-delete-forever" />
                        </label>
                    </div>
                </td>
            </tr>
        );
    }

    render() {

        const { isMobile } = this.props;

        return (
        <React.Fragment>
            <div className="">
                <button
                    className="btn btn-gradient-primary btn-icon-text mb-3"
                    onClick={this.handleOnAddMessage}
                >
                    <i className="mdi mdi-plus btn-icon-prepend"></i>
                    Добавить сообщение
                </button>
                <br/>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Время</th>
                            <th>Активность</th>
                            <th></th>
                            <th>Название сообщения</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.messages.map(msg => this.renderTableRow(msg))
                        }
                    </tbody>
                </table>
            </div>
            <MessageComposerModal
                isOpen={this.state.isMessagesComposerModalOpen}
                close={this.closeMessagesModal}
                isMobile={isMobile}
                messages={this.state.activeMessageChain}
            />
        </React.Fragment>
        )
    }
}

const ResponsiveMessages = props =>(
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Messages isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveMessages;
