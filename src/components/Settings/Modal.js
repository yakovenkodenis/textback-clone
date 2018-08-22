import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class Modal extends Component {
    render() {

        const {
            modalId,
            handleAddChannel,
            children
        } = this.props;

        return (
            <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ModalLabel"
            style={{display: "none"}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">
                                Подключить новый канал
                            </h5>
                            <button
                                type="button" className="close"
                                data-dismiss="modal" aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button
                                className={`btn btn-gradient-success`}
                                type="button"
                                data-dismiss="modal"
                                onClick={handleAddChannel}
                            >
                                Подключить
                            </button>
                            <button
                                className="btn btn-light"
                                type="button"
                                data-dismiss="modal"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
