import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import agent from '../../agent';


@inject('newsletterStore')
@withRouter
@observer
export default class PlannedNewsletters extends Component {

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
        this.props.newsletterStore.getPlannedList();
    }

    editPlannedNewsletter = (newsletter) => {
        this.props.history.push(`newsletter/draft/${newsletter.newsletter_id}?planned=true`);
    }

    @action
    deleteNewsletter = id => {
        const { plannedNewsletters } = this.props.newsletterStore;

        this.props.newsletterStore.plannedNewsletters.replace(
            plannedNewsletters.filter(newsletter => newsletter.newsletter_id !== id)
        );

        agent.Newsletter.deletePlannedNewsletter(id).then(response => {
            console.log(`Delete planned newsletter ${id}`, response);
        });
    }

    generateTableRows = () => {
        return this.props.newsletterStore.plannedNewsletters.map((newsletter, index) => (
            <tr key={newsletter.newsletter_id}>
                <td>{index + 1}</td>
                <td>{newsletter.title}</td>
                <td>planned time</td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer", zIndex: 9999}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Изменить"
                            onClick={() => { this.editPlannedNewsletter(newsletter); }}
                        >
                            <i className="mdi mdi-pencil-box-outline" />
                        </label>
                        <label
                            className="badge badge-outline-danger my-auto mx-2"
                            style={{cursor: "pointer", zIndex: 9999}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Удалить"
                            onClick={() => { this.deleteNewsletter(newsletter.newsletter_id); }}
                        >
                            <i className="mdi mdi-delete-forever" />
                        </label>
                    </div>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="">Запланированные рассылки</h4>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <td><b>#</b></td>
                                        <td><b>Название</b></td>
                                        <td><b>Время</b></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.generateTableRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
