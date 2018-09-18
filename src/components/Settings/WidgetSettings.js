import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import WidgetsList from './Widgets/WidgetsList';


@withRouter
@observer
export default class WidgetSettings extends Component {
    render() {
        return (
            <React.Fragment>
                <WidgetsList />
            </React.Fragment>
        )
    }
}
