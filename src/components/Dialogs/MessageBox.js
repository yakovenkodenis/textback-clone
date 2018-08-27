import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ContentState, EditorState } from 'draft-js';

import DialogMessagesContainer from './DialogMessagesContainer';
import AdvancedTextEditor from '../TextEditor/AdvancedTextEditor';


@inject('messagesStore', 'subscribersStore')
@withRouter
@observer
export default class MessageBox extends Component {

    constructor(props, context) {
        super(props, context);

        this.textEditorRef = React.createRef();

        this.state = {
            file: null,
            message: null
        };
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

        this.props.messagesStore.sendTelegramMessage(
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

    render() {

        return (
            <React.Fragment>

                <DialogMessagesContainer messages={this.props.messages} />
                <br/>

                <div className="form-group">
                    <AdvancedTextEditor
                        handleInputChange={this.handleInputChange}
                        ref={this.textEditorRef}
                    />
                </div>

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
                            >
                                <i className="mdi mdi-upload btn-icon-prepend" />
                                Прикрепить файл
                            </button>
                        </span>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}