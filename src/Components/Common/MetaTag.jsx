import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTag = ({ name, title, shortDescription, image, url }) => {


    return (
        <Helmet>

            <meta property="og:title" content={title}></meta>
            <meta property="og:description" content="FindMyLoft focuses on minimizing time and effort that is put into looking for curated properties such as apartments, villas, bungalows and etc, that fit your every requirement."></meta>
            <meta name="twitter:card" content="summary_large_image"></meta>
            <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/findmyloft-7aa45.appspot.com/o/cover.jpg?alt=media&token=18c24c62-5b73-40fb-9986-0f4dc1874714"></meta>
            {/* <title>{name.toUpperCase()}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={shortDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} /> */}

            {/* No Need change */}
            {/* <meta property="og:site_name" content="Clartytts" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image:alt" content="Alt text for image" /> */}



        </Helmet>
    );
};

export default MetaTag;