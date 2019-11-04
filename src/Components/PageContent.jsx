import React, { Fragment } from "react";

import DefaultCriterias from "./DefaultCriterias";
import OptionalCriterias from "./OptionalCriterias";

const PageContent = props => {
  return (
    <Fragment>
      <h1>{props.heading}</h1>
      <hr />
      <DefaultCriterias />
      <OptionalCriterias />
    </Fragment>
  );
};

export default PageContent;
