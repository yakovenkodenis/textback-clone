import React from 'react';
import { Link } from 'react-router-dom';


const LoginForm = ({
    values,
    handleEmailChange,
    handlePasswordChange,
    handleSubmitForm,
    errors,
    inProgress
}) => (
    <form onSubmit={handleSubmitForm} className="pt-3">
        <div className="form-group">
            <input
                type="email"
                placeholder="Email"
                className="form-control form-control-lg"
                id="inputEmail"
            />
        </div>
        <div className="form-group">
            <input
                type="password"
                placeholder="Пароль"
                className="form-control form-control-lg"
                id="inputPassword"
            />
        </div>
        <div className="mt-3">
            <button
                type="submit"
                className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                disabled={inProgress}>
                Войти
            </button>
        </div>
        <div className="my-2 d-flex justify-content-between align-items center">
            <Link to='/forgot-password' className='auth-link text-black float-right'>
                Забыли пароль?
            </Link>
        </div>
        <br />
        <div className="mb-2">
            <button className="btn btn-block btn-facebook auth-form-btn">
                <i className="mdi mdi-facebook mr-2"></i>Войти через facebook
            </button>
        </div>
        <div className="text-center mt-4 font-weight-light">
            Еще нет аккаунта? <Link to='/register' className='text-primary'>Создать</Link>
        </div>
    </form>
);

export default LoginForm;
