import React from 'react';
import Dropzone from 'react-dropzone';


const FileUpload = React.forwardRef((props, ref) => (
    <Dropzone
        ref={ref}
        {...props}
    >
        {props.children}
    </Dropzone>
));

export default FileUpload;
