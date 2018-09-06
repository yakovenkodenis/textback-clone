import React, { Component } from 'react';
import shortid from 'shortid';


export default class DroppedFilesList extends Component {

    list = files => {
        const label = file =>
            `${file.name} of size ${file.size} and type ${file.type}`;

        return files.map(file => <li key={shortid.generate()}>{label(file)}</li>)
    }

    render() {
        const { files } = this.props;

        if (files.length === 0) {
            return null;
        }

        return (
            <div>{this.list(files)}</div>
        )
    }
}
