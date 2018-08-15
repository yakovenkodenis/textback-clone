import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class GeneralStatistics extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Общая статистика</h4>
                            <p className="card-description">Количество активных подписчиков</p>
                            <button className="btn btn-success">Новая рассылка</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
