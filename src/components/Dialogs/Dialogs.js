import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Route } from 'react-router-dom';

import DialogsList from './DialogsList';
import DialogContainer from './DialogContainer';


@withRouter
@observer
export default class Dialogs extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentDialog: "",
            dialogs: [
                {
                    path: '/dialog-1', name: 'Екатерина Петрова', timeAgo: '9:04 PM',
                    messages: [
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', likesNumber: 5, date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, molestiae. Eaque praesentium expedita cupiditate amet?', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, cupiditate eveniet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' }
                    ]
                },
                {
                    path: '/dialog-2', name: 'Иван Петров', timeAgo: '6:17 PM',
                    messages: [
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum tempore ea nemo! Dolores.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, cupiditate eveniet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' }
                    ]
                },
                {
                    path: '/dialog-3', name: 'Николай Алексеев', timeAgo: '11:11 AM',
                    messages: [
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', likesNumber: 5, date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, molestiae. Eaque praesentium expedita cupiditate amet?', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' }
                    ]
                },
                {
                    path: '/dialog-4', name: 'Жанна Васильева', timeAgo: '8/2/18',
                    messages: [
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, molestiae. Eaque praesentium expedita cupiditate amet?', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, cupiditate eveniet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' }
                    ]
                }
            ]
        };
    }

    render() {

        const dialogRoutes = this.state.dialogs.map((dialog, index) => (
            <Route 
                key={index}
                path={`/admin/dialogs${dialog.path}`}
                exact={true}
                component={() => <DialogContainer {...dialog} />}
            />
        ));


        return (
            <div className="row dialogs-page">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Диалоги</h4>
                            
                            <div className="row">

                                <div className="col-3 clear-pr clear-pl">
                                    <DialogsList dialogs={this.state.dialogs} />
                                </div>

                                {dialogRoutes}

                                {/*<DialogContainer />*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
