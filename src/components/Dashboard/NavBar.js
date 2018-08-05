import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import logo from '../../logo.svg';


@withRouter
@observer
export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo" href="/"><img src={logo} alt="logo"/></a>
              <a className="navbar-brand brand-logo-mini" href="/"><img src={logo} alt="logo"/></a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch">


            {/* ============ SEARCH FIELD ===================== */}
              <div className="search-field d-none d-md-block">
                <form className="d-flex align-items-center h-100" action="#">
                  <div className="input-group">
                    <div className="input-group-prepend bg-transparent">
                        <i className="input-group-text border-0 mdi mdi-magnify"></i>                
                    </div>
                    <input type="text" className="form-control bg-transparent border-0" placeholder="Поиск" />
                  </div>
                </form>
              </div>


            {/* ============ HEADER NAVBAR LEFT ITEMS LIST ===================== */}
              <ul className="navbar-nav navbar-nav-right">


                {/* ============ Profile info ===================== */}
                <li className="nav-item nav-profile dropdown">
                  <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" datatoggle="dropdown" aria-expanded="false">
                    <div className="nav-profile-img">
                      <img src="images/faces/face1.jpg" alt="image" />
                      <span className="availability-status online"></span>             
                    </div>
                    <div className="nav-profile-text">
                      <p className="mb-1 text-black">David Greymaax</p>
                    </div>
                  </a>
                  <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                    <a className="dropdown-item" href="#">
                      <i className="mdi mdi-cached mr-2 text-success"></i>
                      Activity Log
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i className="mdi mdi-logout mr-2 text-primary"></i>
                      Выйти
                    </a>
                  </div>
                </li>


                {/* ============ Fullscreen button ===================== */}
                <li className="nav-item d-none d-lg-block full-screen-link">
                  <a className="nav-link">
                    <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
                  </a>
                </li>



                {/* ============ Messeges dropdown ===================== */}
                <li className="nav-item dropdown">
                  <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" datatoggle="dropdown" aria-expanded="false">
                    <i className="mdi mdi-email-outline"></i>
                    <span className="count-symbol bg-warning"></span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                    <h6 className="p-3 mb-0">Сообщения</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                          <img src="images/faces/face4.jpg" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Марк отправил вам сообщение</h6>
                        <p className="text-gray mb-0">
                          1 минуту назад
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                          <img src="images/faces/face2.jpg" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Колян отправил вам сообщение</h6>
                        <p className="text-gray mb-0">
                          15 минут назад
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                          <img src="images/faces/face3.jpg" className="profile-pic" />
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Загружено новое фото профиля</h6>
                        <p className="text-gray mb-0">
                          18 минут назад
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="p-3 mb-0 text-center">4 новых сообщения</h6>
                  </div>
                </li>



                {/* ============ Notifications dropdown ===================== */}
                <li className="nav-item dropdown">
                  <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" datatoggle="dropdown">
                    <i className="mdi mdi-bell-outline"></i>
                    <span className="count-symbol bg-danger"></span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <h6 className="p-3 mb-0">Уведомления</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-calendar"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Событие сегодня</h6>
                        <p className="text-gray ellipsis mb-0">
                          Просто напоминание о сегодняшнем событии
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-warning">
                          <i className="mdi mdi-settings"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Настройки</h6>
                        <p className="text-gray ellipsis mb-0">
                          Обновить админку
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-info">
                          <i className="mdi mdi-link-variant"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                        <h6 className="preview-subject font-weight-normal mb-1">Открыть панель</h6>
                        <p className="text-gray ellipsis mb-0">
                          Йоу йоу йоу!
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="p-3 mb-0 text-center">Все уведомления</h6>
                  </div>
                </li>



                {/* ============ Logout button ===================== */}
                <li className="nav-item nav-logout d-none d-lg-block">
                  <a className="nav-link" href="#">
                    <i className="mdi mdi-power"></i>
                  </a>
                </li>




                {/* ============ Useless GoUp button ===================== */}
                <li className="nav-item nav-settings d-none d-lg-block">
                  <a className="nav-link" href="#">
                    <i className="mdi mdi-format-line-spacing"></i>
                  </a>
                </li>


              </ul>



                {/* ============ Undefined shit ===================== */}
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span className="mdi mdi-menu"></span>
              </button>
            </div>
          </nav>
        );
    }
}