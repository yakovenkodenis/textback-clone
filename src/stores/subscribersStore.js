import { observable, action } from 'mobx';

import agent from '../agent';
import messagesStore from './messagesStore';
import commonStore from './commonStore';


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
                console.log('---- getDetailedList --- step 1 [get subscribers]');
                // console.log('RESPONSE [Subscribers.getDetailedList()]');
                // console.log(response);

                if (response.success) {
                    this.subscribers = response.data.subscribers.reverse();

                    commonStore.setLastUpdateTime(response.data.last_update_time);

                } else {
                    this.subscribers = [];
                    console.log('---------------------------')
                    console.log(
                        'RESPONSE ERROR [Subscribers.getDetailedList()]: ',
                        response.errors ? response.errors : ""
                    );
                    console.log('RESPONSE itself: ', response);
                    console.log('---------------------------');
                }

                return this.subscribers;
            }))
            .then(action(subscribers => {

                console.log('---- getDetailedList --- step 2 [get messages]');

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
