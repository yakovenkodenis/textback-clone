import React, { Component } from 'react';
import { observer } from 'mobx-react';

import '../../Newsletter/New/AddButtonsModalStyles.css';


const width20 = {
    maxWidth: '30%'
}

const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(i =>
    i < 10 ? `0${i}` : `${i}`
);

const minutes = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23, 24,
    25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,
    47,48,49,50,51,52,53,54,55,56,57,58,59
].map(i => i < 10 ? `0${i}` : `${i}`);

@observer
export default class SendingTimeModal extends Component {

    state = {
        unit: 'immediately',
        measure: 0,
        specificSendTime: false,
        specificHour: 0,
        specificMinute: 0
    }

    componentDidMount() {
        if (this.props.activeChain) {
            this.setState({
                ...this.state,
                ...this.formatToState(this.props.activeChain.sendTime)
            }, () => {
                console.log(this.state)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // this.syncState();
    }

    syncState = () => {
        if (this.props.activeChain) {
            const { activeChain } = this.props;
            activeChain.sendTime = this.formatState(this.state)
            this.props.updateSendTime(activeChain);
        }
    }

    handleChange = (e, name) => {
        if (name === 'specificSendTime') {
            this.setState({
                ...this.state,
                specificSendTime: e.target.value === 'specificTime'
            });
        } else {
            this.setState({
                ...this.state,
                [name]: e.target.value
            });
        }
    }

    formatToState = obj => {

        let specificHour = 0, specificMinute = 0;

        if (Boolean(obj.specificSendTime)) {
            [specificHour, specificMinute] = obj.specificSendTime.split(':');
        }

        return {
            unit: obj.unit,
            measure: obj.measure,
            specificSendTime: Boolean(obj.specificSendTime),
            specificHour,
            specificMinute
        }
    }

    formatState = (state) => {
        return {
            unit: state.unit,
            measure: state.unit === 'immediately' ? 0 : state.measure,
            specificSendTime: state.specificSendTime
                              ? state.specificHour + ':' + state.specificMinute
                              : false
        }
    }

    close = () => {
        this.syncState();
        this.props.close(this.formatState(this.state));
    }

    render() {
        const { isMobile, isOpen } = this.props;

        const modalDisplayStyle = {
            display: isOpen ? 'block' : 'none'
        };
        const modalSizeStyle = {
            width: isMobile ? '100%' : '20%'
        };

        return (
            <div
                id="add-buttons-modal-popup-id"
                className={`add-buttons-modal-popup`}
                style={modalDisplayStyle}
            >

                <div
                    className={`add-buttons-modal-popup-content`}
                    id="add-buttons-modal-popup-content-id"
                    style={modalSizeStyle}
                >
                    <div
                        className="add-buttons-modal-popup-header"
                    >
                        <span
                            onClick={this.close}
                            className="add-buttons-modal-popup-close"
                        >
                                &times;
                        </span>
                        <h3 className="mt-4">
                            Настроить время отправки
                        </h3>
                    </div>
                    <div className="add-buttons-modal-popup-body">

                        <p className="card-description mb-2 text-center">Сообщение будет отправлено</p>

                        <div className="form-group form-inline mb-2 justify-content-center">
                        {
                            this.state.unit !== 'immediately' &&
                            <input
                                style={width20}
                                type="number"
                                min={0}
                                step={1}
                                className="form-control form-control-lg mr-1 px-3"
                                id="sendTimeMeasure"
                                value={this.state.measure}
                                onChange={e => { this.handleChange(e, 'measure'); }}
                            />
                        }

                            <select
                                id="inputCountry" className="form-control form-control-lg ml-1"
                                onChange={e => { this.handleChange(e, 'unit'); }}
                                value={this.state.unit}
                            >
                                <option value="immediately">сразу</option>
                                <option value="minute">минут</option>
                                <option value="hour">часов</option>
                                <option value="day">дней</option>
                            </select>
                        </div>

                        <p className="card-description border-bottom mb-1 text-center">спустя после подписки</p>
                        <br/>
                        <p className="card-description text-center mb-0">Время отправки сообщения</p>

                        <div className="">
                            <div className="form-group form-inline mb-0 mt-2 justify-content-center">
                                <select
                                    id="inputCountry" className="form-control form-control-lg"
                                    onChange={e => { this.handleChange(e, 'specificSendTime'); }}
                                    value={this.state.specificSendTime ? 'specificTime' : 'anyTime'}
                                >
                                    <option value="anyTime">в любое время</option>
                                    <option value="specificTime">в определённое время</option>
                                </select>
                            </div>
                            {
                                this.state.specificSendTime &&
                                <div className="form-group form-inline mb-0 mt-2 justify-content-center">
                                    <select
                                        id="inputCountry" className="form-control form-control-lg mr-1"
                                        onChange={e => { this.handleChange(e, 'specificHour'); }}
                                        value={this.state.specificHour}
                                    >
                                        {hours.map(h => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                    :
                                    <select
                                        id="specificMinutes" className="form-control form-control-lg ml-1"
                                        onChange={e => { this.handleChange(e, 'specificMinute'); }}
                                        value={this.state.specificMinute}
                                    >
                                        {minutes.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                            }
                        </div>

                        <button
                            className="btn btn-gradient-success mr-2 mb-1 mt-2"
                            onClick={this.close}
                        >
                            OK
                        </button>

                    </div>
                    <div className="add-buttons-modal-popup-footer">
                    </div>
                </div>
            </div>
        )
    }
}
