import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';


@withRouter
@observer
class Profile extends Component {

    render() {

        const { isMobile } = this.props;

        return (
        <React.Fragment>

            <div className="page-header">
                <h3 className="page-title">Профиль</h3>
            </div>

            <div className="row">
                <div className={`${isMobile ? "col-12" : "col-6"} mx-auto`}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12"> {/* было col-lg-4 */}
                                    <div className="border-bottom text-center pb-4">
                                        <img
                                            src="https://placeimg.com/100/100/people"
                                            alt="profile"
                                            className="img-lg rounded-circle mb-3"
                                        />
                                        <h3>Василий Иванович</h3>
                                        <div className="d-flex align-items-center">
                                            <h5>Россия</h5>
                                        </div>
                                    </div>
                                    <div className="border-bottom py-4">
                                        <p>Мои теги</p>
                                        <div>
                                            <label className="badge badge-outline-dark badge-margin-3">Chalk</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Lettering</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Web Design</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Graphic Design</label>
                                            <label className="badge badge-outline-dark badge-margin-3">Data Analysis</label>
                                        </div>
                                    </div>
                                    <div className="border-bottom pt-4 pb-2">
                                        <p className="clearfix">
                                            <span className="float-left">Мои подписчики</span>
                                            <span className="float-right text-muted">1241</span>
                                        </p>
                                        <p className="clearfix">
                                            <span className="float-left">Мои каналы</span>
                                            <span className="float-right text-muted">24</span>
                                        </p>
                                    </div>
                                    <div className="py-4">
                                        <p className="clearfix">
                                            <span className="float-left">Статус</span>
                                            <span className="float-right text-muted">Активный</span>
                                        </p>
                                        <p className="clearfix">
                                            <span className="float-left">Телефон</span>
                                            <span className="float-right text-muted">066 235 19 14</span>
                                        </p>
                                        <p className="clearfix">
                                            <span className="float-left">Facebook</span>
                                            <span className="float-right text-muted">
                                                <a>fb.com/yakovenkodenis</a>
                                            </span>
                                        </p>
                                        <p className="clearfix">
                                            <span className="float-left">Telegram</span>
                                            <span className="float-right text-muted">
                                                <a>tg.org/yakovenkodenis</a>
                                            </span>
                                        </p>
                                    </div>
                                    <button className="btn btn-gradient-primary btn-block">Изменить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
        );
    }
};

const ResponsiveProfile = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Profile isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveProfile;
