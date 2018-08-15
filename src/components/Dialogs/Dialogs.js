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
            currentFilter: "all",
            dialogs: [
                {
                    path: 'dialog-1', name: 'Екатерина Петрова', timeAgo: '9:04 PM',
                    socialNetwork: 'telegram',
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
                    path: 'dialog-2', name: 'Иван Петров', timeAgo: '6:17 PM',
                    socialNetwork: 'telegram',
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
                    path: 'dialog-3', name: 'Николай Алексеев', timeAgo: '11:11 AM',
                    socialNetwork: 'telegram',
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
                    path: 'dialog-4', name: 'Жанна Васильева', timeAgo: '8/2/18',
                    socialNetwork: 'facebook',
                    messages: [
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, molestiae. Eaque praesentium expedita cupiditate amet?', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' }
                    ]
                },
                {
                    path: 'dialog-5', name: 'Роман Зубков', timeAgo: '9:04 PM',
                    socialNetwork: 'telegram',
                    messages: [
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', likesNumber: 5, date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' }
                    ]
                },
                {
                    path: 'dialog-6', name: 'Константин Бойко', timeAgo: '6:17 PM',
                    socialNetwork: 'viber',
                    messages: [
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, cupiditate eveniet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' }
                    ]
                },
                {
                    path: 'dialog-7', name: 'Владимир Сысоев', timeAgo: '2:15 PM',
                    socialNetwork: 'telegram',
                    messages: [
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', likesNumber: 5, date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum sit amet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, molestiae. Eaque praesentium expedita cupiditate amet?', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' }
                    ]
                },
                {
                    path: 'dialog-8', name: 'Фёдор Бобров', timeAgo: '9/12/17',
                    socialNetwork: 'viber',
                    messages: [
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, cupiditate eveniet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' }
                    ]
                }
            ]
        };
    }

    componentWillMount() {
        const { history } = this.props;

        if (!this.props.match.params.currentFilter) {
            history.push('/admin/dialogs/all');
        }
    }

    trimChar = (string, charToRemove) => {
        while (string.charAt(0) === charToRemove) {
            string = string.substring(1);
        }

        while(string.charAt(string.length - 1) === charToRemove) {
            string = string.substring(0, string.length - 1);
        }

        return string;
    }

    render() {

        const { match } = this.props;

        const dialogRoutes = this.state.dialogs.map((dialog, index) => (
            <Route 
                key={index}
                path={`/admin/dialogs/${match.params.currentFilter}/${dialog.path}`}
                exact={true}
                component={() => <DialogContainer currentFilter={match.params.currentFilter} {...dialog} />}
            />
        ));

        const dialogsList = match.params.currentFilter === 'all'
            ? this.state.dialogs
            : this.state.dialogs.filter(dialog =>
                dialog.socialNetwork === match.params.currentFilter
            );


        return (
            <div className="row dialogs-page">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Диалоги</h4>
                            
                            <div className="row">

                                <div className="col-3 clear-pr clear-pl">
                                    <DialogsList dialogs={dialogsList} />
                                </div>

                                {dialogRoutes}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
