import { observable, action } from 'mobx';

import agent from '../agent';


class MessagesStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable messages = [];

    @action getMessages(
        ChannelId, SubscriberId,
        offset = 999999, limit = 100, old_message = "False"
    ) {
        console.log('(getMessages) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Messages.getMessages(ChannelId, SubscriberId, offset, limit, old_message)
            .then(action(response => {
                console.log('(getMessages) RESPONSE:');
                console.log(response);

                if (response.success) {
                    const messages = [...this.messages];

                    const alreadyExistingChat = messages.find(message =>
                        message.channel_id === ChannelId && message.subscriber_id === SubscriberId
                    );

                    console.log('getMessages(): alreadyExistingChat: ', alreadyExistingChat)

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
                console.log('ERROR [getMessages()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action sendMessage(ChannelId, SubscriberId, Text) {
        console.log('(sendMessage) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Messages.sendMessage(
            ChannelId, SubscriberId, Text
        ).then(action(response => {
            console.log('sendMessage [SUCCESS]:');
            console.log(response);
        }))
        .catch(action(err => {
            console.log('ERROR [sendMessage()]', err);
        }))
        .finally(action(() => {
            this.inProgress = false;
            this.getMessages(ChannelId, SubscriberId);
        }));
    }
}

export default new MessagesStore();
