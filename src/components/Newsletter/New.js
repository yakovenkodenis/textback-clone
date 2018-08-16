import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';


@withRouter
@observer
export default class New extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">

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

                    <div className="card">
                        <div className="card-body">
                            <div className="row border-bottom">
                                <h4 className="card-title text-primary">Выберите получателя</h4>

                                
                            </div>
                            <br/>

                            <div className="row border-bottom">
                                <h4 className="card-title text-primary">Напишите сообщение</h4>
                            </div>
                            <br/>

                            <div className="row border-bottom">
                                <h4 className="card-title text-primary">Отправьте рассылку</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
