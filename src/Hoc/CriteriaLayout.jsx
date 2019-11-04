import React from 'react';

const CriteriaLayout = (props) => {
    return (
        <div className="col-6 pt-2">
            <div className="card">
                <div className="card-header">
                    <h4>{props.heading}</h4>
                </div>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default CriteriaLayout;