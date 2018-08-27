import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';

import { generateVkOAuthLink } from '../../utils';


@inject('authStore')
@withRouter
@observer
export default class GeneralSettings extends Component {

    constructor(props, context) {
        super(props, context);

        const redirectUri = window.location.origin + '/oauth';
        this.vkOAuthLink = generateVkOAuthLink('68959538', redirectUri);
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin p-0">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Общие настройки</h4>
                            <p className="card-description">Когда-нибудь тут будут общие настройки.</p>

                            <h5>Авторизация в соц. сетях:</h5>

                            <ul className="list-arrow">
                                <li className="text-success">
                                    <Link to="">Telegram</Link>
                                    <span>  </span><i className="mdi mdi-check"></i>
                                </li>
                                <li className="text-success">
                                    <a href={this.vkOAuthLink}>VK</a>
                                    <span>  </span><i className="mdi mdi-check"></i>
                                </li>
                                <li className="text-info">
                                    <Link to="">Facebook</Link>
                                </li>
                                <li className="text-info">
                                    <Link to="">Viber</Link>
                                </li>
                                <li className="text-info">
                                    <Link to="">Instagram</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
