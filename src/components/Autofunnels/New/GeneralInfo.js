import React, { Component } from 'react';
import MediaQuery from 'react-responsive';


class GeneralInfo extends Component {
    render() {
        const { isMobile } = this.props;

        return (
            <React.Fragment>

            <div className={`${isMobile ? "" : "col-6"}`}>
                <p className="card-description mb-3">Название</p>
                <div className="form-group">
                    <input type="text" className="form-control mb-1" placeholder="Название цепочки..." />
                </div>

                <p className="card-description">Запускать цепочку</p>
                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        при подписке
                        <i className="input-helper"></i>
                    </label>
                </div>
                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        при добавлении тега
                        <i className="input-helper"></i>
                    </label>
                </div>
                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        при снятии тега
                        <i className="input-helper"></i>
                    </label>
                </div>
                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        при начале диалога
                        <i className="input-helper"></i>
                    </label>
                </div>

                <p className="card-description my-4">Отписывать от цепочки</p>
                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        при добавлении тега
                        <i className="input-helper"></i>
                    </label>
                </div>
                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"/>
                        при снятии тега
                        <i className="input-helper"></i>
                    </label>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

const ResponsiveGeneralInfo = props =>(
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <GeneralInfo isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveGeneralInfo;
