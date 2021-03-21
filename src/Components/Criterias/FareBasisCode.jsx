import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import Input from "../Input/InputField";
import CounterInput from "../Input/CounterInput";
import {
  FARE_BASE_CODE_ARRAY,
  FARE_BASE_CODE_OPTION_PLACEHOLDER,
  FARE_BASE_CODE_N_VALUE_PLACEHOLDER,
  FARE_BASE_CODE_INCLUDE_PLACEHOLDER,
  FARE_BASE_CODE_EXCLUDE_PLACEHOLDER
} from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setFareBasisCodeFn,
  setExcludeFareBasisCodeFn
} from "../../store/actions/FareBasisCodeAction";
import {
  FARE_BASIS_CODE_OPTION_REQUIRED,
  FARE_BASIS_CODE_START_VALUE_REQURIED,
  FARE_BASIS_CODE_END_VALUE_REQUIRED
} from './Constants/ErrorMessages'

const FareBasisCode = props => {
  let { setFareBasisCodeFn, setExcludeFareBasisCodeFn } = props;
  const [fareBaseCode, setFareBaseCode] = useState([]);

  
  if(!props.isValid){
    let tFareBaseCode  = [...fareBaseCode]
    if(tFareBaseCode.length > 0){
      if(tFareBaseCode[0].condition.length === 0 && !tFareBaseCode[0].condtionErrorMessage){
        tFareBaseCode[0].condtionErrorMessage = FARE_BASIS_CODE_OPTION_REQUIRED
        setFareBaseCode(tFareBaseCode)
      }

      if(tFareBaseCode[0].isNth && !tFareBaseCode[0].nValue && !tFareBaseCode[0].toErrorMessage){
        tFareBaseCode[0].toErrorMessage = FARE_BASIS_CODE_END_VALUE_REQUIRED
        setFareBaseCode(tFareBaseCode)
      }

      if(!tFareBaseCode[0].isNth && !tFareBaseCode[0].code && !tFareBaseCode[0].fromErrorMessage){
        tFareBaseCode[0].fromErrorMessage = FARE_BASIS_CODE_START_VALUE_REQURIED
        setFareBaseCode(tFareBaseCode)
      }
    }

    if(tFareBaseCode.length == 2){
      if(tFareBaseCode[1].condition.length === 0 && !tFareBaseCode[1].condtionErrorMessage){
        tFareBaseCode[1].condtionErrorMessage = FARE_BASIS_CODE_OPTION_REQUIRED
        setFareBaseCode(tFareBaseCode)
      }

      if(tFareBaseCode[1].isNth && !tFareBaseCode[1].nValue && !tFareBaseCode[1].toErrorMessage){
        tFareBaseCode[1].toErrorMessage = FARE_BASIS_CODE_END_VALUE_REQUIRED
        setFareBaseCode(tFareBaseCode)
      }

      if(!tFareBaseCode[1].isNth && !tFareBaseCode[1].code && !tFareBaseCode[1].fromErrorMessage){
        tFareBaseCode[1].fromErrorMessage = FARE_BASIS_CODE_START_VALUE_REQURIED
        setFareBaseCode(tFareBaseCode)
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      let OnwardFareBasisCode = [];
      let ReturnFareBasisCode;
      if (props.onwardFareBasisCode && props.onwardFareBasisCode.length > 0) {
        let tmpOnwardFareBasisCode = props.onwardFareBasisCode[0];

        OnwardFareBasisCode = {
          condition: FARE_BASE_CODE_ARRAY.filter(
            obj => obj.value === tmpOnwardFareBasisCode.operator
          ),
          nValue: tmpOnwardFareBasisCode.to_value,
          code: tmpOnwardFareBasisCode.from_value,
          isNth: tmpOnwardFareBasisCode.operator === "NTH" ? true : false
        };
      } else {
        OnwardFareBasisCode = {
          condition: [],
          nValue: "",
          code: "",
          isNth: false
        };
      }

      if (props.returnFareBasisCode && props.returnFareBasisCode.length > 0) {
        let tmpReturnFareBasisCode = props.returnFareBasisCode[0];
        ReturnFareBasisCode = {
          condition: FARE_BASE_CODE_ARRAY.filter(
            obj => obj.value === tmpReturnFareBasisCode.operator
          ),
          nValue: tmpReturnFareBasisCode.to_value,
          code: tmpReturnFareBasisCode.from_value,
          isNth: tmpReturnFareBasisCode.operator === "NTH" ? true : false
        };
      } else {
        ReturnFareBasisCode = {
          condition: [],
          nValue: "",
          code: "",
          isNth: false
        };
      }

      setFareBaseCode([OnwardFareBasisCode, ReturnFareBasisCode]);
    } else {
      setFareBaseCode([
        {
          condition: [],
          nValue: "",
          code: "",
          isNth: false
        },
        {
          condition: [],
          nValue: "",
          code: "",
          isNth: false
        }
      ]);
    }
  }, []);
  //<<EditDetail

  useEffect(() => {
    let tmp = {};
    let tmpReturn = {};

    if (fareBaseCode.length > 0) {
      if (fareBaseCode[0].isNth) {
        tmp = {
          criteria_code: "onwardFareBasisCode",
          operator:
            fareBaseCode[0].condition.length > 0
              ? fareBaseCode[0].condition[0].value
              : "",
          from_value: fareBaseCode[0].code,
          to_value: fareBaseCode[0].nValue,
          value_type: "D"
        };
      } else {
        tmp = {
          criteria_code: "onwardFareBasisCode",
          operator:
            fareBaseCode[0].condition.length > 0
              ? fareBaseCode[0].condition[0].value
              : "",
          from_value: fareBaseCode[0].code,
          to_value: "",
          value_type: "D"
        };
      }

      setFareBasisCodeFn({ value: [tmp] });

      if (fareBaseCode[1].isNth) {
        tmpReturn = {
          criteria_code: "returnFareBasisCode",
          operator:
            fareBaseCode[1].condition.length > 0
              ? fareBaseCode[1].condition[0].value
              : "",
          from_value: fareBaseCode[1].code,
          to_value: fareBaseCode[1].nValue,
          value_type: "D"
        };
      } else {
        tmpReturn = {
          criteria_code: "returnFareBasisCode",
          operator:
            fareBaseCode[1].condition.length > 0
              ? fareBaseCode[1].condition[0].value
              : "",
          from_value: fareBaseCode[1].code,
          to_value: "",
          value_type: "D"
        };
      }

      setExcludeFareBasisCodeFn({ value: [tmpReturn] });
    }
  }, [fareBaseCode]);

  const changeHandler = (val, index) => {
    
    let tFareBaseCode = [...fareBaseCode];

    if (val.length > 0) {
      tFareBaseCode[index].condition = val;
      if (val[0].name === "Nth Charecter") {
        tFareBaseCode[index].isNth = true;
        tFareBaseCode[index].code = "";
      } else {
        tFareBaseCode[index].isNth = false;
      }
    }
    tFareBaseCode[index].condtionErrorMessage = ""
    setFareBaseCode(tFareBaseCode);
  };

  const changeNValue = (val, index) => {
    let tFareBaseCode = [...fareBaseCode];
    tFareBaseCode[index].nValue = val;
    tFareBaseCode[index].toErrorMessage = ""
    setFareBaseCode(tFareBaseCode);
  };

  const inputChange = (val, index) => {
    let tFareBaseCode = [...fareBaseCode];
    if (tFareBaseCode[index].isNth) {
      let tVal = val.split("").pop();
      if (tVal) {
        tFareBaseCode[index].code = tVal.toUpperCase();
      }
    } else {
      tFareBaseCode[index].code = val.toUpperCase();
    }

    tFareBaseCode[index].fromErrorMessage = ""
    setFareBaseCode(tFareBaseCode);

    
  };

  return (
    <CriteriaLayout heading="FareBasisCode">
      <div className="container">
        {fareBaseCode.map((val, index) => (
          <div key={index}>
            <div className="row">
              <div className="col-4">
                <DropDown
                  placeHolder={FARE_BASE_CODE_OPTION_PLACEHOLDER}
                  index={index}
                  defaultDropDownArray={FARE_BASE_CODE_ARRAY}
                  isMulti={false}
                  selectedValue={val.condition}
                  onChangeAction={(val, index) => changeHandler(val, index)}
                  errorMessage = {val.condtionErrorMessage}
                />
              </div>
              {val.isNth === true ? (
                <div className="col-4">
                  <CounterInput
                    placeHolder={FARE_BASE_CODE_N_VALUE_PLACEHOLDER}
                    min={0}
                    max={100}
                    value={val.nValue}
                    index={index}
                    counterNumber={(value, index) => changeNValue(value, index)}
                    errorMessage = {val.toErrorMessage}
                  />
                </div>
              ) : null}
              <div className="col-4">
                <Input
                  index={index}
                  value={val.code}
                  placeholder={
                    index > 0
                      ? FARE_BASE_CODE_EXCLUDE_PLACEHOLDER
                      : FARE_BASE_CODE_INCLUDE_PLACEHOLDER
                  }
                  changeHandler={val => inputChange(val, index)}
                  errorMessage = {val.fromErrorMessage}
                />
              </div>
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
    isValid: state.FareBasisCode.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardFareBasisCode: state.EditDetails.onwardFareBasisCode,
    returnFareBasisCode: state.EditDetails.returnFareBasisCode
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setFareBasisCodeFn, setExcludeFareBasisCodeFn },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FareBasisCode);
