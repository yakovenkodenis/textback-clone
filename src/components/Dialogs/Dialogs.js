import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogsList from './DialogsList';
import MessageBox from './MessageBox';
import UserProfile from './UserProfile';


@withRouter
@observer
export default class Dialogs extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentDialog: ""
        };
    }

    render() {

        // const { location } = this.props;
        // const neededPage = location.pathname.split('/dialogs/')[1];

        return (
            <div className="row dialogs-page">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Диалоги</h4>
                            
                            <div className="row">

                                <div className="col-3 clear-pr clear-pl">
                                    <DialogsList />
                                </div>

                                <div className="col-6">
                                    <MessageBox />
                                </div>

                                <div className="col-3">
                                    <UserProfile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
