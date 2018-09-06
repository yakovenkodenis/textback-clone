import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import shortid from 'shortid';

import { routes } from './Settings';


@withRouter
@observer
export default class RootSettings extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Настройки</h4>
                            <br/><br/>

                            <ul className="gradient-bullet-list mt-4">
                                {routes.slice(1).map((route) => (
                                    <li key={shortid.generate()}>
                                        <Link to={`/admin/settings${route.path}`}>
                                            {route.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
