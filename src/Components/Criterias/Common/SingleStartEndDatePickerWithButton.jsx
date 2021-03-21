import React from "react";
import DatePicker from "../../Input/DatePicker";
import PlusButton from "../../Input/PlusButton";
import MinusButton from "../../Input/MinusButton";

const SingleStartEndDatePickerWithButton = ({
  startDate,
  endDate,
  onClickPlusButton,
  onClickMinusButton,
  startDateChange,
  endDateChange,
  index,
  startDateOption,
  endDateOption,
  startDatePlaceHolder = "",
  endDatePlaceHolder = "",
  isReturn = false.startDate,
  startDateErrorMessage = "",
  endDateErrorMessage = ""
}) => {
  const startDateChanged = date => {
    
    if (endDate) {
      
      const tStartDate = new Date(date);
      const tEndDate = new Date(endDate);
      if (tEndDate >= tStartDate) {
        
        startDateChange(index, isReturn, date);
      } else {
        
        startDateChange(index, isReturn, "");
      }
    } else if (date) {
      
      startDateChange(index, isReturn, date);
    }
  };

  const endDateChanged = date => {
    
    if (startDate) {
      
      const tStartDate = new Date(startDate);
      const tEndDate = new Date(date);
      if (tEndDate >= tStartDate) {
        
        endDateChange(index, isReturn, date);
      } else {
        
        endDateChange(index, isReturn, "");
      }
    } else if (date) {
      
      endDateChange(index, isReturn, date);
    }
  };

  let tEndDateMinOption = endDateOption;
  let tStartDateOption = startDateOption;

  

  if (startDate) {
    tStartDateOption.minDate = startDate
    tEndDateMinOption.minDate = startDate;
  }

  
  if (endDate) {
    tStartDateOption.maxDate = endDate;
  }

  

  return (
   <div>
      <div className="row">
      <div className="col-5">
        <DatePicker
          placeholder={startDatePlaceHolder}
          startDate={startDate}
          option={tStartDateOption}
          onChangeAction={date => startDateChanged(date)}
          errorMessage = {startDateErrorMessage}
        />
      </div>
      <div className="col-5">
        <DatePicker
          placeholder={endDatePlaceHolder}
          startDate={endDate}
          option={tEndDateMinOption}
          onChangeAction={date => endDateChanged(date)}
          errorMessage = {endDateErrorMessage}
        />
      </div>
      {index === 0 ? (
        <div className="col-2">
          <PlusButton
            onClickHandler={e => {
              onClickPlusButton(isReturn);
            }}
            index={index}
          />
        </div>
      ) : (
        <div className="col-2">
          <MinusButton
            onClickHandler={e => {
              onClickMinusButton(index, isReturn);
            }}
            index={index}
          />
        </div>
      )}
    </div>
    <br/>
   </div>
  );
};

export default SingleStartEndDatePickerWithButton;
