import React, { useState, useEffect } from "react";
import { SELECTION_ARRAY_OPERATER } from "./Constants/index";
import ReturnSegmentCount from "./Common/ReturnSegmentCount";
import CriteriaLayout from "../../Hoc/CriteriaLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSegmentCountObjFn } from "../../store/actions/SegmentCountAction";

import {
  SEGMENT_COUNT_OPTION_REQUIRED,
  SEGMENT_COUNT_FROM_REQUIRED,
  SEGMENT_COUNT_TO_REQUIRED
} from "./Constants/ErrorMessages";

const SegmentCount = props => {
  const [isRnSegmentCount, setIsRnSegmentCount] = useState(false);
  const [selection, setSelection] = useState([]);
  const [returnSelection, setReturnSelection] = useState([]);
  const [numberFrom, setNumberFrom] = useState("");
  const [numberTo, setNumberTo] = useState("");

  const [returnNumberFrom, setReturnNumberFrom] = useState("");
  const [returnNumberTo, setReturnNumberTo] = useState("");

  const [isBetween, setIsBetween] = useState(false);
  const [isBetweenReturn, setIsBetweenReturn] = useState(false);

  let optionRequriedMessage  = ""
  let fromValueRequriedMessage = ""
  let toValueRequriedMessage = ""

  let optionRequriedMessageReturn  = ""
  let fromValueRequriedMessageReturn = ""
  let toValueRequriedMessageReturn = ""

  if(!props.isValid){
    if(selection.length === 0){
      optionRequriedMessage = SEGMENT_COUNT_OPTION_REQUIRED
    }

    if(numberFrom <= 0 ){
      fromValueRequriedMessage = SEGMENT_COUNT_FROM_REQUIRED
    }

    if(numberTo <= 0){
      toValueRequriedMessage = SEGMENT_COUNT_TO_REQUIRED
    }

    if(isRnSegmentCount){
      if(returnSelection.length === 0){
        optionRequriedMessageReturn = SEGMENT_COUNT_OPTION_REQUIRED
      }
  
      if(returnNumberFrom <= 0 ){
        fromValueRequriedMessageReturn = SEGMENT_COUNT_FROM_REQUIRED
      }
  
      if(returnNumberTo <= 0){
        toValueRequriedMessageReturn = SEGMENT_COUNT_TO_REQUIRED
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.onwardSegmentCount && props.onwardSegmentCount.length > 0) {
        let tmpOnwardSegmentCount = props.onwardSegmentCount[0];

        setNumberTo(tmpOnwardSegmentCount.to_value);
        setNumberFrom(tmpOnwardSegmentCount.from_value);
        setSelection(
          SELECTION_ARRAY_OPERATER.filter(
            obj => obj.value === tmpOnwardSegmentCount.operator
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
      if (props.returnSegmentCount && props.returnSegmentCount.length > 0) {
        let tmpReturnSegmentCount = props.returnSegmentCount[0];
        setIsRnSegmentCount(
          tmpReturnSegmentCount.from_value !== "" ? true : false
        );
        if (tmpReturnSegmentCount.from_value !== "") {
          setReturnSelection(
            SELECTION_ARRAY_OPERATER.filter(
              obj => obj.value === tmpReturnSegmentCount.operator
            )
          );
          setReturnNumberTo(tmpReturnSegmentCount.to_value);
          setReturnNumberFrom(tmpReturnSegmentCount.from_value);
        }
      } else {
        setReturnSelection([
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

      setReturnSelection([
        {
          name: "Greater than or equal to",
          value: ">="
        }
      ]);
    }
  }, []);
  //<<EditDetail

  const onCheckboxChange = e => {
    setIsRnSegmentCount(!isRnSegmentCount);
  };

  const dropDownChanged = (value, isReturn) => {
    if (value.length > 0) {
      if (isReturn) {
        if (value[0].name === "Between" || value[0].name === "Not Between") {
          setIsBetweenReturn(true);
        } else {
          setIsBetweenReturn(false);
        }

        setReturnSelection(value);
      } else {
        if (value[0].name === "Between" || value[0].name === "Not Between") {
          setIsBetween(true);
        } else {
          setIsBetween(false);
        }

        setSelection(value);
      }
    }
  };

  const convertedObj = {
    onwardSegmentCount: [
      {
        criteria_code: "onwardSegmentCount",
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
    ],
    returnSegmentCount: isRnSegmentCount
      ? [
          {
            criteria_code: "returnSegmentCount",
            operator:
              returnSelection.length > 0 ? returnSelection[0].value : [],
            from_value: returnNumberFrom,
            to_value:
              returnSelection.length > 0
                ? returnSelection[0].name === "Between" ||
                  returnSelection[0].name === "Not Between"
                  ? returnNumberTo
                  : ""
                : "",
            value_type: "D"
          }
        ]
      : []
  };

  props.setSegmentCountObjFn(convertedObj);

  return (
    <CriteriaLayout heading="SegmentCount">
      <ReturnSegmentCount
        SELECTION_ARRAY_OPERATER={SELECTION_ARRAY_OPERATER}
        selection={selection}
        setSelection={value => dropDownChanged(value, false)}
        isReturnLabel={false}
        min={0}
        max={100}
        numberFrom={numberFrom}
        numberTo={numberTo}
        isBetween={isBetween}
        setNumber={(payload, isFrom) =>
          isFrom
            ? setNumberFrom(payload > 100 ? 100 : payload)
            : setNumberTo(payload > 100 ? 100 : payload)
        }
        optionRequiredMessage= {optionRequriedMessage}
        fromRequriedMessage = {fromValueRequriedMessage}
        toRequriedMessage = {toValueRequriedMessage}
      />
      <div className="form-group form-check">
        <input
          type="checkbox"
          checked={isRnSegmentCount}
          onChange={e => onCheckboxChange(e)}
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="returnCheckBox">
          Allow Return Segment Count
        </label>
      </div>
      {isRnSegmentCount ? (
        <ReturnSegmentCount
          SELECTION_ARRAY_OPERATER={SELECTION_ARRAY_OPERATER}
          selection={returnSelection}
          setSelection={value => dropDownChanged(value, true)}
          min={0}
          max={100}
          isBetween={isBetweenReturn}
          numberFrom={returnNumberFrom}
          numberTo={returnNumberTo}
          setNumber={(payload, isFrom) =>
            isFrom
              ? setReturnNumberFrom(payload > 100 ? 100 : payload)
              : setReturnNumberTo(payload > 100 ? 100 : payload)
          }
          isReturnLabel={true}
          optionRequiredMessage = {optionRequriedMessageReturn}
          fromRequriedMessage = {fromValueRequriedMessageReturn}
          toRequriedMessage= {toValueRequriedMessageReturn}
        />
      ) : null}
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.SegmentCount.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardSegmentCount: state.EditDetails.onwardSegmentCount,
    returnSegmentCount: state.EditDetails.returnSegmentCount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSegmentCountObjFn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentCount);
