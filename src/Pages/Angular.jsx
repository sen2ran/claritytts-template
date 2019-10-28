import React, { Component } from 'react';
import AuthLaylout from '../Hoc/AuthLayout'

import { getDetails } from "../services/Apicalls";

import Content from '../Components/Common/Content'
import MetaTag from '../Components/Common/MetaTag'

class Enterprise extends Component {
    state = {
        name: "",
        metaTag: ""
    }

    async componentDidMount() {
        const singleNav = await getDetails("enterprise.json")
        this.setState({
            name: singleNav.name,
            metaTag: singleNav.metaTag
        })
    }

    render() {
        const {
            title,
            image,
            shortDescription,
            description,
            shortDescriptionRu,
            descriptionRu
        } = this.state.metaTag

        const { name } = this.state
        return (
            name ?
                <AuthLaylout>
                    <MetaTag
                        name={name}
                        title={title}
                        shortDescription={shortDescription}
                        shortDescriptionRu={shortDescriptionRu}
                        image={image}
                    />
                    <Content
                        name={title}
                        imageUrl={image}
                        description={description}
                        descriptionRu={descriptionRu}
                    />
                </AuthLaylout>
                :<AuthLaylout></AuthLaylout>
        )
    }
}

export default Enterprise