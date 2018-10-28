import React from 'react';


const CardWrapper = ({ title, children, tourStepClass }) =>
    <div className={`col-md-12 grid-margin stretch-card ${tourStepClass}`}>
        <div className="card">
            <div className="card-body">
                <h4 className="text-primary">{title}</h4>
                <br/>

                {children}

            </div>
        </div>
    </div>

export default CardWrapper;
