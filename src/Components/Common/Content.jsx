import React from 'react'

const Footer = ({ name, imageUrl, description }) => {
    return (
        <div className="container">
            <div className="row" >
                <div className="col-md-4">
                    <img
                        src={imageUrl}
                        alt={name + " Image"}
                        style={{
                            // width: "100%",
                            textAlign: 'center',
                            maxHeight: '250px'
                        }}
                    />

                </div>
                <div className="col-md-8" style={{ height: '250px', justifyContent: 'left', alignItems: 'center', padding: '0', display: 'flex', flexWrap: 'inherit' }}>
                    <h1 style={{ float: 'left' }}>{name}</h1>
                    <p style={{
                        color: "#6c757d"
                    }}>{description}</p>
                </div>
            </div>
        </div>
    );
};
export default Footer;