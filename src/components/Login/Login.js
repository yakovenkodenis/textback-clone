import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import LoginForm from './LoginForm';
import logo from '../../logo.svg';


@inject('authStore')
@withRouter
@observer
export default class Login extends Component {

    componentWillUnmount() {
        this.props.authStore.reset();
    }

    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handleSubmitForm = e => {
        e.preventDefault();
        this.props.authStore.login()
            .then(() => this.props.history.replace('/'));
    };

    render() {
        const { values, errors, inProgress } = this.props.authStore;

        return (
            <div className='container-fluid page-body-wrapper full-page-wrapper'>
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row w-100">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left p-5">
                                <div className="brand-logo">
                                    <img src={logo} alt="logo"/>
                                </div>
                                <h4>Привет! Добро пожаловать</h4>
                                <h6 className="font-weight-light">Войти в систему</h6>

                                <LoginForm
                                    values={values}
                                    errors={errors}
                                    inProgress={inProgress}
                                    handleEmailChange={this.handleEmailChange}
                                    handlePasswordChange={this.handlePasswordChange}
                                    handleSubmitForm={this.handleSubmitForm}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
