import React, { Component } from 'react';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import makeAnimated from 'react-select/lib/animated';

import agent from '../../../agent';


const random = salt => Math.floor(Math.random() * 10000000) + salt;

export default class CreateButton extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tags: [],
            buttonName: '',
            buttonType: 'link',
            buttonAction: 'subscribe',
            addTags: [],
            removeTags: [],
            buttonMessage: 0,
            buttonUrl: ''
        }

        this.selectTagsRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.editButton) {
            const {
                id, buttonName, message, remove_tags, add_tags, type,
                prohibit_notifications, subscribe_to_notifications, url
            } = this.props.editButton;

            let buttonAction = '';

            if (prohibit_notifications) {
                buttonAction = 'unsubscribe';
            } else if (subscribe_to_notifications) {
                buttonAction = 'subscribe';
            } else if (remove_tags) {
                buttonAction = 'removeTag';
            } else if (add_tags) {
                buttonAction = 'addTag';
            } else buttonAction = 'subscribe';

            const state = {
                id, buttonName,
                removeTags: remove_tags,
                addTags: add_tags,
                buttonType: type ? type : 'link',
                buttonMessage: message,
                buttonUrl: url,
                buttonAction
            }

            this.setState(state);
        }
    }

    addButton = () => {
        const {
            buttonName, buttonType, buttonAction,
            addTags, removeTags, buttonUrl, buttonMessage
        } = this.state;

        const additionalData = {}

        if (buttonType === 'link') {
            additionalData['url'] = buttonUrl;
        } else if (buttonType === 'response') {
            if (buttonAction === 'subscribe') {
                additionalData['subscribe_to_notifications'] = true;
            } else if (buttonAction === 'unsubscribe') {
                additionalData['prohibit_notifications'] = true;
            } else if (buttonAction === 'addTag') {
                additionalData['add_tags'] = addTags;
            } else if (buttonAction === 'removeTag') {
                additionalData['remove_tags'] = removeTags;
            }

            additionalData['message'] = buttonMessage ? buttonMessage : "0";
        }

        const id = this.props.editButton && this.props.editButton.id
            ? this.props.editButton.id
            : random(this.props.activeButtons.length);

        const button = {
            id,
            buttonName,
            type: buttonType,
            ...additionalData
        }

        this.props.addButton(button);
        this.props.goBack();
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

    onButtonDataChange = (name, e) => {
        if (name === 'buttonAction') {
            if (e.target.value === 'removeTag') {
                this.setState({
                    ...this.state,
                    [name]: e.target.value,
                    addTags: [],
                    removeTags: this.selectTagsRef.current
                                && this.selectTagsRef.current.select
                                && this.selectTagsRef.current.select.state
                                ? this.selectTagsRef.current.select.state.value
                                : []
                });
            } else if (e.target.value === 'addTag') {
                this.setState({
                    ...this.state,
                    [name]: e.target.value,
                    removeTags: [],
                    addTags: this.selectTagsRef.current
                                && this.selectTagsRef.current.select
                                && this.selectTagsRef.current.select.state
                                ? this.selectTagsRef.current.select.state.value
                                : []
                });
            } else {
                this.setState({
                    ...this.state,
                    [name]: e.target.value
                });
            }
        } else {
            this.setState({
                ...this.state,
                [name]: e.target.value
            });
        }
    }

    handleChange = (newValue, actionMeta, buttonAction) => {
        // const oldTags = this.state.tags;
        const newTags = newValue;

        switch (actionMeta.action) {
            case 'remove-value':
                // this.removeTag(oldTags, newTags);
                break;
            case 'select-option':
                // this.selectTag(newValue[newValue.length - 1]);
                break;
            case 'create-option':
                this.createTag(newValue);
                break;
            default:
                break;
        }

        if (buttonAction === 'addTag') {
            this.setState({
                ...this.state,
                addTags: newTags,
                removeTags: []
            });
        } else if (buttonAction === 'removeTag') {
            this.setState({
                ...this.state,
                removeTags: newTags,
                addTags: []
            });
        }
    }

    createTag = (value) => {
        // console.log('Creating new tag: ', value);

        // const {
        //     channelId, subscriberId
        // } = this.props;

        // const newTag = value[value.length - 1].label;

        // agent.Tags.addTag(subscriberId, channelId, newTag)
        // .then(response => {
        //     console.log('AFTER TAG ADDITION: ');
        //     console.log(response);
        // })
    }

    renderFormForLinkButton = () => {
        return (
            <div className="form-group">
                <label htmlFor="buttonUrl">URL-адрес</label>                
                <input
                    type="text"
                    placeholder="Введите URL (можно с UTM)"
                    className="form-control form-control-lg"
                    id="buttonUrl"
                    value={this.state.buttonUrl ? this.state.buttonUrl : ''}
                    onChange={e => { this.onButtonDataChange('buttonUrl', e); }}
                />
            </div>
        );
    }

    renderFormForResponseButton = (messages) => {
        const action = this.state.buttonAction;

        return (
        <React.Fragment>
            <div className="form-group">
                <label htmlFor="buttonAction">Действие</label>
                <select
                    id="buttonAction" className="form-control form-control-lg"
                    value={this.state.buttonAction}
                    onChange={e => { this.onButtonDataChange('buttonAction', e); }}
                >
                    <option value="subscribe">Подписаться на уведомления</option>
                    <option value="unsubscribe">Запретить уведомления</option>
                    <option value="addTag">Добавить тег</option>
                    <option value="removeTag">Снять тег</option>
                </select>
            </div>
            {
                (action === 'addTag' || action === 'removeTag')
                && this.renderTagSelectionForm(action)
            }
            <div className="form-group">
                <label htmlFor="buttonMessage">Сообщение</label>
                <select
                    id="buttonMessage" className="form-control form-control-lg"
                    value={this.state.buttonMessage ? this.state.buttonMessage : "0"}
                    onChange={e => { this.onButtonDataChange('buttonMessage', e); }}
                    onClick={e => { this.onButtonDataChange('buttonMessage', e); }}
                >
                    {
                        messages.map((message) => (
                            <option value={message.messageId} key={message.messageId}>
                                {message.message.messageText}
                            </option>
                        ))
                    }
                </select>
            </div>
        </React.Fragment>
        );
    }

    renderTagSelectionForm = (action) => {
        const placeholder =
            action === 'addTag'
            ? 'Добавить тег'
            : action === 'removeTag'
            ? 'Снять тег'
            : '';

        const tags =
            action === 'addTag'
            ? this.state.addTags
            : action === 'removeTag'
            ? this.state.removeTags
            : []

        return (
            <div className="form-group">
                <AsyncCreatableSelect
                    ref={this.selectTagsRef}
                    isMulti
                    cacheOptions
                    defaultOptions
                    value={tags}
                    loadOptions={this.loadTags}
                    onChange={
                        (newValue, actionMeta) => { this.handleChange(newValue, actionMeta, action); }
                    }
                    closeMenuOnSelect={true}
                    components={makeAnimated()}
                    loadingMessage={() => "Загрузка..."}
                    noOptionsMessage={() => "Нет тегов"}
                    allowCreateWhileLoading
                    formatCreateLabel={label => `Создать "${label}"`}
                    placeholder={placeholder}
                />
            </div>
        );
    }

    render() {
        const { isMobile, button, goBack, messages } = this.props;

        return (
        <React.Fragment>
            <button 
                className={`btn btn-light btn-icon-text ${isMobile ? "mb-1 w-100" : "align-self-end"}`}
                type="button"
                style={{
                    width: '30%'
                }}
                onClick={goBack}
            >
                <i className="mdi mdi-keyboard-backspace btn-icon-prepend" />
                Назад
            </button>

            <form onSubmit={this.handleSubmitForm} className="pt-3">
                <div className="form-group">
                    <label htmlFor="buttonName">Название кнопки</label>                
                    <input
                        type="text"
                        placeholder="Название кнопки"
                        className="form-control form-control-lg"
                        id="buttonName"
                        value={this.state.buttonName}
                        onChange={e => { this.onButtonDataChange('buttonName', e); }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="buttonType">Тип кнопки</label>
                    <select
                        id="buttonType" className="form-control form-control-lg"
                        onChange={e => { this.onButtonDataChange('buttonType', e); }}
                        value={this.state.buttonType}
                    >
                        <option value="link">Ссылка</option>
                        <option value="response">Ответ</option>
                    </select>
                </div>

                {
                    this.state.buttonType === 'link'
                    ? this.renderFormForLinkButton()
                    : this.state.buttonType === 'response'
                    ? this.renderFormForResponseButton(messages)
                    : null
                }

            </form>
            <div className="flex justify-content-left mb-3">
                <button
                    className={`btn btn-light btn-icon-text ${isMobile ? "w-100 mt-2" : "ml-1"}`}
                    type="button"
                    onClick={this.addButton}
                    disabled={this.state.buttonName === ''}
                >
                    Сохранить
                </button>
            </div>
        </React.Fragment>
        );
    }
}
