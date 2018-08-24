import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import MessageBox from './MessageBox';
import UserProfile from './UserProfile';


@withRouter
@observer
class DialogContainer extends Component {

    render() {

        const {
            name, messages,
            isMobile
        } = this.props;

        return isMobile
                ? (
                    <div className="col-12 p-0">
                        <MessageBox messages={messages} />
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="col-6">
                            <MessageBox messages={messages} />
                        </div>
        
                        <div className="col-3">
                            <UserProfile name={name} />
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
