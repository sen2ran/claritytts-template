import React, { useEffect, useState } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import InputFiled from "../Input/InputField";
import {
  TOUR_CODE_INCLUDE_PLACEHOLDER,
  TOUR_CODE_EXCULUDE_TOUR_CODE
} from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTourCodeFn } from "../../store/actions/TourCodeAction";
import {
  TOUR_CODE_INCLUDE_REQUIRED,
  TOUR_CODE_EXCLUDE_REQUIRED
} from "./Constants/ErrorMessages";

const TourCode = props => {
  const [include, setInclude] = useState("");
  const [exclude, setExclude] = useState("");

  let includeRequiredErrorMessage  = ""
  let excludeRequiredErrorMessage  = ""

  if (!props.isValid) {
    if(!include){
      includeRequiredErrorMessage = TOUR_CODE_INCLUDE_PLACEHOLDER
    }

    if(!exclude){
      excludeRequiredErrorMessage = TOUR_CODE_EXCLUDE_REQUIRED
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.tourCode && props.tourCode.length > 0) {
        let tmpTourCode = props.tourCode[0];
        setInclude(tmpTourCode.from_value);
      }
      if (props.excludeTourCode && props.excludeTourCode.length > 0) {
        let tmpExcludeTourCode = props.excludeTourCode[0];
        setExclude(tmpExcludeTourCode.from_value);
      }
    }
  }, []);
  //<<EditDetail

  // props.setTourCodeIncludeFn(include)
  // props.setTourCodeExcludeFn(exclude)
  const convertedObj = {
    tourCode: [
      {
        criteria_code: "tourCode",
        operator: "IN",
        from_value: include,
        to_value: "",
        value_type: "D"
      }
    ],
    excludeTourCode: [
      {
        criteria_code: "excludeTourCode",
        operator: "IN",
        from_value: exclude,
        to_value: "",
        value_type: "D"
      }
    ]
  };

  props.setTourCodeFn(convertedObj);

  const textFiledChangedInclude = e => {
    const tInclude = e.toUpperCase();
    if (tInclude !== exclude) {
      setInclude(tInclude);
    } else {
      //error message here
    }
  };
  const textFiledChangedExclude = e => {
    const tExclude = e.toUpperCase();

    if (tExclude !== include) {
      setExclude(tExclude);
    } else {
      //error message
    }
  };

  return (
    <CriteriaLayout heading="TourCode">
      Toure Code
      <br />
      <div className="row">
        <div className="col-12">
          <InputFiled
            placeholder={TOUR_CODE_INCLUDE_PLACEHOLDER}
            changeHandler={e => textFiledChangedInclude(e)}
            value={include}
            errorMessage = {includeRequiredErrorMessage}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <InputFiled
            placeholder={TOUR_CODE_EXCULUDE_TOUR_CODE}
            changeHandler={e => textFiledChangedExclude(e)}
            value={exclude}
            errorMessage = {excludeRequiredErrorMessage}
          />
        </div>
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.TourCode.isValid,
    isEdit: state.EditDetails.isEdit,
    tourCode: state.EditDetails.tourCode,
    excludeTourCode: state.EditDetails.excludeTourCode
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setTourCodeFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TourCode);
