import React, { useEffect, useState } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import { PASSENGER_TYPE_ARRAY, PASSENGER_TYPE_PLACEHOLDER } from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPassengerType } from "../../store/actions/PassengerTypeAction";
import {
  PASSENGER_TYPE_REQUIRED
} from './Constants/ErrorMessages'

const PassengerType = props => {
  const [passengerType, setPassengerType] = useState([]);

  let passengetTypeRequiredErrorMessage  = ""
  if(!props.isValid){
    if(passengerType && passengerType.length === 0){
      passengetTypeRequiredErrorMessage = PASSENGER_TYPE_REQUIRED
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.passengerType && props.passengerType.length > 0) {
        let tmpPassengerType = props.passengerType[0];
        let from_value = tmpPassengerType.from_value.split(",");
        let convertedArray = [].concat(
          ...from_value.map(val => {
            return PASSENGER_TYPE_ARRAY.filter(obj => val === obj.value);
          })
        );
        setPassengerType(convertedArray);
      }
    }
  }, []);
  //<<EditDetail

  const convertedValue = passengerType.map(passenger => passenger.value);
  

  const convertedObj = {
    passengerType: [
      {
        criteria_code: "passengerType",
        operator: "IN",
        from_value: String(convertedValue),
        to_value: "",
        value_type: "D"
      }
    ]
  };

  props.setPassengerType(convertedObj);

  return (
    <CriteriaLayout heading="Passenger Type">
      <DropDown
        isMulti={true}
        selectedValue={passengerType}
        placeHolder={PASSENGER_TYPE_PLACEHOLDER}
        defaultDropDownArray={PASSENGER_TYPE_ARRAY}
        onChangeAction={val => {
          passengetTypeRequiredErrorMessage = ""
          setPassengerType(val)
        }}
        errorMessage = {passengetTypeRequiredErrorMessage}
      />
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.PassengerType.isValid,
    isEdit: state.EditDetails.isEdit,
    passengerType: state.EditDetails.passengerType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setPassengerType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PassengerType);
