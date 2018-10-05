import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Tooltip from '../UiHelpers/Tooltip';
import HotKey from 'react-shortcut';

import agent from '../../agent';
import { renameObjectProperty } from '../../utils';
import DialogMessagesContainer from './DialogMessagesContainer';
import AdvancedTextEditor from '../TextEditor/AdvancedTextEditor';
import FileUpload from '../FileUpload/FileUpload';
import AddButtonsModalDialog from '../Newsletter/New/AddButtonsModalDialog';


const activeDropZoneStyles = {
    border: '2px solid #777',
    opacity: '0.7'
};

const dropZoneStyles = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(192, 192, 192, 0.4)',
    zIndex: 9999,
    border: '2px dashed black',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '7rem'
};

const getDropzoneStyles = (dropzoneActive) => {
    if (dropzoneActive) return activeDropZoneStyles;
    return { minHeight: '100px' };
}

const tooltipStyles = {
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
};

const displayNone = {
    display: 'none'
};

const zIndexZero = {
    zIndex: 0
};

const cursorPointer = {
    cursor: 'pointer'
};

@inject('messagesStore')
@withRouter
@observer
export default class MessageBox extends Component {

    constructor(props, context) {
        super(props, context);

        this.textEditorRef = React.createRef();
        this.dropzoneRef = React.createRef();
        this.dialogMessagesContainerRef = React.createRef();

        this.state = {
            files: [],
            message: null,
            dropzoneActive: false,
            progress: 0,
            isModalOpen: false,
            buttons: [],
            sendButtonActive: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    scrollSmoothToBottom = () => {
        if (this.dialogMessagesContainerRef.current) {
            this.dialogMessagesContainerRef.current.scrollIntoView({ behavior: 'smooth'});
        }
    }

    onFileInputChange = e => {
        this.setState({
            ...this.state,
            file: e.target.files[0]
        });
    }

    handleInputChange = message => {
        this.setState({
            ...this.state,
            message
        })
    }

    sendMessage = e => {
        e.preventDefault();

        const { channel_id, subscriber_id } = this.props;
        const { message } = this.state;

        const editor = this.textEditorRef.current;
        editor.setEditorCurrentValue('');

        const keyboard = this.state.buttons.map(button => {
            renameObjectProperty(button, 'buttonName', 'name');
            return button;
        });

        const photos = this.state.files.filter(file => file.id);
        const photosObj = {
            Photo: photos.map(file => parseInt(file.id, 10)),
            previews: photos.map(file => file.preview)
        }

        this.props.messagesStore.sendMessage(
            channel_id, subscriber_id, message, keyboard, photosObj
        ).then(() => {
            this.setState({
                ...this.state,
                buttons: [],
                files: []
            }, () => {
                this.scrollSmoothToBottom();
            });
        });
    }

    handleSendMessageShortCut = (keys, e) => {
        if (this.state.message || this.state.files.length > 0 || this.state.buttons.length > 0) {
            this.sendMessage(new Event('click'));
        }
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            isModalOpen: false
        });
    }

    openModal = () => {
        this.setState({
            ...this.state,
            isModalOpen: true
        });
    }

    onAddButton = (button) => {
        const activeButtons = this.state.buttons || [];

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

        this.setState({
            ...this.state,
            buttons: activeButtons
        });
    }

