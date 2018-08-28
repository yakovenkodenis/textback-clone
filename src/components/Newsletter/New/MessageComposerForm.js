import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ContentState, EditorState } from 'draft-js';

import AdvancedTextEditor from '../../TextEditor/AdvancedTextEditor';


const random = salt => Math.floor(Math.random() * 10000000) + salt;

@withRouter
@observer
export default class MessageComposerForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.messageBox = React.createRef();
        this.textEditorRef = React.createRef();

        this.state = {
            messages: [{
                message: {
                    messageText: '',
                    messageButtons: []
                },
                messageAttachment: '',
                messageId: 0
            }],
            activeMessageId: 0,
            currentMessage: ''
        };
    }

    setTextEditorCurrentValue = value => {
        const editor = this.textEditorRef.current;
        const editorState = EditorState.push(
            editor.state.editorState, ContentState.createFromText(value)
        );

        editor.setState({
            ...editor.state,
            editorState
        });
    }

    onAddMessage = e => {

        this.setTextEditorCurrentValue('');

        const newId = random(this.state.messages.length);

        this.setState({
            activeMessageId: newId,
            messages: [...this.state.messages, {
                message: {
                    messageText: '',
                    messageButtons: []
                },
                messageAttachment: '',
                messageId: newId
            }]
        });
    }

    removeMessage = messageId => {

        const maybeMessageId = this.state.messages.find(message =>
            message.messageId === messageId
        );
        const activeMessageId = maybeMessageId ? maybeMessageId : 0;

        this.setState({
            ...this.state,
            messages: this.state.messages.filter(msg => msg.messageId !== messageId),
            activeMessageId
        }, () => {
            if (this.state.messages.length === 1)
                this.setMessageActive(0);
        });
    }

    setMessageActive = messageId => {
        const message = this.state.messages.find(
            message => message.messageId === messageId
        );

        const messageText = message.message ? message.message.messageText : "";

        this.setTextEditorCurrentValue(messageText);

        this.setState({
            ...this.state,
            activeMessageId: messageId
        });
    }

    handleAddMessageBtnClick = (e, messageId) => {
        if (e.target.tagName === 'I') {
            this.removeMessage(messageId)
        } else {
            this.setMessageActive(messageId)
        }
    }

    onMessageChange = message => {
        const newMessages = [...this.state.messages];

        const maybeIndex = newMessages.findIndex(message =>
            message.messageId === this.state.activeMessageId
        );
        const index = maybeIndex ? maybeIndex : 0;

        console.log('FOUND INDEX ', index);
        console.log('ACTIVE INDEX ', this.state.activeMessageId);
        console.log('FOR ARRAY: ', newMessages);

        if (index === -1) {
            this.setMessageActive(this.state.messages[0].messageId);
            return;
        }

        newMessages[index].message.messageText = message;

        this.setState({
            ...this.state,
            messages: newMessages
        });
    }

    logFinalJSONobjectToConsole() {
        console.log('Newsletter object:');
        console.log(this.state.messages);
    }

    render() {
        return (
            <form className="d-flex justify-content-left">
                <div className="col-md-4">
                    <button
                        className="btn btn-outline-success btn-icon-text"
                        type="button"
                        onClick={() => { this.setMessageActive(this.state.messages[0].messageId) }}
                        style={{
                            backgroundColor: this.state.activeMessageId === 0 ? '#1bcfb4' : 'transparent',
                            color: this.state.activeMessageId === 0 ? '#fff' : '#1bcfb4'
                        }}
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
                                        className="btn btn-block btn-outline-success btn-icon-text btn-newsletter-composer"
                                        type="button"
                                        onClick={(e) => this.handleAddMessageBtnClick(e, msg.messageId)}
                                        style={{
                                            backgroundColor: this.state.activeMessageId === msg.messageId ? '#1bcfb4' : 'transparent',
                                            color: this.state.activeMessageId === msg.messageId ? '#fff' : '#1bcfb4'
                                        }}
                                    >
                                        {`Новое сообщение #${index+1}`}
                                        <i
                                            type="remove"
                                            className="mdi mdi-close float-right"
                                            onClick={() => { this.removeMessage(msg.messageId) }}
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
                    {/*<textarea
                        id="newMessageBox"
                        cols="10"
                        rows="15"
                        className="form-control"
                        placeholder="Текст сообщения..."
                        name="newsletter-new-message-box"
                        onChange={this.onMessageChange}
                        ref={this.messageBox}
                    />*/}
                    <AdvancedTextEditor
                        ref={this.textEditorRef}
                        handleInputChange={this.onMessageChange}
                    />
                </div>

                <div className="col-md-3">
                    <h4 className="card-title text-success">Проверка перед отправкой</h4>
                    <p className="card-description">Отправьте сообщение себе</p>
                    <button
                        className="btn btn-light btn-icon-text"
                        type="button"
                        onClick={this.logFinalJSONobjectToConsole}
                    >
                        <i className="mdi mdi-send btn-icon-prepend" />
                        Отправить себе
                    </button>
                </div>
            </form>
        );
    }
}