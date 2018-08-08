import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import Modal from './Modal';
import ChannelItem from './ChannelItem';


const channels = [
    {
        channelName: 'Telegram',
        isConnected: false,
        modalId: 'add-telegram-modal',
        modalTitle: 'Подключить Telegram',
        modalBody: 'Тут будет соответствующая форма'
    },
    {
        channelName: 'Viber',
        isConnected: false,
        modalId: 'add-viber-modal',
        modalTitle: 'Подключить Viber',
        modalBody: 'Тут будет соответствующая форма'
    },
    {
        channelName: 'Facebook',
        isConnected: true,
        modalId: 'add-facebook-modal',
        modalTitle: 'Подключить Facebook',
        modalBody: 'Тут будет соответствующая форма'
    },
    {
        channelName: 'WhatsApp',
        isConnected: true,
        modalId: 'add-whatsapp-modal',
        modalTitle: 'Подключить WhatsApp',
        modalBody: 'Тут будет соответствующая форма'
    },
];


@withRouter
@observer
export default class ChannelsSettings extends Component {
    render() {

        const modals = channels.map((channel, index) => (
            <Modal {...channel} key={index} />
        ));

        const channelItems = channels.map((channel, index) => (
            <ChannelItem {...channel} key={index} />
        ));

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Настройки каналов</h4>

                            <div className="row pt-4">
                                <div className="col-6">
                                
                                    {modals}

                                    <div className="list-group list-group-flush">
                                        {channelItems}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
