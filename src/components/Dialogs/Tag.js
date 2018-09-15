import React, { Component } from 'react';


export default class Tag extends Component {
    render() {

        const { text, id } = this.props;

        return (
            <label className="badge badge-outline-dark badge-margin-3" value={id}>
                {text}
            </label>
        )
    }
}
