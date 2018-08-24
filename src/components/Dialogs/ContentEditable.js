import React, { Component } from 'react';
import deepEqual from 'fast-deep-equal';


const normalizeHtml = str =>
    str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');

export default class ContentEditable extends Component {

    constructor(props, context) {
        super(props, context);

        this.lastHtml = props.html;
        this.htmlEl = null;
    }

    shouldComponentUpdate(nextProps) {
        const { props, htmlEl } = this;

        if (!htmlEl) return true;

        if (
            normalizeHtml(nextProps.html) !== normalizeHtml(htmlEl.innerHTML)
            && nextProps.html !== props.html
        ) return true;

        return props.disabled !== nextProps.disabled
            || props.tagName !== nextProps.tagName
            || props.className !== nextProps.className
            || !deepEqual(props.style, nextProps.style);
    }

    componentDidUpdate() {
        if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
            this.htmlEl.innerHTML = this.lastHtml = this.props.html;
        }
    }

    emitChange = originalEvent => {
        if (!this.htmlEl) return;

        const html = this.htmlEl.innerHTML;

        if (this.props.onChange && html !== this.lastHtml) {
            const event = Object.assign({}, originalEvent, {
                target: {
                    value: html
                }
            });

            this.props.onChange(event);
        }

        this.lastHtml = html;
    }

    render() {
        const { tagName, html, ...props } = this.props;

        return React.createElement(
            tagName || 'div',
            {
                ...props,
                ref: e => this.htmlEl = e,
                onInput: this.emitChange,
                onBlur: this.props.onBlur || this.emitChange,
                contentEditable: !this.props.disabled,
                dangerouslySetInnerHTML: { __html: html }
            }
            // this.props.children
        );
    }
}
