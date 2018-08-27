import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import CollapsibleSidebarItem from './CollapsibleSidebarItem';
import SidebarItem from './SidebarItem';


@inject('authStore')
@withRouter
@observer
export default class NavBar extends Component {

    render() {

        const { isActive } = this.props;

        return (
            <nav className={`sidebar sidebar-offcanvas ${isActive ? "active" : ""}`} id="sidebar">


            <ul className="nav">

              <li className="nav-item nav-profile">
                <Link to='/admin' className="nav-link">
                  <div className="nav-profile-image">
                    <img src="https://placeimg.com/100/100/people" alt="profile" />
        <span className="login-status online"></span> {/* change to offline or busy as needed */}              
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">{this.props.authStore.values.email}</span>
                    <span className="text-secondary text-small">Менеджер</span>
                  </div>
                  <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </Link>
              </li>

              <CollapsibleSidebarItem
                itemName='Диалоги'
                iconClassName='mdi-forum'
                routes={[
                  {
                    name: 'Все',
                    route: '/admin/dialogs/all'
                  },
                  {
                    name: 'Telegram',
                    route: '/admin/dialogs/telegram'
                  },
                  {
                    name: 'Viber',
                    route: '/admin/dialogs/viber'
                  },
                  {
                    name: 'Facebook',
                    route: '/admin/dialogs/facebook'
                  }
                ]}
              />

              <SidebarItem
                itemName='Рассылки'
                routePath='/admin/newsletter'
                iconClassName='mdi-newspaper'
              />

              <SidebarItem
                itemName='Автоворонки'
                routePath='/admin/autofunnels'
                iconClassName='mdi-blender'
              />

              <SidebarItem
                itemName='Аудитория'
                routePath='/admin/audience'
                iconClassName='mdi-account-multiple'
              />

              <SidebarItem
                itemName='Аналитика'
                routePath='/admin/analytics'
                iconClassName='mdi-google-analytics'
              />


              <CollapsibleSidebarItem
                itemName='Настройки'
                iconClassName='mdi-settings'
                routes={[
                  {
                    name: 'Аккаунт',
                    route: '/admin/settings/account'
                  },
                  {
                    name: 'Каналы',
                    route: '/admin/settings/channels'
                  },
                  {
                    name: 'Общие',
                    route: '/admin/settings/general'
                  },
                  {
                    name: 'Подписка',
                    route: '/admin/settings/subscription'
                  }
                ]}
              />

    
              <li className="nav-item sidebar-actions">
                <span className="nav-link">
                  <div className="border-bottom" />            
                  <button className="btn btn-block btn-lg btn-gradient-primary mt-4">Стать Pro</button>
                  <div className="mt-4">
                    <div>
                      <p className="text-secondary">Статус аккаунта:</p>                  
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
