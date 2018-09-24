import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import General from './General';
import Appearance from './Appearance';
import { formatMEssagesObjectToNeededFormForAPI } from '../../../utils';


@withRouter
@observer
class New extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pagesLinks: []
        };

        this.widgetConfig = {};
    }

    saveLinks = links => {
        console.log('New.js, new links: ', links);
        this.setState({
            ...this.state,
            pagesLinks: links
        });
    }

    saveConfig = (name, config) => {
        this.widgetConfig = {
            ...this.widgetConfig,
            [name]: config
        };
    }

    saveWidget = (e) => {
        const message = formatMEssagesObjectToNeededFormForAPI(this.widgetConfig.general.message);
        this.widgetConfig.general.message = message;
        console.log('WIDGET CONFIG: ', this.widgetConfig);
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
                        <div className="card-body pb-0">
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
                            <div className="tab-content mb-0 pb-0">
                                <div
                                    className="tab-pane active show"
                                    id="general-1"
                                    role="tabpanel"
                                    aria-labelledby="general-tab"
                                >
                                    <General
                                        isMobile={isMobile}
                                        saveLinks={this.saveLinks}
                                        saveWidget={config => { this.saveConfig('general', config); }}
                                    />
                                </div>
                                <div
                                    className="tab-pane"
                                    id="look-1"
                                    role="tabpanel"
                                    aria-labelledby="look-tab"
                                >
                                    <Appearance
                                        isMobile={isMobile}
                                        links={this.state.pagesLinks}
                                        saveWidget={config => { this.saveConfig('appearance', config); }}
                                    />
                                </div>
                            </div>

                            <div className="grid-margin stretch-card mt-2">
                                <div className="card">
                                    <div className="card-body py-0">
                                        <div className="flex justify-content-left">
                                            <Link
                                                to='/admin/settings/widgets'
                                                className={`btn btn-light btn-icon-text ${isMobile ? "w-100 mt-2" : "mr-1"}`}
                                            >
                                                Назад
                                            </Link>
                                            <button
                                                className={`btn btn-outline-success btn-icon-text ${isMobile ? "w-100 mb-1" : "ml-1"}`}
                                                type="button"
                                                onClick={this.saveWidget}
                                            >
                                                Сохранить
                                            </button>
                                        </div>
                                    </div>
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
