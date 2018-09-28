import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import $ from 'jquery';
import shortid from 'shortid';


class Messages extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            messages: [
                { time: 'Через 3 часа', active: true, name: 'Полезный контент' },
                { time: 'Через 3 часа', active: true, name: 'Ненавязчивая продажа' },
                { time: 'Через 3 часа', active: true, name: 'Сообщение #7' }
            ]
        };
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
    }

    handleOnAddMessage = e => {
        this.setState({
            ...this.state,
            messages: [
                ...this.state.messages,
                { time: 'Через 3 часа', active: true, name: `Сообщение #${Math.random()}` }
            ]
        })
    }

    render() {

        const rows = this.state.messages.map((message) => (
            <tr key={shortid.generate()}>
                <td><u>{message.time}</u></td>

                <td className="d-flex justify-content-start">
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

                <td>{message.name}</td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer"}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Изменить"
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
        ));

        return (
            <div className="mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Время</th>
                            <th>Активность</th>
                            <th>Название сообщения</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <br/>

                <button
                    className="btn btn-gradient-primary btn-icon-text mr-2"
                    onClick={this.handleOnAddMessage}
                >
                    <i className="mdi mdi-plus btn-icon-prepend"></i>
                    Добавить сообщение
                </button>
            </div>
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
