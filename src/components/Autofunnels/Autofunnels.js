import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import ReactTable from 'react-table';
import MediaQuery from 'react-responsive';
import $ from 'jquery';

import { reactTableTextProps } from '../../utils';


@withRouter
@observer
class Autofunnels extends Component {

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
    }

    render() {

        const data = [
            {
                type: 'Цепочка',
                name: 'Новая цепочка',
                status: 'Черновик'
            },
            {
                type: 'Цепочка',
                name: 'Новая цепочка',
                status: 'Черновик'
            },
            {
                type: 'Цепочка',
                name: 'Новая цепочка',
                status: 'Черновик'
            }
        ];

        const table = (
            <ReactTable
                data={data}
                columns={[
                    {
                        id: 'type',
                        Header: 'Тип',
                        accessor: 'type', // needs to be changed to work with real data
                        className: 'pl-2 align-self-center'
                    },
                    {
                        id: 'name',
                        Header: 'Название рассылки',
                        accessor: 'name',
                        className: 'pl-2 align-self-center'
                    },
                    {
                        id: 'status',
                        Header: 'Статус',
                        accessor: 'status',
                        className: 'pl-2 align-self-center'
                    },
                    {
                        id: 'actions',
                        Header: '',
                        accessor: () => 'actions',
                        sortable: false,
                        filterable: false,
                        Cell: ({ row }) => (
                            <div className="col-12 d-flex justify-content-center">
                                <label
                                    className="badge badge-outline-info my-auto mx-2"
                                    style={{cursor: "pointer"}}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-original-title="Включить"
                                >
                                    <i className="mdi mdi-play" />
                                </label>
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
                        ),
                        className: 'align-self-center',
                        maxWidth: 300
                    }
                ]}
                defaultPageSize={10}
                className="-highlight"
                filterable
                {...reactTableTextProps}
            />
        );

        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <div className="page-header">
                    <h3 className="page-title">Автоворонки</h3>
                </div>
                <div className="row">
                    <div className={`col-lg-12 grid-margin stretch-card ${isMobile ? "p-0" : ""}`}>
                        <div className="card">
                            <div className={`card-body ${isMobile ? "p-3" : ""}`}>
                                <Link
                                    to='/admin/autofunnels/new'
                                    className="btn btn-lg btn-primary"
                                >
                                    Новая цепочка
                                </Link>
                                <br/><br/>
                                {table}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const ResponsiveAutofunnels = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Autofunnels isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveAutofunnels;
