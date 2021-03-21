import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import { TRIP_TYPE_PLACEHOLDER, TRIP_TYPE_ARRAY_OBJECT } from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTripTypeFn } from "../../store/actions/TripTypeAction";
import { 
  TRIP_TYPE_REQUIRED
} from './Constants/ErrorMessages';

const TripType = props => {
  const [tirpType, setTirpType] = useState([]);

  let setTirpTypeRequriedMessage = ""
  if(!props.isValid){
    if(tirpType.length === 0){
      setTirpTypeRequriedMessage = TRIP_TYPE_REQUIRED
    }
  }
  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      console.log(props.tripType)
      if (props.tripType && props.tripType.length > 0) {
        let tmpTripType = props.tripType[0];
        
        let convertedArray = TRIP_TYPE_ARRAY_OBJECT.filter(
          obj => tmpTripType.from_value === obj.value
        );
        setTirpType(convertedArray);
        console.log(tirpType)
        console.log(convertedArray)
      }
    }
  }, []);
  //<<EditDetail

  const tmp = [
    {
      criteria_code: "tripType",
      operator: "IN",
      from_value: tirpType.length > 0 ? tirpType[0].value : "",
      to_value: "",
      value_type: "D"
    }
  ];
  props.setTripTypeFn({
    value: tmp
  });

  return (
    <CriteriaLayout heading="TripType">
      <DropDown
        isMulti={false}
        placeHolder={TRIP_TYPE_PLACEHOLDER}
        defaultDropDownArray={TRIP_TYPE_ARRAY_OBJECT}
        selectedValue={tirpType}
        onChangeAction={(value, index) => {
          setTirpTypeRequriedMessage = ""
          setTirpType(value)
        }}
        errorMessage = {setTirpTypeRequriedMessage}
      />
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.TripType.isValid,
    isEdit: state.EditDetails.isEdit,
    tripType: state.EditDetails.tripType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setTripTypeFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TripType);
