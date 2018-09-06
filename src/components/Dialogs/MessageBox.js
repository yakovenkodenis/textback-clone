import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import shortid from 'shortid';
// import { toJS } from 'mobx';
import $ from 'jquery';

import DialogMessagesContainer from './DialogMessagesContainer';
import AdvancedTextEditor from '../TextEditor/AdvancedTextEditor';
import FileUpload from '../FileUpload/FileUpload';
import AddButtonsModal from '../Newsletter/New/AddButtonsModal';


@inject('messagesStore')
@withRouter
@observer
export default class MessageBox extends Component {

    constructor(props, context) {
        super(props, context);

        this.textEditorRef = React.createRef();
        this.dropzoneRef = React.createRef();

        this.state = {
            files: [],
            message: null,
            dropzoneActive: false,
            progress: 0,
            isModalOpen: false,
            buttons: []
        };
    }

    fakeProgress = () => {
        setTimeout(() => {
            this.setState({
                ...this.state,
                progress: this.state.progress + 1
            })
        }, 700);
    }

    scrollSmoothToBottom = () => {
        $('#timeline-scroll').animate({
        scrollTop: 9999
        }, 0);
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

        const keyboard = this.state.buttons.map(button => ({
            text: button.name,
            url: button.url
        }));

        this.props.messagesStore.sendMessage(
            channel_id, subscriber_id, message, keyboard
        ).then(() => {
            // console.log('after sendMessage [messages array]: ', toJS(this.props.messagesStore.chats));
            this.scrollSmoothToBottom();
            this.setState({
                ...this.state,
                buttons: []
            });
        });
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

    onAddButton = e => {
        this.setState({
            ...this.state,
            buttons: [...this.state.buttons, {
                id: shortid.generate(),
                name: 'Кнопка ' + (this.state.buttons.length + 1),
                url: 'https://google.com'
            }]
        });
    }

    onDeleteButton = (e, buttonId) => {
        this.setState({
            ...this.state,
            buttons: this.state.buttons.filter(button => button.id !== buttonId)
        });
    }

    setButtonData = (e, buttonId, attribute) => {
        const buttons = this.state.buttons;

        let neededButtonIndex = buttons.findIndex(button => button.id === buttonId);
        neededButtonIndex = neededButtonIndex > -1 ? neededButtonIndex : 0;
        buttons[neededButtonIndex][attribute] = e.target.value;

        this.setState({
            ...this.state,
            buttons
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
            dropzoneActive: false
        });

        for(let i = 0; i < 100; ++i) {
            this.fakeProgress();
        }
    }

    render() {

        const dropzoneActive = this.state.dropzoneActive;

        const activeDropZoneStyles = {
            border: '2px solid #777',
            opacity: '0.7'
        };

        const { isMobile } = this.props;

        return (
            <React.Fragment>

            <AddButtonsModal
                isOpen={this.state.isModalOpen}
                close={this.closeModal}
                isMobile={isMobile}
            >
                <form className="">
                    {
                        this.state.buttons.map(button => (
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
                                    onClick={e => { this.onDeleteButton(e, button.id) }}
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
                        ))
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

            <DialogMessagesContainer
                channel_id={this.props.channel_id}
                subscriber_id={this.props.subscriber_id}
            />
            <br/>

            <FileUpload
                className="ignore"
                onDrop={this.onFilesDrop}
                disableClick
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                ref={this.dropzoneRef}
            >
                <div
                    className="form-group"
                    style={
                        dropzoneActive
                        ? activeDropZoneStyles
                        : {
                            minHeight: '100px'
                        }
                    }
                >
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
                        <AdvancedTextEditor
                            handleInputChange={this.handleInputChange}
                            ref={this.textEditorRef}
                        />
                    </div>
                </FileUpload>

                <div className="form-group d-flex justify-content-between" style={{zIndex: 0}}>

                    <button
                        className="btn btn-gradient-primary mr-2"
                        type="submit"
                        onClick={this.sendMessage}
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
                            style={{display: 'none'}}
                        />
                        <span className="input-group-append">
                            <button
                                className="file-upload-browse btn btn-light btn-icon-text"
                                type="button"
                                onClick={() => { this.dropzoneRef.current.open(); }}
                            >
                                <i className="mdi mdi-upload btn-icon-prepend" />
                                Прикрепить файл
                            </button>
                        </span>
                    </div>

                    <button 
                        className={`btn btn-light btn-icon-text ${isMobile ? "mb-1 w-100" : "mr-1"}`}
                        type="button"
                        onClick={this.openModal}
                    >
                        <i className="mdi mdi-plus btn-icon-prepend mx-auto" />
                    </button>
                </div>

            <div className="progress progress-md">
                <div
                    className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100"
                    style={{width: `${this.state.progress}%`}}
                />
            </div>
            </React.Fragment>
        );
    }
}
