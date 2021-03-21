import React, { useState} from "react";
import PlusButton from "../../Input/PlusButton";
import MinusButton from "../../Input/MinusButton";
import DropDown from "../../Input/DropDown";
import MyDropDown from "../../Input/APIDropDown/components/DropdownMultiple";
import DatePicker from "../../Input/DatePicker";
import { MONTHS, ARRIVAL_DAY_SCHEDULER_DROPDOWN } from "../Constants";
import {
  MONTH_REQUIRED_SHEDULER,
  OPTION_REQUIRED_SHEDULER,
  DAY_DATES_REQUIRED_SHEDULER,
  START_TIME_REQUIRED_SHEDULER,
  END_TIME_REQUIRED_SHEDULER
} from "../Constants/ErrorMessages";

const DaySchedular = ({
  obj,
  arrayObj,
  monthsPlaceholder = "Select",
  typePlaceholder = "Select",
  optionPlaceholder = "Select",
  startTimePlaceholder = "Start Time",
  endTimePlaceholder = "End Time",
  index = 0,
  isReturn = false,
  plusButtonClicked = {},
  minusButtonClicked = {},
  monthChanged = {},
  typeChanged = {},
  optionChanged = {},
  timeChanged = {},
  setMonthErrorMessage = {},
  setOptionErrorMessage={},
  setDayDatesErrorMessage= {},
  setStartTimeErrorMessage ={},
  setEndTimeErrorMessage= {},
  monthErrorMessage = "",
  optionErrorMessage = "",
  dayDatesErrorMessage = "",
  startTimeErrorMessage = "",
  endTimeErrorMessage = ""
}) => {

  const plusButttonClickFn = () => {
    const index = arrayObj.length - 1;
    let tmp = arrayObj;
    if (
      tmp[index].month.length > 0 &&
      tmp[index].option.length > 0 &&
      tmp[index].bookingWeek.length > 0 &&
      tmp[index].startTime &&
      tmp[index].endTime
    ) {
      setMonthErrorMessage("", index);
      setOptionErrorMessage("", index);
      setDayDatesErrorMessage("", index);
      setStartTimeErrorMessage("", index);
      setEndTimeErrorMessage("", index);
      
      
      plusButtonClicked(isReturn);
    } else {
      let tTemp = tmp[index];
      if (tTemp.month.length === 0) {
        setMonthErrorMessage(MONTH_REQUIRED_SHEDULER, index);
      }

      if (tTemp.option.length === 0) {
        setOptionErrorMessage(OPTION_REQUIRED_SHEDULER, index);
      }
      if (tTemp.bookingWeek.length === 0) {
        setDayDatesErrorMessage(DAY_DATES_REQUIRED_SHEDULER, index);
      }

      if (!tTemp.startTime) {
        setStartTimeErrorMessage(START_TIME_REQUIRED_SHEDULER, index);
      }

      if (!tTemp.endTime) {
        setEndTimeErrorMessage(END_TIME_REQUIRED_SHEDULER, index);
      }
    }
  };

  let startTimeOption = {
    enableTime: true,
    dateFormat: "H:i",
    time_24hr: true,
    noCalendar: true,
    minDate: "00:00"
  };

  let endTimeOption = {
    enableTime: true,
    dateFormat: "H:i",
    time_24hr: true,
    noCalendar: true,
    maxDate: "23:59"
  };

  if (obj.endTime) {
    startTimeOption.maxDate = obj.endTime;
  } else {
    startTimeOption.maxDate = "23:59";
  }

  
  if (obj.startTime) {
    endTimeOption.minDate = obj.startTime;
  } else {
    endTimeOption.minDate = "00:00";
  }

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <MyDropDown
            headerTitle={monthsPlaceholder}
            isSingle={false}
            labelName="name"
            selectedList={obj.month}
            selectedlabelName="name"
            isSelectAll={true}
            toggleItem={value => {
              monthChanged(value, index, isReturn);
              setMonthErrorMessage("", index);
            }}
            list={MONTHS}
            errorMessage={monthErrorMessage }
          />
        </div>

        <div className="col-4">
          <DropDown
            selectedValue={obj.option}
            isClearable={false}
            placeHolder={optionPlaceholder}
            defaultDropDownArray={ARRIVAL_DAY_SCHEDULER_DROPDOWN}
            onChangeAction={(value, index) => {
              optionChanged(value, index, isReturn);
              setOptionErrorMessage("", index);
            }}
            index={index}
            errorMessage={optionErrorMessage}
          />
        </div>

        {obj.option.length > 0 ? (
          <div className="col-4">
            <MyDropDown
              headerTitle={typePlaceholder}
              isSingle={false}
              labelName="name"
              isSelectAll={true}
              selectedList={obj.bookingWeek}
              selectedlabelName="name"
              toggleItem={value => {
                typeChanged(value, index, isReturn);
                setDayDatesErrorMessage("", index);
              }}
              list={obj.type}
              errorMessage={dayDatesErrorMessage}
            />
          </div>
        ) : null}
      </div>
      <br />
      <div className="row">
        <div className="col-5">
          <DatePicker
            startDate={obj.startTime}
            placeholder={startTimePlaceholder}
            onChangeAction={value => {
              timeChanged(isReturn, value, index, true);
              
            }}
            option={startTimeOption}
            errorMessage={startTimeErrorMessage}
          />
        </div>

        <div className="col-5">
          <DatePicker
            startDate={obj.endTime}
            placeholder={endTimePlaceholder}
            onChangeAction={value => {
              timeChanged(isReturn, value, index, false);
              
            }}
            option={endTimeOption}
            errorMessage={endTimeErrorMessage}
          />
        </div>

        {index === 0 ? (
          <div className="col-2">
            <PlusButton onClickHandler={() => plusButttonClickFn()} />
          </div>
        ) : (
          <div className="col-2">
            <MinusButton
              onClickHandler={() => minusButtonClicked(index, isReturn)}
            />
          </div>
        )}
      </div>
      <hr />
      <br />
    </div>
  );
};

export default DaySchedular;
