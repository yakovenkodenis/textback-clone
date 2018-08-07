import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class Drafts extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Черновики</h4>
                            <p>Таблица черновиков с кнопками редактирования и удаления.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
