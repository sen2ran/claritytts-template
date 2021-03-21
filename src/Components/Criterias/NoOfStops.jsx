import React, { useState, useEffect } from "react";
import { SELECTION_ARRAY_OPERATER } from "./Constants/index";
import CounterInput from "../Input/CounterInput";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setNoOfStopsObjFn } from "../../store/actions/NoOfStopsAction";
import {
  NO_OF_STOP_FROM_REQUIRED,
  NO_OF_STOP_OPTION_REQUIRED,
  NO_OF_STOP_TO_REQUIRED
} from './Constants/ErrorMessages'

const NoOfStops = props => {
  const [numberFrom, setNumberFrom] = useState(0);
  const [numberTo, setNumberTo] = useState(0);
  const [selection, setSelection] = useState([]);
  const [isBetweeen, setIsBetween] = useState(false);

  let optionRequriedMessage  = ""
  let fromValueRequriedMessage = ""
  let toValueRequriedMessage = ""

  if(!props.isValid){
    if(selection.length === 0){
      optionRequriedMessage = NO_OF_STOP_OPTION_REQUIRED
    }

    if(numberFrom <= 0 ){
      fromValueRequriedMessage = NO_OF_STOP_FROM_REQUIRED
    }

    if(numberTo <= 0){
      toValueRequriedMessage = NO_OF_STOP_TO_REQUIRED
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.noOfStops && props.noOfStops.length > 0) {
        let tmpnoOfStops = props.noOfStops[0];
        setNumberTo(tmpnoOfStops.to_value);
        setNumberFrom(tmpnoOfStops.from_value);
        setSelection(
          SELECTION_ARRAY_OPERATER.filter(
            obj => obj.value === tmpnoOfStops.operator
          )
        );
      } else {
        setSelection([
          {
            name: "Greater than or equal to",
            value: ">="
          }
        ]);
      }
    } else {
      setSelection([
        {
          name: "Greater than or equal to",
          value: ">="
        }
      ]);
    }
  }, []);
  //<<EditDetail

  const dropDownChanged = value => {
    
    if (value.length > 0) {
      if (value[0].name === "Between" || value[0].name === "Not Between") {
        setIsBetween(true);
      } else {
        setIsBetween(false);
      }
      optionRequriedMessage = ""
      setSelection(value);
    }
    else {
      setSelection([])
    }
  };

  const convertedObj = {
    onwardNoOfStops: [
      {
        criteria_code: "onwardNoOfStops",
        operator: selection.length > 0 ? selection[0].value : [],
        from_value: numberFrom,
        to_value:
          selection.length > 0
            ? selection[0].name === "Between" ||
              selection[0].name === "Not Between"
              ? numberTo
              : ""
            : "",
        value_type: "D"
      }
    ]
  };

  props.setNoOfStopsObjFn(convertedObj);

  return (
    <CriteriaLayout heading="No Of Stops">
      <form className="form-inline">
        <div className="row">
          <div className="col-4">
            <div className="form-group mb-2">
              <DropDown
                placeHolder="No Of Stops"
                defaultDropDownArray={SELECTION_ARRAY_OPERATER}
                selectedValue={selection}
                onChangeAction={value => dropDownChanged(value)}
                errorMessage = {optionRequriedMessage}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group  mb-2">
              <CounterInput
                min={0}
                max={100}
                value={numberFrom}
                counterNumber={payload => {
                  setNumberFrom(payload)
                  fromValueRequriedMessage = ""
                }}
                errorMessage = {fromValueRequriedMessage}
              />
            </div>
          </div>

          {isBetweeen ? (
            <div className="col-4">
              <div className="form-group  mb-2">
                <CounterInput
                  min={0}
                  max={100}
                  value={numberTo}
                  counterNumber={payload => {
                    setNumberTo(payload)
                    toValueRequriedMessage = ""
                  }}

                  errorMessage = {toValueRequriedMessage}
                />
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.NoOfStops.isValid,
    isEdit: state.EditDetails.isEdit,
    noOfStops: state.EditDetails.onwardNoOfStops
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setNoOfStopsObjFn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NoOfStops);
