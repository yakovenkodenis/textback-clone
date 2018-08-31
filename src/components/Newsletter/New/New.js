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

    render() {

        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <PageHeader isMobile={isMobile} />

                <div className="row">
                    <CardWrapper title="Выберите получателя">
                        <ReceiverChoiceForm isMobile={isMobile} />
                    </CardWrapper>

                    <MessageComposerForm isMobile={isMobile} />

                    <CardWrapper title="Отправьте рассылку">
                        <SendNewsletter isMobile={isMobile} />
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
