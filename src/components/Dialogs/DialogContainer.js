import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import MessageBox from './MessageBox';
import UserProfile from './UserProfile';


@withRouter
@observer
export default class DialogContainer extends Component {

    render() {

        const {
            name, messages
        } = this.props;

        return (
            <React.Fragment>
                <div className="col-6">
                    <MessageBox messages={messages} />
                </div>

                <div className="col-3">
                    <UserProfile name={name} />
                </div>
            </React.Fragment>
        );
    }
}
