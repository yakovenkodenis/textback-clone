import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DateTimePicker from '../../UiHelpers/DateTimePicker/DateTimePicker';

import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');



@withRouter
@observer
export default class SendNewsletter extends Component {

    state = {
        moment: moment(),
        displayPicker: false,
        sendButtonText: 'Отправить сейчас',
        sendType: 'immediately',
        firstTimeUpdate: true
    }

    componentDidUpdate() {
        if (this.props.setUnixTime > 0 && this.state.firstTimeUpdate) {
            this.setState({
                ...this.state,
                moment: moment(this.props.setUnixTime),
                sendType: 'plan',
                displayPicker: true,
                sendButtonText: 'Запланировать рассылку',
                firstTimeUpdate: false
            });
        }
    }

    handleDateTimeChange = moment => {
        this.setState({
            ...this.state,
            moment
        }, () => {
            this.syncTime(this.state.moment);
        });
    }

    openDateTimePicker = () => {
        this.setState({
            ...this.state,
            displayPicker: true
        });
    }

    handleDateTimeSave = (moment) => {
        this.setState({
            ...this.state,
            moment
        }, () => {
            this.syncTime(this.state.moment);
        })
        console.log('SAVE: ', moment);
    }

    syncTime = moment => {
        if (this.props.updateSendingTime) {
            this.props.updateSendingTime(moment.valueOf(), this.state.sendType);
        }
    }

    toggleSending = e => {
        this.setState({
            ...this.state,
            sendType: e.target.value,
            sendButtonText: e.target.value === 'immediately' ? 'Отправить сейчас' : 'Запланировать рассылку',
            displayPicker: e.target.value !== 'immediately'
        });
    }

    sendNewsletter = () => {
        this.props.sendNewsletter(this.state.sendType);
    }

    saveNewsletter = () => {
        this.props.saveNewsletter(this.state.sendType);
    }

    render() {
        const { isMobile } = this.props;

        return (
        <React.Fragment>
            <div className="form-check ml-2">
                <label htmlFor="start-immediately" className="form-check-label">
                    Отправить сейчас
                    <input
                        onChange={this.toggleSending}
                        type="radio"
                        value="immediately"
                        checked={this.state.sendType === 'immediately'}
                        name="start-immediately"
                        id="start-immediately"
                        className="form-check-input"/>
                    <i className="input-helper" />
                </label>
            </div>
            
            <div className="form-check ml-2">
                <label htmlFor="plan-newsletter" className="form-check-label">
                    Запланировать отправку
                    <input
                        onChange={this.toggleSending}
                        type="radio"
                        id="plan-newsletter"
                        value="plan"
                        checked={this.state.sendType === 'plan'}
                        className="form-check-input"/>
                    <i className="input-helper" />
                </label>
            </div>

            <DateTimePicker
                className="my-3 ml-0 col-3 pl-0"
                format="DD-MM-YYYY HH:mm"
                min={moment()}
                value={this.state.moment}
                defaultValue={this.state.moment}
                options={true}
                onChange={this.handleDateTimeChange}
                onSave={this.handleDateTimeSave}
                isOpen={this.state.displayPicker}
            />

            <div className="flex justify-content-left mt-4">
                <button
                    className={`btn btn-outline-success btn-icon-text ${isMobile ? "w-100 mb-1" : "mr-1"}`}
                    type="button"
                    onClick={this.sendNewsletter}
                >
                    {this.state.sendButtonText}
                </button>
                <button
                    className={`btn btn-light btn-icon-text ${isMobile ? "w-100 mt-2" : "ml-1"}`}
                    type="button"
                    onClick={this.saveNewsletter}
                >
                    Сохранить как черновик
                </button>
            </div>
        </React.Fragment>
        )
    }
}
