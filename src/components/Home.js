import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './Dashboard/NavBar';
import SideBar from './Dashboard/SideBar/SideBar';

import Dialogs from './Dialogs/Dialogs';
import Analytics from './Analytics/Analytics';
import Newsletter from './Newsletter/Newsletter';
import Settings from './Settings/Settings';
import Autofunnels from './Autofunnels/Autofunnels';
import Audience from './Audience/Audience';


const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Dialogs />
    },
    {
        path: '/dialogs',
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
        path: '/autofunnels',
        exact: true,
        component: () => <Autofunnels />
    },
    {
        path: '/audience',
        component: () => <Audience />
    },
    {
        path: '/settings',
        component: () => <Settings />
    }
]

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
                            path={route.path}
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
