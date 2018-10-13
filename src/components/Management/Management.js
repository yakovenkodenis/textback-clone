import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Redirect } from 'react-router-dom';


@inject('userStore')
@withRouter
@observer
export default class Management extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            shopId: 'xasdgadgae43q34yjssgrt',
            subscriptionPrice: 30
        }
    }

    onDataChange = (e, name) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        });
    }

    render() {

        if (!this.props.userStore.isAdmin) {
            return <Redirect to='/admin/dialogs' />
        }

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body col-6">
                            <h4 className="card-title">Управление</h4>

                            <div className="display-5 my-3">Настройка Яндекс.Кассы</div>
                            <div className="form-group mt-2">
                                <label htmlFor="shopId">Идентификатор магазина</label>
                                <input
                                    type="text"
                                    placeholder="Идентификатор магазина"
                                    className="form-control form-control-lg"
                                    id="shopId"
                                    value={this.state.shopId}
                                    onChange={e => { this.onDataChange(e, 'shopId'); }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subscriptionPrice">Стоимость подписки</label>
                                <input
                                    type="number"
                                    placeholder="Стоимость подписки"
                                    className="form-control form-control-lg"
                                    id="subscriptionPrice"
                                    value={this.state.subscriptionPrice}
                                    onChange={e => { this.onDataChange(e, 'subscriptionPrice'); }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
