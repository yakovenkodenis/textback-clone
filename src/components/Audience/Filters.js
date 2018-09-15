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

    fakeLoadOptions1 = () => {
        agent.Tags.getTagsList().then(response => {
            console.log('TAAGS');
            console.log(response);
            console.log('------------------');
        });

        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { value: 'tag1', label: 'Супер семинар 1' },
                    { value: 'tag2', label: 'Супер семинар 2' },
                    { value: 'tag3', label: 'Так себе семинар 3' },
                    { value: 'tag4', label: 'Ускоренный семинар' },
                    { value: 'tag5', label: 'Удлиннённый семинар' }
                ]);
            }, 4000)
        })
    }

    fakeLoadOptions2 = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { value: 'tag1', label: 'Супер семинар 1' },
                    { value: 'tag2', label: 'Супер семинар 2' },
                    { value: 'tag3', label: 'Так себе семинар 3' },
                    { value: 'tag4', label: 'Ускоренный семинар' },
                    { value: 'tag5', label: 'Удлиннённый семинар' }
                ]);
            }, 4000)
        })
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
                            loadOptions={this.fakeLoadOptions1}
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
                            loadOptions={this.fakeLoadOptions2}
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
