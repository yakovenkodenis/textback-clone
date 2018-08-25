import { observable, action } from 'mobx';

import agent from '../agent';


class MessagesStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable messages = [];

    @action getTelegramMessages(
        ChannelId, SubscriberId,
        offset = 999999, limit = 100, old_message = "False"
    ) {
        console.log('(getTelegramMessages) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Messages.getTelegramMessages(ChannelId, SubscriberId, offset, limit, old_message)
            .then(response => {
                console.log('(getTelegramMessages) RESPONSE:');
                console.log(response);
            })
            .catch(action(err => {
                console.log('ERROR [getTelegramMessages()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action sendTelegramMessage(ChannelId, SubscriberId, Text) {

    }
}

export default new MessagesStore();
