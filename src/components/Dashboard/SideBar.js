import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';



@withRouter
@observer
export default class NavBar extends Component {
    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">


            <ul className="nav">

              <li className="nav-item nav-profile">
                <Link to='/' className="nav-link">
                  <div className="nav-profile-image">
                    <img src="images/faces/face1.jpg" alt="profile" />
        <span className="login-status online"></span> {/* change to offline or busy as needed */}              
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">Васян Иваныч</span>
                    <span className="text-secondary text-small">Менеджер</span>
                  </div>
                  <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </Link>
              </li>

    
              <li className="nav-item">
                <Link to='/dialogs' className="nav-link">
                  <span className="menu-title">Диалоги</span>
                  <i className="mdi mdi-home menu-icon"></i>
                </Link>
              </li>

    
              <li className="nav-item">
                <Link to='/newsletter' className="nav-link" datatoggle="collapse" aria-expanded="false" aria-controls="ui-basic">
                  <span className="menu-title">Рассылки</span>
                  <i className="menu-arrow"></i>
                  <i className="mdi mdi-crosshairs-gps menu-icon"></i>
                </Link>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                  </ul>
                </div>
              </li>


              <li className="nav-item">
                <Link to='/' className="nav-link">
                  <span className="menu-title">Автоворонки</span>
                  <i className="mdi mdi-contacts menu-icon"></i>
                </Link>
              </li>

    
              <li className="nav-item">
                <Link to='/' className="nav-link">
                  <span className="menu-title">Цепочки</span>
                  <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                </Link>
              </li>


              <li className="nav-item">
                <Link to='/analytics' className="nav-link">
                  <span className="menu-title">Аналитика</span>
                  <i className="mdi mdi-chart-bar menu-icon"></i>
                </Link>
              </li>


              <li className="nav-item">
                <Link to='/' className="nav-link">
                  <span className="menu-title">Аудитория</span>
                  <i className="mdi mdi-table-large menu-icon"></i>
                </Link>
              </li>


        
              <li className="nav-item">
                <Link to='/settings' className="nav-link" datatoggle="collapse" aria-expanded="false" aria-controls="general-pages">
                  <span className="menu-title">Настройки</span>
                  <i className="menu-arrow"></i>
                  <i className="mdi mdi-medical-bag menu-icon"></i>
                </Link>
                <div className="collapse" id="general-pages">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                    <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                  </ul>
                  </div>
              </li>


    
              <li className="nav-item sidebar-actions">
                <span className="nav-link">
                  <div className="border-bottom">
                    <h6 className="font-weight-normal mb-3">Другое</h6>                
                  </div>
                  <button className="btn btn-block btn-lg btn-gradient-primary mt-4">+ Добавить бота</button>
                  <div className="mt-4">
                    <div className="border-bottom">
                      <p className="text-secondary">Категории</p>                  
                    </div>
                    <ul className="gradient-bullet-list mt-4">
                      <li>Free</li>
                      <li>Pro</li>
                    </ul>
                  </div>
                </span>
              </li>


            </ul>

          </nav>
        );
    }
}
