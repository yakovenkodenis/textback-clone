import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class SubscriptionSettings extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Настройки подписки</h4>
                            <p className="card-description">Когда-нибудь тут будут настройки подписки.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
