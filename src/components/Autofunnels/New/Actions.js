import React, { Component } from 'react';
import MediaQuery from 'react-responsive';


class Actions extends Component {
    render() {
        const { isMobile, disabled } = this.props;

        return (
            <React.Fragment>
                <div className={`${isMobile ? "" : "col-6"}`}>

                    <div>
                        <button
                            className="btn btn-gradient-primary btn-icon-text mr-2"
                            disabled={disabled}
                        >
                            <i className="mdi mdi-play btn-icon-prepend"></i>
                            Включить
                        </button>
                        <button
                            className="btn btn-light btn-fw mx-2"
                            onClick={this.props.save}
                            disabled={disabled}
                        >
                            Сохранить
                        </button>
                    </div>

                </div>
            </React.Fragment>
        )
    }
};

const ResponsiveActions = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Actions isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveActions;
