import React from 'react';
// import { Helmet } from 'react-helmet';

const MetaTag = ({ name, title, shortDescription, image, url }) => {

    return (
        <div>
            <title>{name.toUpperCase()}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={shortDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            {/* No Need change */}
            <meta property="og:site_name" content="Clartytts" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image:alt" content="Alt text for image" />
        </div>
    );
};

export default MetaTag;