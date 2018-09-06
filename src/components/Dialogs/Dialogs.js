import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Route, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import shortid from 'shortid';

import DialogsList from './DialogsList';
import DialogContainer from './DialogContainer';
import { Default, Mobile } from '../Responsive';


@inject('subscribersStore')
@withRouter
@observer
class Dialogs extends Component {

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

    generateDialogPath = ({first_name, last_name, subscriber_id}) => {
        return `${first_name.toLowerCase()}-${last_name.toLowerCase()}-${subscriber_id}`;
    }

    render() {

        const {
            match, isMobile, location
        } = this.props;

        const subscribers = this.props.subscribersStore.subscribers.map(subscriber => ({
            path: this.generateDialogPath(subscriber),
            name: `${subscriber.first_name} ${subscriber.last_name}`,
            previewText: subscriber.message_preview.text,
            ...subscriber
        }));

        const dialogRoutes = subscribers.map((subscriber, index) => (
            <Route 
                key={shortid.generate()}
                path={`/admin/dialogs/${match.params.currentFilter}/${subscriber.path}`}
                exact={true}
                component={
                    () => <DialogContainer
                                currentFilter={match.params.currentFilter}
                                {...subscriber}
                          />
                }
            />
        ));

        let dialogsList = match.params.currentFilter === 'all'
            ? subscribers
            : subscribers.filter(subscriber =>
                subscriber.channel_type.toLowerCase() === match.params.currentFilter
            );

        dialogsList = dialogsList.map(dialog => {
            const isActive =
                location.pathname === `/admin/dialogs/${match.params.currentFilter}/${dialog.path}/`
                || location.pathname === `/admin/dialogs/${match.params.currentFilter}/${dialog.path}`;

            const unreadCount = this.props.subscribersStore.unreadCounter[
                `${dialog.channel_id}-${dialog.subscriber_id}`
            ];

            return {
                ...dialog,
                isActive,
                unreadCount
            }
        });

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

                dynamicBreadcrumbRoute = currentDialog;
                console.log(filter, dynamicBreadcrumbRoute);
            }
        }

        return (
            <div className="row dialogs-page">
                <div className={`col-12 grid-margin ${isMobile ? "p-0" : /*make more dynamic?*/ "p-0"}`}>
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
                                    
                                    {
                                        (location.pathname === `/admin/dialogs/${match.params.currentFilter}`
                                        || location.pathname === `/admin/dialogs/${match.params.currentFilter}/`)
                                        && dialogRoutes.length > 0
                                        ? (
                                            <div className="col-9 d-flex justify-content-center mt-5">
                                                <p className="text-muted">Выберите диалог из списка</p>
                                            </div>
                                        ) : dialogRoutes
                                        
                                    }

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
