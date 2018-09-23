import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './previewWidgetStyles.css';


@observer
export default class WidgetPreviewPopup extends Component {

    state = {
        displayModal: 'none'
    };

    componentDidUpdate() {
        if (this.props.isModal && this.props.isPreviewModalOpen) {
            this.props.openPreview();

            this.setState({
                ...this.state,
                displayModal: 'block'
            });
            // set display: block;
        }
    }

    close = e => {
        if (this.props.isModal) {
            this.setState({
                ...this.state,
                displayModal: 'none'
            });
        }
    }

    openPreview = () => {
        if (this.props.isModal) {
            console.log('OPEN PREVIEW');
        }
    }

    render() {
        const { isModal } = this.props;

        return (
            <div
                id="notification-widget-dialog___modal-popup-id"
                className={`${isModal ? "" : "hover-border test-preview"} notification-widget-dialog___modal-popup`}
                style={{
                    display: isModal ? this.state.displayModal : 'block'
                }}
            >

                <div className={`${isModal ? "" : "test-preview"} notification-widget-dialog___modal-popup-content`} id="notification-widget-dialog___modal-popup-content-id">
                    <div
                        className="notification-widget-dialog___modal-popup-header"
                        style={{
                            backgroundColor: this.props.headerColor
                        }}
                    >
                        <span
                            onClick={this.close}
                            className="notification-widget-dialog___modal-popup-close"
                        >
                                &times;
                        </span>
                        <svg id="widget-logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 636.1 140.4">
                            <style>{`.st0{fill:#9a62f4}.st2{fill:#da8cff}`}</style>
                            <path className="st0" d="M182 49.8c0-3.6-.6-6-1.8-7.3-1.2-1.3-2.8-1.9-4.8-1.9s-3.6.6-4.8 1.8c-1.2 1.2-1.8 3.2-1.8 6.1V55h-11.6v-6c0-6.5 1.5-11.5 4.6-14.9 3.1-3.4 7.7-5.1 13.9-5.1s10.9 1.7 14.1 5.2c3.2 3.5 4.8 8.5 4.8 15v2.1c0 8.6-2.9 14.1-8.8 16.5 3.2 1.4 5.5 3.5 6.8 6.4 1.3 2.9 2 6.4 2 10.5V91c0 6.5-1.6 11.5-4.8 15-3.2 3.5-7.9 5.2-14.1 5.2-6.2 0-10.9-1.7-14.1-5.2-3.2-3.5-4.8-8.5-4.8-15v-8.8h11.9v9.6c0 2.9.6 5 1.8 6.1 1.2 1.2 2.8 1.8 4.8 1.8s3.6-.6 4.8-1.8c1.2-1.2 1.8-3.6 1.8-7.2v-6.3c0-3.7-.7-6.4-1.9-7.9-1.3-1.5-3.4-2.3-6.3-2.3h-3.1V62.7h3.8c2.4 0 4.2-.6 5.6-1.8 1.3-1.2 2-3.4 2-6.7v-4.4zM243.9 110.3h-12.7L229 95.8h-15.5l-2.2 14.6h-11.6l12.8-80.3H231l12.9 80.2zm-28.7-25.4h12.2l-6.1-40.6-6.1 40.6zM262.4 110.3h-12.6V30.1h12.6v34.4h14.3V30.1h12.8v80.3h-12.8V75.9h-14.3v34.4zM298.9 110.3V30.1h33.3v11.5h-20.6v68.8h-12.7zM353.3 63.9h17.3v11.5h-17.3v23.5h21.8v11.5h-34.4V30.1h34.4v11.5h-21.8v22.3z"/><g><path className="st0" d="M422.9 31c6.3 0 11.1 1.7 14.2 5 3.1 3.4 4.6 8.3 4.6 14.8v10.4c0 6.5-1.5 11.4-4.6 14.8-3.1 3.4-7.8 5-14.2 5h-6v30.2h-12.6V31h18.6zm-6 11.4v27.2h6c2 0 3.5-.5 4.6-1.6 1.1-1.1 1.6-3.1 1.6-6V50c0-2.9-.5-4.9-1.6-6-1.1-1.1-2.6-1.6-4.6-1.6h-6zM488.4 111.3h-12.7l-2.2-14.6H458l-2.2 14.6h-11.6L457 31h18.5l12.9 80.3zm-28.8-25.5h12.2l-6.1-40.6-6.1 40.6zM506.8 111.3h-12.6V31h12.6v34.4h14.3V31H534v80.3h-12.8V76.9h-14.3v34.4zM543.3 111.3V31h33.3v11.5H556v68.8h-12.7zM597.7 64.8H615v11.5h-17.3v23.5h21.8v11.5H585V31h34.4v11.5h-21.8v22.3z"/></g><g><path fill="#9a55ff" d="M33.7 64.9l13 63.5L142.2 12z"/><path className="st2" d="M142.2 12L36.8 80.2 8.2 64.1zM142.2 12l-.2.4-55.2 95.4-35.5-19.4z"/></g>
                        </svg>
                        <h3
                            style={{
                                color: this.props.headerTextColor
                            }}
                        >
                            {this.props.widgetHeader}
                        </h3>
                    </div>
                    <div className="notification-widget-dialog___modal-popup-body">
                        <div className="mx-auto">
                            <p
                                style={{
                                    color: this.props.descriptionTextColor,
                                    whiteSpace: 'pre-line'
                                }}
                            >
                                {this.props.widgetDescription}
                            </p>
                        </div>
                        <div className="mt-2 mx-auto">
                        {
                            this.props.links.map((link, index) => {
                                const { baseLink, pageLink } = link;
                                const socialNetwork = baseLink.split('https://')[1].split(".me/")[0];

                                return (
                                    <a key={index} target="_blank" rel="noopener noreferrer" href={`${baseLink}${pageLink}`} id={`${socialNetwork}-subscription-href`} className={`notification-widget-dialog___modal-namespace btn btn-social-icon-text btn-${socialNetwork}`}>
                                        <i className={`notification-widget-dialog___modal-namespace mdi mdi-${socialNetwork}`}></i>
                                        {
                                            socialNetwork === 'vk'
                                            ? socialNetwork.toUpperCase()
                                            : socialNetwork[0].toUpperCase() + socialNetwork.slice(1)
                                        }
                                    </a>
                            )})
                        }
                        </div>

                    </div>
                    <div className="notification-widget-dialog___modal-popup-footer">
                    </div>
                </div>
            
            </div>
        )
    }
}
