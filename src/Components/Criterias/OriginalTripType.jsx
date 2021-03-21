import React, { useEffect, useState } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import {
  ORIGINAL_TIP_TYPE_ARRAY,
  ORIGINAL_TIP_TYPE_PLACE_HOLDER
} from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setOriginalTripTypeFn } from "../../store/actions/OriginalTripTypeAction";
import{
  ORIGIN_TRIP_TYPE_REQUIRED
} from './Constants/ErrorMessages'
const OriginalTripType = props => {
  const [originalTripType, setOriginalTripType] = useState([]);

  let tripTypeRequiredMessage = ""
  if(!props.isValid){
    if(originalTripType && originalTripType.length === 0){
      tripTypeRequiredMessage = ORIGIN_TRIP_TYPE_REQUIRED
    } 
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.originalTripType && props.originalTripType.length > 0) {
        let tmpOriginalTripType = props.originalTripType[0];
        let from_value = tmpOriginalTripType.from_value.split(",");
        let convertedArray = [].concat(
          ...from_value.map(val => {
            return ORIGINAL_TIP_TYPE_ARRAY.filter(obj => val === obj.value);
          })
        );
        setOriginalTripType(convertedArray);
      }
    }
  }, []);
  //<<EditDetail

  const convertedOriginalTripType = originalTripType.map(val => val.value);

  props.setOriginalTripTypeFn([
    {
      criteria_code: "originalTripType",
      operator: "IN",
      from_value: String(convertedOriginalTripType),
      to_value: "",
      value_type: "D"
    }
  ]);

  return (
    <CriteriaLayout heading="OriginalTripType">
      <DropDown
        isMulti={true}
        placeHolder={ORIGINAL_TIP_TYPE_PLACE_HOLDER}
        selectedValue={originalTripType}
        defaultDropDownArray={ORIGINAL_TIP_TYPE_ARRAY}
        onChangeAction={value => {
          tripTypeRequiredMessage = ""
          setOriginalTripType(value)
        }}
        errorMessage = {tripTypeRequiredMessage}
      />
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.OriginalTripType.isValid,
    isEdit: state.EditDetails.isEdit,
    originalTripType: state.EditDetails.originalTripType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setOriginalTripTypeFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginalTripType);
