import React, { Component } from 'react';
import AuthLayout from '../Hoc/AuthLayout';

class Feature extends Component {
    render() {
        return (
            <AuthLayout>
                <h1>Feature</h1>
            </AuthLayout>
        );
    }
}

export default Feature;