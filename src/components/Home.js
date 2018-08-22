import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

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
        component: () => <Profile />
    }
];

@withRouter
export default class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isSidebarActive: false
        };
    }

    componentWillMount() {
        this.unlistenRoutesChange = this.props.history.listen((location, action) => {
            this.setState({
                isSidebarActive: false
            });
        });
    }

    componentWillUnmount(){
        this.unlistenRoutesChange();
    }

    toggleSidebarActive = () => {
        this.setState({
            isSidebarActive: !this.state.isSidebarActive
        });
    }

    hideSidebar = e => {
        if (!document.getElementById('sidebar').contains(e.target)
            && this.state.isSidebarActive) {
            this.setState({
                isSidebarActive: false
            });
        }
    }

    render() {
        return (
            <div onClick={this.hideSidebar}>
                <NavBar toggleSidebar={this.toggleSidebarActive} />
        
                <div className="container-fluid page-body-wrapper">
                    <SideBar isActive={this.state.isSidebarActive} />
        
                    <div className="main-panel">
                        <div className="content-wrapper">
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={'/admin' + route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
