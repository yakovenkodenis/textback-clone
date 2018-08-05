import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import RegisterForm from './RegisterForm';
import logo from '../../logo.svg';


@inject('authStore')
@withRouter
@observer
export default class Register extends Component {

    componentWillUnmount() {
        this.props.authStore.reset();
    }

    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
    handleSubmitForm = e => {
        e.preventDefault();
        this.props.authStore.register()
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
                                <h4>Впервые здесь?</h4>
                                <h6 className="font-weight-light">Скорее регистрируйся и присоединяйся к нам</h6>

                                <RegisterForm
                                    values={values}
                                    errors={errors}
                                    inProgress={inProgress}
                                    handleEmailChange={this.handleEmailChange}
                                    handlePasswordChange={this.handlePasswordChange}
                                    handleUsernameChange={this.handleUsernameChange}
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
