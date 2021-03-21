import React from "react";

import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";

const BaseLayout = (props) => {
  return (
    <div>
      <Header />
      <main role="main"  style={{margin: "10px"}}>
        {props.children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default BaseLayout;
