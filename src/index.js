import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/fn/object/assign';
import 'core-js/fn/symbol';
import 'core-js/fn/array/from';
import 'core-js/fn/array/fill';
import 'core-js/fn/string/starts-with';
import 'core-js/fn/string/ends-with';

import React from 'react';
import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import { BrowserRouter } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import registerServiceWorker from './registerServiceWorker';

import jQuery from 'jquery';
// import popper from 'popper.js/dist/umd/popper';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap';

import './mdi.css';
import './vendor.bundle.css'
import './style.css';
import App from './components/App';

// import stores
import userStore from './stores/userStore';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import newsletterMessageTemplateStore from './stores/newsletterMessageTemplateStore';
import subscribersStore from './stores/subscribersStore';
import channelsStore from './stores/channelsStore';
import messagesStore from './stores/messagesStore';
import newsletterStore from './stores/newsletterStore';

window.jQuery = window.jquery = window.$ = jQuery;
require('bootstrap/dist/js/bootstrap.bundle.min.js');
// window.Popper = popper;

const stores = {
    userStore,
    authStore,
    commonStore,
    newsletterMessageTemplateStore,
    subscribersStore,
    channelsStore,
    messagesStore,
    newsletterStore
};


window._____APP_STATE_____ = stores;

promiseFinally.shim();

configure({
    enforceActions: true
});

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React, { exclude: [ /^Route/ ] });
}

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
