import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class Appearance extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="page-header">
                    <h3 className="page-title">Appearance</h3>
                </div>
            </React.Fragment>
        )
    }
}
