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

window.jQuery = window.jquery = window.$ = jQuery;
require('bootstrap/dist/js/bootstrap.bundle.min.js');
// window.Popper = popper;

const stores = {
    userStore,
    authStore,
    commonStore,
    newsletterMessageTemplateStore
};


window._____APP_STATE_____ = stores;

promiseFinally.shim();

configure({
    enforceActions: true
});

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
