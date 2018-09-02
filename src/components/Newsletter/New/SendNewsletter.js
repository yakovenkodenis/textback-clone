import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@inject('channelsStore', 'subscribersStore')
@withRouter
@observer
export default class SendNewsletter extends Component {

    render() {
        const { isMobile } = this.props;

        return (
           <div className="flex justify-content-left">
                <button
                    className={`btn btn-outline-success btn-icon-text ${isMobile ? "w-100 mb-1" : "mr-1"}`}
                    type="button"
                >
                    Отправить
                </button>
                <button
                    className={`btn btn-light btn-icon-text ${isMobile ? "w-100 mt-2" : "ml-1"}`}
                    type="button"
                >
                    Сохранить
                </button>
            </div>
        )
    }
}
