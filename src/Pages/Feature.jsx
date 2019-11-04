import React, { Component } from 'react';
import AuthLayout from '../Hoc/AuthLayout';

import DefaultCriterias from '../Components/DefaultCriterias'
import OptionalCriterias from '../Components/OptionalCriterias'
import { getCriterias } from "../services/Apicalls";

class Feature extends Component {

    state = {
        defaultCriteriasList: [],
        optionalCriteriasList: []
    }

    async componentDidMount() {
        const allCriterias = await getCriterias("supplier_airline_blocking_rule_criterias.json")
        this.setState({
            defaultCriteriasList: allCriterias.default_criterias,
            optionalCriteriasList: allCriterias.optional_criterias
        })
    }

    render() {
        const { defaultCriteriasList ,optionalCriteriasList } = this.state
        console.log(defaultCriteriasList);
        return (
            <AuthLayout>
                <h1>Feature</h1>
                <hr />
                <DefaultCriterias defaultCriteriasList={defaultCriteriasList} />
                <OptionalCriterias optionalCriteriasList={optionalCriteriasList} />
            </AuthLayout>
        );
    }
}

export default Feature;