import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import General from './General';
import Appearance from './Appearance';


@withRouter
@observer
class New extends Component {

    state = {
        widgetConfig: {}
    }

    updateWidgetConfig = widgetConfig => {
        this.setState({
            ...this.state,
            widgetConfig
        });
    }

    saveWidget = (e) => {
        console.log('WIDGET CONFIG: ', this.state.widgetConfig);
    }

    render() {

        const { isMobile } = this.props;

        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to='/admin/settings/widgets'>Виджеты</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                Создать виджет
                            </li>
                        </ol>
                    </nav>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Создание виджета</h4>
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a
                                        href="#general-1"
                                        className="nav-link active show"
                                        id="general-tab"
                                        data-toggle="tab"
                                        aria-controls="general"
                                    >
                                        Общее
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#look-1"
                                        className="nav-link"
                                        id="look-tab"
                                        data-toggle="tab"
                                        aria-controls="look"
                                    >
                                        Внешний вид
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div
                                    className="tab-pane active show"
                                    id="general-1"
                                    role="tabpanel"
                                    aria-labelledby="general-tab"
                                >
                                    <General
                                        isMobile={isMobile}
                                        onStateChange={this.updateWidgetConfig}
                                        saveWidget={this.saveWidget}
                                    />
                                </div>
                                <div
                                    className="tab-pane"
                                    id="look-1"
                                    role="tabpanel"
                                    aria-labelledby="look-tab"
                                >
                                    <Appearance isMobile={isMobile} links={this.state.widgetConfig.pagesLinks} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
