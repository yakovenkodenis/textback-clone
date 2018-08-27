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
            .then(action(response => {
                console.log('(getTelegramMessages) RESPONSE:');
                console.log(response);

                if (response.success) {
                    const messages = [...this.messages];

                    const alreadyExistingChat = messages.find(message =>
                        message.channel_id === ChannelId && message.subscriber_id === SubscriberId
                    );

                    console.log('getTelegramMessages(): alreadyExistingChat: ', alreadyExistingChat)

                    if (alreadyExistingChat) {
                        this.messages = [
                            ...[messages.filter(message =>
                                message.channel_id !== ChannelId && message.subscriber_id !== SubscriberId
                            )],
                            alreadyExistingChat
                        ].reverse();
                    } else {
                        this.messages = [...messages, {
                            channel_id: ChannelId,
                            subscriber_id: SubscriberId,
                            messages: response.data
                        }].reverse();
                    }
                } else {
                    // this.messages = [];
                }
            }))
            .catch(action(err => {
                console.log('ERROR [getTelegramMessages()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action sendTelegramMessage(ChannelId, SubscriberId, Text) {
        console.log('(sendTelegramMessage) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Messages.sendTelegramMessage(
            ChannelId, SubscriberId, Text
        ).then(action(response => {
            console.log('sendTelegramMessage [SUCCESS]:');
            console.log(response);
        }))
        .catch(action(err => {
            console.log('ERROR [sendTelegramMessage()]', err);
        }))
        .finally(action(() => {
            this.inProgress = false;
            this.getTelegramMessages(ChannelId, SubscriberId);
        }));
    }
}

export default new MessagesStore();
