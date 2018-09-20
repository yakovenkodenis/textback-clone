import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import makeAnimated from 'react-select/lib/animated';
import diff from 'object-diff';

import agent from '../../agent';


export default class Filters extends Component {

    state = {
        AndTags: false,
        InTags: [],
        NotInTags: []
    }

    componentDidUpdate(prevProps, prevState) {
        const difference = diff(prevState, this.state);

        if (Object.keys(difference).length) {
            let { InTags, NotInTags, AndTags } = this.state;

            InTags = InTags.map(tag => parseInt(tag.value, 10));
            NotInTags = NotInTags.map(tag => parseInt(tag.value, 10));

            console.log('INITIATE LOADING WITH DATA: ', this.state);
            this.props.getSubscribersList({ InTags, NotInTags, AndTags });
        }
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

    handleSelectChangeForInTags = (tags) => {
        this.setState({
            ...this.state,
            InTags: tags
        });
    }

    handleSelectChangeForNotInTags = (tags) => {
        
        this.setState({
            ...this.state,
            NotInTags: tags
        });
    }

    handleAndTagsChange = e => {
        this.setState({
            ...this.state,
            AndTags: e.target.value === 'ALL'
        })
    }

    render() {
        const { isMobile } = this.props;

        return (
            <React.Fragment>
                <p className="h5">
                    <span className="mdi mdi-filter" />
                    Фильтр
                </p>

                <div className={`filters row ${isMobile ? "px-4" : ""}`}>
                    <div className={`${isMobile ? "col-12" : "col-6"}`}>
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
                            onChange={this.handleSelectChangeForInTags}
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
                            onChange={this.handleSelectChangeForNotInTags}
                            noOptionsMessage={() => "Нет тегов"}
                        />
                    </div>
                    <form className={`align-items-center ${isMobile ? "" : "pt-5"} mt-3`}>
                        <div className="form-check ml-2">
                            <label htmlFor="logical-and" className="form-check-label">
                                Соответствие одновременно всем критериям
                                <input
                                    defaultChecked
                                    onChange={this.handleAndTagsChange}
                                    type="radio"
                                    value="ALL"
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
                                    onChange={this.handleAndTagsChange}
                                    type="radio"
                                    name="logical-filter"
                                    id="logical-or"
                                    value="OR"
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
