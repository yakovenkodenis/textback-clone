import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './CSSTransition.css';

@withRouter
@observer
export default class AddButtonsModal extends Component {

    render() {

        const {
            isOpen,
            close,
            children
        } = this.props;

        const style = {
            display: isOpen ? 'block' : 'none'
        };

        return (
            <React.Fragment>
                <CSSTransition
                    timeout={0}
                    classNames="modal-backdrop"
                    unmountOnExit
                    in={isOpen}
                >
                    <div className="modal-backdrop fade show" />
                </CSSTransition>
                <div
                    className={
                        `modal fade ${isOpen ? "show d-flex justify-content-center mt-5" : ""}`
                    }
                    // id="add-buttons-newsletter-modal"
                    tabIndex="-1"
                    aria-labelledby="ModalLabel"
                    aria-hidden="true"
                    style={style}
                >
                    <div className="model-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLabel">Добавить кнопки</h5>
                                <button
                                    className="close"
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={close}
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success">Добавить кнопку</button>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    data-dismiss="modal"
                                    onClick={close}
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
