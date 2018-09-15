import { observable, action, runInAction, toJS } from 'mobx';
import shortid from 'shortid';

import agent from '../agent';
import commonStore from './commonStore';
import subscribersStore from './subscribersStore';


// const salt = shortid.generate();

class MessagesStore {
    @observable inProgress = false;
    @observable errors = undefined;

    /*
        Chat format:
        {
            channel_id,
            chat_id,
            user_id,
            messages: [{
                channel_id, chat_id, date, is_attachment, file?, is_read,
                message_id, owner, text, update_date, user_id
            }, ...]
        }
    */

    @observable chat = {
        channel_id: undefined,
        chat_id: undefined,
        user_id: undefined,
        messages: []
    };

    async fetchMessagesFromAPI(
        ChannelId, SubscriberId,
        offset = 999999, limit = 100, old_message = "False"
    ) {
        const response = await agent.Messages.getMessages(
            ChannelId, SubscriberId,
            offset, limit, old_message
        );

        /*
            Response format:
            {
                success: true,
                data: [
                    channel_id
                    chat_id
                    date
                    is_attachment
                    files?: [
                        downloaded
                        extenstion
                        file_id
                        file_name
                        file_number
                        file_size
                        type
                        url
                    ]
                    is_read
                    message_id
                    owner
                    text
                    update_date
                    user_id,
                    keyboard?: [{
                        text
                        url
                    }, ...]
                ]
            }
        */

        return response.success ? response.data : [];
    }

    @action('Get messages from API')
    getMessages = async (
        ChannelId, SubscriberId,
        offset = 999999, limit = 100, old_message = "False"
    ) => {

        /*
            Algorithm:
                1. Fetch the needed messages
                2. check if the messages are from the already existing chat
                   or are from the new one.
                3. If they're from the already existing chat, find that chat and prepend
                   messages from the API to the end (beginning) of the chat.
                4. If they're from the new chat, add this new chat to the @this.chats field
                   and set messages from the API to the @messages field of the newly created chat.
                5. Update the @this.chats field.
        */

        runInAction(() => {
            this.inProgress = true;
        });

        const newMessages = await this.fetchMessagesFromAPI(
            ChannelId, SubscriberId, offset, limit, old_message
        );
        
        const neededSubscriberIndex = subscribersStore.subscribers.findIndex(subscriber =>
            subscriber.channel_id === ChannelId && subscriber.subscriber_id === SubscriberId
        );

        runInAction(() => {
            this.chat.channel_id = ChannelId;
            this.chat.user_id = SubscriberId;
            this.chat.messages = newMessages.reverse().map(message => ({
                ...message,
                // message_id: message.message_id + salt
            }));

            if (neededSubscriberIndex > -1) {
                subscribersStore.unreadCounter[`${ChannelId}-${SubscriberId}`] =
                    subscribersStore.subscribers[neededSubscriberIndex].unread_count;
            }

            this.inProgress = false;
        });
    }


    async sendMessageToAPI(ChannelId, SubscriberId, Text, Keyboard, Photo) {
        const response = await agent.Messages.sendMessage(
            ChannelId, SubscriberId, Text, Keyboard, Photo
        );

        /*
            Response format:
            {
                success: true,
                data: {
                    date,
                    message_id,
                    text
                }
            }
        */

        return response.success ? response.data : null;
    }

    @action('Send message to API')
    sendMessage = async (
        ChannelId, SubscriberId, Text, Keyboard=[], photosObj={}
    ) => {
        /*
            Algorithm:
                1. Send a message to API
                2. Get the response from the server
                3. Optimistically update the @this.chats field,
                   i.e. find the needed chat in the @this.chats field and prepend
                   the sent message to the @messages field of the needed chat.
                   Check and sync with the server will be done later while long polling.
        */

        const { Photo, previews } = photosObj;

        runInAction(() => {
            this.inProgress = true;

            let messageObj = {
                channel_id: ChannelId,
                date: new Date().getTime() / 1000,
                is_attachment: false,
                is_read: true,
                owner: true,
                update_date: null,
                user_id: SubscriberId,
                text: Text,
                is_only_on_client: true,
                message_id: shortid.generate(),
                keyboard: Keyboard
            };

            if (previews) {
                messageObj = {
                    ...messageObj,
                    is_attachment: true,
                    files: previews.map(preview => ({
                        type: "photo",
                        url: preview
                    }))
                }
            }

            console.log('messagesStore.js [messageObj]: ', messageObj);

            this.chat.messages.push(messageObj);
        });

        const sentMessageData = await this.sendMessageToAPI(
            ChannelId, SubscriberId, Text, Keyboard, Photo
        );

        const onlyOnClientMessageIndex = this.chat.messages.findIndex(message =>
            message.is_only_on_client
            && message.user_id === SubscriberId
            && message.channel_id === ChannelId
        );

        if (onlyOnClientMessageIndex > -1) {
            runInAction(() => {
                if (sentMessageData) {
                    const onlyOnClientMessage = this.chat.messages[onlyOnClientMessageIndex];
                    onlyOnClientMessage.message_id = sentMessageData.message_id;
                    onlyOnClientMessage.text = sentMessageData.text;
                    onlyOnClientMessage.is_only_on_client = false;
                    this.chat.messages[onlyOnClientMessageIndex] = onlyOnClientMessage;

                    console.log(
                        'messagesStore.js [onlyOnClientMessage]: ',
                        toJS(this.chat.messages[onlyOnClientMessageIndex])
                    );

                } else {
                    this.chat.messages.replace(
                        this.chat.messages.filter(message => message.is_only_on_client)
                    );
                }
            });
        }

        runInAction(() => {
            this.inProgress = false;
        });
    }

