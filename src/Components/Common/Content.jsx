import React from 'react'
import { connect } from 'react-redux';

const Content = ({ name, imageUrl, description, descriptionRu, header }) => {
    return (
        <div className="container">
            <div className="row" >
                <div className="col-md-4">
                    <img
                        src={imageUrl}
                        alt={name + " Image"}
                        style={{
                            textAlign: 'center',
                            maxHeight: '250px'
                        }}
                    />

                </div>
                <div className="col-md-8" style={{ height: '250px', justifyContent: 'left', alignItems: 'center', padding: '0', display: 'flex', flexWrap: 'inherit' }}>
                    <h1 style={{ float: 'left' }}>{name}</h1>
                    <p style={{
                        color: "#6c757d"
                    }}>{header.country === 'en' ? description : descriptionRu}</p>
                </div>
            </div>
        </div>
    );
};


function mapStateToProps(state) {
    return {
        header: state.headerData
    }
}

export default connect(mapStateToProps, null)(Content);