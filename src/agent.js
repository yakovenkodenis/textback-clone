import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import commonStore from './stores/commonStore';
import authStore from './stores/authStore';


const superagent = superagentPromise(_superagent, global.Promise);

const PROXY = 'https://cors-anywhere.herokuapp.com/'
const API_ROOT = 'http://80.87.194.169:21';

// const encode = encodeURIComponent;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        authStore.logout();
    }

    return err;
}

// const responseBody = res => res.body;
const responseBody = res => JSON.parse(res.text);

const tokenPlugin = req => {
    // req.set("Access-Control-Allow-Origin", "*");
    if (commonStore.token) {
        // req.set('authorization', `Token ${commonStore.token}`);
        req._data = {
            ...req._data,
            "Token": commonStore.token
        };
    }
};

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),

    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),

    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),

    post: (url, body) =>
        superagent
            .post(`${PROXY}${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.post('/', {
            "Controller": "UNKNOWN",
            "Action": "UNKNOWN"
        }),

    login: (email, password) =>
        requests.post('/', {
            "Controller": "Customer",
            "Action": "Login",
            "Email": email,
            "Password": password
        }),

    register: (/*username,*/ email, password) =>
        requests.post('/', {
            "Controller": "Customer",
            "Action": "Register",
            "Email": email,
            "Password": password
        }),

    save: user =>
        requests.put('/', {
            "Controller": "UNKNOWN",
            "Action": "UKNOWN"
        })
};

const Tags = {
    getAll: () => requests.get('/tags')
};

const Profile = {

};


export default {
    Auth,
    Tags,
    Profile
};
