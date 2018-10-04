import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class NewsletterStatistics extends Component {
    render() {
        const { isMobile } = this.props;

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className={`card-body ${isMobile ? "p-1" : ""}`}>
                            <h4 className="card-title">Статистика рассылок</h4>
                            <p>Таблица рассылок с данными для статистики и ниже график на основе таблицы.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
