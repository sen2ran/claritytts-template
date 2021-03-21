import React from "react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ErrorLabel from '../Input/ErrorLabel'

const DatePicker = ({
  placeholder,
  option,
  startDate,
  onChangeAction,
  index = 0,
  errorMessage = ""
}) => {
  
  return (
    <div className="col-12">
      <Flatpickr
        placeholder={placeholder}
        options={option}
        value={startDate}
        onValueUpdate={(selectedDates, dateStr, instance) => {
          if (option.noCalendar) {
            const currentDate = new Date();
            const currentTime =
              currentDate.getHours() + ":" + currentDate.getMinutes();

            if (currentTime === dateStr) {
              onChangeAction("12:00");
            } else {
              onChangeAction(dateStr);
            }
          } else {
            onChangeAction(dateStr);
          }
        }}
      />
      {
        errorMessage ? <ErrorLabel message = {errorMessage}/> : null
      }
    </div>
  );
};

export default DatePicker;
