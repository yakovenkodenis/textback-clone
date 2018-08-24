import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogMessagesContainer from './DialogMessagesContainer';
import AdvancedTextEditor from '../TextEditor/AdvancedTextEditor';


@withRouter
@observer
export default class MessageBox extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            file: null
        };
    }

    onFileInputChange = e => {
        this.setState({
            file: e.target.files[0]
        });
    }

    render() {

        return (
            <React.Fragment>

                <DialogMessagesContainer messages={this.props.messages} />
                <br/>

                <div className="form-group">
                    <AdvancedTextEditor />
                </div>

                <div className="form-group d-flex justify-content-between">

                    <button className="btn btn-gradient-primary mr-2" type="submit">
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