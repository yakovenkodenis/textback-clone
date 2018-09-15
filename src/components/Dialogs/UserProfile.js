import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';
import TagsContainer from './TagsContainer';


@withRouter
@observer
export default class UserProfile extends Component {

    render() {

        const {
            subscriber_id,
            subscriberId,
            channelId,
            name,
            image
        } = this.props;

        return (
            <React.Fragment>
                <div className="border-bottom text-center pb-4">
                        <Avatar
                            vkontakteId={subscriber_id}
                            name={name}
                            size="100"
                            round={true}
                            className="mb-2"
                            src={image}    
                        />
                    <h4>{name}</h4>
                </div>

                <TagsContainer subscriberId={subscriberId} channelId={channelId}/>

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