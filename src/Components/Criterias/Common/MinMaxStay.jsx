import React from "react";
import DropDown from "../../Input/DropDown";
import CounterInput from "../../Input/CounterInput";

const MinMaxStay = ({
  name,
  numOfDayOrMOnth,
  setNumOfDayOrMOnth,
  SELECTION_ARRAY_DAY_OR_MONTH,
  dayOrMonth,
  setDayOrMonth,
  SELECTION_ARRAY_DAYS_NAME,
  numOfWeek,
  setNumOfWeek,
  setStartDay,
  startDay,
  monthOrDaysRequried = "",
  optionRequiredMessage = "",
  noOfWeekRequired = "",
  typeRequiredMessage = ""
}) => {
  return (
    <div className="row">
      <div className="col-3">
        <CounterInput
          min={0}
          max={100}
          value={numOfDayOrMOnth}
          counterNumber={payload => setNumOfDayOrMOnth(payload)}
          errorMessage = {monthOrDaysRequried}
        />
      </div>
      <div className="col-3">
        <DropDown
          isMulti={false}
          placeHolder={name}
          defaultDropDownArray={SELECTION_ARRAY_DAY_OR_MONTH}
          selectedValue={dayOrMonth}
          onChangeAction={e => setDayOrMonth(e)}
          errorMessage = {optionRequiredMessage}
        />
      </div>

      <div className="col-3">
        <CounterInput
          min={0}
          max={100}
          value={numOfWeek}
          counterNumber={payload => setNumOfWeek(payload)}
          errorMessage = {noOfWeekRequired}
        />
      </div>
      <div className="col-3">
        <DropDown
          isMulti={false}
          placeHolder={name}
          defaultDropDownArray={SELECTION_ARRAY_DAYS_NAME}
          selectedValue={startDay}
          onChangeAction={e => setStartDay(e)}
          errorMessage = {typeRequiredMessage}
        />
      </div>
    </div>
  );
};

export default MinMaxStay;
