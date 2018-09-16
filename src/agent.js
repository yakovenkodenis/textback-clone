import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

import commonStore from './stores/commonStore';
import authStore from './stores/authStore';


const superagent = superagentPromise(_superagent, global.Promise);

// https://cors-anywhere.herokuapp.com/
const PROXY = '';
const API_ROOT = 'http://35.190.220.217:8900';
// const encode = encodeURIComponent;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        authStore.logout();
    }

    return err;
}

// const responseBody = res => res.body;
const responseBody = res => {
    // console.log('RESPONSE_BODY (agent.js)');
    // console.log('RES:', res);
    return res.text ? JSON.parse(res.text) : {};
}

const tokenPlugin = req => {
    req.set("Content-Type", "application/json");
    // req.set("Accept", "application/json");
    if (commonStore.token) {
        req._data = {
            ...req._data,
            "Token": commonStore.token
        };

        console.log('agent.js request: ', req._data);
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

    uploadFile: (url, file, onProgress) =>
        superagent
            .post(`${PROXY}${API_ROOT}${url}`)
            .send(file)
            .on('progress', e => {
                onProgress(e);
            })
            .end(handleErrors)
            .then(responseBody)
};

const Auth = {
    current: () =>
        requests.post('/', {
            "Controller": "UNKNOWN",
            "Action": "UNKNOWN"
        }),

    login: (Email, Password) =>
        requests.post('/', {
            "Controller": "Customer",
            "Action": "Login",
            Email, Password
        }),

    register: (/*username,*/ Email, Password) =>
        requests.post('/', {
            "Controller": "Customer",
            "Action": "Register",
            Email, Password
        }),

    save: user =>
        requests.put('/', {
            "Controller": "UNKNOWN",
            "Action": "UKNOWN"
        })
};

const Subscribers = {
    getStatusList: () =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "GetStatusList"
        }),

    editStatus: (StatusId, Description) =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "EditStatus",
            StatusId,
            Description
        }),

    deleteStatus: StatusId =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "DeleteStatus",
            StatusId
        }),

    addStatus: Description =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "AddStatus",
            Description
        }),

    changeStatus: (StatusId, SubscriberId, ChannelId) =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "ChangeStatus",
            StatusId, SubscriberId, ChannelId
        }),

    getList: (filter = { InTags: null, NotInTags: null, AndTags: null }) =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "GetList",
            ...filter
        }),

    getDetailedList: () =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "GetDetailedList"
        }),

    getInfo: (ChannelId, SubscriberId) =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "GetInfo",
            ChannelId, SubscriberId
        })
};

const Tags = {
    getTagsList: () =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "GetTagList"
        }),

    addTag: (SubscriberId, ChannelId, Tag) =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "AddTag",
            SubscriberId, ChannelId, Tag
        }),

    deleteTag: (SubscriberId, ChannelId, TagId) =>
        requests.post('/', {
            "Controller": "Subscriber",
            "Action": "DeleteTag",
            SubscriberId, ChannelId, TagId
        })
};

const Channels = {

    Telegram: {
        getChannels: () =>
            requests.post('/', {
                "Controller": "Channel",
                "Action": "GetTelegramChannels",
            }),

        // returns telegram token
        addChannel: BotToken =>
            requests.post('/', {
                "Controller": "Channel",
                "Action": "AddTelegramChannel",
                BotToken
            }),

        deleteChannel: ChannelId =>
            requests.post('/', {
                "Controller": "Channel",
                "Action": "DeleteTelegramChannel",
                ChannelId
            }),
    },

    Vk: {
        getChannels: () =>
            requests.post('/', {
                "Controller": "Channel",
                "Action": "GetVkChannels",
            }),

        addChannel: BotToken =>
            requests.post('/', {
                "Controller": "Channel",
                "Action": "AddVkChannel",
                BotToken
            }),

        deleteChannel: ChannelId =>
            requests.post('/', {
                "Controller": "Channel",
                "Action": "DeleteVkChannel",
                ChannelId
            }),
    }
};

const Messages = {
    getMessages: (
        ChannelId, SubscriberId,
        offset = 999999, limit = 100, old_message = "False"
    ) =>
        requests.post('/', {
            "Controller": "Message",
            "Action": "GetMessages",
            ChannelId, SubscriberId,
            offset, limit, old_message
        }),

    sendMessage: (ChannelId, SubscriberId, Text, Keyboard=[], Photo=[]) =>
        requests.post('/', {
            "Controller": "Message",
            "Action": "SendMessage",
            ChannelId, SubscriberId, Text, Keyboard, Photo
        }),

    editMessage: () => undefined,

    deleteMessage: (ChannelId, SubscriberId, MessageId) =>
        requests.post('/', {
            "Controller": "Message",
            "Action": "DeleteMessage",
            ChannelId, SubscriberId, MessageId
        }),

    getUpdates: unixTimestamp =>
        requests.post('/', {
            "Controller": "Message",
            "Action": "LpGetUpdates",
            "LastUpdateTime": unixTimestamp
        }),

    setReadStatus: (ChannelId, SubscriberId) =>
        requests.post('/', {
            "Controller": "Message",
            "Action": "SetReadStatus",
            ChannelId, SubscriberId
        })
}

const Files = {
    upload: (file, callback) =>
        requests.uploadFile(
            `/upload?token=${commonStore.token}`,
            file,
            callback
        )
}

const Profile = {

};


export default {
    Auth,
    Tags,
    Profile,
    Subscribers,
    Channels,
    Messages,
    Files
};
