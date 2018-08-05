import React from 'react';
import { Link } from 'react-router-dom';


const RegisterForm = ({
    values,
    handleEmailChange,
    handlePasswordChange,
    handleUsernameChange,
    handleSubmitForm,
    errors,
    inProgress
}) => (
    <form onSubmit={handleSubmitForm} className="pt-3">
         <div className="form-group">
            <input
                type="text"
                placeholder="Имя пользователя"
                className="form-control form-control-lg"
                id="inputUsername"
            />
        </div>   
        <div className="form-group">
            <input
                type="email"
                placeholder="Email"
                className="form-control form-control-lg"
                id="inputEmail"
            />
        </div>
        <div className="form-group">
            <select id="inputCountry" className="form-control form-control-lg">
                <option>Выбрать страну</option>
                <option>Россия</option>
                <option>Украина</option>
                <option>Казахстан</option>
                <option>Беларусь</option>
                <option>Китай</option>
            </select>
        </div>
        <div className="form-group">
            <input
                type="password"
                placeholder="Пароль"
                className="form-control form-control-lg"
                id="inputPassword"
            />
        </div>
        <div className="mb-4">
            <div className="form-check">
                <label htmlFor="" className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input"/>
                    Я принимаю пользовательское соглашение
                </label>
            </div>
        </div>
        <div className="mt-3">
            <button
                type="submit"
                className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                disabled={inProgress}>
                Зарегистрироваться
            </button>
        </div>
        <div className="text-center mt-4 font-weight-light">
            Уже есть аккаунт? <Link to='/login' className='text-primary'>Войти</Link>
        </div>
    </form>
);

export default RegisterForm;
