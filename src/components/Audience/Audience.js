import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import  Avatar from 'react-avatar';

import { reactTableTextProps } from '../../utils';


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

        const table = (
            <ReactTable
                data={data}
                columns={[
                    {
                        id: 'avatar',
                        Header: '',
                        accessor: () => 'avatar', // needs to be changed to work with real data
                        sortable: false,
                        filterable: false,
                        Cell: ({ row }) => (
                            <div className="col-12 d-flex justify-content-center">
                                <Avatar name={row.name} size="50" round={true} />
                            </div>
                        ),
                        maxWidth: 100
                    },
                    {
                        id: 'name',
                        Header: 'Имя',
                        accessor: row => row[0],
                        sortable: true,
                        filterable: true,
                        className: 'align-self-center'
                    },
                    {
                        id: 'status',
                        Header: 'Статус',
                        accessor: row => row[1],
                        sortable: true,
                        filterable: true,
                        className: 'align-self-center'
                    },
                    {
                        id: 'lastActive',
                        Header: 'Последняя активность',
                        accessor: row => row[2],
                        className: 'align-self-center'
                    },
                    {
                        id: 'goToChat',
                        Header: '',
                        accessor: () => 'goToChat',
                        sortable: false,
                        filterable: false,
                        Cell: ({ row }) => (
                            <div className="col-12 d-flex justify-content-center">
                                <label className="badge badge-success my-auto" style={{cursor: "pointer"}}>
                                    <i className="mdi mdi-message-text" />
                                </label>
                            </div>
                        ),
                        className: 'align-self-center',
                        maxWidth: 100
                    }
                ]}
                defaultPageSize={10}
                className="-highlight"
                filterable
                {...reactTableTextProps}
            />
        )

        return (
            <React.Fragment>
                <div className="page-header">
                    <h3 className="page-title">Аудитория</h3>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {table}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

