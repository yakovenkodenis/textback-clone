import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import makeAnimated from 'react-select/lib/animated';

import agent from '../../agent';


export default class Filters extends Component {

    state = {
        filters: [],
        hasTags: [],
        hasNoTags: []
    }

    loadTags = () => {
        return new Promise(resolve => {
            agent.Tags.getTagsList()
            .then(tags => {
                if (tags.success) {
                    resolve(tags.data.map(tag => ({
                        label: tag.description, value: tag.tag_id.toString()
                    })));
                } else resolve([]);
            });
        });
    }

    handleSelectChangeForHasTags = (tags) => {
        
        this.setState({
            ...this.state,
            hasTags: tags
        });
    }

    handleSelectChangeForHasNoTags = (tags) => {
        
        this.setState({
            ...this.state,
            hasNoTags: tags
        });
    }

    render() {
        return (
            <React.Fragment>
                <p className="h5">
                    <span className="mdi mdi-filter" />
                    Фильтр
                </p>

                <div className="filters row">
                    <div className="col-6">
                        <p>Присвоен тег: </p>
                        <AsyncSelect
                            closeMenuOnSelect={false}
                            components={makeAnimated()}
                            isMulti
                            cacheOptions
                            defaultOptions
                            placeholder="Присвоен тег"
                            loadingMessage={() => "Загрузка..."}
                            loadOptions={this.loadTags}
                            onChange={this.handleSelectChangeForHasTags}
                            noOptionsMessage={() => "Нет тегов"}
                        />
                        <br/>
                        <p>Не присвоен тег: </p>
                        <AsyncSelect
                            closeMenuOnSelect={false}
                            components={makeAnimated()}
                            isMulti
                            cacheOptions
                            defaultOptions
                            placeholder="Не присвоен тег"
                            loadingMessage={() => "Загрузка..."}
                            loadOptions={this.loadTags}
                            onChange={this.handleSelectChangeForHasNoTags}
                            noOptionsMessage={() => "Нет тегов"}
                        />
                    </div>
                    <form className="align-items-center pt-5 mt-3">
                        <div className="form-check ml-2">
                            <label htmlFor="logical-and" className="form-check-label">
                                Соответствие одновременно всем критериям
                                <input
                                    type="radio"
                                    name="logical-filter"
                                    id="logical-and"
                                    className="form-check-input"/>
                                <i className="input-helper" />
                            </label>
                        </div>
                        
                        <div className="form-check ml-2">
                            <label htmlFor="logical-or" className="form-check-label">
                                Соответствие хотя бы одному из критериев
                                <input
                                    type="radio"
                                    name="logical-filter"
                                    id="logical-or"
                                    className="form-check-input"/>
                                <i className="input-helper" />
                            </label>
                        </div>
                    </form>
                </div>

            </React.Fragment>
        );
    }
}
