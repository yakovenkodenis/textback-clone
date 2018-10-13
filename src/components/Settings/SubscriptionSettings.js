import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@withRouter
@observer
export default class SubscriptionSettings extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container text-center">
                                <h4 className="mb-3 mt-3">Настройки подписки</h4>
                                {/*<p className="w-75 mx-auto mb-5">Выберите новый тип подписки или продлите текущий.</p>*/}
                                <div className="row pricing-table">
                                
                                    <div className="col-md-6 grid-margin stretch-card pricing-card mx-auto mt-4">
                                        <div className="card border-success border pricing-card-body">
                                            <div className="text-center pricing-card-head">
                                                <h3>Подписка активна</h3>
                                                <p>оплаченный период до 25.11.2019</p>
                                                <h1 className="font-weight-normal mb-4">$30/мес.</h1>
                                            </div>
                                            <ul className="list-ticked plan-features ml-4">
                                                <li>До 5-х каналов</li>
                                                <li>Безлимит на сообщения</li>
                                                <li>Автоворонки</li>
                                                <li>Email-поддержка</li>
                                                <li>Аналитика</li>
                                                <li>Телефонная поддержка 24/7</li>
                                            </ul>
                                            <div className="wrapper">
                                                <a className="btn btn-outline-success btn-block">Продлить</a>
                                            </div>
                                            <p className="mt-3 mb-0 plan-cost text-success">$30</p>
                                        </div>
                                    </div>

                                    {/*
                                    <div className="col-md-4 grid-margin stretch-card pricing-card">
                                        <div className="card border-primary border pricing-card-body">
                                            <div className="text-center pricing-card-head">
                                                <h3>Pro</h3>
                                                <p>Профессиональная подписка</p>
                                                <h1 className="font-weight-normal mb-4">$25/мес.</h1>
                                            </div>
                                            <ul className="list-unstyled plan-features">
                                                <li>До 5-х каналов</li>
                                                <li>До 10000 сообщений в день</li>
                                                <li>Автоворонки</li>
                                                <li>Email-поддержка</li>
                                                <li>Аналитика</li>
                                            </ul>
                                            <div className="wrapper">
                                                <a className="btn btn-outline-primary btn-block">Попробовать</a>
                                            </div>
                                            <p className="mt-3 mb-0 plan-cost text-gray">или оплатить сразу</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4 grid-margin stretch-card pricing-card">
                                        <div className="card border-primary border pricing-card-body">
                                            <div className="text-center pricing-card-head">
                                                <h3>Enterprise</h3>
                                                <p>Корпоративная подписка</p>
                                                <h1 className="font-weight-normal mb-4">$99/мес.</h1>
                                            </div>
                                            <ul className="list-unstyled plan-features">
                                                <li>До 5-х каналов</li>
                                                <li>Безлимит на сообщения</li>
                                                <li>Автоворонки</li>
                                                <li>Email-поддержка</li>
                                                <li>Аналитика</li>
                                                <li>Телефонная поддержка 24/7</li>
                                            </ul>
                                            <div className="wrapper">
                                                <a className="btn btn-outline-primary btn-block">Попробовать</a>
                                            </div>
                                            <p className="mt-3 mb-0 plan-cost text-gray">или оплатить сразу</p>
                                        </div>
                                    </div>
                                    */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
