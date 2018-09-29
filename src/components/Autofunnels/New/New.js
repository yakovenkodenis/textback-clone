import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import GeneralInfo from './GeneralInfo';
import Messages from './Messages';
import Settings from './Settings';
import Actions from './Actions';
import PageHeader from './PageHeader';
import CardWrapper from '../../CardWrapper';


@withRouter
@observer
export default class New extends Component {

    state = {
        generalInfo: {},
        messagesChain: [],
        settings: {}
    }

    updateGeneralInfoData = generalInfo => {
        this.setState({
            ...this.state,
            generalInfo
        });
    }

    updateSettingsInfoData = settings => {
        this.setState({
            ...this.state,
            settings
        });
    }

    updateMessagesChainData = messagesChain => {
        this.setState({
            ...this.state,
            messagesChain
        });
    }

    saveAutofunnel = () => {
        console.log('Save chain: ', this.state);
    }

    render() {
        return (
            <React.Fragment>
                <PageHeader />

                <div className="row">
                    <CardWrapper title="Общая информация">
                        <GeneralInfo updateGeneralInfoData={this.updateGeneralInfoData} />
                    </CardWrapper>

                    <CardWrapper title="Сообщения">
                        <Messages updateMessagesChainData={this.updateMessagesChainData} />
                    </CardWrapper>

                    <CardWrapper title="Настройки">
                        <Settings updateSettingsInfo={this.updateSettingsInfoData} />
                    </CardWrapper>

                    <CardWrapper title="">
                        <Actions save={this.saveAutofunnel} />
                    </CardWrapper>
                </div>
            </React.Fragment>
        );
    }
}