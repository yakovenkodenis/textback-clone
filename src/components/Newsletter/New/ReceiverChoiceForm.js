import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@inject('channelsStore', 'subscribersStore')
@withRouter
@observer
export default class ReceiverChoiceForm extends Component {

    render() {

        const { channels } = this.props.channelsStore;
        const { isMobile } = this.props;

        return (
            <form className={`${isMobile ? "" : "d-flex justify-content-left"}`}>
                <div className={`form-group ${isMobile ? "" : "mr-5"}`}>
                    <label htmlFor="selectReceiver">
                        Получатели
                    </label>
                    <select id="selectReceiver" className="form-control">
                        <option value="subscribers">Подписчики</option>
                        <option value="fromChat">Обратились в чат</option>
                        <option value="everyone">Все</option>
                    </select>
                </div>
                <div className={`form-group ${isMobile ? "" : "mx-5"}`}>
                    <label htmlFor="allSubscriptionPages">
                        Страницы подписки
                    </label>
                    <select id="allSubscriptionPages" className="form-control">
                        <option value="">Все страницы подписки</option>
                        <option value="">Что-то еще</option>
                        <option value="">Что-то еще 2</option>
                    </select>
                </div>
                <div className={`form-group ${isMobile ? "" : "mx-5"}`}>
                    <label htmlFor="allChannels">
                        Каналы
                    </label>
                    <select id="allChannels" className="form-control">
                        <option value="all">Все каналы</option>
                        {
                            channels && channels.constructor === Array
                            ? channels.map(channel => (
                                <option
                                    key={channel.channel_id}
                                    value={JSON.stringify(channel)}
                                >
                                    {channel.first_name}
                                </option>
                            )) : null
                        }
                    </select>
                </div>
            </form>
        );
    }
}
