import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import Avatar from 'react-avatar';



@withRouter
@observer
export default class RightSideBar extends Component {
    render() {

        const { isOpen, close } = this.props;

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

                  <li className="list active">
                    <div className="profile">
                      <Avatar name="Thomas Douglas" round={true} size={50}/>
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Thomas Douglas</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">19 min</small>
                  </li>

                  <li className="list">
                    <div className="profile">
                    <Avatar name="Catherine" round={true} size={50}/>
                      <span className="offline"></span></div>
                    <div className="info">
                      <div className="wrapper d-flex">
                        <p>Catherine</p>
                      </div>
                      <p>Away</p>
                    </div>
                    <div className="badge badge-success badge-pill my-auto mx-2">4</div>
                    <small className="text-muted my-auto">23 min</small>
                  </li>

                  <li className="list">
                    <div className="profile">
                      <Avatar name="Daniel Russell" round={true} size={50}/>
                      <span className="online"></span>
                    </div>
                    <div className="info">
                      <p>Daniel Russell</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">14 min</small>
                  </li>

                  <li className="list">
                    <div className="profile">
                      <Avatar name="James Richardson" round={true} size={50}/>
                      <span className="offline"></span>
                    </div>
                    <div className="info">
                      <p>James Richardson</p>
                      <p>Away</p>
                    </div>
                    <small className="text-muted my-auto">2 min</small>
                  </li>

                </ul>

              </div>
            </div>
          </div>
        );
    }
}
