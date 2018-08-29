import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


export default class FileUpload extends Component {
    render() {
        return (
            <Dropzone
                {...this.props}
            >
                {this.props.children}
            </Dropzone>
        )
    }
}
