import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Joyride from 'react-joyride';

import MessageComposerForm from './MessageComposerForm';
import ReceiverChoiceForm from './ReceiverChoiceForm';
import PageHeader from './PageHeader';
import CardWrapper from './CardWrapper';
import SendNewsletter from './SendNewsletter';
import agent from '../../../agent';


const steps = [
    {
        target: '.first-step',
        content: 'Здесь будет название вашей рассылки',
        placement: 'auto'
    },
    {
        target: '.second-step',
        content: 'Тут вы можете выбрать список получателей рассылки',
        placement: 'auto'
    },
    {
        target: '.third-step',
        content: 'Потом нужно составить сообщение',
        placement: 'auto'
    },
    {
        target: '.fourth-step',
        content: 'А теперь запустите рассылку или сохраните её как черновик',
        placement: 'auto'
    },
];

const joyrideLocale = {
    back: 'Назад',
    close: 'Закрыть',
    last: 'Конец',
    next: 'Дальше',
    skip: 'Пропустить'
};

const joyrideTheme = {
    options: {
        primaryColor: '#b66dff',
        zIndex: 9999
    }
};

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
            receiversFilter: {},
            time: 0
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
                        // console.log(draft);

                        this.setState({
                            ...this.state,
                            ...draft
                        }, () => {
                            console.log(this.state);
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

        console.log('updateReceiver in New.js: ', receiversFilter);
        this.setState({
            ...this.state,
            receivers: receivers,
            receiversFilter
        });
    }

    updateSendingTime = (unixTime, sendType) => {
        this.setState({
            ...this.state,
            time: sendType === 'immediately' ? 0 : unixTime
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

    getFinalConfig = () => {
        const receivers = this.state.receivers
            .filter(s => s.isSelected);
            // .map(({ id, channel_id }) => ({ subscriber_id: id, channel_id }));
        
        const finalConfig = this.state;
        finalConfig.receivers = receivers;

        return finalConfig;
    }

    saveAsDraft = (finalConfig) => {
        if (this.props.edit) {
            const draftId = parseInt(this.props.match.params.id, 10);

            if (Number.isInteger(draftId)) {
                console.log('SHOULD UPDATE DRAFT #', draftId);
                return this.props.newsletterStore.saveDraft(finalConfig, this.props.match.params.id);
            }
        } else {
            return this.props.newsletterStore.saveDraft(finalConfig);
        }
    }

    sendNewsletter = (sendType) => {
        const finalConfig = this.getFinalConfig();

        if (sendType === 'immediately') {
            finalConfig.time = 0;
        }

        this.props.newsletterStore.startNewsletter(finalConfig)
         .then(response => {
             console.log('After SendNewsletter RESPONSE: ', response);
             this.props.history.push('/admin/newsletter');
        });
    }

    saveNewsletter = (sendType) => {
        const finalConfig = this.getFinalConfig();

        if (sendType === 'immediately') {
            console.log('SAVE IMMEDIATE DRAFT')
            finalConfig.time = 0;
        }

        console.log('Begin saving draft...', finalConfig);
        console.log('ROUTE PARAMS: ', this.props.match);

        this.saveAsDraft(finalConfig)
         .then(() => {
            this.props.history.push('/admin/newsletter');
        });
    }

    render() {

        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <PageHeader isMobile={isMobile} />

                <div className="row">
                    <Joyride steps={steps} run={true} callback={
                            data => console.log('STEPPER: ', data)
                        }
                        debug
                        continuous
                        showProgress
                        showSkipButton
                        locale={joyrideLocale}
                        styles={joyrideTheme}
                    />

                    <CardWrapper title="Дайте название рассылке">
                        <div className="form-group first-step">
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

                    <CardWrapper title="Выберите получателя" tourStepClass="second-step">
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
                        isNewsletter={true}
                        tourStepClass="third-step"
                    />

                    <CardWrapper title="Отправьте рассылку">
                        <SendNewsletter
                            isMobile={isMobile}
                            saveNewsletter={this.saveNewsletter}
                            sendNewsletter={this.sendNewsletter}
                            updateSendingTime={this.updateSendingTime}
                            setUnixTime={this.state.time}
                            tourStepClass="fourth-step"
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
