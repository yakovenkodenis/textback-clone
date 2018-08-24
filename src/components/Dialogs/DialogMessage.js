import React from 'react';
import { toImage } from 'emojione';


const DialogMessage = ({
    isInverted,
    body,
    date
}) => (
    <div className={
        `timeline-wrapper ${isInverted? 'timeline-inverted' : ''} timeline-wrapper-success`
    }>
        <div className="timeline-panel">
            <div className="timeline-body">
                <p
                    className="convert-emoji"
                    dangerouslySetInnerHTML={{
                        __html: toImage(body)
                    }}
                />
            </div>
        </div>
    </div>
);

export default DialogMessage;
