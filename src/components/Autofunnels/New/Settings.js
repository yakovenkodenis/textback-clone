import React, { Component } from 'react';
import MediaQuery from 'react-responsive';


class Settings extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isSendingTimeChecked: false
        };
    }

    handleCheckboxChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <div className={`${isMobile ? "" : "col-6"}`}>
                    <div
                        className={
                            `form-check form-check-flat form-check-primary ${this.state.isSendingTimeChecked ? "border-bottom pb-2": ""}`}
                    >
                        <label className="form-check-label">
                            <input
                                name="isSendingTimeChecked"
                                type="checkbox" className="form-check-input"
                                checked={this.state.isSendingTimeChecked}
                                onChange={this.handleCheckboxChange}
                            />
                            Ограничить время отправки
                            <i className="input-helper"></i>
                        </label>
                    </div>

                    <div
                        className="hidden-settings-block"
                        style={
                            {
                                display: this.state.isSendingTimeChecked ? 'flex': 'none',
                                flexWrap: this.state.isSendingTimeChecked ? 'wrap': 'inherit'
                            }
                        }
                    >

                        {this.state.isSendingTimeChecked
                            ? <p className="card-description">Сообщения будут отправляться в это время, а в остальное - откладываться.</p>
                            : null
                        }
                        <div className="form-check form-check-flat form-check-primary mr-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Пн
                                <i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="form-check form-check-flat form-check-primary mr-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Вт
                                <i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="form-check form-check-flat form-check-primary mr-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Ср
                                <i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="form-check form-check-flat form-check-primary mr-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Чт
                                <i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="form-check form-check-flat form-check-primary mr-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Пт
                                <i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="form-check form-check-flat form-check-primary mr-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Сб
                                <i className="input-helper"></i>
                            </label>
                        </div>
                        <div className="form-check form-check-flat form-check-primary mr-3">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Вс
                                <i className="input-helper"></i>
                            </label>
                        </div>
                    </div>

                    <div
                        className="form-group form-inline"
                        style={{display: this.state.isSendingTimeChecked ? 'flex': 'none'}}
                    >
                        <label className="col-form-label mx-1">с</label>
                        <select className="form-control ml-1 mr-2">
                            <option value="9">9:00</option>
                            <option value="">10:00</option>
                        </select>

                        <label className="col-form-label mx-1">до</label>
                        <select className="form-control mx-1">
                            <option value="9">9:00</option>
                            <option value="">10:00</option>
                        </select>
                    </div>

                </div>
            </React.Fragment>
        );
    }
};

const ResponsiveSettings = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Settings isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveSettings;
