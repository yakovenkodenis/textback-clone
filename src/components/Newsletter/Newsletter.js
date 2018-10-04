import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import NewsletterStatistics from './NewsletterStatistics';
import PlannedNewsletters from './PlannedNewsletters';
import Drafts from './Drafts';
import GeneralStatistics from './GeneralStatistics';


@withRouter
@observer
class Newsletter extends Component {

    render() {
        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <div className="page-header">
                    <h3 className="page-title">Рассылки</h3>
                </div>

                <GeneralStatistics isMobile={isMobile} />
                <Drafts isMobile={isMobile} />
                <PlannedNewsletters isMobile={isMobile} />
                <NewsletterStatistics isMobile={isMobile} />

            </React.Fragment>
        )
    }
}

const ResponsiveNewsletter = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Newsletter isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveNewsletter;
