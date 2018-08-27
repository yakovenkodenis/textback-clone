import React from 'react';
import { toImage } from 'emojione';


const DialogMessage = ({
    owner,
    text
}) => (
    <div className={
        `timeline-wrapper ${owner? 'timeline-inverted' : ''} timeline-wrapper-success`
    }>
        <div className="timeline-panel">
            <div className="timeline-body">
                <p
                    className="convert-emoji"
                    dangerouslySetInnerHTML={{
                        __html: toImage(text)
                    }}
                />
            </div>
        </div>
    </div>
);

export default DialogMessage;
