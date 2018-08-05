import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './Dashboard/NavBar';
import SideBar from './Dashboard/SideBar';

import Dialogs from './Dialogs/Dialogs';
import Analytics from './Analytics/Analytics';
import Newsletter from './Newsletter/Newsletter';
import Settings from './Settings/Settings';


const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Dialogs />
    },
    {
        path: '/analytics',
        component: () => <Analytics />
    },
    {
        path: '/newsletter',
        component: () => <Newsletter />
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
