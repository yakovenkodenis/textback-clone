import React, { Component } from 'react';
import { observer } from 'mobx-react';

import WidgetPreviewPopup from './WidgetPreviewPopup';


@observer
export default class WidgetPreview extends Component {
    render() {
        return (
            <React.Fragment>
                <WidgetPreviewPopup {...this.props} isModal />
                <WidgetPreviewPopup {...this.props} />
            </React.Fragment>
        )
    }
}
