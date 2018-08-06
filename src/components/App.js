import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './Login/Login';
import Register from './Register/Register';
import NotFound from './NotFound';


@inject('userStore', 'commonStore')
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
      return (
        <div>
          <Switch>
            <Route path='/admin' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/private' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      );
    }

    return <div>Loading...</div>
  }
}
