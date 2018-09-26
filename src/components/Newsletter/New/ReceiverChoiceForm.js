import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

import agent from '../../../agent';
import SubscribersListModal from './SubscribersListModal';
import Filters from '../../Audience/Filters';


@inject('channelsStore', 'subscribersStore')
@withRouter
@observer
export default class ReceiverChoiceForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            receivers: "subscribers",
            channels: 'ALL',
            subscribers: [],
            loading: false,
            isSubscriberModalOpen: false,
            allowStateUpdate: true
        }

        this.channelsSelectRef = React.createRef();
    }

    componentDidMount() {
        if (!this.props.edit) {
            this.updateSubscribersList();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.edit && this.state.allowStateUpdate && this.props.receivers.length > 0) {
            console.log('Component did update [receivers]', this.props.receivers);

            let channels = this.state.channels === 'ALL' ? [] : this.state.channels;

            if (this.channelsSelectRef.current && channels !== 'ALL') {
                channels = this.channelsSelectRef.current.props.options
                 .filter(c => this.props.receiversFilter.channels.some(a => c.value === a));

                console.log(this.channelsSelectRef.current.select)

                this.channelsSelectRef.current.select.setValue(channels);
            }

            this.setState({
                ...this.state,
                subscribers: this.props.receivers,
                allowStateUpdate: false,
                ...this.props.receiversFilter,
                channels
            });
        } 
    }

    updateSubscribersList() {
        this.getSubscribersList();
    }

    getSubscribersList = (
        filter = { InTags: null, NotInTags: null, AndTags: null }
    ) => {
        this.setState({
            ...this.state,
            loading: true,
            subscribers: []
        });

        if (this.state.channels !== 'ALL' && this.state.channels.length !== 0) {
            filter['Channels'] = this.state.channels.map(c => c.value || c);
        }

        return agent.Subscribers.getList(Object.values(filter).some(Boolean) ? filter : {})
         .then(response => {
            if (response.success) {
                this.setState({
                    ...this.state,
                    subscribers: this.formatData(response.data),
                    loading: false
                }, () => {
                    this.props.updateReceiver(this.state.subscribers, {
                        receivers: this.state.receivers,
                        channels: this.state.channels === 'ALL' ? [] : this.state.channels
                    });
                });
            }
        });
    }

    formatData = subscribers => {
        return subscribers.map(subscriber => {
            const name = `${subscriber.first_name} ${subscriber.last_name}`;
            const avatar = subscriber.image;
            const id = subscriber.subscriber_id;
            const channelType = subscriber.channel_type;
            const channel_id = subscriber.channel_id;
            const isSelected = true;

            return {
                id, channel_id, name, avatar, channelType, isSelected
            }
        });
    }

    filterSubscribers = (subscriber) => {
        const { subscribers } = this.state;

        for (let i = 0; i < subscribers.length; ++i) {
            if (subscribers[i].id === subscriber.id) {
                subscribers[i].isSelected = !subscribers[i].isSelected;
            }
        }

        this.setState({
            ...this.state,
            subscribers
        });
    }

    toggleSelectAllSubscribers = (e) => {
        const { subscribers } = this.state;

        subscribers.forEach(subscriber => {
            subscriber.isSelected = Boolean(e.target.checked);
        });

        this.setState({
            ...this.state,
            subscribers
        });
    }

    openSubscribersModal = () => {
        this.setState({
            ...this.state,
            isSubscriberModalOpen: true
        });
    }

    closeSubscribersModal = () => {
        this.setState({
            ...this.state,
            isSubscriberModalOpen: false
        });
    }

    handleSelectChannels = channels => {
        const allChannels = channels.some(channel => channel.value === 'ALL');

        this.setState({
            ...this.state,
            channels: allChannels || !channels.length ? 'ALL' : channels.map(channel => channel.value)
        }, () => {
            this.updateSubscribersList();
        });
    }

    handleSelectReceivers = e => {
        this.setState({
            ...this.state,
            receivers: e.target.value
        }, () => {
            this.updateSubscribersList();
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
        <React.Fragment>
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
                        ref={this.channelsSelectRef}
                        defaultValue={[{value: 'ALL', label: 'Все каналы'}]}
                        options={[{value: 'ALL', label: 'Все каналы'}, ...channels]}
                        placeholder="Каналы"
                        onChange={this.handleSelectChannels}
                        noOptionsMessage={() => "Нет каналов"}
                    />
                </div>
                <div className={`form-group ${isMobile ? "" : "mx-5"}`}>
                    <button
                        type="button"
                        className="btn btn-link btn-fw"
                        onClick={this.openSubscribersModal}
                    >
                        {
                            this.state.loading
                            ? 'Загрузка...'
                            : this.state.subscribers
                            ? this.state.subscribers.filter(s => s.isSelected).length + ' получателей'
                            : '-'
                        }
                    </button>
                </div>
            </form>
            <Filters
                getSubscribersList={this.getSubscribersList}
                isMobile={isMobile}
                withoutTitle={true}
            />
            <SubscribersListModal
                isOpen={this.state.isSubscriberModalOpen}
                close={this.closeSubscribersModal}
                subscribers={this.state.subscribers}
                onSelect={this.filterSubscribers}
                isMobile={isMobile}
                toggleSelectAll={this.toggleSelectAllSubscribers}
            />
        </React.Fragment>
        );
    }
}
