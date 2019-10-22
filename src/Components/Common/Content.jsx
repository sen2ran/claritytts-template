import React from 'react'

const Footer = ({ name, imageUrl, description }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>{name}</h1>
                    <img
                        src={imageUrl}
                        alt={name + " Image"}
                        style={{
                            // width: "100%",
                            textAlign: 'center',
                            maxHeight: '250px'
                        }}
                    />
                    <p style={{
                        color: "#6c757d"
                    }}>{description}</p>
                </div>
            </div>
        </div>
    );
};
export default Footer;