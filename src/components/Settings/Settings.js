import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Route } from 'react-router-dom';
import shortid from 'shortid';

import AccountSettings from './AccountSettings';
import ChannelsSettings from './ChannelsSettings';
import GeneralSettings from './GeneralSettings';
import SubscriptionSettings from './SubscriptionSettings';
import WidgetSettings from './WidgetSettings';
import NewWidget from './Widgets/New';
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
    },
    {
        path: '/widgets',
        name: 'Настройки виджетов',
        exact: true,
        component: () => <WidgetSettings />
    },
    {
        path: '/widgets/new',
        name: 'Создать виджет',
        exact: true,
        component: () => <NewWidget />
    }
];


@withRouter
@observer
export default class Settings extends Component {
    render() {
        // const { location } = this.props;
        // const neededPage = location.pathname.split('/settings/')[1];

        
        const Routes = routes.map((route) => (
            <Route
                key={shortid.generate()}
                path={'/admin/settings' + route.path}
                exact={route.exact}
                component={route.component}
            />
        ));

        return Routes;
    }
}

