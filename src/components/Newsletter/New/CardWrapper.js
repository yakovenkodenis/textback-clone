import React from 'react';


const CardWrapper = ({ title, children }) =>
    <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
                <h4 className="card-title text-primary">{title}</h4>
                <br/>

                {children}

            </div>
        </div>
    </div>

export default CardWrapper;
