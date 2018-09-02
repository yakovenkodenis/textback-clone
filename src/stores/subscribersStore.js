import { observable, action } from 'mobx';

import agent from '../agent';
import messagesStore from './messagesStore';


class SubscribersStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable subscribers = [];

    @action getSubscribersDetailedList() {
        console.log('(subscribersStore.getSubscribersList()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Subscribers.getDetailedList()
            .then(action(response => {
                console.log('RESPONSE [Subscribers.getDetailedList()]');
                console.log(response);

                if (response.success) {
                    this.subscribers = response.data;
                } else {
                    this.subscribers = [];
                    console.log(
                        'RESPONSE ERROR [Subscribers.getDetailedList()]: ',
                        response.errors ? response.errors : ""
                    );
                }

                return this.subscribers;
            }))
            .then(action(subscribers => {
                // get messages for each subscriber
                subscribers.forEach(subscriber => {
                    messagesStore.getMessages(
                        subscriber.channel_id,
                        subscriber.subscriber_id
                    );
                });
            }))
            .catch(action(err => {
                console.log('ERROR [Subscribers.getDetailedList()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }
}

export default new SubscribersStore();
