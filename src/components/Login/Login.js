import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import MediaQuery from 'react-responsive';

import LoginForm from './LoginForm';
import logo from '../../logo.svg';
import ListErrors from '../ListErrors';


@inject('authStore', 'commonStore', 'userStore')
@withRouter
@observer
class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: []
        };
    }

    @action
    componentWillUnmount() {
        this.props.authStore.reset();
    }

    @action handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    @action handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    @action handleSubmitForm = e => {
        e.preventDefault();
        console.log('Login.js:', 'handleSubmitForm fired');
        console.log(
            'Login.js',
            this.props.authStore.values.email, this.props.authStore.values.password
        );
        this.props.authStore.login()
            .then(() => {
                this.props.userStore.saveUser({
                    email: this.props.authStore.values.email
                });
                console.log('LOGGED IN!!!');
                this.props.history.replace('/')
            })
            .catch(errors => {
                console.log('Login.js ERROR', errors);
                this.setState({ errors });
                // this.props.history.replace('/login');
            });
    };

    render() {
        const { values, errors, inProgress } = this.props.authStore;
        const { isMobile } = this.props;

        console.log('Login.js errors', errors);


        if (this.props.commonStore.token) {
            return <Redirect to="/" />;
        }

        return (
            <div
                className={`container-fluid page-body-wrapper full-page-wrapper`}
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
                                    <img
                                        src={logo} alt="logo" className="d-block mx-auto"
                                        style={{transform: 'scale(1.6)'}}
                                    />
                                </div>
                                <h3>Вход в систему</h3>
                                <h6 className="font-weight-light">Привет! Добро пожаловать</h6>

                                <ListErrors errors={this.state.errors} />

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

const ResponsiveLogin = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Login isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveLogin;