    async deleteMessageFromAPI(ChannelId, SubscriberId, MessageId) {
        /*
            Response format:
            {
                success: true
                data: {}
            }
        */
       const response = await agent.Messages.deleteMessage(ChannelId, SubscriberId, MessageId);
       return response.success ? response.data : null;
    }

    @action('Delete the message')
    deleteMessage = async (ChannelId, SubscriberId, MessageId) => {
        /*
            Algorithm:
                1. Delete the message from the current chat (from @this.chat.messages).
                2. Update all the message previews (dialogs list and right side bar).
                3. Perform the request for deletion.
                4. TODO: in case of deletion errors from server, put the deleted message back.
        */

        runInAction(() => {
            this.inProgress = true;

            this.chat.messages.replace(
                this.chat.messages.filter(message =>
                    message.message_id !== MessageId
                )
            );
        });

        const neededSubscriberIndex = subscribersStore.subscribers.findIndex(
            subscriber =>
                subscriber.subscriber_id === SubscriberId
                && subscriber.channel_id === ChannelId
        );

        runInAction.bind(this, () => {            
            subscribersStore.subscribers[neededSubscriberIndex].message_preview = {
                date: this.chat.messages[0].date, // or use this.chat.messages.length ???
                owner: this.chat.messages[0].owner,
                text: this.chat.messages[0].text
            }
        });

        const response = await this.deleteMessageFromAPI(ChannelId, SubscriberId, MessageId);
        console.log('DELETION RESPONSE: ', response);

        runInAction(() => {
            this.inProgress = false;
        });
    }


    async fetchUpdates(lastUpdateTime) {
        /*
            Response format:
            {
                success: true,
                data: {
                    last_update_time,
                    updates: [{
                        channel_id
                        chat_id
                        date
                        is_attachment
                        files?: [
                            downloaded
                            extenstion
                            file_id
                            file_name
                            file_number
                            file_size
                            type
                            url
                        ]
                        is_read
                        message_id
                        owner
                        text
                        update_date
                        user_id
                    }, ...]
                }
            }
        */

        const response = await agent.Messages.getUpdates(lastUpdateTime);

        return response.success ? response.data : null;
    }

    @action('Perform long polling to update chats')
    longPollUpdates = async (lastUpdateTime) => {
        /*
            Algorithm:
                1. Fetch the updates using fetchUpdates function with last_update_time
                   from the commonStore (don't fetch if last_update_time is zero).
                2. If update exists, update the @chats field by finding
                   the needed chats for updating and updating their @messages fields.
                3. Set the new last_update_time field in commonStore.
                4. If there're no updates, do nothing.
                5. Anyway, fetch the new updates again recursively using @fetchUpdates
                   with the updated last_update_time field in the commonStore.
        */

        const updateData = await this.fetchUpdates(lastUpdateTime);

        if (updateData && updateData.updates) {
            commonStore.setLastUpdateTime(updateData.last_update_time);

            updateData.updates.forEach(message => {
                if (
                    message.channel_id === this.chat.channel_id
                    && message.user_id === this.chat.user_id) {
                        runInAction(() => {
                            this.chat.messages.push(message);
                        });
                }

                const neededSubscriberIndex = subscribersStore.subscribers.findIndex(
                    subscriber =>
                        subscriber.subscriber_id === message.user_id
                        && subscriber.channel_id === message.channel_id
                );

                if (neededSubscriberIndex > -1) {
                    let neededCounter = subscribersStore.unreadCounter[
                        `${message.channel_id}-${message.user_id}`
                    ] || 0;

                    neededCounter += 1;

                    runInAction(() => {
                        subscribersStore.subscribers[neededSubscriberIndex].unread = true;
                        subscribersStore.subscribers[neededSubscriberIndex].message_preview = {
                            date: message.date,
                            owner: message.owner,
                            text: message.text
                        }

                        subscribersStore.unreadCounter[
                            `${message.channel_id}-${message.user_id}`
                        ] = neededCounter;
                    });
                }
            });
        }

        this.longPollUpdates(commonStore.lastUpdateTime);
    }

    async setReadStatusToAPI(ChannelId, SubscriberId) {
        /*
            Response format:
            {
                success: true
                data: {}
            }
        */

        const response = await agent.Messages.setReadStatus(ChannelId, SubscriberId);
        return response;
    }

    @action('Set the "read" status to the chat')
    setReadStatus = async (ChannelId, SubscriberId) => {
        await this.setReadStatusToAPI(ChannelId, SubscriberId);

        const neededSubscriberIndex = subscribersStore.subscribers.findIndex(
            subscriber =>
                subscriber.subscriber_id === SubscriberId
                && subscriber.channel_id === ChannelId
        );

        if (neededSubscriberIndex > -1) {
            runInAction(() => {
                subscribersStore.subscribers[neededSubscriberIndex].unread = false;
                subscribersStore.unreadCounter[
                    `${ChannelId}-${SubscriberId}`
                ] = 0;
            });
        }
    }
}

export default new MessagesStore();
