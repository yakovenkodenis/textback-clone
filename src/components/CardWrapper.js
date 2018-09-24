import React from 'react';
import MediaQuery from 'react-responsive';


const CardWrapper = ({ title, children, isCardBody, isMobile }) =>
    <div className={`col-md-12 grid-margin stretch-card ${isMobile ? "p-0" : ""}`}>
        <div className="card">
        {
            isCardBody
            ? {children}
            : (
                <div className="card-body">
                    <h4 className="text-primary">{title}</h4>
                    <br/>
                    {children}
                </div>
            )
        }
        </div>
    </div>

const ResponsiveCardWrapper = props => (
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <CardWrapper isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
)

export default ResponsiveCardWrapper;
