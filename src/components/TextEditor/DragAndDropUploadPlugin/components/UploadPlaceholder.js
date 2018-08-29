import React, { Component } from 'react';


export default class UploadPlaceholder extends Component {
    render() {
        const { blockProps, block } = this.props;

        return (
            <span contentEditable={false} data-offset-key={`${block.get('key')}-0-0`}>
                ![Загрузка {blockProps.name}...](){' '}
            </span>
        )
    }
}
