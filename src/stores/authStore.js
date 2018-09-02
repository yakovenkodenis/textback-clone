import { observable, action } from 'mobx';

import agent from '../agent';
import userStore from './userStore';
import commonStore from './commonStore';


class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;

    @observable values = {
        username: '',
        email: '',
        password: ''
    };

    @action setUsername(username) {
        this.values.username = username;
    }

    @action setEmail(email) {
        this.values.email = email;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.password = '';
    }

    @action login() {
        console.log('(authStore.login()) Login is initiated');
        this.inProgress = true;
        this.errors = undefined;

        return agent.Auth.login(this.values.email, this.values.password)
            .then(action(response => {

                if (response.success && response.data.token) {
                    console.log('authStore.js: login success');
                    commonStore.setToken(response.data.token);

                } else {
                    console.log('authStore.js: login error');
                    console.log(response);
                    throw response.errors

                }
                // console.log('authStore.js login(): ', response);
                // commonStore.setToken(data.token)
            }))
            // .then(() => userStore.pullUser())
            .catch(action(err => {
                console.log('(authStore.login()) error: ', err);
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action register() {
        this.inProgress = true;
        this.errors = undefined;

        return agent.Auth.register(/*this.values.username,*/ this.values.email, this.values.password)
            // .then(({ data }) => commonStore.setToken(data.token))
            // .then(() => userStore.pullUser())
            .catch(action(err => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    }

    @action logout() {
        commonStore.setToken(undefined);
        userStore.forgetUser();
        return Promise.resolve();
    }
}

export default new AuthStore();
