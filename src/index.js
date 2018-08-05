import React from 'react';
import ReactDOM from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import { HashRouter } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import registerServiceWorker from './registerServiceWorker';

import './style.css';
import App from './components/App';

// import stores
import userStore from './stores/userStore';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';



const stores = {
    userStore,
    authStore,
    commonStore
};


window._____APP_STATE_____ = stores;

promiseFinally.shim();

configure({
    enforceActions: true
});

ReactDOM.render(
    <Provider {...stores}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
