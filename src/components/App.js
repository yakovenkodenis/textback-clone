import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './Login/Login';
import Register from './Register/Register';
import NotFound from './NotFound';
import LoadingSpinner from './LoadingSpinner';


@inject('userStore', 'commonStore', 'authStore')
@withRouter
@observer
export default class App extends Component {

  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {

      const { pathname } = this.props.location;
      console.log('App.js: ', pathname);

      if (pathname !== '/login' && pathname !== '/register' && !this.props.commonStore.token) {
        return <Redirect to="/login" />
      }

      return (
        <div>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/admin' component={Home} />
            <PrivateRoute path='/private' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      );
    }

    return <LoadingSpinner />
  }
}
