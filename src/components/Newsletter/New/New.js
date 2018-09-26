import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import MessageComposerForm from './MessageComposerForm';
import ReceiverChoiceForm from './ReceiverChoiceForm';
import PageHeader from './PageHeader';
import CardWrapper from './CardWrapper';
import SendNewsletter from './SendNewsletter';
import agent from '../../../agent';


@inject('newsletterStore')
@withRouter
@observer
class New extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            receivers: [],
            newsletter: [],
            title: 'Новая рассылка',
            receiversFilter: {}
        }
    }

    componentDidMount() {
        if (this.props.edit) {
            const draftId =  this.props.match.params.id;

            if (draftId && Number.isInteger(parseInt(draftId, 10))) {
                agent.Newsletter.getDraft(draftId)
                    .then(response => {
                    if (response.success) {
                        const draft = response.data.data;
                        console.log(draft);

                        this.setState({
                            ...this.state,
                            ...draft
                        });
                    }
                });
            }
        }
    }

    updateNewsletter = newsletter => {
        this.setState({
            ...this.state,
            newsletter
        });
    }

    updateReceiver = (receivers, receiversFilter={}) => {
        this.setState({
            ...this.state,
            receivers: receivers,
            receiversFilter
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
            .filter(s => s.isSelected);
            // .map(({ id, channel_id }) => ({ subscriber_id: id, channel_id }));
        
        const finalConfig = this.state;
        finalConfig.receivers = receivers;

        console.log('Begin saving draft...', finalConfig);

        if (this.props.edit) {
            const draftId = parseInt(this.props.match.params.id, 10);

            if (Number.isInteger(draftId)) {
                console.log('SHOULD UPDATE DRAFT #', draftId);
                this.props.newsletterStore.saveDraft(finalConfig, this.props.match.params.id);
            }
        } else {
            this.props.newsletterStore.saveDraft(finalConfig);
        }

        this.props.history.push('/admin/newsletter');

        // save as a draft
        // ----------------------------------------
        // !!!IMPORTANT: if this.props.edit --> update the draft, else save new.
        // ----------------------------------------
        // console.log(finalConfig);
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
                            receivers={this.state.receivers}
                            receiversFilter={this.state.receiversFilter}
                            edit={this.props.edit}
                        />
                    </CardWrapper>

                    <MessageComposerForm
                        isMobile={isMobile}
                        onStateChange={this.updateNewsletter}
                        messages={this.state.newsletter}
                        edit={this.props.edit}
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
