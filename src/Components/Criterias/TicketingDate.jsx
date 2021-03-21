import React, { useEffect, useState } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import SingleStartEndDatePicker from "../Criterias/Common/SingleStartEndDatePickerWithButton";
import { NO_END_DATE_PLACEHOLDER, SELECT_DATE_PLACEHOLDER } from "./Constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDateFn } from "../../store/actions/TicketingDateAction";
import {
  TICKETING_DATE_START_REQUIRED,
  TICKETING_DATE_END_REQUIRED
} from "./Constants/ErrorMessages";

const TicketingDate = props => {
  let { setDateFn } = props;

  const todayDate = new Date();
  const startDate =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1) +
    "-" +
    todayDate.getDate() +
    " 00:00:00";
  const minDate =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1) +
    "-" +
    todayDate.getDate() +
    " 00:00:00";

  const [ticketingDate, changeTicketingDate] = useState([]);

  const [disableDates, changeDisableDates] = useState([]);

  if (!props.isValid) {
    let tTicketingDate = [...ticketingDate];
    const lastIndex = ticketingDate.length - 1;
    const lastValue = tTicketingDate[lastIndex];

    if (lastValue) {
      if (!lastValue.startDate || !lastValue.endDate) {
        if (!lastValue.startDate && !lastValue.startDateErrorMessage) {
          tTicketingDate[
            lastIndex
          ].startDateErrorMessage = TICKETING_DATE_START_REQUIRED;
          changeTicketingDate(tTicketingDate);
        }

        if (!lastValue.endDate && !lastValue.endDateErrorMessage) {
          tTicketingDate[
            lastIndex
          ].endDateErrorMessage = TICKETING_DATE_END_REQUIRED;
          changeTicketingDate(tTicketingDate);
        }
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.ticketingDate && props.ticketingDate.length > 0) {
        changeTicketingDate(
          props.ticketingDate.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeTicketingDate([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }
    } else {
      changeTicketingDate([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);
    }
  }, []);
  //<<EditDetail

  useEffect(() => {
    updateDatesToStore(ticketingDate);
  }, [ticketingDate]);

  const updateDatesToStore = tTicketingDate => {
    let tmpDate = [];
    tTicketingDate.filter(val => {
      let tmp = {
        criteria_code: "ticketingDate",
        from_value: val.startDate,
        to_value: val.endDate,
        operator: "BETWEEN",
        value_type: "D"
      };
      tmpDate.push(tmp);
    });
    setDateFn({ value: tmpDate });
  };

  const plusButttonClickFn = isReturn => {
    let tTicketingDate = [...ticketingDate];
    const lastInddex = tTicketingDate.length - 1;
    if (
      ticketingDate[lastInddex].startDate &&
      ticketingDate[lastInddex].endDate
    ) {
      tTicketingDate.push({
        startDate: startDate,
        endDate: ""
      });
    } else {
      if (!ticketingDate[lastInddex].startDate) {
        tTicketingDate[
          lastInddex
        ].startDateErrorMessage = TICKETING_DATE_START_REQUIRED;
      }

      if (!ticketingDate[lastInddex].endDate) {
        tTicketingDate[
          lastInddex
        ].endDateErrorMessage = TICKETING_DATE_END_REQUIRED;
      }
    }
    changeTicketingDate(tTicketingDate);
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tTicketingDate = [...ticketingDate];

    tTicketingDate.splice(index, 1);
    changeTicketingDate(tTicketingDate);
  };

  const startDateChanged = (index, isReturn, value) => {
    let tTicketingDate = [...ticketingDate];

    tTicketingDate[index].startDate = value;
    tTicketingDate[index].startDateErrorMessage = "";
    changeTicketingDate(tTicketingDate);
  };

  const endDateChanged = (index, isReturn, value) => {
    let tTicketingDate = [...ticketingDate];

    tTicketingDate[index].endDate = value;
    tTicketingDate[index].endDateErrorMessage = "";
    changeTicketingDate(tTicketingDate);
  };

  return (
    <CriteriaLayout heading="TicketingDate">
      <div className="container">
        {ticketingDate.map((val, index) => (
          <div key={index}>
            <SingleStartEndDatePicker
              startDateErrorMessage={val.startDateErrorMessage}
              endDateErrorMessage={val.endDateErrorMessage}
              isReturn={false}
              startDate={val.startDate ? val.startDate : startDate}
              endDate={val.endDate}
              endDateOption={{
                minDate: minDate,
                enableTime: true,
                enableSeconds: true,
                dateFormat: "Y-m-d H:i:ss",
                time_24hr: true,
                disable: disableDates
              }}
              startDatePlaceHolder={SELECT_DATE_PLACEHOLDER}
              endDatePlaceHolder={NO_END_DATE_PLACEHOLDER}
              startDateOption={{
                minDate: minDate,
                enableTime: true,
                enableSeconds: true,
                dateFormat: "Y-m-d H:i:ss",
                time_24hr: true,
                disable: disableDates
              }}
              index={index}
              onClickPlusButton={bool => plusButttonClickFn(bool)}
              onClickMinusButton={(i, bool) => minusButttonClickFn(i, bool)}
              startDateChange={(i, bool, value) =>
                startDateChanged(i, bool, value)
              }
              endDateChange={(i, bool, value) => endDateChanged(i, bool, value)}
            />
          </div>
        ))}
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.TicketingDate.isValid,
    isEdit: state.EditDetails.isEdit,
    ticketingDate: state.EditDetails.ticketingDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDateFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketingDate);
