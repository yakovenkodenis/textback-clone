import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import NewsletterStatistics from './NewsletterStatistics';
import PlannedNewsletters from './PlannedNewsletters';
import Drafts from './Drafts';
import GeneralStatistics from './GeneralStatistics';


@withRouter
@observer
export default class Newsletter extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="page-header">
                    <h3 className="page-title">Рассылки</h3>
                </div>

                <GeneralStatistics />
                <Drafts />
                <PlannedNewsletters />
                <NewsletterStatistics />

            </React.Fragment>
        )
    }
}
