import { observable, action, reaction } from 'mobx';
import agent from '../agent';


class CommonStore {
    @observable appName = 'Занге Ранге';
    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @observable tags = [];
    @observable isLoadingTags = false;

    @observable lastUpdateTime = 0;
    @observable pollingInterval = undefined;

    @observable accessTokens = {};

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    @action loadTags() {
        this.isLoadingTags = true;

        return agent.Tags.getAll()
            .then(action(({ tags }) => { this.tags = tags.map(t => t.toLowerCase()); }))
            .finally(action(() => { this.isLoadingTags = false; }));
    }

    @action setToken(token) {
        this.token = token;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }

    @action setLastUpdateTime(unixtime) {
        this.lastUpdateTime = unixtime;
    }

    @action setPollingInterval(interval) {
        if (!interval) clearInterval(interval);
        else this.pollingInterval = interval;
    }

    @action setAccessTokenObject(obj) {
        if (obj.state && obj.access_token && obj.state === 'auth_vk') {
            console.log('VK authorization');
            this.accessTokens[obj.state] = obj.access_token;
        }
    }

    // for vk - "auth_vk"
    // for facebook = "???"
    @action resetAccessToken(socialNetwork) {
        this.accessTokens[socialNetwork] = null;
    }
}

export default new CommonStore();
