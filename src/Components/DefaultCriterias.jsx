import React, { Component } from 'react';
import CriteriaLoader from './CriteriaLoader'

class DefaultCriterias extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2>DefaultCriterias</h2>
                </div>
                <div className="card-body">
                    <CriteriaLoader CriteriasList={this.props.defaultCriteriasList} />
                </div>
            </div>
        );
    }
}

export default DefaultCriterias;