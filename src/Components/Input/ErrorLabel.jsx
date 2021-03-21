import React from "react";

const ErrorLabel = ({message}) => {
  return <div className="row">
      <div className="col-12">
          <label style={{color: "red"}}> {message}</label>
      </div>
  </div>;
};

export default ErrorLabel;
