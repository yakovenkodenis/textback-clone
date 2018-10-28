import React from 'react';

const Submit = ({ isActive }) => {
    if (!isActive) return null;
    return (
        <button className="btn btn-light btn-fw mx-1" type="submit">
            Submit
        </button>
    )
}

export default Submit;
