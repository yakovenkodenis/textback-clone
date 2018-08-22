import { observable, action } from 'mobx';

import agent from '../agent';


class SubscribersStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable subscribers = [];

    @action getSubscribersList(channelId) {
        console.log('(subscribersStore.getSubscribersList()) is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Subscribers.getList(channelId)
            .then(response => {
                console.log('RESPONSE [getSubscribersList()]');
                console.log(response);
            })
            .catch(action(err => {
                console.log('ERROR [getSubscribersList()]');
            }))
            .finally(action(() => { this.inProgress = false; }));
    }
}

export default new SubscribersStore();

