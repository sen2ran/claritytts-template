import React, { useState, useEffect } from "react";
import { SELECTION_ARRAY_OPERATER } from "./Constants/index";
import CounterInput from "../Input/CounterInput";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setNoOfSeatsObjFn } from "../../store/actions/NoOfSeatsActions";
import {
  NO_OF_SEATS_FROM_REQUIRED,
  NO_OF_SEATS_TO_REQUIRED,
  NO_OF_SEATS_OPTION_REQUIRED
} from './Constants/ErrorMessages'

const NoOfSeats = props => {
  const [numberTo, setNumberTo] = useState(0);
  const [numberFrom, setNumberFrom] = useState(0);
  const [selection, setSelection] = useState([]);
  const [isBetweeen, setIsBetween] = useState(false);

  let optionRequriedMessage = ""
  let fromRequriedMessage = ""
  let toRequiredMessage = ""

  if(!props.isValid){
    if(selection.length == 0) {
      optionRequriedMessage = NO_OF_SEATS_OPTION_REQUIRED
    }

    if(numberFrom <= 0){
      fromRequriedMessage = NO_OF_SEATS_FROM_REQUIRED
    }
    if(isBetweeen && numberTo <= 0){
      toRequiredMessage = NO_OF_SEATS_TO_REQUIRED
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.noOfSeats && props.noOfSeats.length > 0) {
        let tmpnoOfSeats = props.noOfSeats[0];
        setNumberTo(tmpnoOfSeats.to_value);
        setNumberFrom(tmpnoOfSeats.from_value);
        setSelection(
          SELECTION_ARRAY_OPERATER.filter(
            obj => obj.value === tmpnoOfSeats.operator
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
      setSelection(value);
      optionRequriedMessage = ""
    }
    else {
      setSelection([])
    }
  };

  const convertedObj = {
    noOfSeats: [
      {
        criteria_code: "noOfSeats",
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

  props.setNoOfSeatsObjFn(convertedObj);

  return (
    <CriteriaLayout heading="No Of Seats">
      <form className="form-inline">
        <div className="row">
          <div className="col-4">
            <div className="form-group mb-2">
              <DropDown
                placeHolder="No Of Seats"
                defaultDropDownArray={SELECTION_ARRAY_OPERATER}
                selectedValue={selection}
                onChangeAction={value => {
                  dropDownChanged(value)
                  
                }}
                errorMessage ={optionRequriedMessage}
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
                  fromRequriedMessage = ""
                  setNumberFrom(payload)
                }}
                errorMessage = {fromRequriedMessage}
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
                    toRequiredMessage = ""
                    setNumberTo(payload)
                  }}
                  errorMessage = {toRequiredMessage}
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
    isValid: state.NoOfSeats.isValid,
    isEdit: state.EditDetails.isEdit,
    noOfSeats: state.EditDetails.noOfSeats
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setNoOfSeatsObjFn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NoOfSeats);
