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
            isMobile,
            children
        } = this.props;

        const style = {
            display: isOpen ? 'block' : 'none',
            width: '100%',
            height: '100%',
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
                    tabIndex="-1"
                    aria-labelledby="ModalLabel"
                    aria-hidden="true"
                    style={style}
                >
                    <div
                        className="model-dialog" role="document"
                        style={{
                            width: isMobile ? '100%' : '50%'
                        }}
                    >
                        <div className="modal-content" id="timeline-scroll"
                            style={{
                                overflowY: 'scroll',
                                maxHeight: (document.documentElement.clientHeight - 100) + 'px',
                                boxSizing: 'content-box'
                            }}
                        >
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
                                <button
                                    type="button"
                                    className="btn btn-light w-100"
                                    data-dismiss="modal"
                                    onClick={close}
                                >
                                    Сохранить
                                </button>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
