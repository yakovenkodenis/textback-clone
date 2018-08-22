import { observable, action } from 'mobx';

import agent from '../agent';


class ChannelsStore {

    @observable inProgress = false;
    @observable errors = undefined;
    @observable channels = [];

    @action getChannelsList() {
        console.log('(ChannelsStore.getChannelsList()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Channels.getTelegramChannels()
            .then(action(response => {
                console.log('RESPONSE [getChannelsList()]');
                console.log(response);

                if (response.success) {
                    if (response.data.constructor !== Array)
                        this.channels = [];

                    this.channels = response.data;
                } else {
                    this.channels = [];
                }
            }))
            .catch(action(err => {
                console.log('ERROR [getChannelsList()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action addTelegramChannel(botToken) {
        console.log('(ChannelsStore.addTelegramChannel()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Channels.addTelegramChannel(botToken)
            .then(response => {
                console.log('RESPONSE [addTelegramChannel()]');
                console.log(response);
            })
            .catch(action(err => {
                console.log('ERROR [addTelegramChannel()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action deleteTelegramChannel(channelId) {
        console.log('(ChannelsStore.deleteTelegramChannel()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Channels.deleteTelegramChannel(channelId)
            .then(response => {

                // filter and update the value of this.channels!!!!!
                // and wrap everything inside @action
                console.log('RESPONSE [deleteTelegramChannel()]');
                console.log(response);
            })
            .catch(action(err => {
                console.log('ERROR [deleteTelegramChannel()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

}

export default new ChannelsStore();
