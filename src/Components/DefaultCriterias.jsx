import React, { Component } from 'react';
import CriteriaLoader from './CriteriaLoader'

class DefaultCriterias extends Component {
    render() {
        return (
            <div>
                <h2>DefaultCriterias</h2>
                <hr/>
                <CriteriaLoader CriteriasList={this.props.defaultCriteriasList} />
            </div>
        );
    }
}

export default DefaultCriterias;