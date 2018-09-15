import React, { Component } from 'react';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import makeAnimated from 'react-select/lib/animated';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import agent from '../../agent';


@inject('subscribersStore')
@withRouter
@observer
export default class TagsContainer extends Component {

    state = {
        tags: []
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

    handleChange = (newValue, actionMeta) => {
        console.group('Value changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

        const oldTags = this.state.tags;
        const newTags = newValue;

        switch (actionMeta.action) {
            case 'remove-value':
                this.removeTag(oldTags, newTags);
                break;
            case 'select-option':
                this.selectTag(newValue[newValue.length - 1]);
                break;
            case 'create-option':
                this.createTag(newValue);
                break;
            default:
                break;
        }

        this.setState({
            tags: newTags
        });
    }

    removeTag = (oldTags, newTags) => {
        const diff = [...new Set(
            [...new Set(oldTags)].filter(x => !new Set(newTags).has(x))
        )][0];

        const tagId = diff.value;

        agent.Tags.deleteTag(this.props.subscriberId, this.props.channelId, parseInt(tagId, 10))
        .then(response => {
            console.log('DELETE TAG FROM USER: ', response);
        });
    }

    selectTag = (tag) => {
        agent.Tags.addTag(this.props.subscriberId, this.props.channelId, tag.label)
        .then(response => {
            console.log('ADD TAG TO USER: ', response);
        });
    }

    createTag = (value) => {
        console.log('Creating new tag: ', value);

        const {
            channelId, subscriberId
        } = this.props;

        const newTag = value[value.length - 1].label;

        agent.Tags.addTag(subscriberId, channelId, newTag)
        .then(response => {
            console.log('AFTER TAG ADDITION: ');
            console.log(response);
        })
    }

    render() {
        return (
            <div className="border-bottom py-4">
                <p>Теги пользователя</p>
                <div>
                    <AsyncCreatableSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={this.loadTags}
                        onChange={this.handleChange}
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        loadingMessage={() => "Загрузка..."}
                        noOptionsMessage={() => "Нет тегов"}
                        allowCreateWhileLoading
                        formatCreateLabel={label => `Создать "${label}"`}
                        placeholder="Присвоить теги"
                    />
                </div>
            </div>
        )
    }
}
