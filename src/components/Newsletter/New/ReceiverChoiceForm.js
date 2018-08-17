import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class ReceiverChoiceForm extends Component {
    render() {
        return (
            <form className="d-flex justify-content-left">
                <div className="form-group mr-5">
                    <label htmlFor="selectReceiver">
                        Получатели
                    </label>
                    <select id="selectReceiver" className="form-control">
                        <option value="subscribers">Подписчики</option>
                        <option value="fromChat">Обратились в чат</option>
                        <option value="everyone">Все</option>
                    </select>
                </div>
                <div className="form-group mx-5">
                    <label htmlFor="allSubscriptionPages">
                        Страницы подписки
                    </label>
                    <select id="allSubscriptionPages" className="form-control">
                        <option value="">Все страницы подписки</option>
                        <option value="">Что-то еще</option>
                        <option value="">Что-то еще 2</option>
                    </select>
                </div>
                <div className="form-group mx-5">
                    <label htmlFor="allChannels">
                        Каналы
                    </label>
                    <select id="allChannels" className="form-control">
                        <option value="">Все каналы</option>
                        <option value="">Что-то еще</option>
                        <option value="">Что-то еще 2</option>
                    </select>
                </div>
            </form>
        );
    }
}
