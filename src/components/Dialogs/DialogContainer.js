import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import MessageBox from './MessageBox';
import UserProfile from './UserProfile';


@inject('messagesStore', 'subscribersStore')
@withRouter
@observer
class DialogContainer extends Component {

    render() {

        const {
            name, /*messages,*/
            isMobile,
            channel_id, subscriber_id,
            image
        } = this.props;

        let chat = this.props.messagesStore.messages.find(chat => {
            console.log('INSIDE CHAT FIND:', chat);
            console.log(chat.channel_id, chat.subscriber_id);
            console.log(channel_id, subscriber_id);

            return chat.channel_id === channel_id && chat.subscriber_id === subscriber_id
        })
        
        if (!chat) chat = [];

        console.log('CHAAAT', chat);

        return isMobile
                ? (
                    <div className="col-12 p-0">
                        <MessageBox 
                            messages={chat.messages}
                            channel_id={channel_id} subscriber_id={subscriber_id}
                        />
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="col-6">
                            <MessageBox 
                                messages={chat.messages}
                                channel_id={channel_id} subscriber_id={subscriber_id}
                            />
                        </div>
        
                        <div className="col-3">
                            <UserProfile name={name} image={image} />
                        </div>
                    </React.Fragment>
                )
    }
}

const ResponsiveDialogContainer = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <DialogContainer isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveDialogContainer;
