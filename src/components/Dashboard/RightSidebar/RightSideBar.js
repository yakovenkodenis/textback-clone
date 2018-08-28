import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import RightSidebarItem from './RightSidebarItem';



@withRouter
@observer
export default class RightSideBar extends Component {
    render() {

        const { isOpen, close } = this.props;

        const items = [1,1,1,1].map((e, index) => (
          <RightSidebarItem key={index} />
        ));

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
                  {items}
                </ul>
              </div>
            </div>
          </div>
        );
    }
}
