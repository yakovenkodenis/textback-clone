import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class NewsletterStatistics extends Component {
    render() {
        return (
        <React.Fragment>

            <div className="page-header">
                <h3 className="page-title">Профиль</h3>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">

                                <div className="col-lg-4">
                                    <div className="border-bottom text-center pb-4">
                                        <img
                                            src="https://placeimg.com/100/100/people"
                                            alt="profile"
                                            className="img-lg rounded-circle mb-3"
                                        />
                                        <p>Это мой супер профиль. Всем привет!</p>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-gradient-success">Чундра</button>
                                            <button className="btn btn-gradient-success">Чучундра</button>
                                        </div>
                                    </div>
                                    <div className="border-bottom py-4">
                                        <p>Мои теги</p>
                                        <div>
                                            <label className="badge badge-outline-dark badge-margin-3">Chalk</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Lettering</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Web Design</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Graphic Design</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Data Analysis</label>
                                        </div>
                                    </div>
                                    <div className="py-4">
                                        <p className="clearfix">
                                            <span className="float-left">Статус</span>
                                            <span className="float-right text-muted">Активный</span>
                                        </p>
                                        <p className="clearfix">
                                            <span className="float-left">Телефон</span>
                                            <span className="float-right text-muted">066 235 19 14</span>
                                        </p>
                                        <p className="clearfix">
                                            <span className="float-left">Facebook</span>
                                            <span className="float-right text-muted">
                                                <a>fb.com/yakovenkodenis</a>
                                            </span>
                                        </p>
                                        <p className="clearfix">
                                            <span className="float-left">Telegram</span>
                                            <span className="float-right text-muted">
                                                <a>tg.org/yakovenkodenis</a>
                                            </span>
                                        </p>
                                    </div>
                                    <button className="btn btn-gradient-primary btn-block">Кнопочка</button>
                                </div>

                                <div className="col-lg-8">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h3>Василий Иванович</h3>
                                            <div className="d-flex align-items-center">
                                                <h5>Россия</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btn btn-outline-secondary btn-icon badge-margin-3"><i className="mdi mdi-comment-processing" />
                                            </button>
                                            <button className="btn btn-gradient-primary badge-margin-3">Набрать</button>
                                        </div>
                                    </div>

                                    <div className="mt-4 py-4 border-top border-bottom d-flex justify-content-center">
                                        <ul className="nav profile-navbar">
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <i className="mdi mdi-account outline"></i>
                                                    Инфо
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <i className="mdi mdi-account outline"></i>
                                                    Новости
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <i className="mdi mdi-account outline"></i>
                                                    Задачи
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
        );
    }
}
