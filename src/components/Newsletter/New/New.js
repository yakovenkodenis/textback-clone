import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MessageComposerForm from './MessageComposerForm';
import ReceiverChoiceForm from './ReceiverChoiceForm';
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
                    <CardWrapper title="Выберите получателя">
                        <ReceiverChoiceForm />
                    </CardWrapper>

                    {/*<CardWrapper title="Напишите сообщение">*/}
                        <MessageComposerForm />
                    {/*</CardWrapper>*/}

                    <CardWrapper title="Отправьте рассылку">
                        <p>Пока что в разработке</p>
                    </CardWrapper>
                </div>
            </React.Fragment>
        );
    }
}
