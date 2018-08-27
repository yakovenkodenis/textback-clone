import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Route, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { datediff, unixtimeToDate } from '../../utils';

import DialogsList from './DialogsList';
import DialogContainer from './DialogContainer';
import { Default, Mobile } from '../Responsive';


@inject('subscribersStore', 'channelsStore', 'messagesStore')
@withRouter
@observer
class Dialogs extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentDialog: "",
            currentFilter: "all",
            dialogs: []
        };
    }

    componentWillMount() {
        const { history } = this.props;

        if (!this.props.match.params.currentFilter) {
            history.push('/admin/dialogs/all');
        }
    }

    componentDidMount() {
        // const { channels } = this.props.channelsStore;
        // console.log('CHANNELS: ', channels);

        console.log('Dialogs.js componentDidMount()');
        this.props.subscribersStore.getSubscribersList()
        //   .then(subscribers => {
        //     subscribers.forEach(subscriber => {
        //         this.props.messagesStore.getTelegramMessages(
        //             subscriber.channel_id, subscriber.subscriber_id
        //         )
        //     });
        // });

        // console.log('DATES: ', datediff(new Date(unixtimeToDate(1535194570)), new Date()));

        // Single object example from array of subscribers
        // added_time: 1535194570
        // channel_id: 9
        // first_name: "Denis"
        // image: "http://35.190.220.217/AgADAgADr6cxG_8JwwNgttjdRyya-9xOqw4ABJREmRMFDEP3CPcBAAEC.jpg"
        // language_code: "ru-RU"
        // last_activity: 1535194570
        // last_name: "Yakovenko"
        // status_id: 1
        // subscriber_id: 63113727
        // username: "yakovenkodenis"
    }

    // componentDidUpdate(prevProps) {
    //     if (
    //         this.props.subscribersStore.subscribers
    //         && this.props.subscribersStore.subscribers.constructor === Array
    //     ) {
    //         console.log('componentDidUpdate');
    //     }
    // }

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

        const { match, isMobile, location } = this.props;

        let subscribers = [];

        if (
            this.props.subscribersStore.subscribers
            && this.props.subscribersStore.subscribers.constructor === Array
        ) {
            console.log('MAPPING SUBSCRIBERS ARRAY...');
            console.log(this.props.messagesStore.messages);

            const messages = this.props.messagesStore.messages;


            subscribers = this.props.subscribersStore.subscribers.map(subscriber => {

                const existingChat = messages.find(chat =>
                    chat.subscriber_id === subscriber.subscriber_id
                    && chat.channel_id === subscriber.channel_id
                );

                const chat = existingChat ? existingChat.messages : [];

                return {
                    socialNetwork: 'telegram',
                    path: this.generateDialogPath(subscriber),
                    name: `${subscriber.first_name} ${subscriber.last_name}`,
                    timeAgo: datediff(new Date(unixtimeToDate(subscriber.last_activity)), new Date()),
                    messages: chat, // GET SOMEWHERE MESSAGES!!!
                    ...subscriber
                }
            });
        }

        const dialogRoutes = subscribers.map((subscriber, index) => (
            <Route 
                key={index}
                path={`/admin/dialogs/${match.params.currentFilter}/${subscriber.path}`}
                exact={true}
                component={() => <DialogContainer currentFilter={match.params.currentFilter} {...subscriber} />}
            />
        ));

        // const dialogsList = match.params.currentFilter === 'all'
        //     ? this.state.dialogs
        //     : this.state.dialogs.filter(dialog =>
        //         dialog.socialNetwork === match.params.currentFilter
        //     );

        const dialogsList = match.params.currentFilter === 'all'
            ? subscribers
            : subscribers.filter(subscriber =>
                subscriber.socialNetwork === match.params.currentFilter
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

                dynamicBreadcrumbRoute = currentDialog;
                console.log(filter, dynamicBreadcrumbRoute);
            }


            console.log("dynamicBreadcrumbRoute: ", dynamicBreadcrumbRoute);
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
