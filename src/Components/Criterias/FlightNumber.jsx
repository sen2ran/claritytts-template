import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import SingleFlightNumber from "./Common/SingleFlightNumber";
import {
  FLIGHT_NUMBER_FLIGHT_PLACEHOLDER,
  FLIGHT_NUMBER_FLIGHT_PLACEHOLDER_EXCLUDE,
  FLIGHT_NUMBER_FLIGHT_FROM_PLACEHOLDER,
  FLIGHT_NUMBER_FLIGHT_FROM_PLACEHOLDER_EXCLUDE,
  FLIGHT_NUMBER_FLIGHT_TO_PLACEHOLDER,
  FLIGHT_NUMBER_FLIGHT_TO_PLACEHOLDER_EXCLUDE
} from "./Constants";

import {
  AIRLINE_REQUIRED_FLIGHT_NUMBER,
  FROM_REQUIRED_FLIGHT_NUMBER,
  TO_REQUIRED_FLIGHT_NUMBER
} from "./Constants/ErrorMessages";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setFlightNumberFn,
  setExcludeFlightNumberFn,
  setReturnFlightNumberFn,
  setReturnExcludeFlightNumberFn
} from "../../store/actions/FlightNumberAction";


const FlightNumber = props => {
  let {
    setFlightNumberFn,
    setExcludeFlightNumberFn,
    setReturnFlightNumberFn,
    setReturnExcludeFlightNumberFn
  } = props;

  const [include, setInclude] = useState([]);

  const [exclude, setExclude] = useState([]);

  if (!props.isValid) {
    let tInclude = [...include];
    let lastIndex = tInclude.length - 1;
    let lastValue = tInclude[lastIndex];

    if (lastValue) {
      if (lastValue.airLine.length === 0 && !lastValue.airlineRequiredMessage) {
        tInclude[
          lastIndex
        ].airlineRequiredMessage = TO_REQUIRED_FLIGHT_NUMBER;
        setInclude(tInclude);
        
      }

      if (!lastValue.from && !lastValue.fromValueRequiredMessage) {
        tInclude[lastIndex].fromValueRequiredMessage = AIRLINE_REQUIRED_FLIGHT_NUMBER;
        setInclude(tInclude);
      }

      if (!lastValue.to && !lastValue.toValueRequiredMessage) {
        tInclude[lastIndex].toValueRequiredMessage = FROM_REQUIRED_FLIGHT_NUMBER;
        setInclude(tInclude);
      }
    }


    let tExclude = [...exclude];
    lastIndex = exclude.length - 1;
    lastValue = exclude[lastIndex];

    if (lastValue) {
      if (lastValue.airLine.length === 0 && !lastValue.airlineRequiredMessage) {
        tExclude[
          lastIndex
        ].airlineRequiredMessage = TO_REQUIRED_FLIGHT_NUMBER;
        setExclude(tExclude);
        
      }

      if (!lastValue.from && !lastValue.fromValueRequiredMessage) {
        tExclude[lastIndex].fromValueRequiredMessage = AIRLINE_REQUIRED_FLIGHT_NUMBER;
        setExclude(tExclude);
      }

      if (!lastValue.to && !lastValue.toValueRequiredMessage) {
        tExclude[lastIndex].toValueRequiredMessage = FROM_REQUIRED_FLIGHT_NUMBER;
        setExclude(tExclude);
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.onwardFlightNumber && props.onwardFlightNumber.length > 0) {
        setInclude(
          props.onwardFlightNumber.map(val => {
            const tmp = {
              airLine: val.operator
                ? [
                    {
                      airline_code: val.operator,
                      airline_name: val.operator,
                      airline_country: val.operator
                    }
                  ]
                : [],
              from: val.from_value,
              to: val.to_value
            };

            return tmp;
          })
        );
      } else {
        setInclude([
          {
            airLine: [],
            from: "",
            to: ""
          }
        ]);
      }

      if (
        props.excludeOnwardFlightNumber &&
        props.excludeOnwardFlightNumber.length > 0
      ) {
        setExclude(
          props.excludeOnwardFlightNumber.map(val => {
            const tmp = {
              airLine: val.operator
                ? [
                    {
                      airline_code: val.operator,
                      airline_name: val.operator,
                      airline_country: val.operator
                    }
                  ]
                : [],
              from: val.from_value,
              to: val.to_value
            };

            return tmp;
          })
        );
      } else {
        setExclude([
          {
            airLine: [],
            from: "",
            to: ""
          }
        ]);
      }
    } else {
      setInclude([
        {
          airLine: [],
          from: "",
          to: ""
        }
      ]);

      setExclude([
        {
          airLine: [],
          from: "",
          to: ""
        }
      ]);
    }
  }, []);
  //<<EditDetail

  useEffect(() => {
    let tAirline = [];
    let includeAirline = [];
    include.filter(val => {
      tAirline = [];
      val.airLine.filter(air => {
        tAirline.push(air.airline_code);
      });
      let tmp = {
        criteria_code: "onwardFlightNumber",
        operator: String(tAirline),
        from_value: val.from,
        to_value: val.to,
        value_type: "D"
      };

      includeAirline.push(tmp);
      setFlightNumberFn({ value: includeAirline });
    });
  }, [include]);

  useEffect(() => {
    let tAirline = [];
    let excludeAirline = [];
    exclude.filter(val => {
      tAirline = [];
      val.airLine.filter(air => {
        tAirline.push(air.airline_code);
      });
      let tmp = {
        criteria_code: "excludeOnwardFlightNumber",
        operator: String(tAirline),
        from_value: val.from,
        to_value: val.to,
        value_type: "D"
      };
      excludeAirline.push(tmp);
      setExcludeFlightNumberFn({ value: excludeAirline });
    });
  }, [exclude]);

  const addDropDownValue = (val, index, isExclude) => {
    if (isExclude) {
      let tmp = [...exclude];
      tmp[index].airLine = val;
      tmp[index].airlineRequiredMessage = "";
      setExclude(tmp);
    } else {
      let tmp = [...include];
      tmp[index].airLine = val;
      tmp[index].airlineRequiredMessage = "";
      setInclude(tmp);
    }
  };

  const addFromValue = (val, index, isExclude) => {
    if (isExclude) {
      let tmp = [...exclude];
      tmp[index].from = val;
      tmp[index].fromValueRequiredMessage = "";
      setExclude(tmp);
    } else {
      let tmp = [...include];
      tmp[index].from = val;
      tmp[index].fromValueRequiredMessage = "";
      setInclude(tmp);
    }
  };

  const addToValue = (val, index, isExclude) => {
    if (isExclude) {
      let tmp = [...exclude];
      tmp[index].to = val;
      tmp[index].toValueRequiredMessage = "";
      setExclude(tmp);
    } else {
      let tmp = [...include];
      tmp[index].to = val;
      tmp[index].toValueRequiredMessage = "";
      setInclude(tmp);
    }
  };

  const increaseArray = isExclude => {
    if (isExclude) {
      let tmp = [...exclude];

      let len = tmp.length - 1;
      if (
        tmp[len].airLine.length > 0 &&
        tmp[len].from !== "" &&
        tmp[len].to !== ""
      ) {
        tmp.push({
          airLine: [],
          from: "",
          to: ""
        });
      } else {
        //Error

        const tTmp = include[len];

        if (tTmp.airLine.length === 0) {
          tmp[len].airlineRequiredMessage = AIRLINE_REQUIRED_FLIGHT_NUMBER;
        }

        if (tTmp.from === "") {
          tmp[len].fromValueRequiredMessage = FROM_REQUIRED_FLIGHT_NUMBER;
        }

        if (tTmp.to === "") {
          tmp[len].toValueRequiredMessage = TO_REQUIRED_FLIGHT_NUMBER;
        }
      }

      setExclude(tmp);
    } else {
      let tmp = [...include];

      let len = tmp.length - 1;
      if (
        tmp[len].airLine.length > 0 &&
        tmp[len].from !== "" &&
        tmp[len].to !== ""
      ) {
        tmp.push({
          airLine: [],
          from: "",
          to: ""
        });
      } else {
        //Error

        const tTmp = include[len];

        if (tTmp.airLine.length === 0) {
          tmp[len].airlineRequiredMessage = AIRLINE_REQUIRED_FLIGHT_NUMBER;
        }

        if (tTmp.from === "") {
          tmp[len].fromValueRequiredMessage = FROM_REQUIRED_FLIGHT_NUMBER;
        }

        if (tTmp.to === "") {
          tmp[len].toValueRequiredMessage = TO_REQUIRED_FLIGHT_NUMBER;
        }
      }

      setInclude(tmp);
    }
  };

  const removeArray = (isExclude, index) => {
    if (isExclude) {
      let tmp = [...exclude];
      tmp.splice(index, 1);
      setExclude(tmp);
    } else {
      let tmp = [...include];
      tmp.splice(index, 1);
      setInclude(tmp);
    }
  };

  return (
    <CriteriaLayout heading="FlightNumber">
      {include.map((val, index) => (
        <SingleFlightNumber
          key={index}
          index={index}
          fromFlight={val.from}
          toFlight={val.to}
          selectedDropDown={val.airLine}
          //   excludeDropDown={exclude[index].airLine}
          dropDownPlaceHolder={FLIGHT_NUMBER_FLIGHT_PLACEHOLDER}
          fromPlaceHolder={FLIGHT_NUMBER_FLIGHT_FROM_PLACEHOLDER}
          toPlaceHolder={FLIGHT_NUMBER_FLIGHT_TO_PLACEHOLDER}
          includeAirlineRequriedMessage={val.airlineRequiredMessage}
          includeFromFlightNumberRequiredMessage={val.fromValueRequiredMessage}
          includeToFlightNumberRequriedMessage={val.toValueRequiredMessage}
          dropDownChange={(val, index, isExclude) =>
            addDropDownValue(val, index, isExclude)
          }
          addArray={isExclude => {
            increaseArray(isExclude);
          }}
          minusArray={(isExclude, index) => {
            removeArray(isExclude, index);
          }}
          addFromValue={(val, index, isExclude) =>
            addFromValue(val, index, isExclude)
          }
          addToValue={(val, index, isExclude) =>
            addToValue(val, index, isExclude)
          }
        />
      ))}

      <br />

      {exclude.map((val, index) => (
        <SingleFlightNumber
          isExclude={true}
          key={index}
          index={index}
          fromFlight={val.from}
          toFlight={val.to}
          selectedDropDown={val.airLine}
          //   excludeDropDown={include[index].airLine}
          dropDownPlaceHolder={FLIGHT_NUMBER_FLIGHT_PLACEHOLDER}
          fromPlaceHolder={FLIGHT_NUMBER_FLIGHT_FROM_PLACEHOLDER}
          toPlaceHolder={FLIGHT_NUMBER_FLIGHT_TO_PLACEHOLDER}
          includeAirlineRequriedMessage={val.airlineRequiredMessage}
          includeFromFlightNumberRequiredMessage={val.fromValueRequiredMessage}
          includeToFlightNumberRequriedMessage={val.toValueRequiredMessage}
          dropDownChange={(val, index, isExclude) =>
            addDropDownValue(val, index, isExclude)
          }
          addArray={isExclude => {
            increaseArray(isExclude);
          }}
          minusArray={(isExclude, index) => {
            removeArray(isExclude, index);
          }}
          addFromValue={(val, index, isExclude) =>
            addFromValue(val, index, isExclude)
          }
          addToValue={(val, index, isExclude) =>
            addToValue(val, index, isExclude)
          }
        />
      ))}
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.FlightNumber.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardFlightNumber: state.EditDetails.onwardFlightNumber,
    excludeOnwardFlightNumber: state.EditDetails.excludeOnwardFlightNumber,
    excludeOnwardFlightNumber: state.EditDetails.excludeOnwardFlightNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFlightNumberFn,
      setExcludeFlightNumberFn,
      setReturnFlightNumberFn,
      setReturnExcludeFlightNumberFn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightNumber);
