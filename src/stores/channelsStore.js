import { observable, action, toJS } from 'mobx';

import agent from '../agent';


class ChannelsStore {

    @observable inProgress = false;
    @observable errors = undefined;
    @observable channels = [];

    @action getChannelsList() {
        console.log('(ChannelsStore.getChannelsList()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        Promise.all([
            agent.Channels.Telegram.getTelegramChannels(),
            agent.Channels.VK.getVkChannels()
        ]).then(action(channels => {
            console.log('CHANNELS INSIDE PROMISE.ALL [getChannelsList]:', channels);

            this.channels = [];

            channels.forEach(channel => {
                if (channel.data && channel.data.constructor === Array) {
                    this.channels = [...this.channels, ...channel.data];
                }
            });
        })).catch(action(err => {
            console.log('ERROR [getChannelsList()]', err);
        })).finally(action(() => {
            this.inProgress = false; console.log('FINALLY', toJS(this.channels))
        }));
    }

    @action addTelegramChannel(botToken) {
        console.log('(ChannelsStore.addTelegramChannel()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Channels.Telegram.addTelegramChannel(botToken)
            .then(action(response => {
                console.log('RESPONSE [addTelegramChannel()]');
                console.log(response);

                if (!response.success) {
                    this.errors = response.errors;
                }

                this.getChannelsList();
            }))
            .catch(action(err => {
                console.log('ERROR [addTelegramChannel()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action deleteTelegramChannel(channelId) {
        console.log('(ChannelsStore.deleteTelegramChannel()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Channels.Telegram.deleteTelegramChannel(channelId)
            .then(response => {

                // filter and update the value of this.channels!!!!!
                // and wrap everything inside @action
                console.log('RESPONSE [deleteTelegramChannel()]');
                console.log(response);

                // this.getChannelsList();
            })
            .catch(action(err => {
                console.log('ERROR [deleteTelegramChannel()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

}

export default new ChannelsStore();
