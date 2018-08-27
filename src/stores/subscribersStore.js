import { observable, action } from 'mobx';

import agent from '../agent';
import messagesStore from './messagesStore';


class SubscribersStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable subscribers = [];

    @action getSubscribersList() {
        console.log('(subscribersStore.getSubscribersList()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Subscribers.getList()
            .then(action(response => {
                console.log('RESPONSE [getSubscribersList()]');
                console.log(response);

                if (response.success) {
                    this.subscribers = response.data;
                } else {
                    this.subscribers = [];
                    console.log(
                        'RESPONSE ERROR [getSubscribersList()]: ',
                        response.errors ? response.errors : ""
                    );
                }

                return this.subscribers;
            }))
            .then(action(subscribers => {
                // get messages for each subscriber
                subscribers.forEach(subscriber => {
                    messagesStore.getTelegramMessages(
                        subscriber.channel_id,
                        subscriber.subscriber_id
                    );
                });
            }))
            .catch(action(err => {
                console.log('ERROR [getSubscribersList()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }
}

export default new SubscribersStore();
