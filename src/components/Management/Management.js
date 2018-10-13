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
            shopId: '',
            subscriptionPrice: 0
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
                        <div className="card-body">
                            <h4 className="card-title">Управление</h4>

                            <div className="form-group">
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
                                <input
                                    type="number"
                                    placeholder="Стоимость подписки"
                                    className="form-control form-control-lg"
                                    id="shopId"
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
