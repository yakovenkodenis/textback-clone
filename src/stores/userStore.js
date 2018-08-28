import { observable, action, reaction } from 'mobx';
import agent from '../agent';


class UserStore {
    @observable currentUser;
    @observable loadingUser;
    @observable updatingUser;
    @observable updatingUserErrors;

    constructor() {
        reaction(
            () => this.currentUser,
            user => {
                if (user) {
                    window.localStorage.setItem('user', user);
                } else window.localStorage.removeItem('user');
            }
        )
    }

    @action pullUser() {
        this.loadingUser = true;
        return agent.Auth.current()
            // .then(action(({ user }) => { this.currentUser = user; }))
            .finally(action(() => { this.loadingUser = false; }));
    }

    @action updateUser(newUser) {
        this.updatingUser = true;
        return agent.Auth.save(newUser)
            .then(action(({ user }) => { this.currentUser = user; }))
            .finally(action(() => { this.updatingUser = false; }));
    }

    @action forgetUser() {
        this.currentUser = undefined;
    }

    @action saveUser(userData) {
        this.currentUser = {
            ...this.currentUser,
            ...userData
        }
    }
}

export default new UserStore();
