import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Modal from './Modal';
import { reactTableTextProps } from '../../utils';


@inject('channelsStore')
@withRouter
@observer
export default class ChannelsSettings extends Component {

    constructor(props, context) {
        super(props, context);

        this.socialNetworkModalValue = React.createRef();
        this.botIdModalValue = React.createRef();
    }

    componentDidMount() {
        this.props.channelsStore.getChannelsList();
    }

    onDeleteChannel = channelId => {
        this.props.channelsStore.deleteTelegramChannel(channelId);
    }

    onAddChannel = (socialNetwork, botId) => {
        this.props.channelsStore.addTelegramChannel(
            this.botIdModalValue.current.value
        );
    }

    render() {

        const { channels } = this.props.channelsStore;

        const table = (
            <ReactTable
                data={channels.constructor === Array ? channels : []}
                columns={[
                    {
                        id: 'socialNetwork',
                        Header: 'Соц. сеть',
                        accessor: channel => channel.socialNetwork
                                            ? channel.socialNetwork
                                            : 'Telegram',
                        filterMethod: (filter, row) => {
                            if (filter.value === 'all') return true;
                            return row[filter.id].toLowerCase() === filter.value
                        },
                        Filter: ({ filter, onChange }) => (
                            <select
                                onChange={e => onChange(e.target.value)}
                                style={{ width: '100%' }}
                                value={filter ? filter.value : 'all'}
                            >
                                <option value='all'>Все</option>
                                <option value='telegram'>Telegram</option>
                                <option value='facebook'>Facebook</option>
                                <option value='vk'>VK</option>
                                <option value='viber'>Viber</option>
                                <option value='instagram'>Instagram</option>
                            </select>
                        )
                    },
                    {
                        id: 'name',
                        Header: 'Название канала',
                        accessor: 'username'
                    },
                    {
                        Header: '',
                        sortable: false,
                        filterable: false,
                        accessor: 'channel_id',
                        minWidth: 100,
                        maxWidth: 350,
                        Cell: ({ row }) => (
                            <div className="col-12 d-flex justify-content-center">
                                <span
                                    className={
                                        `badge badge-danger badge-pill badge-font-large`
                                    }
                                    style={{cursor: "pointer"}}
                                    onClick={() => {
                                        console.log(row);
                                        if (window.confirm(`Удалить канал ${row.name}?`))
                                            this.onDeleteChannel(row.channel_id);
                                    }}
                                >
                                    Удалить
                                </span>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={10}
                className="-highlight"
                filterable
                {...reactTableTextProps}
            />
        );

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Настройки каналов</h4>
                                
                            <Modal
                                modalId="add-channel-modal"
                                handleAddChannel={this.onAddChannel}
                            >
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="socialNetwork" className="col-form-label">Соц. сеть:</label>
                                        <select
                                            className="form-control" id="socialNetwork"
                                            ref={this.socialNetworkModalValue}
                                        >
                                            <option value="telegram">Telegram</option>
                                            <option value="viber">Viber</option>
                                            <option value="vk">VK</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="facebook">Facebook</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="botId" className="col-form-label">ID бота:</label>
                                        <input
                                            type="text" className="form-control" id="botId"
                                            ref={this.botIdModalValue}
                                        />
                                    </div>
                                </form>
                            </Modal>

                            <button
                                type="button" className="btn btn-lg btn-primary"
                                data-toggle="modal"
                                data-target="#add-channel-modal"
                                data-whatever="not yet."
                            >
                                Добавить канал
                            </button>

                            <br/><br/>

                            {table}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
