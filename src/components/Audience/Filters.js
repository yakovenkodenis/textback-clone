import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import makeAnimated from 'react-select/lib/animated';
import diff from 'object-diff';

import agent from '../../agent';


export default class Filters extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            AndTags: false,
            InTags: [],
            NotInTags: [],
    
            allowStateChange: true
        }

        this.inTagsSelectRef = React.createRef();
        this.notInTagsSelectRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {

        // console.log('componentDidUpdate Filters.js: ', this.props.edit, this.props.defaultFilters);

        if (
            this.props.edit
            && this.props.defaultFilters
            && this.allowStateChange
            && this.inTagsSelectRef.current.select
            && this.notInTagsSelectRef.current.select
        ) {
            const { inTags, notInTags, andTags } = this.props.defaultFilters;

            console.log('Filters.js update: ', inTags, notInTags, andTags);

            if (this.inTagsSelectRef.current) {
                console.log(this.inTagsSelectRef.current);
                this.inTagsSelectRef.current.select.setValue(inTags);
            }

            if (this.notInTagsSelectRef.current) {
                this.notInTagsSelectRef.current.select.setValue(notInTags);
            }

            this.setState({
                ...this.state,
                AndTags: andTags,
                InTags: inTags,
                NotInTags: notInTags,
                allowStateChange: false
            });
        }

        const difference = diff(prevState, this.state);

        if (Object.keys(difference).length) {
            let { InTags, NotInTags, AndTags } = this.state;

            InTags = InTags.map(tag => parseInt(tag.value, 10));
            NotInTags = NotInTags.map(tag => parseInt(tag.value, 10));

            console.log('INITIATE LOADING WITH DATA: ', this.state);

            if (this.props.updateFilters) {
                this.props.updateFilters({
                    inTags: InTags,
                    notInTags: NotInTags, 
                    andTags: AndTags
                });
            }

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
        }, () => {
            this.syncFilters();
        });
    }

    handleSelectChangeForNotInTags = (tags) => {
        this.setState({
            ...this.state,
            NotInTags: tags
        }, () => {
            this.syncFilters();
        });
    }

    handleAndTagsChange = e => {
        this.setState({
            ...this.state,
            AndTags: e.target.value === 'ALL'
        }, () => {
            this.syncFilters();
        });
    }

    syncFilters = () => {
        if (this.props.updateFilters) {
            this.props.updateFilters({
                inTags: this.state.InTags,
                notInTags: this.state.NotInTags, 
                andTags: this.state.AndTags
            });
        }
    }

    render() {
        const { isMobile } = this.props;
        const inTagsValue = this.props.defaultFilters
            ? this.props.defaultFilters.inTags
            : this.state.InTags;

        const notInTagsValue = this.props.defaultFilters
            ? this.props.defaultFilters.notInTags
            : this.state.NotInTags;

        const isAndTags = this.props.defaultFilters
            ? this.props.defaultFilters.andTags
            : this.state.AndTags;

        return (
            <React.Fragment>
                {
                    !this.props.withoutTitle &&
                    <p className="h5">
                        <span className="mdi mdi-filter" />
                            Фильтр
                    </p>
                }
                <div className={`filters row ${isMobile ? "px-4" : ""}`}>
                    <div className={`${isMobile ? "col-12" : "col-6"}`}>
                        <p>Присвоен тег: </p>
                        <AsyncSelect
                            closeMenuOnSelect={true}
                            ref={this.inTagsSelectRef}
                            components={makeAnimated()}
                            isMulti
                            cacheOptions
                            defaultOptions
                            value={inTagsValue}
                            placeholder="Присвоен тег"
                            loadingMessage={() => "Загрузка..."}
                            loadOptions={this.loadTags}
                            onChange={this.handleSelectChangeForInTags}
                            noOptionsMessage={() => "Нет тегов"}
                        />
                        <br/>
                        <p>Не присвоен тег: </p>
                        <AsyncSelect
                            closeMenuOnSelect={true}
                            ref={this.notInTagsSelectRef}
                            components={makeAnimated()}
                            isMulti
                            cacheOptions
                            defaultOptions
                            value={notInTagsValue}
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
                                    onChange={this.handleAndTagsChange}
                                    checked={isAndTags}
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
                                    checked={!isAndTags}
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
