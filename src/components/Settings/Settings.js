import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Route } from 'react-router-dom';

import AccountSettings from './AccountSettings';
import ChannelsSettings from './ChannelsSettings';
import GeneralSettings from './GeneralSettings';
import SubscriptionSettings from './SubscriptionSettings';
import RootSettings from './RootSettings';


export const routes = [
    {
        path: '/',
        name: 'Настройки',
        exact: true,
        component: () => <RootSettings />
    },
    {
        path: '/general',
        name: 'Общие настройки',
        exact: true,
        component: () => <GeneralSettings />
    },
    {
        path: '/account',
        name: 'Настройки аккаунта',
        exact: true,
        component: () => <AccountSettings />
    },
    {
        path: '/channels',
        name: 'Настройки каналов',
        exact: true,
        component: () => <ChannelsSettings />
    },
    {
        path: '/subscription',
        name: 'Настройки подписки',
        exact: true,
        component: () => <SubscriptionSettings />
    }
];


@withRouter
@observer
export default class Settings extends Component {
    render() {
        // const { location } = this.props;
        // const neededPage = location.pathname.split('/settings/')[1];

        
        const Routes = routes.map((route, index) => (
            <Route
                key={index}
                path={'/admin/settings' + route.path}
                exact={route.exact}
                component={route.component}
            />
        ));

        return Routes;
    }
}

