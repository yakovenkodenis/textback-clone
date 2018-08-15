import React from 'react';


const TimelineItem = ({
    isInverted,
    heading,
    body,
    likesNumber,
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

export default TimelineItem;
