import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';



@withRouter
@observer
export default class RightSideBar extends Component {
    render() {
        return (
            <div id="right-sidebar" className="settings-panel">
            <i className="settings-close mdi mdi-close"></i>
            <ul className="nav nav-tabs bg-gradient-primary" id="setting-panel" role="tablist">
              <li className="nav-item">
                <a className="nav-link" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true" aria-selected="false">TO DO LIST</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active show" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section" aria-selected="true">CHATS</a>
              </li>
            </ul>
            <div className="tab-content" id="setting-content">
              <div className="tab-pane fade scroll-wrapper ps" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
                <div className="add-items d-flex px-3 mb-0">
                  <form className="form w-100">
                    <div className="form-group d-flex">
                      <input type="text" className="form-control todo-list-input" placeholder="Add To-do" />
                      <button type="submit" className="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
                    </div>
                  </form>
                </div>
                <div className="list-wrapper px-3">
                  <ul className="d-flex flex-column-reverse todo-list">
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Team review meeting at 3.00 PM
                        <i className="input-helper"></i></label>
                      </div>
                      <i className="remove mdi mdi-close-circle-outline"></i>
                    </li>
                    <li>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" />
                          Prepare for presentation
                        <i className="input-helper"></i></label>
                      </div>
                      <i className="remove mdi mdi-close-circle-outline"></i>
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" defaultChecked="checked" />
                          Resolve all the low priority tickets due today
                        <i className="input-helper"></i></label>
                      </div>
                      <i className="remove mdi mdi-close-circle-outline"></i>
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" checked="" />
                          Schedule meeting for next week
                        <i className="input-helper"></i></label>
                      </div>
                      <i className="remove mdi mdi-close-circle-outline"></i>
                    </li>
                    <li className="completed">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="checkbox" type="checkbox" checked="" />
                          Project review
                        <i className="input-helper"></i></label>
                      </div>
                      <i className="remove mdi mdi-close-circle-outline"></i>
                    </li>
                  </ul>
                </div>
                <div className="events py-4 border-bottom px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="mdi mdi-circle-outline text-primary mr-2"></i>
                    <span>Feb 11 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">Creating component page</p>
                  <p className="text-gray mb-0">build a js based app</p>
                </div>
                <div className="events pt-4 px-3">
                  <div className="wrapper d-flex mb-2">
                    <i className="mdi mdi-circle-outline text-primary mr-2"></i>
                    <span>Feb 7 2018</span>
                  </div>
                  <p className="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
                  <p className="text-gray mb-0 ">Call Sarah Graves</p>
                </div>
              <div className="ps__rail-x" style={{left: '0px', bottom: '0px'}}><div className="ps__thumb-x" tabIndex="0" style={{left: '0px', width: '0px'}}></div></div><div className="ps__rail-y" style={{top: '0px', right: '0px'}}><div className="ps__thumb-y" tabIndex="0" style={{top: '0px', height: '0px'}}></div></div></div>

              <div className="tab-pane fade active show" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">FRIENDS</p>
                  <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">See All</small>
                </div>
                <ul className="chat-list">
                  <li className="list active">
                    <div className="profile"><img src="images/faces/face1.jpg" alt="image" /><span className="online"></span></div>
                    <div className="info">
                      <p>Thomas Douglas</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">19 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face2.jpg" alt="image" /><span className="offline"></span></div>
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
                    <div className="profile"><img src="images/faces/face3.jpg" alt="image" /><span className="online"></span></div>
                    <div className="info">
                      <p>Daniel Russell</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">14 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face4.jpg" alt="image" /><span className="offline"></span></div>
                    <div className="info">
                      <p>James Richardson</p>
                      <p>Away</p>
                    </div>
                    <small className="text-muted my-auto">2 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face5.jpg" alt="image" /><span className="online"></span></div>
                    <div className="info">
                      <p>Madeline Kennedy</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">5 min</small>
                  </li>
                  <li className="list">
                    <div className="profile"><img src="images/faces/face6.jpg" alt="image" /><span className="online"></span></div>
                    <div className="info">
                      <p>Sarah Graves</p>
                      <p>Available</p>
                    </div>
                    <small className="text-muted my-auto">47 min</small>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          
        );
    }
}
