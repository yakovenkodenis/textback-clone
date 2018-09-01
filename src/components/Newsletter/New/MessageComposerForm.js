import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ContentState, EditorState } from 'draft-js';
import $ from 'jquery';

import AdvancedTextEditor from '../../TextEditor/AdvancedTextEditor';
import FileUpload from '../../FileUpload/FileUpload';
import AddButtonsModal from './AddButtonsModal';



const random = salt => Math.floor(Math.random() * 10000000) + salt;


@withRouter
@observer
export default class MessageComposerForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.textEditorRef = React.createRef();
        this.dropzoneRef = React.createRef();

        this.state = {
            messages: [{
                message: {
                    messageText: '',
                    buttons: [] // [{name, url, id}, ...]
                },
                messageAttachments: [],
                messageId: 0
            }],
            activeMessageId: 0,
            currentMessage: '',
            droppedFiles: [],
            dropzoneActive: false,
            isModalOpen: false
        };
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
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
                    buttons: []
                },
                messageAttachments: [],
                messageId: newId
            }],
            dropzoneActive: false
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

    getCurrentlyActiveMessage = () => {
        console.log('getCurrentlyActiveMessage');
        const { messages, activeMessageId } = this.state;

        console.log('Messages (state): ', messages);
        console.log('activeMessageId (state): ', activeMessageId);

        const activeMessage = messages.find(message =>
            message.messageId === activeMessageId
        ) || messages[0];
        
        console.log('found activeMessage: ', activeMessage.message);

        return activeMessage;
    }

    onAddButton = () => {
        const activeButtons = this.getCurrentlyActiveMessage().message.buttons || [];

        const id = random(activeButtons.length);
        const name = 'Кнопка ' + (activeButtons.length + 1);
        const url = 'https://google.com';

        const button = { id, name, url };

        activeButtons.push(button);
        
        const { messages, activeMessageId } = this.state;
        const neededMessageIndex = messages.findIndex(message =>
            message.messageId === activeMessageId
        ) || 0;
        
        messages[
            neededMessageIndex > -1 ? neededMessageIndex : 0
        ].message.buttons = activeButtons;

        this.setState({
            ...this.state,
            messages
        });
    }

    deleteButton = (e, buttonId) => {
        const activeButtons = this.getCurrentlyActiveMessage().message.buttons || [];
        const { messages, activeMessageId } = this.state;

        const newActiveButtons = activeButtons.filter(button =>
            button.id !== buttonId
        );

        const neededMessageIndex = messages.findIndex(message =>
            message.messageId === activeMessageId
        ) || 0;

        messages[
            neededMessageIndex > -1 ? neededMessageIndex : 0
        ].message.buttons = newActiveButtons;

        this.setState({
            ...this.state,
            messages
        });
    }

    setButtonData = (e, buttonId, attribute) => {
        const { messages } = this.state;

        const neededMessageIndex = messages.findIndex(message =>
            message.messageId === this.state.activeMessageId
        );
        const neededMessage = neededMessageIndex > -1 ? messages[neededMessageIndex] : messages[0];

        const neededButtonIndex = neededMessage.message.buttons.findIndex(button =>
            buttonId === button.id
        );

        const neededButton = neededMessage.message.buttons[neededButtonIndex > -1 ? neededButtonIndex : 0];
        neededButton[attribute] = e.target.value;

        messages[neededMessageIndex].message.buttons[neededButtonIndex] = neededButton;

        this.setState({
            ...this.state,
            messages
        });
    }

    logFinalJSONobjectToConsole = () => {
        console.log('Newsletter object:');
        console.log(this.state.messages);
    }

    onDragEnter = () => {
        console.log('onDragEnter');
        this.setState({
            ...this.state,
            dropzoneActive: true
        });
    }

    onDragLeave = () => {
        console.log('onDragLeave');
        this.setState({
            ...this.state,
            dropzoneActive: false
        });
    }

    onFilesDrop = (acceptedFiles, rejectedFiles) => {
        console.log('onDrop');
        console.log(acceptedFiles);

        // set attachments to activeMessageId in the state and make dropzone inactive

        this.setState({
            ...this.state,
            dropzoneActive: false
        });
    }

    closeModal = () => {
        console.log('Closing modal...')
        this.setState({
            ...this.state,
            isModalOpen: false
        });
    }

    openModal = () => {
        console.log('Opening modal');
        this.setState({
            ...this.state,
            isModalOpen: true
        });
    }

    render() {

        const dropzoneActive = this.state.dropzoneActive;

        const activeDropZoneStyles = {
            border: '2px solid #777',
            opacity: '0.7'
        };

        const { isMobile } = this.props;

        const activeButtons = this.getCurrentlyActiveMessage().message.buttons || [];





        return (
<FileUpload
    className="col-md-12 grid-margin stretch-card"
    onDrop={this.onFilesDrop}
    disableClick
    onDragEnter={this.onDragEnter}
    onDragLeave={this.onDragLeave}
    ref={this.dropzoneRef}
>
    <div className="card" style={dropzoneActive ? activeDropZoneStyles : null}>

        {dropzoneActive &&
            <div
                className="dropzone-background h1"
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(192, 192, 192, 0.4)',
                    zIndex: 9999,
                    border: '2px dashed black',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    lineHeight: '7rem'
                }}
            >Перетащите файлы сюда</div>
        }
        <div className="card-body">
            <h4 className="card-title text-primary">Напишите сообщение</h4>
            <br/>

            <AddButtonsModal isOpen={this.state.isModalOpen} close={this.closeModal}>
                <form className="">
                    {
                        activeButtons ? activeButtons.map(button => (
                            <div className="form-group border" key={button.id}>
                                <label name="text" htmlFor={button.name} className="col-form-label float-left">
                                    Текст
                                </label>
                                <button
                                    className="close float-right"
                                    type="button"
                                    data-dismiss="modal"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Удалить кнопку"
                                    aria-label="Close"
                                    style={{cursor: 'pointer'}}
                                    onClick={e => { this.deleteButton(e, button.id) }}
                                >
                                    <i className="mdi mdi-delete-forever" />
                                </button>
                                <input
                                    data-id={button.id}
                                    type="text" className="form-control" id={button.name}
                                    onChange={e => { this.setButtonData(e, button.id, "name")}}
                                    value={button.name}
                                    placeholder="Текст, который будет на кнопке" 
                                />
                                <label name="url" htmlFor={button.url} className="col-form-label">
                                    Ссылка
                                </label>
                                <input 
                                    data-id={button.id}
                                    type="text" className="form-control" id={button.url}
                                    value={button.url}    
                                    onChange={e => { this.setButtonData(e, button.id, "url")}}
                                    placeholder="Ссылка кнопки"
                                />
                                <br/>
                            </div>
                        )) : null
                    }
                    <button
                        className={`btn btn-block btn-outline-success btn-icon-text btn-newsletter-composer ${isMobile ? "w-100" : ""}`}
                        type="button"
                        onClick={this.onAddButton}
                    >
                        Добавить
                    </button>
                </form>
            </AddButtonsModal>
    
            <form className={`${isMobile ? "" : "d-flex justify-content-left"}`}>
                <div className={`${isMobile ? "col-12 px-0" : "col-md-4"}`}>
                    <button
                        className={`btn btn-outline-success btn-icon-text ${isMobile ? "w-100" : ""}`}
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
                                        className={`btn btn-block btn-outline-success btn-icon-text btn-newsletter-composer ${isMobile ? "w-100" : ""}`}
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
                    
                    <button 
                        className="btn btn-light btn-icon-text"
                        type="button"
                        onClick={this.onAddMessage}
                    >
                        <i className="mdi mdi-plus btn-icon-prepend" />
                        Добавить сообщение
                    </button>
                </div>

                <div
                    className={`${isMobile ? "col-12 px-0 my-4" :"col-md-5"}`}
                    style={{
                        minHeight: '100px'
                    }}
                >
                    <AdvancedTextEditor
                        ref={this.textEditorRef}
                        handleInputChange={this.onMessageChange}
                    />
                    <br/>
                    <div className={`${isMobile ? "" : "justify-content-between d-flex"}`}>
                        <button 
                            className={`btn btn-light btn-icon-text ${isMobile ? "mb-1 w-100" : "mr-1"}`}
                            type="button"
                            onClick={this.openModal}
                        >
                            <i className="mdi mdi-plus btn-icon-prepend" />
                            Добавить кнопки
                        </button>

                        <button 
                            className={`btn btn-light btn-icon-text ${isMobile ? "mt-1 w-100" : "ml-1"}`}
                            type="button"
                            onClick={() => { this.dropzoneRef.current.open(); }}
                            style={{
                                zIndex: 9
                            }}
                        >
                            <i className="mdi mdi-upload btn-icon-prepend" />
                            Прикрепить файл
                        </button>

                    </div>

                </div>

                <div className={`${isMobile ? "col-md-3 px-0" : "col-md-3"}`}>
                    <h4 className="card-title text-success">Проверка перед отправкой</h4>
                    <p className="card-description">Отправьте сообщение себе</p>
                    <button
                        className={`btn btn-light btn-icon-text ${isMobile ? "w-100" : ""}`}
                        type="button"
                        onClick={this.logFinalJSONobjectToConsole}
                    >
                        <i className="mdi mdi-send btn-icon-prepend" />
                        Отправить себе
                    </button>
                </div>
            </form>
        </div>
    </div>
</FileUpload>
        );
    }
}