import React, { Component } from 'react';
// import { renderToStaticMarkup } from 'react-dom/server';
import sanitizeHtml from 'sanitize-html';
import classNames from 'classnames';

// import ContentEditable from 'react-contenteditable';
import ContentEditable from './ContentEditable';

// import { Emoji } from 'emoji-mart';
import { emojiIndex } from 'emoji-mart';


export default class TextEditor extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            editable: true,
            html: ''
            // html: '<p class="text-muted">Отправить сообщение...</p>'
        };
    }

    // stringEndsWith = (str, test) => {
    //     return str.length >= test.length && str.substr(str.length - test.length) == test;
    // }

    

    handleChange = e => {

        // const emoji = renderToStaticMarkup(
        //     <span
        //         contentEditable={false}
        //         dangerouslySetInnerHTML={{
        //             __html: Emoji({
        //                 html: true,
        //                 set: 'twitter',
        //                 emoji: '+1',
        //                 size: 24
        //             })
        //         }}
        //     />
        // );

        const a = emojiIndex.search('christmas').map(o => o.native);
        console.log(a);

        this.setState({
            ...this.state,
            html: e.target.value
        });

        // let text = e.target.value;
        // const tmpDiv = document.createElement('div');
        // tmpDiv.innerHTML = text;
        // text = tmpDiv.textContent || tmpDiv.innerText || "";

        // if (this.state.html.substring(0, 22) === '<p class="text-muted">') {
        //     this.setState({
        //         ...this.state,
        //         html: 
        //     })
        // }

        // text = sanitizeHtml(text, this.sanitizeConf);

        // this.setState({
        //     ...this.state,
        //     html: text === "" ? text : '<p>' + text + '</p>'
        // });

        // maybe only sanitize??
    }

    // handleFocus = () => {
    //     if (this.state.html.substring(0, 22) === '<p class="text-muted">') {
    //         this.setState({
    //             ...this.state,
    //             html: "<p></p>"
    //         });
    //     }
    // }

    // handleBlur = e => {
    //     if (this.state.html === "" || this.state.html === "<p></p>") {
    //         this.setState({
    //             ...this.state,
    //             html: '<p class="text-muted">Отправить сообщение...</p>'
    //         });
    //     } else {
    //         this.sanitize();
    //     }
    // }

    sanitizeConf = {
        allowedTags: ['span', 'img', 'p', 'div', 'br'],
        allowedAttributes: {
            span: ['class', 'role', 'aria-label', 'aria-hidden'],
            img: ['class', 'id', 'role', 'aria-label', 'aria-hidden']
        }
    };

    sanitize = () => {
        this.setState({
            ...this.state,
            html: sanitizeHtml(this.state.html, this.sanitizeConf)
        });
    }

    toggleEditable = () => {
        this.setState({
            ...this.state,
            editable: !this.state.editable
        });
    }

    render() {
        return (
            <ContentEditable
                className={classNames("editable", this.props.className)}
                tagName="pre"
                html={this.state.html}
                disabled={!this.state.editable}
                onChange={this.handleChange}
                onBlur={this.sanitize}
                placeholder={"Отправить сообщение..."}
                {...this.props}
            />
        );
    }
}
