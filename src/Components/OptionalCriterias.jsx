import React, { Component } from 'react';
import CriteriaLoader from './CriteriaLoader'

class OptionalCriterias extends Component {
    render() {
        return (
            <div>
                <h2>OptionalCriterias</h2>
                <hr/>
                <CriteriaLoader CriteriasList={this.props.optionalCriteriasList} />
            </div>
        );
    }
}

export default OptionalCriterias;