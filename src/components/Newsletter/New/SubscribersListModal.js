import React, { Component } from 'react';
import  Avatar from 'react-avatar';

import './SubscribersListModalStyles.css';


export default class SubscribersListModal extends Component {

    close = () => {
        this.props.close();
    }

    generateTableRows = () => {
        return this.props.subscribers.map((subscriber, index) => (
            <tr key={index} style={{cursor: 'pointer'}}>
                <td>
                    <div className="form-check form-check-flat form-check-primary m-0 pb-3">
                        <label className="form-check-label text-muted">
                            <input 
                                type="checkbox"
                                className="form-check-input"
                                checked={subscriber.isSelected}
                                onChange={e => this.onSubscriberSelectedChange(e, subscriber)}
                            />
                            <i className="input-helper"></i>
                        </label>
                    </div>
                </td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <Avatar src={subscriber.avatar} name={subscriber.name} size="50" round={true} />
                    </div>
                </td>
                <td>{subscriber.name}</td>
            </tr>
        ));
    }

    onSubscriberSelectedChange = (e, subscriber) => {
        this.props.onSelect(subscriber);
    }

    render() {
        const style = {
            display: this.props.isOpen ? 'block' : 'none'
        };

        return (
            <div
                id="subscribers-list-modal-popup-id"
                className={`subscribers-list-modal-popup`}
                style={style}
            >

                <div
                    className={`subscribers-list-modal-popup-content`}
                    id="subscribers-list-modal-popup-content-id"
                    style={{
                        width: this.props.isMobile ? '100%' : '30%'
                    }}
                >
                    <div
                        className="subscribers-list-modal-popup-header"
                    >
                        <span
                            onClick={this.close}
                            className="subscribers-list-modal-popup-close"
                        >
                                &times;
                        </span>
                        <h3 className="mt-4">
                            Подписчики
                        </h3>
                    </div>
                    <div
                        className="subscribers-list-modal-popup-body"
                        style={{
                            maxHeight: '400px',
                            overflowY: 'scroll'
                        }}
                    >
                        <div className="mt-2 mx-auto">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <div
                                                className="form-check form-check-flat form-check-primary m-0"
                                                style={{
                                                    marginBottom: '0 !important',
                                                    paddingBottom: '0 !important'
                                                }}
                                            >
                                                <label className="form-check-label text-muted">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        defaultChecked={true}
                                                        onChange={e => { this.props.toggleSelectAll(e); }}
                                                    />
                                                    <i className="input-helper"></i>
                                                </label>
                                            </div>
                                        </th>
                                        <th></th>
                                        <th>Имя</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.generateTableRows()}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="subscribers-list-modal-popup-footer">
                    </div>
                </div>
            
            </div>
        );
    }
}
