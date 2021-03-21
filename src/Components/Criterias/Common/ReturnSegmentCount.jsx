import React from "react";
import CounterInput from "../../Input/CounterInput";
import DropDown from "../../Input/DropDown";

const ReturnSegmentCount = ({
  SELECTION_ARRAY_OPERATER,
  selection,
  setSelection,
  min,
  max,
  numberFrom,
  numberTo,
  setNumber,
  isBetween,
  optionRequiredMessage= "",
  fromRequriedMessage = "",
  toRequriedMessage = ""
}) => {
  return (
    <form className="form-inline">
      <div className="row">
        <div className="col-4">
          <div className="form-group mb-2">
            <DropDown
              placeHolder="No Of Seats"
              defaultDropDownArray={SELECTION_ARRAY_OPERATER}
              selectedValue={selection}
              onChangeAction={value => setSelection(value)}
              errorMessage = {
                optionRequiredMessage
              }
            />
          </div>
        </div>
        <div className="col-4">
          <CounterInput
            min={min}
            max={max}
            value={numberFrom}
            counterNumber={(val)=>setNumber(val ,true)}
            errorMessage ={fromRequriedMessage}
          />
        </div>

        {isBetween ? (
          <div className="col-4">
            <CounterInput
              min={min}
              max={max}
              value={numberTo}
              counterNumber={(val)=>setNumber(val ,false)}
              errorMessage = {toRequriedMessage}
            />
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ReturnSegmentCount;
