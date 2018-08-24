import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';


import React, { Component } from 'react';
import classNames from 'classnames';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';

import editorStyles from './editorStyles.css';


const emojiPlugin = createEmojiPlugin();
const mentionPlugin = createMentionPlugin();
const hashtagPlugin = createHashtagPlugin();

const plugins = [emojiPlugin, hashtagPlugin, mentionPlugin];

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const text = '';


const variables = [
    {
        name: '*username*',
        link: 'https://google.com'
    },
    {
        name: '*subscriber*',
        link: 'https://github.com'
    },
    {
        name: '*fucking variable*',
        link: 'https://telegram.org'
    }
];

export default class AdvancedTextEditor extends Component {
    
    state = {
        editorState: createEditorStateWithText(text),
        suggestions: variables
    };

    onChange = editorState => {
        this.setState({
            ...this.state,
            editorState
        });
    };

    onSearchChange = ({ value }) => {
        this.setState({
            ...this.state,
            suggestions: defaultSuggestionsFilter(value, variables)
        });
    }

    onAddMention = (mention) => {
        // get the mention object selected
        console.log('Mention: ', mention);
    }

    focus = () => {
        this.editor.focus();
    };

    render() {

        const { MentionSuggestions } = mentionPlugin;

        return (
            <div>
                <div className={editorStyles.editor} onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={e => { this.editor = e; }}
                        placeholder="Отправить сообщение..."
                    />
                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                    />
                    <EmojiSuggestions />
                </div>
                <div className={classNames(editorStyles.options/*, "d-flex", "justify-content-end"*/)}>
                    <EmojiSelect />
                </div>
            </div>
        )
    }
}
