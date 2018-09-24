import React, { Component } from 'react';

import './AddButtonsModalStyles.css';
import ButtonsTableContainer from './ButtonsTableContainer';
import CreateButton from './CreateButton';


export default class AddButtonsModalDialog extends Component {

    state = {
        selectedButton: null
    }

    selectButton = (button) => {
        this.setState({
            ...this.state,
            selectedButton: button
        });
    }

    unselectButton = () => {
        this.setState({
            ...this.state,
            selectedButton: null
        });
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            selectedButton: null
        });

        this.props.close();
    }

    render() {
        const { activeButtons, isMobile, messages, deleteButton } = this.props;

        return (
            <div
                id="add-buttons-modal-popup-id"
                className={`add-buttons-modal-popup`}
                style={{
                    display: this.props.isOpen ? 'block' : 'none'
                }}
            >

                <div
                    className={`add-buttons-modal-popup-content`}
                    id="add-buttons-modal-popup-content-id"
                    style={{
                        width: this.props.isMobile ? '100%' : '70%'
                    }}
                >
                    <div
                        className="add-buttons-modal-popup-header"
                    >
                        <span
                            onClick={this.closeModal}
                            className="add-buttons-modal-popup-close"
                        >
                                &times;
                        </span>
                        <h3 className="mt-4">
                            Добавить кнопки
                        </h3>
                    </div>
                    <div className="add-buttons-modal-popup-body">
                        {
                            this.state.selectedButton
                            ? <CreateButton
                                isMobile={isMobile}
                                goBack={this.unselectButton}
                                button={this.state.selectedButton}
                                messages={messages}
                                activeButtons={activeButtons}
                                addButton={this.props.addButton}
                                editButton={
                                    this.state.selectedButton
                                    ? this.state.selectedButton
                                    : null
                                }
                            />
                            : <ButtonsTableContainer
                                isMobile={isMobile}
                                activeButtons={activeButtons}
                                selectButton={this.selectButton}
                                deleteButton={deleteButton}
                            />
                        }
                    </div>
                    <div className="add-buttons-modal-popup-footer">
                    </div>
                </div>
            </div>
        );
    }
}
