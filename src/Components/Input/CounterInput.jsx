import React from "react";
import NumericInput from "react-numeric-input";
import ErrorLabel from "../Input/ErrorLabel";

const CounterInput = ({
  counterNumber,
  min,
  max,
  value,
  index = 0,
  errorMessage = ""
}) => {
  const myFormatFn = stringValue => {
    return stringValue.replace(/^\$/, "");
  };

  return (
    <div>
      <NumericInput
        min={min}
        max={max}
        value={value}
        format={myFormatFn}
        onChange={value => counterNumber(value, index)}
        className="input col-12"
      />
      {errorMessage ? <ErrorLabel message={errorMessage} /> : null}
    </div>
  );
};

export default CounterInput;
