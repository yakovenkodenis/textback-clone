import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ContentState, EditorState } from 'draft-js';
import $ from 'jquery';
import shortid from 'shortid';

import Tooltip from '../../UiHelpers/Tooltip';
import AdvancedTextEditor from '../../TextEditor/AdvancedTextEditor';
import FileUpload from '../../FileUpload/FileUpload';
import agent from '../../../agent';
import AddButtonsModalDialog from './AddButtonsModalDialog';
import { formatMEssagesObjectToNeededFormForAPI } from '../../../utils';



const random = salt => Math.floor(Math.random() * 10000000) + salt;


@withRouter
@observer
export default class MessageComposerForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.textEditorRef = React.createRef();
        this.dropzoneRef = React.createRef();
        this.firstMessageButtonRef = React.createRef();

        this.state = {
            messages: [{
                message: {
                    messageText: '',
                    buttons: [] // [{name, url, id}, ...]
                },
                messageAttachments: [], // [{id, name, preview, progress}]
                messageId: 0,
                title: ''
            }],
            activeMessageId: 0,
            currentMessage: '',
            droppedFiles: [],
            dropzoneActive: false,
            isAddButtonsModalDialogOpen: false,
            currentlyActiveMessageTitle: '',
            allowStateUpdate: true
        };
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.onStateChange && !this.props.edit) {
            this.props.onStateChange(this.state.messages);
        }

        if (this.props.edit && this.state.allowStateUpdate && this.props.messages.length > 0) {
            console.log('Component did update [messages]', this.props.messages);

            const promisesForEachMessageAttachments = this.props.messages.map(message => {
                return Promise.all(message.messageAttachments.map(
                    attachment => agent.Files.getFile(attachment.id))
                );
            });

            Promise.all(promisesForEachMessageAttachments).then(linksArr => {
                console.log('IDs: ', linksArr);

                const messages = this.props.messages;

                linksArr.forEach((links, index) => {
                   messages[index].messageAttachments = links.map((link, i) => {
                        let imagesWithUrls = messages[index].messageAttachments[i];

                        if (link.success) {
                            imagesWithUrls = {
                                ...imagesWithUrls,
                                preview: link.data.file_url,
                                name: `Вложение #${i + 1}`
                            }
                        }

                        return imagesWithUrls;
                   });
                });

                console.log('Images: ', messages);

                this.setState({
                    ...this.state,
                    messages: this.props.messages,
                    allowStateUpdate: false
                }, () => {
                    if (this.firstMessageButtonRef.current) {
                        this.firstMessageButtonRef.current.click();
                    }
                });
            });
        } 
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
                messageId: newId,
                title: ''
            }],
            dropzoneActive: false
        });
    }

    removeMessage = messageId => {
        console.log('removeMessage', messageId);

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
        console.log(e.target.tagName);
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
        const { messages, activeMessageId } = this.state;

        const activeMessage = messages.find(message =>
            message.messageId === activeMessageId
        ) || messages[0];

        return activeMessage;
    }

    addButton = (button) => {
        const activeButtons = this.getCurrentlyActiveMessage().message.buttons || [];

        let createNew = activeButtons.findIndex(
            btn => btn.id === button.id
        ) === -1;

        if (createNew) {
            activeButtons.push(button);
        } else {
            const neededButtonIndex = activeButtons.findIndex(btn =>
                button.id === btn.id
            );
            activeButtons[neededButtonIndex > -1 ? neededButtonIndex : 0] = button;
        }

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

    onMessageTitleChange = e => {
        const { messages } = this.state;
        const message = this.getCurrentlyActiveMessage();
        message.title = e.target.value;

        const messageIndex = messages.findIndex(msg => msg.messageId === message.messageId);
        messages[messageIndex > -1 ? messageIndex : 0] = message;

        this.setState({
            ...this.state,
            messages
        });
    }

    logFinalJSONobjectToConsole = () => {
        console.log('Newsletter object:');
        const messagesObj = formatMEssagesObjectToNeededFormForAPI(this.state.messages);
        console.log(messagesObj);
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

    onFilesDrop = (acceptedFiles) => {
        console.log('onDrop');
        console.log(acceptedFiles);

        const { messages, activeMessageId } = this.state;
        const neededMessageIndex = messages.findIndex(message =>
            message.messageId === activeMessageId
        ) || 0;

        const neededMessageAttachments = [
            ...messages[neededMessageIndex].messageAttachments,
            ...acceptedFiles
        ];

        messages[neededMessageIndex].messageAttachments = neededMessageAttachments;

        this.setState({
            ...this.state,
            messages,
            dropzoneActive: false
        });

        const promises = neededMessageAttachments.map((file, index) => {

            const trackProgress = e => {
                neededMessageAttachments[index].progress = e.percent;
                messages[neededMessageIndex].messageAttachments = neededMessageAttachments;
    
                this.setState({
                    ...this.state,
                    messages
                });
            }

            console.log('The file that I send: ', file);
            const formData = new FormData();
            formData.append('photo', file);

            return agent.Files.upload(formData, trackProgress);
        });


        Promise.all(promises).then((ids) => {
            const attachments = neededMessageAttachments.map((file, index) => {
                file.id = ids[index].data.file_id;
                file.progress = 0;
                return file;
            });

            messages[neededMessageIndex].messageAttachments = attachments;

            this.setState({
                ...this.state,
                messages
            });
        });
    }

    deleteAttachedFile = file => {
        const { messages, activeMessageId } = this.state;
        const neededMessageIndex = messages.findIndex(message =>
            message.messageId === activeMessageId
        ) || 0;

        messages[neededMessageIndex].messageAttachments =
            messages[neededMessageIndex].messageAttachments.filter(f => f.id !== file.id);

        this.setState({
            ...this.state,
            messages
        });
    }

    openAddButtonsModalDialog = e => {
        this.setState({
            ...this.state,
            isAddButtonsModalDialogOpen: true
        });
    }

    closeAddButtonsModalDialog = e => {
        this.setState({
            ...this.state,
            isAddButtonsModalDialogOpen: false
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
    className={`${this.props.disablePaddingBottom ? "" : "grid-margin"} ${!this.props.isForWidget ? "col-md-12 stretch-card" : "stretch-card"} ${this.props.disableMarginBottom ? "mt-0" : ""}`}
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
        <div className={`card-body ${this.props.disablePaddingBottom ? "pb-0" : ""}`}>
            <h4 className="text-primary">
                {this.props.title ? this.props.title : "Напишите сообщение"}
            </h4>
            <br/>    
            <form className={`${isMobile ? "" : "d-flex justify-content-left"}`}>
                <div className={`${isMobile ? "col-12 px-0" : "col-md-4"}`}>
                    <button
                        className={`btn btn-outline-success btn-icon-text ${isMobile ? "w-100" : ""}`}
                        type="button"
                        ref={this.firstMessageButtonRef}
                        onClick={() => { this.setMessageActive(this.state.messages[0].messageId) }}
                        style={{
                            backgroundColor: this.state.activeMessageId === 0 ? '#1bcfb4' : 'transparent',
                            color: this.state.activeMessageId === 0 ? '#fff' : '#1bcfb4'
                        }}
                    >
                        <i className="mdi mdi-comment-plus-outline btn-icon-prepend" />
                        {
                            this.state.messages[0].title && this.state.messages[0].title !== ''
                            ? this.state.messages[0].title
                            : "Начальное сообщение"
                        }
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
                                        key={shortid.generate()}
                                        className={`btn btn-block btn-outline-success btn-icon-text btn-newsletter-composer ${isMobile ? "w-100" : ""}`}
                                        type="button"
                                        onClick={(e) => this.handleAddMessageBtnClick(e, msg.messageId)}
                                        style={{
                                            backgroundColor: this.state.activeMessageId === msg.messageId ? '#1bcfb4' : 'transparent',
                                            color: this.state.activeMessageId === msg.messageId ? '#fff' : '#1bcfb4'
                                        }}
                                    >
                                        {
                                            msg.title !== ''
                                            ? msg.title
                                            : `Новое сообщение #${index+1}`
                                        }
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
                        className="btn btn-light btn-icon-text mt-2"
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

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Название сообщения"
                            className="form-control form-control-lg"
                            id="inputNewsletterTitle"
                            value={this.getCurrentlyActiveMessage().title}
                            onChange={this.onMessageTitleChange}
                        />
                    </div>

                    <AdvancedTextEditor
                        ref={this.textEditorRef}
                        handleInputChange={this.onMessageChange}
                    />
                    <br/>
                    <div className={`${isMobile ? "" : "justify-content-between d-flex"}`}>
                        <button 
                            className={`btn btn-light btn-icon-text ${isMobile ? "mb-1 w-100" : "mr-1"}`}
                            type="button"
                            onClick={this.openAddButtonsModalDialog}
                        >
                            <i className="mdi mdi-plus btn-icon-prepend" />
                            Добавить кнопки
                            { this.getCurrentlyActiveMessage().message.buttons.length > 0 &&
                                <div className="badge badge-outline-info badge-pill ml-1">
                                    {this.getCurrentlyActiveMessage().message.buttons.length}
                                </div>
                            }
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

                    <ul className="list-arrow">
                    {
                        this.getCurrentlyActiveMessage().messageAttachments.map((file, index) => (
                            file && file.progress !== 100 && file.progress !== 0
                            ? (
                            <div className="progress progress-md" key={index}>
                                <div
                                    className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    aria-valuenow={file.progress} aria-valuemin="0" aria-valuemax="100"
                                    style={{width: `${file.progress}%`}}
                                />
                            </div>
                            ) : (
                                <Tooltip
                                    key={index}
                                    content={
                                        <img src={file.preview} alt={file.name} style={{
                                            maxHeight: '15rem'
                                        }}/>
                                    }
                                    styles={{
                                        tooltip: {
                                            background: 'transparent'
                                        },
                                        wrapper: {
                                            display: 'block'
                                        },
                                        content: {
                                            background: 'transparent'
                                        },
                                        arrow: {
                                            borderTop: '5px solid transparent'
                                        }
                                    }}
                                >
                                    <li
                                        id={`hover-image-${file.id}`}
                                        className="text-success" key={index}
                                    >
                                        {file.name}
                                        <span
                                            aria-hidden="true"
                                            className="float-right" 
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => { this.deleteAttachedFile(file) }}
                                        >
                                            ×
                                        </span>
                                    </li>
                                </Tooltip>
                            )
                        ))
                    }
                    </ul>

                </div>

                { !this.props.isForWidget &&
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
                }
            </form>
        </div>
    </div>

    <AddButtonsModalDialog
        isOpen={this.state.isAddButtonsModalDialogOpen}
        close={this.closeAddButtonsModalDialog}
        isMobile={isMobile}
        activeButtons={activeButtons}
        messages={this.state.messages}
        addButton={this.addButton}
        deleteButton={this.deleteButton}
    />
</FileUpload>
        );
    }
}