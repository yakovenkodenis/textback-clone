import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class MessageComposerForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.messageBox = React.createRef();

        this.state = {
            messages: [{
                messageText: '',
                messageAttachment: '',
                messageId: 0
            }],
            activeMessageId: 0
        };
    }

    onAddMessage = e => {
        this.messageBox.current.value = '';

        this.setState({
            activeMessageId: this.state.messages.length,
            messages: [...this.state.messages, {
                messageText: this.messageBox.current.value,
                messageAttachment: '',
                messageId: this.state.messages.length
            }]
        });
    }

    removeMessage = index => {
        this.setState({
            ...this.state,
            messages: this.state.messages.filter(msg => msg.messageId !== index)
        });
    }

    setMessageActive = index => {
        this.setState({
            ...this.state,
            activeMessageId: index
        });
        this.messageBox.current.value = this.state.messages[index].messageText;
    }

    handleAddMessageBtnClick = (e, index) => {
        if (e.target.tagName === 'I') {
            this.removeMessage(index + 1)
        } else {
            this.setMessageActive(index + 1)
        }
    }

    onMessageChange = e => {
        const newMessages = [...this.state.messages];

        // eslint-disable-next-line
        const index = newMessages.findIndex(msg => msg.messageId == this.state.activeMessageId);
        newMessages[index].messageText = e.target.value;

        this.setState({
            ...this.state,
            messages: newMessages
        });
    }

    render() {
        return (
            <form className="d-flex justify-content-left">
                <div className="col-md-4">
                    <button
                        className="btn btn-outline-success btn-icon-text"
                        type="button"
                        onClick={() => { this.setMessageActive(0) }}
                    >
                        <i className="mdi mdi-comment-plus-outline btn-icon-prepend" />
                        Начальное сообщение
                    </button>
                    <br/><br/>
                    {
                        this.state.messages.length <= 1
                        ? null
                        : (
                            <React.Fragment>
                                <br/>
                                <h6>Незадействованные сообщения</h6>
                                
                                {this.state.messages.slice(1).map((msg, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-block btn-outline-success btn-icon-text"
                                        type="button"
                                        onClick={(e) => this.handleAddMessageBtnClick(e, index)}
                                    >
                                        {`Новое сообщение #${index+1}`}
                                        <i
                                            type="remove"
                                            className="mdi mdi-close float-right"
                                            onClick={() => { this.removeMessage(index + 1) }}
                                        />
                                    </button>
                                ))}
                            </React.Fragment>
                        )
                    }
                    <br/>
                    <button 
                        className="btn btn-light btn-icon-text"
                        type="button"
                        onClick={this.onAddMessage}
                    >
                        <i className="mdi mdi-plus btn-icon-prepend" />
                        Добавить сообщение
                    </button>
                </div>

                <div className="col-md-5">
                    <textarea
                        id="newMessageBox"
                        cols="10"
                        rows="15"
                        className="form-control"
                        placeholder="Текст сообщения..."
                        name="newsletter-new-message-box"
                        onChange={this.onMessageChange}
                        ref={this.messageBox}
                    />
                </div>

                <div className="col-md-3">
                    <h4 className="card-title text-success">Проверка перед отправкой</h4>
                    <p className="card-description">Отправьте сообщение себе</p>
                    <button className="btn btn-light btn-icon-text" type="button">
                        <i className="mdi mdi-send btn-icon-prepend" />
                        Отправить себе
                    </button>
                </div>
            </form>
        );
    }
}