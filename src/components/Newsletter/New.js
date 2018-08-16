import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';


@withRouter
@observer
export default class New extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            startingMessage: {},
            furtherMessages: []
        };
    }

    onAddMessage = e => {
        this.setState({
            furtherMessages: [...this.state.furtherMessages, 1]
        });
    }

    removeFurtherMessage = index => {
        const messages = this.state.furtherMessages;
        messages.splice(index, 1);

        this.setState({
            furtherMessages: messages
        });
    }

    render() {
        return (
            <React.Fragment>

            <div className="page-header">
                <h3 className="page-title">Новая рассылка</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/admin/newsletter'>Рассылки</Link>
                        </li>
                        <li className="breadcrumb-item active">
                            Новая рассылка
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-primary">Выберите получателя</h4>

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

                        </div>
                    </div>
                </div>

                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-primary">Напишите сообщение</h4>
                            <br/>

                            <form className="d-flex justify-content-left">
                                <div className="col-md-4">
                                    <button className="btn btn-outline-success btn-icon-text" type="button">
                                        <i className="mdi mdi-comment-plus-outline btn-icon-prepend" />
                                        Начальное сообщение
                                    </button>
                                    <br/><br/>
                                    {
                                        this.state.furtherMessages.length <= 0
                                          ? null
                                          : (
                                            <React.Fragment>
                                                <br/>
                                                <h4 className="card-title">Незадействованные сообщения</h4>
                                                
                                                {this.state.furtherMessages.map((msg, index) => (
                                                    <React.Fragment key={index}>
                                                    <button
                                                        className="btn btn-block btn-outline-success btn-icon-text"
                                                        type="button"
                                                    >
                                                        {`Новое сообщение #${index+1}`}
                                                        <i
                                                            className="mdi mdi-close float-right"
                                                            onClick={() => { this.removeFurtherMessage(index) }}
                                                        />
                                                    </button>
                                                    </React.Fragment>
                                                ))}
                                            </React.Fragment>
                                        )
                                    }
                                    <br/>
                                    <button 
                                        className="btn btn-light btn-icon-text"
                                        type="button"
                                        onClick={this.onAddMessage}
                                    >
                                        <i className="mdi mdi-plus btn-icon-prepend" />
                                        Добавить сообщение
                                    </button>
                                </div>

                                <div className="col-md-5">
                                    <textarea
                                        id="newMessageBox"
                                        cols="10"
                                        rows="15"
                                        className="form-control"
                                        placeholder="Текст сообщения..."
                                        name="newsletter-new-message-box"
                                    />
                                </div>

                                <div className="col-md-3">
                                    <h4 className="card-title text-success">Проверка перед отправкой</h4>
                                    <p className="card-description">Отправьте сообщение себе</p>
                                    <button className="btn btn-light btn-icon-text" type="button">
                                        <i className="mdi mdi-send btn-icon-prepend" />
                                        Отправить себе
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">

                            <h4 className="card-title text-primary">Отправьте рассылку</h4>
                        
                        </div>
                    </div>
                </div>
            </div>

            </React.Fragment>
        );
    }
}
