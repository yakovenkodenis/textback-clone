import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import MessageBox from './MessageBox';
import UserProfile from './UserProfile';


// @inject('messagesStore', 'subscribersStore')
@withRouter
@observer
class DialogContainer extends Component {

    render() {

        const {
            name, /*messages,*/
            isMobile,
            channel_id, subscriber_id, channel_type,
            image
        } = this.props;

        return isMobile
                ? (
                    <div className="col-12 p-0">
                        <MessageBox
                            channel_id={channel_id} subscriber_id={subscriber_id} isMobile={isMobile}
                        />
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="col-6">
                            <MessageBox
                                channel_id={channel_id} subscriber_id={subscriber_id} isMobile={isMobile}
                            />
                        </div>
        
                        <div className="col-3">
                            <UserProfile name={name} image={image}
                                subscriber_id={channel_type === "Vk" ? subscriber_id+"" : null}
                                channelId={channel_id} subscriberId={subscriber_id}
                            />
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
