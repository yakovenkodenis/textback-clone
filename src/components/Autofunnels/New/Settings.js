import React, { Component } from 'react';
import MediaQuery from 'react-responsive';


const timeArray = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00', '23:00'
];

const daysOfWeek = {
    'Пн': 'monday', 'Вт': 'tuesday', 'Ср': 'wednesday',
    'Чт': 'thrursday', 'Пт': 'friday', 'Сб': 'saturday',
    'Вс': 'sunday'
};

class Settings extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            limitSendTime: false,

            monday: false,
            tuesday: false,
            wednesday: false,
            thrursday: false,
            friday: false,
            saturday: false,
            sunday: false,

            fromTime: '00:00',
            toTime: '00:00'
        };
    }

    componentDidMount() {
        this.props.updateSettingsInfo(this.state);
    }

    handleCheckboxChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? Boolean(target.checked) : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.syncState(this.state);
        });
    }

    onWeekDayChange = e => {
        console.log('WEEK DAY: ', e.target.name, e.target.checked);

        this.setState({
            ...this.state,
            [e.target.name]: Boolean(e.target.checked)
        }, () => {
            this.syncState(this.state);
        });
    }

    onTimeChange = e => {
        console.log('TIME: ', e.target.name, e.target.value);

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        }, () => {
            this.syncState(this.state);
        });
    }

    syncState = state => {
        if (this.props.updateSettingsInfo) {
            const info = this.state.limitSendTime ? {...this.state} : {limitSendTime: false};
            this.props.updateSettingsInfo(info);
        }
    }

    render() {
        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <div className={`${isMobile ? "" : "col-6"}`}>
                    <div
                        className={
                            `form-check form-check-flat form-check-primary ${this.state.limitSendTime ? "border-bottom pb-2": ""}`}
                    >
                        <label className="form-check-label">
                            <input
                                name="limitSendTime"
                                type="checkbox" className="form-check-input"
                                checked={this.state.limitSendTime}
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
                                display: this.state.limitSendTime ? 'flex': 'none',
                                flexWrap: this.state.limitSendTime ? 'wrap': 'inherit'
                            }
                        }
                    >
                        {
                            this.state.limitSendTime &&
                            <React.Fragment>
                            <p className="card-description">
                                Сообщения будут отправляться в это время, а в остальное - откладываться.
                            </p>
                            {
                                Object.keys(daysOfWeek).map(day => (
                                    <div
                                        className="form-check form-check-flat form-check-primary mr-3"
                                        key={day}
                                    >
                                        <label className="form-check-label">
                                            <input
                                                name={daysOfWeek[day]}
                                                type="checkbox" className="form-check-input"
                                                checked={this.state[daysOfWeek[day]]}
                                                onChange={this.onWeekDayChange}
                                            />
                                            {day}
                                            <i className="input-helper"></i>
                                        </label>
                                    </div>
                                ))
                            }
                            </React.Fragment>
                        }
                    </div>

                    <div
                        className="form-group form-inline"
                        style={{display: this.state.limitSendTime ? 'flex': 'none'}}
                    >
                        <label className="col-form-label mx-1">с</label>
                        <select
                            className="form-control ml-1 mr-2" name="fromTime"
                            onChange={this.onTimeChange}
                        >
                            {
                                timeArray.map(time => (
                                    <option key={time+'fromTime'} value={time}>{time}</option>
                                ))   
                            }
                        </select>

                        <label className="col-form-label mx-1">до</label>
                        <select
                            className="form-control mx-1" name="toTime"
                            onChange={this.onTimeChange}
                        >
                            {
                                timeArray.map(time => (
                                    <option key={time+'-toTime'} value={time}>{time}</option>
                                ))   
                            }
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
