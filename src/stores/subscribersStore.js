import { observable, action, runInAction } from 'mobx';

import agent from '../agent';
import commonStore from './commonStore';


class SubscribersStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable subscribers = [];

    @observable unreadCounter = {};

    async fetchSubscribersDetailedList() {
        /*
            Response format:
            {
                success: true
                data: {
                    last_update_time
                    subscribers: [{
                        subscriber_id
                        username
                        added_time
                        channel_id
                        channel_type
                        first_name
                        last_name
                        image
                        language_code
                        message_preview: {
                            date
                            owner
                            text
                        }
                        status_id
                        unread --> a custom parameter accessible only on client
                    }, ...]
                }
            }
        */

        const response = await agent.Subscribers.getDetailedList();

        return response.success ? response.data : [];
    }

    @action('Get the detailed list of subscribers (with message previews)')
    getSubscribersDetailedList = async () => {
        this.inProgress = true;

        const subscribersData = await this.fetchSubscribersDetailedList();

        commonStore.setLastUpdateTime(subscribersData.last_update_time);

        let { subscribers } = subscribersData;

        runInAction(() => {
            this.subscribers = subscribers;
            this.inProgress = false;
        });
    }
}

export default new SubscribersStore();
