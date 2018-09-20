import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import MessageComposerForm from './MessageComposerForm';
import ReceiverChoiceForm from './ReceiverChoiceForm';
import PageHeader from './PageHeader';
import CardWrapper from '../../CardWrapper';
import SendNewsletter from './SendNewsletter';


@withRouter
@observer
class New extends Component {

    state = {
        receiver: {},
        newsletter: []
    }

    updateNewsletter = newsletter => {
        this.setState({
            ...this.state,
            newsletter
        }, () => {
            // console.log('NEWSLETTER OBJECT: ', this.state);
        });
    }

    updateReceiver = receiver => {
        this.setState({
            ...this.state,
            receiver
        }, () => {
            // console.log('NEWSLETTER OBJECT: ', this.state);
        });
    }

    sendNewsletter = () => {
        // save as a draft and send
    }

    saveNewsletter = () => {
        // save as a draft
        console.log(this.state);
    }

    render() {

        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <PageHeader isMobile={isMobile} />

                <div className="row">
                    <CardWrapper title="Выберите получателя">
                        <ReceiverChoiceForm
                            isMobile={isMobile}
                            updateReceiver={this.updateReceiver}
                        />
                    </CardWrapper>

                    <MessageComposerForm
                        isMobile={isMobile}
                        onStateChange={this.updateNewsletter}
                    />

                    <CardWrapper title="Отправьте рассылку">
                        <SendNewsletter
                            isMobile={isMobile}
                            saveNewsletter={this.saveNewsletter}
                            sendNewsletter={this.sendNewsletter}
                        />
                    </CardWrapper>
                </div>
            </React.Fragment>
        );
    }
}

const ResponsiveNew = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <New isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveNew;
