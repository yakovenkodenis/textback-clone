import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class UserProfile extends Component {

    render() {
        return (
            <div className="profile">
                {this.props.name}
            </div>
        );
    }
}