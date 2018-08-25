import { observable, action } from 'mobx';

import agent from '../agent';


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
            }))
            .catch(action(err => {
                console.log('ERROR [getSubscribersList()]', err);
            }))
            .finally(action(() => { this.inProgress = false; }));
    }
}

export default new SubscribersStore();
