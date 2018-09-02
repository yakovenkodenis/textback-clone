import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ContentState, EditorState } from 'draft-js';

import DialogMessagesContainer from './DialogMessagesContainer';
import AdvancedTextEditor from '../TextEditor/AdvancedTextEditor';
import FileUpload from '../FileUpload/FileUpload';


@inject('messagesStore', 'subscribersStore')
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
            progress: 0
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

        this.props.messagesStore.sendMessage(
            channel_id, subscriber_id, this.state.message
        ).then(() => {
            const editor = this.textEditorRef.current;
            const editorState = EditorState.push(
                editor.state.editorState, ContentState.createFromText('')
            );
    
            editor.setState({
                ...editor.state,
                editorState
            });
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

        return (
            <React.Fragment>

                <DialogMessagesContainer
                    messages={this.props.messages}
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
