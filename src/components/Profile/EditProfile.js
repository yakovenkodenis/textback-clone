import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Avatar from 'react-avatar';


@inject('userStore')
@withRouter
@observer
class EditProfile extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }

    componentDidMount() {
        // map props to state (get username from api call)

        this.setState({
            ...this.state,
            username: 'Имя пользователя'
        })
    }

    handleUsernameChange = e => {
        this.setState({
            ...this.state,
            username: e.target.value
        });
    }

    handlePasswordChange = e => {
        this.setState({
            ...this.state,
            password: e.target.value
        });
    }

    handleEmailChange = e => {
        this.setState({
            ...this.state,
            email: e.target.value
        });
    }

    render() {

        const { isMobile } = this.props;

        return (
            <React.Fragment>

            <div className="page-header">
                <h4 className="page-title">Редактировать профиль</h4>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/admin/profile'>Профиль</Link>
                        </li>
                        <li className="breadcrumb-item active">
                            Редактирование
                        </li>
                    </ol>
                </nav>
            </div>

            <div className={`row ${isMobile ? "mx-auto" : "w-100"}`}>
                <div className={`${isMobile ? "col-12 p-0" : "col-6"} mx-auto`}>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="pb-1 text-center">{this.state.username || "Имя пользователя"}</h3>
                            <br />
                            <div className="border-bottom text-center pb-4">
                                <Avatar
                                    name={this.state.username || "Имя пользователя"}
                                    size="150"
                                    round={true}
                                    className="mb-2"
                                />
                            </div>

                            <form className="pt-3">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Имя пользователя"
                                            className="form-control form-control-lg"
                                            id="inputUsername"
                                            onChange={this.handleUsernameChange}
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

                                <div className="mt-3">
                                    <Link
                                        to="/admin/profile"
                                        className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">
                                        Сохранить
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
};

const ResponsiveEditProfile = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <EditProfile isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveEditProfile;
