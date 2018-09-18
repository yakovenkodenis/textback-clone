import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import $ from 'jquery';


@withRouter
@observer
export default class GeneralStatistics extends Component {
    
    state = {
        widgets: [
            { name: 'Супер виджет №1', id: 0 },
            { name: 'Супер виджет №2', id: 0 }
        ]
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
    }

    generateRows = rows => {
        return rows.map((row, index) => (
            <tr key={index}>
                <td>{row.name}</td>
                <td>
                    <div className="d-flex justify-content-end">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer"}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Изменить"
                        >
                            <i className="mdi mdi-pencil-box-outline" />
                        </label>
                        <label
                            className="badge badge-outline-danger my-auto mx-2"
                            style={{cursor: "pointer"}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Удалить"
                        >
                            <i className="mdi mdi-delete-forever" />
                        </label>
                    </div>
                </td>
            </tr>
        ));
    }
    
    render() {
        const rows = this.generateRows(this.state.widgets ? this.state.widgets : []);

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Виджеты</h4>
                            <table className="table table-hover">
                                <thead><tr>
                                    <th>Виджет</th>
                                    <th></th>
                                </tr></thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                            <br />
                            <Link to="/admin/settings/widgets/new" className="btn btn-success">
                                Новый виджет
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
