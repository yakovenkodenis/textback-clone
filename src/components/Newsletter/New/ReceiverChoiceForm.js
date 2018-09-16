import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';


@inject('channelsStore', 'subscribersStore')
@withRouter
@observer
export default class ReceiverChoiceForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            receivers: "subscribers",
            channels: 'ALL'
        }
    }

    componentDidMount() {
        this.props.updateReceiver({
            ...this.state,
            channels: ['ALL']
        });
    }

    handleSelectChannels = channels => {
        const allChannels = channels.some(channel => channel.value === 'ALL');

        this.setState({
            ...this.state,
            channels: allChannels || !channels.length ? 'ALL' : channels.map(channel => channel.value)
        }, () => {
            this.props.updateReceiver(this.state);
        });
    }

    handleSelectReceivers = e => {
        this.setState({
            ...this.state,
            receivers: e.target.value
        }, () => {
            this.props.updateReceiver(this.state);
        });
    }

    render() {

        let { channels } = this.props.channelsStore;
        const { isMobile } = this.props;

        channels = channels && channels.constructor === Array
         ? channels.map(channel => ({
            value: channel.channel_id.toString(), label: channel.first_name
         }))
         : [];

        return (
            <form className={`${isMobile ? "" : "d-flex justify-content-left"}`}>
                <div className={`form-group ${isMobile ? "" : "mr-5"}`}>
                    <label htmlFor="selectReceiver">
                        Получатели
                    </label>
                    <select
                        id="selectReceiver" className="form-control"
                        onChange={this.handleSelectReceivers} value={this.state.receivers}
                    >
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
                    <Select
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        isMulti
                        defaultValue={[{value: 'ALL', label: 'Все каналы'}]}
                        options={[{value: 'ALL', label: 'Все каналы'}, ...channels]}
                        placeholder="Каналы"
                        onChange={this.handleSelectChannels}
                        noOptionsMessage={() => "Нет каналов"}
                    />
                </div>
            </form>
        );
    }
}
