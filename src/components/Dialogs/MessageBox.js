import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogMessagesContainer from './DialogMessagesContainer';


@withRouter
@observer
export default class MessageBox extends Component {

    render() {
        return (
            <React.Fragment>

                <DialogMessagesContainer messages={this.props.messages} />
                <br/>

                <div className="form-group">
                    <textarea
                        id="messageBox"
                        cols="30"
                        rows="3"
                        className="form-control"
                        placeholder="Отправить сообщение..."
                    />
                </div>
                <button className="btn btn-gradient-primary mr-2" type="submit">
                    Отправить
                </button>
                <button className="btn btn-light btn-icon-text">
                    <i className="mdi mdi-upload btn-icon-prepend" />
                    Прикрепить файл
                </button>

            </React.Fragment>
        );
    }
}