import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import makeAnimated from 'react-select/lib/animated';

import agent from '../../../agent';


class GeneralInfo extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            title: 'Новая цепочка',
            startChain: {
                onSubscription: false,
                onTagAddition: false,
                addTags: [],
                onTagRemoval: false,
                removeTags: [],
                onDialogStart: false
            },
            unsubscribeFromChain: {
                onTagAddition: false,
                addTags: [],
                onTagRemoval: false,
                removeTags: []
            }
        }
    }

    componentDidMount() {
        this.syncState(this.state);
    }

    syncState = (state) => {
        if (this.props.updateGeneralInfoData) {
            const data = {...this.state};

            if (!data.startChain.onTagAddition) data.startChain.addTags = [];
            if (!data.startChain.onTagRemoval) data.startChain.removeTags = [];
            if (!data.unsubscribeFromChain.onTagAddition) data.unsubscribeFromChain.addTags = [];
            if (!data.unsubscribeFromChain.onTagRemoval) data.unsubscribeFromChain.removeTags = [];

            this.props.updateGeneralInfoData(data);
        }
    }

    onTitleChange = e => {
        this.setState({
            ...this.state,
            title: e.target.value
        }, () => {
            this.syncState(this.state);
        });
    }

    onStartChainOnDialogStartChange = e => {
        this.setState({
            ...this.state,
            startChain: {
                ...this.state.startChain,
                onDialogStart: Boolean(e.target.checked)
            }
        }, () => {
            this.syncState(this.state);
        });
    }

    onStartChainInfoChange = (e, name) => {
        this.setState({
            ...this.state,
            startChain: {
                ...this.state.startChain,
                [name]: Boolean(e.target.checked)
            }
        }, () => {
            this.syncState(this.state);
        });
    }

    onUnsubscribeFromChainInfoChange = (e, name) => {
        this.setState({
            ...this.state,
            unsubscribeFromChain: {
                ...this.state.unsubscribeFromChain,
                [name]: Boolean(e.target.checked)
            }
        }, () => {
            this.syncState(this.state);
        });
    }

    loadTags = () => {
        return new Promise(resolve => {
            agent.Tags.getTagsList()
            .then(tags => {
                if (tags.success) {
                    const formattedTags = tags.data.map(tag => ({
                        label: tag.description, value: tag.tag_id.toString()
                    }));

                    resolve(formattedTags);
                } else {
                    resolve([]);
                }
            });
        });
    }

    handleSelectChange = (newValue, actionMeta, action, trigger) => {
        switch (actionMeta.action) {
            case 'create-option':
                this.createTag(newValue);
                break;
            default:
                break;
        }

        this.setState({
            ...this.state,
            [action]: {
                ...this.state[action],
                [trigger]: newValue
            }
        }, () => {
            this.syncState(this.state);
        });
    }

    getAsyncCreatableSelectComponent = (tags, selectAction) => {
        const [action, trigger] = selectAction.split('.');

        const placeholder =
            trigger === 'addTags'
            ? 'Добавить теги'
            : trigger === 'removeTags'
            ? 'Снять теги'
            : '';

        const handleChange = (newValue, actionMeta) => {
            this.handleSelectChange(newValue, actionMeta, action, trigger);
        }

        return (
            <div className="form-group">
                <AsyncCreatableSelect
                    isMulti
                    cacheOptions
                    defaultOptions
                    value={tags}
                    loadOptions={this.loadTags}
                    onChange={handleChange}
                    closeMenuOnSelect={true}
                    components={makeAnimated()}
                    loadingMessage={() => "Загрузка..."}
                    noOptionsMessage={() => "Нет тегов"}
                    allowCreateWhileLoading
                    formatCreateLabel={label => `Создать "${label}"`}
                    placeholder={placeholder}
                />
            </div>
        )
    }

    render() {
        const { isMobile } = this.props;

        return (
            <React.Fragment>

            <div className={`${isMobile ? "" : "col-6"}`}>
                <p className="card-description mb-3">Название</p>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="Название цепочки..."
                        value={this.state.title}
                        onChange={this.onTitleChange}
                    />
                </div>

                <p className="card-description">Запускать цепочку</p>

                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input
                            type="checkbox" className="form-check-input"
                            onChange={(e) => { this.onStartChainInfoChange(e, 'onSubscription') }}
                            checked={this.state.startChain.onSubscription}
                        />
                        при подписке
                        <i className="input-helper"></i>
                    </label>
                </div>

                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                            onChange={(e) => { this.onStartChainInfoChange(e, 'onTagAddition') }}
                            checked={this.state.startChain.onTagAddition}
                        />
                        при добавлении тега
                        <i className="input-helper"></i>
                    </label>
                </div>
                {
                    this.state.startChain.onTagAddition
                    && this.getAsyncCreatableSelectComponent(
                        this.state.startChain.addTags, 'startChain.addTags'
                    )
                }

                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                            onChange={(e) => { this.onStartChainInfoChange(e, 'onTagRemoval') }}
                            checked={this.state.startChain.onTagRemoval}
                        />
                        при снятии тега
                        <i className="input-helper"></i>
                    </label>
                </div>
                {
                    this.state.startChain.onTagRemoval
                    && this.getAsyncCreatableSelectComponent(
                        this.state.startChain.removeTags, 'startChain.removeTags'
                    )
                }

                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                            onChange={this.onStartChainOnDialogStartChange}
                            checked={this.state.startChain.onDialogStart}
                        />
                        при начале диалога
                        <i className="input-helper"></i>
                    </label>
                </div>
                
                <p className="card-description my-4">Отписывать от цепочки</p>
                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                            onChange={(e) => {
                                this.onUnsubscribeFromChainInfoChange(e, 'onTagAddition')
                            }}
                            checked={this.state.unsubscribeFromChain.onTagAddition}
                        />
                        при добавлении тега
                        <i className="input-helper"></i>
                    </label>
                </div>
                {
                    this.state.unsubscribeFromChain.onTagAddition
                    && this.getAsyncCreatableSelectComponent(
                        this.state.unsubscribeFromChain.addTags, 'unsubscribeFromChain.addTags'
                    )
                }

                <div className="form-check form-check-flat form-check-primary">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input"
                            onChange={(e) => {
                                this.onUnsubscribeFromChainInfoChange(e, 'onTagRemoval')
                            }}
                            checked={this.state.unsubscribeFromChain.onTagRemoval}
                        />
                        при снятии тега
                        <i className="input-helper"></i>
                    </label>
                </div>
                {
                    this.state.unsubscribeFromChain.onTagRemoval
                    && this.getAsyncCreatableSelectComponent(
                        this.state.unsubscribeFromChain.removeTags, 'unsubscribeFromChain.removeTags'
                    )
                }
            </div>
            </React.Fragment>
        )
    }
}

const ResponsiveGeneralInfo = props =>(
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <GeneralInfo isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveGeneralInfo;
