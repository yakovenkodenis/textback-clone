import React from 'react';

const Next = ({ isActive, goToNextStep }) => {
    if (!isActive) return null;
    return (
        <button className="btn btn-light btn-fw mx-1" onClick={() => goToNextStep()}>
            Next
        </button>
    )
}

export default Next;
