import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Modal from './Modal';
import { reactTableTextProps } from '../../utils';


@inject('channelsStore', 'commonStore')
@withRouter
@observer
export default class ChannelsSettings extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showBotIdField: true,

            vkAuthSuccessful: false,
            vkGroups: [],
            vkGroupsToken: '',
            vkAccessToken: null
        }

        this.socialNetworkModalValue = React.createRef();
        this.botIdModalValue = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.commonStore.accessTokens['auth_vk']) {
            this.setState({
                ...this.state,
                vkAuthSuccessful: true,
                vkAccessToken: this.props.commonStore.accessTokens['auth_vk']
            }, () => {
                this.props.commonStore.resetAccessToken('auth_vk');

                // agent.OAuth.Vk.getGroupsToken(this.state.vkAccessToken).then(response => {
                //     console.log('VK GROUPS TOKEN RESPONSE: ', response);
                // });

                const url = `https://api.vk.com/method/groups.get?fields=name&extended=1&filter=admin&access_token=${this.state.vkAccessToken}&v=5.8`;
                fetch(url, { mode: 'cors' })
                 .then(r => {
                     console.log('VK GROUPS RESPONSE: ', r);
                 });
            });
        }
    }

    onDeleteChannel = (channelType, channelId) => {

        console.log('onDeleteChannel:', channelType, channelId);

        // this.props.channelsStore.deleteTelegramChannel(channelId)
        //     .then(() => this.props.channelsStore.getChannelsList());

        this.props.channelsStore.deleteChannel(channelType, channelId)
            .then(() => this.props.channelsStore.getChannelsList());
    }

    onAddChannel = () => {
        // const socialNetwork = this.socialNetworkModalValue.current.value;
        // console.log('Adding channel for: ---> ', socialNetwork);

        // switch (socialNetwork) {
        //     case "telegram":
        //         this.props.channelsStore.addTelegramChannel(
        //             this.botIdModalValue.current.value
        //         );
        //         break;
        //     case "vk":
        //         this.props.channelsStore.addVkChannel(
        //             this.botIdModalValue.current.value
        //         );
        //         break;
        //     default: break;
        // }

        this.props.channelsStore.addChannel(
            this.socialNetworkModalValue.current.value,
            this.botIdModalValue.current.value
        );
    }

    // 1 -- https://oauth.vk.com/authorize?client_id=6668833&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=groups&response_type=token&state=auth_vk&v=5.80
    // 2 -- https://api.vk.com/method/groups.get?fields=name&extended=1&filter=admin&access_token=7824d8dd97a6045e974051b79b68c40c109d5647b6df62dc5e6ef25f2cd6fc8a7d7f8327f09745df7b72d&v=5.8
    // 3 -- https://oauth.vk.com/authorize?client_id=6668833&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=messages,photos,docs,manage&group_ids=68959538&response_type=token&state=auth_vk&v=5.80

    handleOnSocialNetworkChange = e => {
        if (e.target.value === 'vk') {
            this.setState({
                ...this.state,
                showBotIdField: false
            }, () => {

            });
        }
    }

    render() {

        const { channels, inProgress } = this.props.channelsStore;

        const table = (
            <ReactTable
                data={channels.constructor === Array ? channels : []}
                columns={[
                    {
                        id: 'socialNetwork',
                        Header: 'Соц. сеть',
                        accessor: channel => channel.channel_type
                                            ? channel.channel_type
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
                                            this.onDeleteChannel(
                                                row.socialNetwork.toLowerCase(), row.channel_id
                                            );
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

        // const redirectUri = 'http://localhost:3000/oauth';
        const redirectUri = 'https://mochaccino.herokuapp.com/oauth';
        const clientId = '6668833';
        const authHref = `https://oauth.vk.com/authorize?client_id=${clientId}&display=popup&redirect_uri=${redirectUri}&scope=groups&response_type=token&state=auth_vk&v=5.80`;

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
                                            onChange={this.handleOnSocialNetworkChange}
                                        >
                                            <option value="telegram">Telegram</option>
                                            <option value="viber">Viber</option>
                                            <option value="vk">VK</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="facebook">Facebook</option>
                                        </select>
                                    </div>
                                    
                                    {
                                        this.state.showBotIdField ? (
                                            <div className="form-group">
                                                <label htmlFor="botId" className="col-form-label">ID бота:</label>
                                                <input
                                                    type="text" className="form-control" id="botId"
                                                    ref={this.botIdModalValue}
                                                />
                                            </div>
                                        ) : (
                                            <a className="btn btn-lg btn-info" href={authHref}>
                                                Авторизация ВК
                                            </a>
                                        )
                                    }
                                </form>
                            </Modal>

                            <button
                                type="button" className="btn btn-lg btn-primary"
                                data-toggle="modal"
                                data-target="#add-channel-modal"
                                data-whatever="not yet."
                                disabled={inProgress}>
                                {inProgress ? <div className="loading-spinner"></div> : "Добавить канал"}
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
