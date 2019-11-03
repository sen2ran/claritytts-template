import React, { Component } from 'react';
import AuthLayout from '../Hoc/AuthLayout';

import DefaultCriterias from '../Components/DefaultCriterias'

import { getCriterias } from "../services/Apicalls";

class All extends Component {

    state = {
        defaultCriteriasList: [],
        optionalCriteriasList: []
    }

    async componentDidMount() {
        const allCriterias = await getCriterias("all_criterias.json")
        this.setState({
            defaultCriteriasList: allCriterias.default_criterias,
            optionalCriteriasList: allCriterias.optional_criterias
        })
    }

    render() {
        const { defaultCriteriasList } = this.state
        return (
            <AuthLayout>
                <h1>All</h1>
                <hr/>
                <DefaultCriterias defaultCriteriasList={defaultCriteriasList} />
            </AuthLayout>
        );
    }
}

export default All;