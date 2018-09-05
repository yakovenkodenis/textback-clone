import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';


@withRouter
@observer
export default class UserProfile extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="border-bottom text-center pb-4">
                        <Avatar
                            vkontakteId={this.props.subscriber_id}
                            name={this.props.name}
                            size="100"
                            round={true}
                            className="mb-2"
                            src={this.props.image}    
                        />
                    <h4>{this.props.name}</h4>
                </div>
                <div className="border-bottom py-4">
                    <p>Теги пользователя</p>
                    <div>
                        <label className="badge badge-outline-dark badge-margin-3">Chalk</label>
                        <label className="badge badge-outline-dark badge-margin-3">Lettering</label>
                        <label className="badge badge-outline-dark badge-margin-3">Web Design</label>
                        <label className="badge badge-outline-dark badge-margin-3">Graphic Design</label>
                        <label className="badge badge-outline-dark badge-margin-3">Data Analysis</label>
                    </div>
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
                </div>
                <button className="btn btn-gradient-primary btn-block">Перейти</button>
            </React.Fragment>
        );
    }
}