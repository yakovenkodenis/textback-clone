import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import RightSidebarItem from './RightSidebarItem';


@inject('subscribersStore')
@withRouter
@observer
export default class RightSideBar extends Component {
    render() {

        const { isOpen, close } = this.props;

        const { subscribers } = this.props.subscribersStore;
        const chats = subscribers ? subscribers : [];

        const items = [...chats]
          .sort((d1, d2) => d1.message_preview.date < d2.message_preview.date)
          .slice(0, 10)
          .map((chat, index) => {
            const unreadCount = this.props.subscribersStore.unreadCounter[
                `${chat.channel_id}-${chat.subscriber_id}`
            ];

            return (
              <RightSidebarItem key={index} {...chat} unreadCount={unreadCount} />
          )});

        return (
          <div id="right-sidebar" className={`settings-panel ${isOpen ? "open" : ""}`}>
            <i className="settings-close mdi mdi-close" onClick={close}></i>

            <ul className="nav nav-tabs bg-gradient-primary" id="setting-panel">
              <li className="nav-item">
                <a className="nav-link active show" id="chats-tab">Чаты</a>
              </li>  
            </ul>

            <div className="tab-content" id="setting-content">

              <div className="tab-pane fade active show" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Последние</p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">Все</small>
                </div>
                <ul className="chat-list">
                  {items.length > 0 ? items : <p className="text-gray m-4">Диалогов пока нет</p>}
                </ul>
              </div>
            </div>
          </div>
        );
    }
}
