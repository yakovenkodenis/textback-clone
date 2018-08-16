import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './Dashboard/NavBar';
import SideBar from './Dashboard/SideBar/SideBar';

import Dialogs from './Dialogs/Dialogs';
import Analytics from './Analytics/Analytics';

import Newsletter from './Newsletter/Newsletter';
import New from './Newsletter/New';

import Settings from './Settings/Settings';
import Autofunnels from './Autofunnels/Autofunnels';
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
        component: () => <New />
    },
    {
        path: '/autofunnels',
        exact: true,
        component: () => <Autofunnels />
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

const Home = () => (
    <div>
        <NavBar />

        <div className="container-fluid page-body-wrapper">
            <SideBar />

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
);

export default Home;
