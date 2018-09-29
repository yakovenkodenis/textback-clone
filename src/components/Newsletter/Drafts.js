import React, { Component } from 'react';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import agent from '../../agent';


@inject('newsletterStore')
@withRouter
@observer
export default class Drafts extends Component {

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
        this.props.newsletterStore.getDraftsList();
    }

    @action
    deleteDraft = id => {
        const { drafts } = this.props.newsletterStore;

        this.props.newsletterStore.drafts.replace(
            drafts.filter(draft => draft.newsletter_id !== id)
        );

        agent.Newsletter.deleteDraft(id).then(response => {
            console.log(`Delete draft ${id}`, response);
        });
    }

    generateTableRows = () => {
        const { history } = this.props;
        return this.props.newsletterStore.drafts.map((draft, index) => (
            <tr key={draft.newsletter_id}>
                <td>{index + 1}</td>
                <td>{draft.title}</td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer"}}
                            // data-toggle="tooltip"
                            // data-placement="top"
                            // data-original-title="Изменить"
                            onClick={() => history.push(`newsletter/draft/${draft.newsletter_id}`)}
                        >
                            <i className="mdi mdi-pencil-box-outline" />
                        </label>
                        <label
                            className="badge badge-outline-danger my-auto mx-2"
                            style={{cursor: "pointer"}}
                            // data-toggle="tooltip"
                            // data-placement="top"
                            // data-original-title="Удалить"
                            onClick={() => { this.deleteDraft(draft.newsletter_id); }}
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
                            <h4 className="card-title">Черновики</h4>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <td><b>#</b></td>
                                        <td><b>Название</b></td>
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
        );
    }
}
