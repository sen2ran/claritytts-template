import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import Input from "../Input/InputField";
import PlusButton from "../Input/PlusButton";
import MinusButton from "../Input/MinusButton";
import {
  FARE_RANGE_ARRAY,
  FARE_RANGE_OPTION_PLACEHOLDER,
  FARE_RANGE_FROM_PLACEHOLDER,
  FARE_RANGE_TO_PLACEHOLDER
} from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setFareRangeFn } from "../../store/actions/FareRangeAction";

import {
  FARE_RANGE_FROM_REQUIRED,
  FARE_RANGE_OPTION_REQUIRED,
  FARE_RANGE_TO_REQUIRED
} from './Constants/ErrorMessages'

const FareRange = props => {
  const [fareBaseRange, setFareBaseRange] = useState([]);

  if(!props.isValid){
    let tFareRange = [...fareBaseRange]
    const lastIndex = tFareRange.length - 1
    const lastValue  = tFareRange[lastIndex]
    if(lastValue){
      if(lastValue.condition.length === 0 && !lastValue.condtionErrorMessage){
        tFareRange[lastIndex].condtionErrorMessage = FARE_RANGE_OPTION_REQUIRED
        setFareBaseRange(tFareRange)
        console.log("gi")
      }

      if(!lastValue.from && !lastValue.fromErrorMessage) {
        tFareRange[lastIndex].fromErrorMessage = FARE_RANGE_FROM_REQUIRED
        setFareBaseRange(tFareRange)
      }

      if(!lastValue.to && !lastValue.toErrorMessage){
        tFareRange[lastIndex].toErrorMessage = FARE_RANGE_TO_REQUIRED
        setFareBaseRange(tFareRange)
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.fareRange && props.fareRange.length > 0) {
        let tmpFareRange = props.fareRange;
        let convertedArray = tmpFareRange.map(function(obj) {
          return {
            condition: FARE_RANGE_ARRAY.filter(
              val => val.value === obj.operator
            ),
            from: obj.from_value,
            to: obj.to_value
          };
        });
        setFareBaseRange(convertedArray);
      } else {
        setFareBaseRange([
          {
            condition: [
              {
                name: "Per Pax Base Fare",
                value: "PPBF"
              }
            ],
            from: "",
            to: ""
          }
        ]);
      }
    } else {
      setFareBaseRange([
        {
          condition: [
            {
              name: "Per Pax Base Fare",
              value: "PPBF"
            }
          ],
          from: "",
          to: ""
        }
      ]);
    }
  }, []);
  //<<EditDetail

  const convertedFareBaseRange = fareBaseRange.map(function(val) {
    return {
      criteria_code: "fareRange",
      operator: fareBaseRange[0].condition.length > 0 ?  fareBaseRange[0].condition[0].value : "",
      from_value: val.from,
      to_value: val.to,
      value_type: "D"
    };
  });

  props.setFareRangeFn(convertedFareBaseRange);

  const changeHandler = (val, index) => {
    
    let tFareBaseRange = [...fareBaseRange];
    if (val.length > 0) {
      tFareBaseRange[index].condition = val;
      tFareBaseRange[index].condtionErrorMessage = ""
      setFareBaseRange(tFareBaseRange);
    }
    else {
      tFareBaseRange[index].condition = [];
      setFareBaseRange(tFareBaseRange);
    }
  };

  const inputChange = (val, index, isFrom) => {
    
    let tFareBaseRange = [...fareBaseRange];
    if (val) {
      const nVal = parseInt(val);
      if (Number.isInteger(nVal)) {
        if (isFrom) {
          tFareBaseRange[index].fromErrorMessage = ""
          tFareBaseRange[index].from = parseInt(val);
        } else {
          tFareBaseRange[index].toErrorMessage = ""
          tFareBaseRange[index].to = parseInt(val);
        }
      }
    } else {
      if (isFrom) {
        tFareBaseRange[index].from = "";
      } else {
        tFareBaseRange[index].to = "";
      }
    }
    setFareBaseRange(tFareBaseRange);
  };

  const plusButtonHandler = index => {
    
    let tFareBaseRange = [...fareBaseRange];
    const lastIndex = tFareBaseRange.length - 1;
    const lastFreBaseRange = tFareBaseRange[lastIndex];
    
    if (
      tFareBaseRange[0].condition.length > 0 &&
      lastFreBaseRange.from !== "" &&
      lastFreBaseRange.to !== ""
    ) {
      tFareBaseRange.push({
        condition: lastFreBaseRange.condition,
        from: "",
        to: ""
      });
      setFareBaseRange(tFareBaseRange);
    } else {
      //error
      if(tFareBaseRange[0].condition.length == 0){
        tFareBaseRange[lastIndex].condtionErrorMessage = FARE_RANGE_OPTION_REQUIRED
      }

      if(!lastFreBaseRange.from){
        tFareBaseRange[lastIndex].fromErrorMessage = FARE_RANGE_FROM_REQUIRED
      }

      if(!lastFreBaseRange.to){
        tFareBaseRange[lastIndex].toErrorMessage = FARE_RANGE_TO_REQUIRED
      }

      setFareBaseRange(tFareBaseRange);
    }
  };

  const minusButtonHandler = index => {
    let tFareBaseRange = [...fareBaseRange];

    tFareBaseRange = tFareBaseRange.filter((val, i) => {
      return i != index;
    });

    setFareBaseRange(tFareBaseRange);
  };

  return (
    <CriteriaLayout heading="FareRange">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <DropDown
              selectedValue={fareBaseRange.length > 0 ? fareBaseRange[0].condition : []}
              placeHolder={FARE_RANGE_OPTION_PLACEHOLDER}
              defaultDropDownArray={FARE_RANGE_ARRAY}
              isMulti={false}
              onChangeAction={(val, index) => changeHandler(val, index)}
              errorMessage = {fareBaseRange.length > 0 ? fareBaseRange[fareBaseRange.length - 1].condtionErrorMessage : ""}
            />
          </div>
        </div>
        <br />
        {fareBaseRange.map((val, index) => (
          <div key={index}>
            <div className="row">
              <div className="col-5">
                <Input
                  index={index}
                  value={val.from}
                  placeholder={FARE_RANGE_FROM_PLACEHOLDER}
                  changeHandler={val => inputChange(val, index, true)}
                  errorMessage = {val.fromErrorMessage}
                />
              </div>

              <div className="col-5">
                <Input
                  index={index}
                  value={val.to}
                  placeholder={FARE_RANGE_TO_PLACEHOLDER}
                  changeHandler={val => inputChange(val, index, false)}
                  errorMessage = {val.toErrorMessage}
                />
              </div>

              {index === 0 ? (
                <div className="col-2">
                  <PlusButton
                    onClickHandler={index => plusButtonHandler(index)}
                    index={index}
                  />{" "}
                </div>
              ) : (
                <div className="col-2">
                  <MinusButton
                    onClickHandler={index => minusButtonHandler(index)}
                    index={index}
                  />
                </div>
              )}
            </div>
            <br />
          </div>
        ))}
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.FareRange.isValid,
    isEdit: state.EditDetails.isEdit,
    fareRange: state.EditDetails.fareRange
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFareRangeFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FareRange);
