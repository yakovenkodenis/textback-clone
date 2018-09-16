import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import ReactTable from 'react-table';
import  Avatar from 'react-avatar';

import { reactTableTextProps, unixtimeToDate, formatDate } from '../../utils';
import agent from '../../agent';
import Filters from './Filters';


@inject('subscribersStore', 'channelsStore')
@withRouter
@observer
export default class Audience extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        this.getSubscribersList();
    }

    formatData = subscribers => {
        const channels = this.props.channelsStore.channels;

        return subscribers.map(subscriber => {
            const name = `${subscriber.first_name} ${subscriber.last_name}`;
            const avatar = subscriber.image;
            const lastTimeActive = subscriber.message_preview
                ? formatDate(unixtimeToDate(subscriber.message_preview.date))
                : "-";

            const maybeChannel = channels.find(channel =>
                channel.channel_id === subscriber.channel_id
            );
            const channel = maybeChannel ? maybeChannel.first_name : '-';
            const channelUsername = maybeChannel ? maybeChannel.username : '-';
            
            const statusStub = '-';

            const chatUrlId =
                `${subscriber.first_name.toLowerCase()}-${subscriber.last_name.toLowerCase()}-${subscriber.subscriber_id}`;
            const dialogUrl = `/admin/dialogs/all/${chatUrlId}`;

            return {
                name, avatar, lastTimeActive, channel, statusStub, channelUsername, dialogUrl
            }
        });
    }

    getSubscribersList = (filter = { InTags: null, NotInTags: null, AndTags: null }) => {
        this.setState({
            ...this.state,
            loading: true
        });
        agent.Subscribers.getList(Object.values(filter).some(Boolean) ? filter : {})
         .then(response => {
            console.log('RESPONSE: ', response);
            if (response.success) {
                console.log('FILTERED RESPONSE: ', response.data)
                this.setState({
                    data: this.formatData(response.data),
                    loading: false
                });
            }
        });
    }

    render() {

        // added_time:1535836275
        // channel_id:47
        // channel_type:"Vk"
        // first_name:"Алексей"
        // image:"https://pp.userapi.com/c837124/v837124570/d15a/MmMnfoFj_hI.jpg?ava=1"
        // language_code:null
        // last_name:"Крючков"
        // message_preview:{date: 1535836273, owner: false, text: "test"}
        // status_id:1
        // subscriber_id:49142570
        // username:"49142570"

        const channels = this.props.channelsStore.channels;

        const table = (
            <ReactTable
                data={this.state.data}
                columns={[
                    {
                        id: 'avatar',
                        Header: '',
                        accessor: row => row.avatar,
                        sortable: false,
                        filterable: false,
                        Cell: ({ row }) => (
                            <div className="col-12 d-flex justify-content-center">
                                <Avatar src={row.avatar} name={row.name} size="50" round={true} />
                            </div>
                        ),
                        maxWidth: 100
                    },
                    {
                        id: 'name',
                        Header: 'Имя',
                        accessor: row => row.name,
                        sortable: true,
                        filterable: true,
                        className: 'align-self-center'
                    },
                    {
                        id: 'status',
                        Header: 'Статус',
                        accessor: row => row.statusStub,
                        sortable: true,
                        filterable: true,
                        className: 'align-self-center'
                    },
                    {
                        id: 'lastActive',
                        Header: 'Последняя активность',
                        accessor: row => row.lastTimeActive,
                        className: 'align-self-center'
                    },
                    {
                        id: 'channel',
                        Header: 'Канал',
                        filterMethod: (filter, row) => {
                            if (filter.value === 'all') return true;
                            return filter.value === row._original.channelUsername;
                        },
                        Filter: ({ filter, onChange }) => (
                            <select
                                onChange={e => onChange(e.target.value)}
                                style={{ width: '100%' }}
                                value={filter ? filter.value : 'all'}
                            >
                                <option value='all'>Все</option>
                                {
                                    channels.map(channel => (
                                        <option value={channel.username} key={channel.channel_id}>
                                            {channel.first_name}
                                        </option>
                                    ))
                                }
                            </select>
                        ),
                        accessor: row => row.channel,
                        className: 'align-self-center'
                    },
                    {
                        id: 'goToChat',
                        Header: '',
                        accessor: () => 'goToChat',
                        sortable: false,
                        filterable: false,
                        Cell: ({ original }) => (
                            <Link to={original.dialogUrl}>
                                <div className="col-12 d-flex justify-content-center">
                                    <label className="badge badge-success my-auto" style={{cursor: "pointer"}}>
                                        <i className="mdi mdi-message-text" />
                                    </label>
                                </div>
                            </Link>
                        ),
                        className: 'align-self-center',
                        maxWidth: 100
                    }
                ]}
                defaultPageSize={10}
                className="-highlight"
                filterable
                loading={this.state.loading}
                loadingText="Загрузка..."
                defaultFilterMethod={(filter, row) => {
                    const id = filter.pivotId || filter.id;
                    return (
                        row[id] !== undefined
                            ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
                            : true
                    );
                }}
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
                                <Filters getSubscribersList={this.getSubscribersList} />
                                <br />
                                {table}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

