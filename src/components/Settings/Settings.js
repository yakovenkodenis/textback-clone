import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class Settings extends Component {
    render() {
        const { location } = this.props;
        const neededPage = location.pathname.split('/settings/')[1];

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Settings Page here!</h4>
                            <h6 className="card-body">You're on the {neededPage} Page</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

