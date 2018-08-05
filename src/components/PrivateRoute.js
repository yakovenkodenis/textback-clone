import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


@inject('userStore', 'commonStore')
@observer
export default class PrivateRoute extends Component {
    render() {
        const { userStore, ...restProps } = this.props;

        if (userStore.currentUser) return <Route {...restProps} />
        return <Redirect to='/' />;
    }
}
