import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import Timeline from '../Timeline/Timeline';


@withRouter
@observer
export default class MessageBox extends Component {

    render() {
        return (
            <React.Fragment>

                <Timeline />
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
                <button className="btn btn-light">
                    Прикрепить файл
                </button>

            </React.Fragment>
        );
    }
}