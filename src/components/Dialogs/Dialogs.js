import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Route, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import DialogsList from './DialogsList';
import DialogContainer from './DialogContainer';
import { Default, Mobile } from '../Responsive';


@withRouter
@observer
class Dialogs extends Component {

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
                        { isInverted: true, body: 'Lorem ipsum :thumbsup: dolor sit amet consectetur adipisicing elit.', likesNumber: 5, date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum sit amet :smile:', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, molestiae. Eaque praesentium expedita cupiditate amet?', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet.', date: '22 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '11 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, cupiditate eveniet.', date: '16 Oct 2018' },
                        { isInverted: false, body: 'Lorem ipsum dolor sit amet.', date: '18 Oct 2018' },
                        { isInverted: true, body: 'Lorem ipsum :thumbsup: dolor sit amet.:smile:', date: '22 Oct 2018' }
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

        const { match, isMobile, location } = this.props;

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

        let dynamicBreadcrumbRoute = undefined;

        if (isMobile) {
            const currentRoute = location.pathname;
            const necessaryRoutePartArr = currentRoute.split('/dialogs/');

            if (
                necessaryRoutePartArr[0] === '/admin/dialogs/'
                || (necessaryRoutePartArr.length === 2 && necessaryRoutePartArr[1] === "")
            ) {
                dynamicBreadcrumbRoute = "";
            } else {
                const [
                    filter, currentDialog
                ] = necessaryRoutePartArr[necessaryRoutePartArr.length - 1].split('/');

                // TODO
                // in dialogsStore find the needed dialog and replace {currentDialog}
                // with the name of the real person.

                dynamicBreadcrumbRoute = currentDialog;
                console.log(filter, dynamicBreadcrumbRoute);
            }


            console.log("dynamicBreadcrumbRoute: ", dynamicBreadcrumbRoute);
        }

        return (
            <div className="row dialogs-page">
                <div className={`col-12 grid-margin ${isMobile ? "p-0" : ""}`}>
                    <div className="card">
                        <div className="card-body">

                        <Default>
                            <h4 className="card-title">Диалоги</h4>
                        </Default>

                        <Mobile>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to='/admin/dialogs/all'>Диалоги</Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        {dynamicBreadcrumbRoute}
                                    </li>
                                </ol>
                            </nav>
                        </Mobile>
                            
                            <div className="row">

                                <Default>
                                    <div className="col-3 clear-pr clear-pl">
                                        <DialogsList dialogs={dialogsList} />
                                    </div>

                                    {dialogRoutes}
                                </Default>

                                <Mobile>

                                    {
                                        dynamicBreadcrumbRoute && dynamicBreadcrumbRoute !== ""
                                        ? dialogRoutes
                                        : (
                                            <div className="col-12 clear-pr clear-pl">
                                                <DialogsList dialogs={dialogsList} />
                                            </div>
                                        )
                                    }

                                </Mobile>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const ResponsiveDialogs = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Dialogs isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveDialogs;