    onDeleteButton = (e, buttonId) => {
        this.setState({
            ...this.state,
            buttons: this.state.buttons.filter(button => button.id !== buttonId)
        });
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
            dropzoneActive: false,
            files: [...this.state.files, ...acceptedFiles],
            sendButtonActive: false
        });

        const promises = this.state.files.map((file, index) => {

            const trackProgress = e => {
                const files = this.state.files;
                files[index].progress = e.percent;
                this.setState({
                    ...this.state,
                    files
                });
            }

            console.log('The file that I send: ', file);
            const formData = new FormData();
            formData.append('photo', file);

            return agent.Files.upload(formData, trackProgress);
        });

        // IMPORTANT!!!
        // REJECT THE PROMISE WHEN COMPONENT UNMOUNTS!!!
        Promise.all(promises).then((ids) => {
            const files = this.state.files.map((file, index) => {
                file.id = ids[index].data.file_id;
                file.progress = 0;
                return file;
            });
            this.setState({
                ...this.state,
                files,
                sendButtonActive: true
            });
        });
    }

    deleteAttachedFile = file => {
        const files = this.state.files.filter(f => f.id !== file.id);

        this.setState({
            ...this.state,
            files
        });
    }

    openDropzone = () => {
        this.dropzoneRef.current.open();
    }

    onDeleteAttachedFile = file => {
        this.deleteAttachedFile(file);
    }

    getInitialMessageState = message => ([
        { message: { messageText: message }, messageId: 0 }
    ])

    render() {
        const dropzoneActive = this.state.dropzoneActive;

        const { isMobile } = this.props;

        return (
            <React.Fragment>
            <HotKey
                keys={['shift', 'enter']}
                simultaneous
                onKeysCoincide={this.handleSendMessageShortCut}
            />
            <DialogMessagesContainer
                channel_id={this.props.channel_id}
                subscriber_id={this.props.subscriber_id}
                ref={this.dialogMessagesContainerRef}
                isMobile={isMobile}
            />
            <br/>

            <FileUpload
                className="ignore px-1"
                onDrop={this.onFilesDrop}
                disableClick
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                ref={this.dropzoneRef}
            >
                <div
                    className="form-group"
                    style={getDropzoneStyles(dropzoneActive)}
                >
                    {dropzoneActive &&
                        <div
                            className="dropzone-background h1"
                            style={dropZoneStyles}
                        >Перетащите файлы сюда</div>
                    }
                        <AdvancedTextEditor
                            handleInputChange={this.handleInputChange}
                            ref={this.textEditorRef}
                        />
                    </div>
                </FileUpload>

                <div
                    className={`form-group d-flex justify-content-between ${isMobile ? "flex-wrap" : ""}`}
                    style={zIndexZero}
                >

                    <button
                        className={`btn btn-gradient-primary ${isMobile ? "w-100 mb-1" : "mr-2"}`}
                        type="submit"
                        onClick={this.sendMessage}
                        disabled={!this.state.sendButtonActive}
                    >
                        Отправить
                    </button>

                    <input
                        type="file" name="img[]"
                        className="file-upload-default"
                        onChange={this.onFileInputChange}
                    />
                    <div className="input-group">
                        <input
                            className="form-control file-upload-info border-0"
                            disabled placeholder=""
                            type="text"
                            style={displayNone}
                        />
                        <span
                            className={`input-group-append ${isMobile ? "w-100 mx-auto my-1" : ""}`}
                        >
                            <button
                                className={`file-upload-browse btn btn-light btn-icon-text ${isMobile ? "w-100" : "px-4"}`}
                                type="button"
                                onClick={this.openDropzone}
                            >
                                <i className="mdi mdi-upload btn-icon-prepend" />
                                Прикрепить файл
                            </button>
                        </span>
                    </div>

                    <button 
                        className={`btn btn-light btn-icon-text ${isMobile ? "my-1 w-100" : ""}`}
                        type="button"
                        onClick={this.openModal}
                    >
                        <i className="mdi mdi-plus btn-icon-prepend mx-auto" />
                        {
                            this.state.buttons.length > 0 &&
                            <div className="badge badge-outline-info badge-pill ml-1">
                                {this.state.buttons.length}
                            </div>
                        }
                    </button>
                </div>
            
            <ul className="list-arrow">
            {
                this.state.files.map((file, index) => (
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
                            styles={tooltipStyles}
                        >
                            <li
                                id={`hover-image-${file.id}`}
                                className="text-success" key={index}
                            >
                                {file.name}
                                <span
                                    aria-hidden="true"
                                    className="float-right" 
                                    style={cursorPointer}
                                    onClick={this.onDeleteAttachedFile}
                                >
                                    ×
                                </span>
                            </li>
                        </Tooltip>
                    )
                ))
            }
            </ul>
            <AddButtonsModalDialog
                isOpen={this.state.isModalOpen}
                close={this.closeModal}
                isMobile={isMobile}
                activeButtons={this.state.buttons}
                messages={this.getInitialMessageState()}
                addButton={this.onAddButton}
                deleteButton={this.onDeleteButton}
                withoutResponseType
            />
            </React.Fragment>
        );
    }
}
