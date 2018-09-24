import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import MessageComposerForm from './MessageComposerForm';
import ReceiverChoiceForm from './ReceiverChoiceForm';
import PageHeader from './PageHeader';
import CardWrapper from './CardWrapper';
import SendNewsletter from './SendNewsletter';


@withRouter
@observer
class New extends Component {

    state = {
        receivers: [],
        newsletter: [],
        title: 'Новая рассылка'
    }

    updateNewsletter = newsletter => {
        this.setState({
            ...this.state,
            newsletter
        });
    }

    updateReceiver = receivers => {
        this.setState({
            ...this.state,
            receivers: receivers
        });
    }

    onNewsletterTitleChange = e => {
        this.setState({
            ...this.state,
            title: e.target.value
        });
    }

    formatSubscribersListForAPI = subscribers => {
        return subscribers.map(
            ({ id, channel_id }) => ({ subscriber_id: id, channel_id }));
    }

    sendNewsletter = () => {
        // save as a draft and send
    }

    saveNewsletter = () => {
        const receivers = this.state.receivers
            .filter(s => s.isSelected)
            .map(({ id, channel_id }) => ({ subscriber_id: id, channel_id }));
        
        const finalConfig = this.state;
        finalConfig.receivers = receivers;

        // save as a draft
        console.log(finalConfig);
    }

    render() {

        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <PageHeader isMobile={isMobile} />

                <div className="row">
                    <CardWrapper title="Дайте название рассылке">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Название рассылки"
                                className="form-control form-control-lg"
                                id="inputNewsletterTitle"
                                value={this.state.title}
                                onChange={this.onNewsletterTitleChange}
                            />
                        </div>
                    </CardWrapper>

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
