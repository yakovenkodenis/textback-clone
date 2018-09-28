import React, { Component } from 'react';
import { observer } from 'mobx-react';
// import $ from 'jquery';


@observer
export default class ButtonsTableContainer extends Component {
    
    componentDidMount() {
        // $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips
    }

    generateButtonsTable = (buttons) => {
        return buttons.map((button, index) => (
            <tr key={index} style={{cursor: 'pointer'}}>
                <td>{button.buttonName}</td>
                <td>
                    {
                        button.type === 'response'
                        ? 'Ответ'
                        : 'Ссылка'
                    }
                </td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer", zIndex: 9999}}
                            // data-toggle="tooltip"
                            // data-placement="top"
                            // data-original-title="Изменить"
                            onClick={e => { this.editButton(e, button) }}
                        >
                            <i className="mdi mdi-pencil-box-outline" />
                        </label>
                        <label
                            className="badge badge-outline-danger my-auto mx-2"
                            style={{cursor: "pointer", zIndex: 9999}}
                            // data-toggle="tooltip"
                            // data-placement="top"
                            // data-original-title="Удалить"
                            onClick={e => { this.deleteButton(e, button.id); }}
                        >
                            <i className="mdi mdi-delete-forever" />
                        </label>
                    </div>
                </td>
            </tr>
        ));
    }

    deleteButton = (e, buttonId) => {
        this.props.deleteButton(e, buttonId);
    }

    editButton = (e, button) => {
        this.props.selectButton(button);
    }

    createNewButton = () => {
        this.props.selectButton({
            buttonName: '',
            buttonType: 'link',
            buttonAction: 'unknown',
            addTags: [],
            removeTags: [],
            buttonMessage: 0,
            buttonUrl: ''
        });
    }
    
    render() {
        const { isMobile, activeButtons } = this.props;

        return (
            <div className="mt-2">

                <button 
                    className={`btn btn-light btn-icon-text ${isMobile ? "mb-1 w-100" : "mr-1"}`}
                    type="button"
                    onClick={this.createNewButton}
                >
                    <i className="mdi mdi-plus btn-icon-prepend" />
                    Добавить
                </button>
                {
                    activeButtons && activeButtons.length < 1
                    ? <p className="mt-3 mx-auto">Кнопок пока нет</p>
                    : <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Тип</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateButtonsTable(activeButtons ? activeButtons : [])}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}
