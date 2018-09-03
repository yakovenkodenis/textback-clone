import { observable, action } from 'mobx';

import agent from '../agent';
import commonStore from './commonStore';


class MessagesStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable messages = [];

    @action getMessages(
        ChannelId, SubscriberId,
        offset = 999999, limit = 100, old_message = "False"
    ) {
        console.log('--------------- (getMessages) is initiated -------------');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Messages.getMessages(ChannelId, SubscriberId, offset, limit, old_message)
            .then(action(response => {
                // console.log('(getMessages) RESPONSE:');
                // console.log(response);

                if (response.success) {
                    const messages = [...this.messages];

                    const alreadyExistingChat = messages.find(message =>
                        message.channel_id === ChannelId && message.subscriber_id === SubscriberId
                    );

                    // console.log('getMessages(): alreadyExistingChat: ', alreadyExistingChat)

                    if (alreadyExistingChat) {
                        console.log('messagesStore.js getMessages [if]')
                        this.messages = [
                            ...[messages.filter(message =>
                                message.channel_id !== ChannelId && message.subscriber_id !== SubscriberId
                            )],
                            alreadyExistingChat
                        ].reverse();
                    } else {
                        console.log('messagesStore.js getMessages [else]')
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
            return this.getMessages(ChannelId, SubscriberId);

            // console.log(response);

            // const message  = {
            //     channel_id: ChannelId,
            //     user_id: SubscriberId,
            //     is_read: true,
            //     owner: true,
            //     text: Text,
            //     date: Math.round((new Date()).getTime() / 1000)
            // };

            // // console.log('MY PERSONAL SENT MESSAGE: ', message);

            // const messages = [...this.messages];

            // const neededChatIndex = messages.findIndex(chat =>
            //     chat.channel_id === ChannelId && chat.subscriber_id === SubscriberId
            // );

            // messages[neededChatIndex].messages = [
            //     message,
            //     ...messages[neededChatIndex].messages
            // ];

            // this.messages = messages;

        }))
        .catch(action(err => {
            console.log('ERROR [sendMessage()]', err);
        }))
        .finally(action(() => {
            this.inProgress = false;
        }));
    }

    @action setReadStatus(ChannelId, SubscriberId) {
        // console.log('(setReadStatus) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Messages.setReadStatus(
            ChannelId, SubscriberId
        ).then(action(response => {
            // console.log('setReadStatus [SUCCESS]:');
            // console.log(response);

            // set messages container status for channel/subscriber to be read (preview is not bold)
            // maybe make it optimistic ui update?

        }))
        .catch(action(err => {
            console.log('ERROR [setReadStatus()]', err);
        }))
        .finally(action(() => {
            this.inProgress = false;
        }));
    }

    @action getUpdates(lastUpdateTime) {
        console.log('(getUpadates) is initiated');
        this.errors = undefined;

        return agent.Messages.getUpdates(lastUpdateTime)
          .then(action(response => {
            console.log('getUpdates RESPONSE', response);

            if (response.success) {
                commonStore.setLastUpdateTime(response.data.last_update_time);

                const { updates } = response.data;
                const messages = [...this.messages];

                updates.forEach(message => {
                    const { channel_id, user_id } = message;

                    const neededChatIndex = messages.findIndex(chat =>
                        chat.channel_id === channel_id && chat.subscriber_id === user_id
                    );

                    messages[neededChatIndex].messages = [
                        message,
                        ...messages[neededChatIndex].messages
                    ]
                });

                this.messages = messages;
            }
          }))
          .catch(action(err => {
            console.log('ERROR [getUpadates()]', err);
          }))
          .finally(action(() => {
                // this.inProgress = false;
          }));

    }
}

export default new MessagesStore();
