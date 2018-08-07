import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class PlannedNewsletters extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Запланированные рассылки</h4>
                            <p>Список запланированных рассылок в виде таблицы.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
