import React from 'react';


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
                <p>{body}</p>
            </div>
        </div>
    </div>
);

export default DialogMessage;
