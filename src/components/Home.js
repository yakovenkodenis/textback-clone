import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import { Default } from './Responsive';

import NavBar from './Dashboard/NavBar';
import SideBar from './Dashboard/SideBar/SideBar';

import Dialogs from './Dialogs/Dialogs';
import Analytics from './Analytics/Analytics';

import Newsletter from './Newsletter/Newsletter';
import NewNewsletter from './Newsletter/New/New';

import Settings from './Settings/Settings';

import Autofunnels from './Autofunnels/Autofunnels';
import NewAutofunnel from './Autofunnels/New/New';

import Audience from './Audience/Audience';

import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';

import RightSideBar from './Dashboard/RightSidebar/RightSideBar';


// import asyncPoll from './HOCs/asyncPoll';


const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Dialogs />
    },
    {
        path: '/dialogs/:currentFilter?',
        component: () => <Dialogs />
    },
    {
        path: '/analytics',
        exact: true,
        component: () => <Analytics />
    },
    {
        path: '/newsletter',
        exact: true,
        component: () => <Newsletter />
    },
    {
        path: '/newsletter/new',
        exact: true,
        component: () => <NewNewsletter />
    },
    {
        path: '/autofunnels',
        exact: true,
        component: () => <Autofunnels />
    },
    {
        path: '/autofunnels/new',
        exact: true,
        component: () => <NewAutofunnel />
    },
    {
        path: '/audience',
        exact: true,
        component: () => <Audience />
    },
    {
        path: '/settings',
        component: () => <Settings />
    },
    {
        path: '/profile',
        exact: true,
        component: () => <Profile />
    },
    {
        path: '/profile/edit',
        exact: true,
        component: () => <EditProfile />
    }
];

@inject('channelsStore', 'subscribersStore', 'commonStore', 'messagesStore')
@withRouter
@observer
class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isSidebarActive: false,
            isRightSidebarOpen: false
        };
    }

    componentWillMount() {
        this.unlistenRoutesChange = this.props.history.listen((location, action) => {
            this.setState({
                isRightSidebarOpen: false,
                isSidebarActive: false
            });
        });
    }

    componentWillUnmount(){
        this.unlistenRoutesChange();
        clearInterval(this.pollingInterval);
        this.props.commonStore.setPollingInterval(undefined);
    }

    componentDidMount() {
        this.props.channelsStore.getChannelsList()
          .then(() => this.props.subscribersStore.getSubscribersDetailedList())
          .then(() => {
              console.log('Start polling in Home.js componentDidMount');
              this.pollUpdates();
          });
    }

    pollUpdates = () => {
        // if (!this.props.commonStore.pollingInterval) {
        //     this.pollingInterval = setInterval(
        //         () => {
        //             console.log('pollUpdates');
        //             this.props.messagesStore.getUpdates(this.props.commonStore.lastUpdateTime)
        //         },
        //         5 * 1000
        //     );

        //     this.props.commonStore.setPollingInterval(this.pollingInterval);
        // }


        this.props.messagesStore.getUpdates(this.props.commonStore.lastUpdateTime)
            .then(response => {
                console.log('UPDATE RESPONSE: ', response);
                this.pollUpdates();
            });
    }

    toggleSidebarActive = () => {
        this.setState({
            ...this.state,
            isSidebarActive: !this.state.isSidebarActive
        });
    }

    toggleRightSidebar = () => {
        this.setState({
            ...this.state,
            isRightSidebarOpen: !this.state.isRightSidebarOpen
        })
    }

    closeRightSidebar = () => {
        this.setState({
            ...this.state,
            isRightSidebarOpen: false
        });
    }

    hideSidebar = e => {
        if (
            !document.getElementById('sidebar').contains(e.target)
            && this.state.isSidebarActive
        ) {
            this.setState({
                ...this.state,
                isSidebarActive: false
            });
        }

        if (
            !this.props.isMobile
            && !document.getElementById('right-sidebar').contains(e.target)
            && this.state.isRightSidebarOpen
        ) {
            this.setState({
                ...this.state,
                isRightSidebarOpen: false
            });
        }
    }

    render() {
        const { isMobile } = this.props;

        console.log('Home.js render()', this.props.messagesStore.messages);

        return (
            <div onClick={this.hideSidebar}>
                <NavBar toggleSidebar={this.toggleSidebarActive} />
        
                <div className="container-fluid page-body-wrapper">

                    <Default>
                        <div id="settings-trigger" onClick={this.toggleRightSidebar}>
                            <i className="mdi mdi-settings infinite-spin" style={{cursor: 'pointer'}} />
                        </div>

                        <RightSideBar isOpen={this.state.isRightSidebarOpen} close={this.closeRightSidebar} />
                    </Default>

                    <SideBar isActive={this.state.isSidebarActive} />
        
                    <div className="main-panel">
                        <div className={`content-wrapper`}
                            style={{
                                padding: isMobile ? "0.25rem 0.25rem" : "1.25rem 2.25rem"
                            }}
                        >
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={'/admin' + route.path}
                                    exact={route.exact}
                                    // component={route.component}
                                    render={props => React.cloneElement(
                                        route.component(), {
                                            ...props,
                                            pollingInterval: this.pollingInterval
                                        }
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

// const onPollInterval = (props, dispatch) => {

//     console.log('onPollInterval props: ', props);
//     console.log('onPollInterval dispatch: ', dispatch);

//     if (props.messagesStore && props.commonStore) {
//         // return dispatch(
//             return props.messagesStore.getUpdates(props.commonStore.lastUpdateTime)
//         // );

//         // return 'TRYING TO UPDATE';
//     }

//     return 'NO UPDATES YET...';
// }

const ResponsiveHome = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Home isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);


export default inject('channelsStore', 'subscribersStore', 'commonStore', 'messagesStore')(
    /*asyncPoll(5 * 1000, onPollInterval)*/(ResponsiveHome)
);
