import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import CollapsibleSidebarItem from './CollapsibleSidebarItem';
import SidebarItem from './SidebarItem';


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
                    <img src="https://placeimg.com/100/100/people" alt="profile" />
        <span className="login-status online"></span> {/* change to offline or busy as needed */}              
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">Васян Иваныч</span>
                    <span className="text-secondary text-small">Менеджер</span>
                  </div>
                  <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </Link>
              </li>

              <CollapsibleSidebarItem
                itemName='Диалоги'
                iconClassName='mdi-message-text'
                routes={[
                  {
                    name: 'Непрочитанные',
                    route: '/dialogs/unread'
                  },
                  {
                    name: 'Telegram',
                    route: '/dialogs/telegram'
                  },
                  {
                    name: 'Viber',
                    route: '/dialogs/viber'
                  },
                  {
                    name: 'Facebook',
                    route: '/dialogs/facebook'
                  }
                ]}
              />

              <SidebarItem
                itemName='Рассылки'
                routePath='/newsletter'
                iconClassName='mdi-newspaper'
              />

              <SidebarItem
                itemName='Автоворонки'
                routePath='/autofunnels'
                iconClassName='mdi-blender'
              />

              <SidebarItem
                itemName='Аналитика'
                routePath='/analytics'
                iconClassName='mdi-google-analytics'
              />


              <CollapsibleSidebarItem
                itemName='Настройки'
                iconClassName='mdi-settings'
                routes={[
                  {
                    name: 'Аккаунт',
                    route: '/settings/account'
                  },
                  {
                    name: 'Каналы',
                    route: '/settings/channels'
                  },
                  {
                    name: 'Общие',
                    route: '/settings/general'
                  },
                  {
                    name: 'Подписка',
                    route: '/settings/subscription'
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
