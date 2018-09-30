import React, { Component } from 'react';
import { observer } from 'mobx-react';


@observer
export default class SendingTimePopup extends Component {

    render() {
        const visibilityStyles = {
            display: this.props.isOpen.get() ? 'block' : 'none'
        };

        console.log(this.props.isOpen.get())

        return (
            <div className="col-4" style={visibilityStyles}>
                <div className="form-group">
                    <select id="time1" className="form-control form-control-lg">
                        <option>Сразу</option>
                        <option>Через</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Через"
                        className="form-control form-control-lg"
                        id="time2"
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-block btn-gradient-primary btn-sm"
                    onClick={this.props.close}
                >
                    ОК
                </button>
            </div>
        )
    }
}
