import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DataTable from './DataTable';


@withRouter
@observer
export default class Audience extends Component {

    render() {

        const data = [
            ['Наталья Михальченко', 'Подписалась, обратилась в чат', '3 авг. 2018 г. 9:36:25'],
            ['Сергей Кружков', 'Подписался, обратился в чат', '2 авг. 2018 г. 13:16:55'],
            ['Полина Артюшенко', 'Подписалась, обратилась в чат', '31 июл. 2018 г. 15:06:11'],
            ['Диана Якубова', 'Подписалась, обратилась в чат', '29 июл. 2018 г. 11:43:45'],
            ['Диана Ежова', 'Подписалась, обратилась в чат', '16 июл. 2018 г. 07:33:27'],
            ['Юлия Евдокименко', 'Подписалась, обратилась в чат', '29 июн. 2018 г. 14:24:55']
        ];

        const columns = [{
            header: ''
        }, {
            header: 'Имя'
        }, {
            header: 'Статус'
        }, {
            header: 'Последняя активность'
        }, {
            header: ''
        }];

        return (
            <React.Fragment>
                <div className="page-header">
                    <h3 className="page-title">Аудитория</h3>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">
                                    <i className="mdi mdi-filter"> </i> Фильтр
                                </h6>

                                <form className="form-inline">
                                    <label htmlFor="inputFilter1" className="sr-only"></label>
                                    <input
                                        type="text"
                                        id="inputFilter1"
                                        className="form-control mb2 mr-sm-2"
                                        placeholder="Имя"
                                    />

                                    <label htmlFor="inputFilter2" className="sr-only"></label>
                                    <input
                                        type="text"
                                        id="inputFilter2"
                                        className="form-control mb2 mr-sm-2"
                                        placeholder="Возраст"
                                    />

                                    <label htmlFor="inputFilter3" className="sr-only"></label>
                                    <input
                                        type="text"
                                        id="inputFilter3"
                                        className="form-control mb2 mr-sm-2"
                                        placeholder="Еще один супер фильтр"
                                    />
                                </form>
                                <br/><br/>

                                <div className="table-responsive">
                                    <DataTable
                                        columns={columns}
                                        data={data}
                                    />
                                </div>

                                <br /><br />
                                <nav>
                                    <ul className="pagination d-flex justify-content-center flat pagination-success">
                                        <li className="page-item">
                                            <a className="page-link">
                                                <i className="mdi mdi-chevron-left"></i>
                                            </a>
                                        </li>
                                        <li className="page-item active"><a className="page-link">1</a></li>
                                        <li className="page-item"><a className="page-link">2</a></li>
                                        <li className="page-item"><a className="page-link">3</a></li>
                                        <li className="page-item"><a className="page-link">4</a></li>
                                        <li className="page-item"><a className="page-link">5</a></li>
                                        <li className="page-item">
                                            <a className="page-link">
                                                <i className="mdi mdi-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

