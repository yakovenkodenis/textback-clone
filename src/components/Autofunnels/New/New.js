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

    render() {
        return (
            <React.Fragment>
                <PageHeader />

                <div className="row">
                    <CardWrapper title="Общая информация">
                        <GeneralInfo isCardBody={true} />
                    </CardWrapper>

                    <CardWrapper title="Сообщения">
                        <Messages />
                    </CardWrapper>

                    <CardWrapper title="Настройки">
                        <Settings />
                    </CardWrapper>

                    <CardWrapper title="">
                        <Actions />
                    </CardWrapper>
                </div>
            </React.Fragment>
        );
    }
}