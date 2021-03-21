import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import {
  CONTENT_SOURCE_INCLUDE_PLACEHOLDER,
  CONTENT_SOURCE_EXCLUDE_PLACEHOLDER,
  CONTENT_SOURCE_ARRY
} from "./Constants";

import {
  CONTENT_SOURCE_MAPPING_REQUIRED,
  CONTENT_SOURCE_MAPPING_EXCLUDE_REQUIRED
} from "./Constants/ErrorMessages";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setContentSourceMappingInclude,
  setContentSourceMappingExclude
} from "../../store/actions/ContentSourceMappingAction";

const ContentSourceMapping = props => {
  const [includeArray, setIncludeArray] = useState([]);
  const [excludeArray, setExcludeArray] = useState([]);

  let contentSourceMappingRequried = "";
  let excludeContentSourceMappingRequried = "";

  if (!props.isValid) {
    if (includeArray.length === 0) {
      contentSourceMappingRequried = CONTENT_SOURCE_MAPPING_REQUIRED;
    }

    if (excludeArray.length === 0) {
      excludeContentSourceMappingRequried = CONTENT_SOURCE_MAPPING_EXCLUDE_REQUIRED;
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.contentSource && props.contentSource.length > 0) {
        let tmpFontentSource = props.contentSource[0];

        let from_value = tmpFontentSource.from_value.split(",");
        let convertedArray = [].concat(
          ...from_value.map(val => {
            return CONTENT_SOURCE_ARRY.filter(obj => val === obj.value);
          })
        );
        setIncludeArray(convertedArray);
      }

      if (props.excludeContentSource && props.excludeContentSource.length > 0) {
        let tmpExcludeContentSource = props.excludeContentSource[0];
        let Exfrom_value = tmpExcludeContentSource.from_value.split(",");
        let ExconvertedArray = [].concat(
          ...Exfrom_value.map(val => {
            return CONTENT_SOURCE_ARRY.filter(obj => val === obj.value);
          })
        );
        setExcludeArray(ExconvertedArray);
      }
    }
  }, []);
  //<<EditDetail

  const convertedIncludeArray =
    includeArray.length > 0 ? includeArray.map(val => val.value) : [];
  const convertedExcludeArray =
    excludeArray.length > 0 ? excludeArray.map(val => val.value) : [];



  props.setContentSourceMappingInclude([
    {
      criteria_code: "contentSource",
      operator: "IN",
      from_value: String(convertedIncludeArray),
      to_value: "",
      value_type: "D"
    }
  ]);
  props.setContentSourceMappingExclude([
    {
      criteria_code: "excludeContentSource",
      operator: "IN",
      from_value: String(convertedExcludeArray),
      to_value: "",
      value_type: "D"
    }
  ]);

  const includeContentSourceMapping = (isInclude, value) => {
    if (isInclude) {
      setIncludeArray(value);
    } else {
      setExcludeArray(value);
    }

    if (includeArray.length === 0) {
      contentSourceMappingRequried = CONTENT_SOURCE_MAPPING_REQUIRED;
    }

    if (excludeArray.length === 0) {
      excludeContentSourceMappingRequried = CONTENT_SOURCE_MAPPING_EXCLUDE_REQUIRED;
    }
  };

  return (
    <CriteriaLayout heading="ContentSourceMapping">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <DropDown
              isMulti={true}
              placeHolder={CONTENT_SOURCE_INCLUDE_PLACEHOLDER}
              defaultDropDownArray={CONTENT_SOURCE_ARRY.filter(
                val => excludeArray.indexOf(val) < 0
              )}
              selectedValue={includeArray}
              onChangeAction={(value, index) =>
                includeContentSourceMapping(true, value)
              }
              errorMessage={contentSourceMappingRequried}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-12">
            <DropDown
              isMulti={true}
              placeHolder={CONTENT_SOURCE_EXCLUDE_PLACEHOLDER}
              defaultDropDownArray={CONTENT_SOURCE_ARRY.filter(
                val => includeArray.indexOf(val) < 0
              )}
              selectedValue={excludeArray}
              onChangeAction={(value, index) =>
                includeContentSourceMapping(false, value)
              }
              errorMessage={excludeContentSourceMappingRequried}
            />
          </div>
        </div>
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.ContentSourceMapping.isValid,
    isEdit: state.EditDetails.isEdit,
    contentSource: state.EditDetails.contentSource,
    excludeContentSource: state.EditDetails.excludeContentSource
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setContentSourceMappingInclude,
      setContentSourceMappingExclude
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentSourceMapping);
