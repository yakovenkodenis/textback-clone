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
        <div className="timeline-badge"></div>
        <div className="timeline-panel">
            <div className="timeline-heading">
                <h6>{heading}</h6>
            </div>
            <div className="timeline-body">
                <p>{body}</p>
            </div>
            <div className="timeline-footer d-flex align-items-center">
                <i className="mdi mdi-heart-outline text-muted mr-1"></i>
                <span>{likesNumber}</span>
                <span className="ml-auto font-weight-bold">
                    {date}
                </span>
            </div>
        </div>
    </div>
);

export default TimelineItem;
