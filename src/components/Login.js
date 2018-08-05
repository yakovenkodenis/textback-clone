import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import ListErrors from './ListErrors';


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
            <div>
                <Link to='/'>Go Home</Link>

                <ListErrors errors={errors} />

                <form onSubmit={this.handleSubmitForm}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={values.email}
                        onChange={this.handleEmailChange}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={values.password}
                        onChange={this.handlePasswordChange}
                    />
                    <button
                        type='submit'
                        disabled={inProgress}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        );
    }

}
