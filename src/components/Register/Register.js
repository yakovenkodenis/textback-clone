import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import MediaQuery from 'react-responsive';

import RegisterForm from './RegisterForm';
import ListErrors from '../ListErrors';
import logo from '../../logo.svg';


@inject('authStore', 'commonStore')
@withRouter
@observer
class Register extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: []
        };
    }

    componentWillUnmount() {
        this.props.authStore.reset();
    }

    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
    handleSubmitForm = e => {
        e.preventDefault();

        console.log('Register.js:', 'handleSubmitForm fired');
        console.log(
            'Register.js',
            this.props.authStore.values.email, this.props.authStore.values.password
        );

        this.props.authStore.register()
            .then(() => {
                console.log('REGISTER SUCCESS!!!');
                this.props.history.replace('/');
            })
            .catch(errors => {
                console.log('Register.js ERROR', errors);
                this.setState({ errors });
                // this.props.history.replace('/login');
            });
    };

    render() {
        const { values, errors, inProgress } = this.props.authStore;
        const { isMobile } = this.props;


        if (this.props.commonStore.token) {
            return <Redirect to="/" />;
        }

        return (
            <div
                className='container-fluid page-body-wrapper full-page-wrapper'
                style={{
                    minHeight: isMobile ? '0' : '100vh'
                }}
            >
                <div
                    className={`content-wrapper d-flex align-items-center auth ${isMobile ? "p-0" : ""}`}
                >
                    <div className={`row ${isMobile ? "mx-auto" : "w-100"}`}>
                        <div className={`col-lg-4 mx-auto ${isMobile ? "p-0" : ""}`}>
                            <div className="auth-form-light text-left p-5">
                                <div className="brand-logo">
                                    <img src={logo} alt="logo"/>
                                </div>
                                <h4>Впервые здесь?</h4>
                                <h6 className="font-weight-light">Скорее регистрируйся и присоединяйся к нам</h6>

                                <ListErrors errors={this.state.errors} />

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

const ResponsiveRegister = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Register isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveRegister;
