import { observable, action, toJS } from 'mobx';

import agent from '../agent';
import { capitalize } from '../utils';


class ChannelsStore {

    @observable inProgress = false;
    @observable errors = undefined;
    @observable channels = [];

    @action getChannelsList() {
        console.log('(ChannelsStore.getChannelsList()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        Promise.all([
            agent.Channels.Telegram.getChannels(),
            agent.Channels.Vk.getChannels()
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

    @action addChannel(channelType, botToken) {
        console.log(`(ChannelsStore.add${capitalize(channelType)}Channel()) is initiated`);
        this.inProgress = true;
        this.errors = undefined;

        return agent.Channels[capitalize(channelType)].addChannel(botToken)
            .then(action(response => {
                console.log(`RESPONSE [add${capitalize(channelType)}Channel()]`);
                console.log(response);

                if (!response.success) {
                    this.errors = response.errors;
                }

                this.getChannelsList();
            }))
            .catch(action(err => {
                console.log(`ERROR [add${capitalize(channelType)}Channel()]`, err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }


    @action deleteChannel(channelType, channelId) {
        console.log(`(ChannelsStore.delete${capitalize(channelType)}Channel is initiated`);
        this.inProgress = true;
        this.errors = undefined;

        return agent.Channels[capitalize(channelType)].deleteChannel(channelId)
            .then(response => {

                console.log(`RESPONSE [delete${capitalize(channelType)}Channel()]`);
                console.log(response);

                // this.getChannelsList();
            })
            .catch(action(err => {
                console.log(`ERROR [delete${capitalize(channelType)}Channel()]`, err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

}

export default new ChannelsStore();
