import React from 'react';

const Previous = ({ isActive, goToPreviousStep }) => {
    if (!isActive) return null;
    return (
        <button className="btn btn-light btn-fw mx-1" onClick={() => goToPreviousStep()}>
            Previous
        </button>
    )
}

export default Previous;
