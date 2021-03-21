import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import SingleStartEndDatePicker from "../Criterias/Common/SingleStartEndDatePickerWithButton";

import {
  BOOKING_PERIOD_PLACEHOLDER,
  BOOKING_PERIOD_PLACEHOLDER_END
} from "./Constants";

import {
  BOOKING_PERIOD_END_DATE_REQUIRED,
  BOOKING_PERIOD_START_DATE_REQUIRED
} from "./Constants/ErrorMessages";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDateFn } from "../../store/actions/BookingPeriodAction";

const BookingPeriod = props => {
  let { bookingPeriodStartDate } = props;
  let { isValid } = props;
  let { bookingPeriodEndDate } = props;

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

  const [bookingPeriod, changeBookingPeriod] = useState([]);

  const [disableDates, changeDisableDates] = useState([]);

  if (!props.isValid) {
    let tBookingPeriod = [...bookingPeriod];
    const lastIndex = tBookingPeriod.length - 1;
    const lastValue = tBookingPeriod[lastIndex];

    if (lastValue) {
      if (!lastValue.startDate || !lastValue.endDate) {
        if (!lastValue.startDate && !lastValue.startErrorMessage) {
          tBookingPeriod[
            lastIndex
          ].startErrorMessage = BOOKING_PERIOD_START_DATE_REQUIRED;
          changeBookingPeriod(tBookingPeriod);
        }
        if (!lastValue.endDate && !lastValue.endErrorMessage) {
          tBookingPeriod[
            lastIndex
          ].endErrorMessage = BOOKING_PERIOD_END_DATE_REQUIRED;
          changeBookingPeriod(tBookingPeriod);
        }
      }
    }
  }

  //>>EditDetail
  useEffect(() => {

    if (props.isEdit) {
      if (props.bookingPeriod && props.bookingPeriod.length > 0) {
        changeBookingPeriod(
          props.bookingPeriod.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeBookingPeriod([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }
    } else {
      changeBookingPeriod([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);
    }
  }, []);
  //<<EditDetail

  useEffect(() => {
    updateDatesToStore(bookingPeriod);
  }, [bookingPeriod]);

  const updateDatesToStore = tArrivalDate => {
    let tBookingPeriod = [];
    tArrivalDate.filter(val => {
      const tmp = {
        criteria_code: "bookingPeriod",
        from_value: val.startDate,
        to_value: val.endDate,
        operator: "BETWEEN",
        value_type: "D"
      };
      tBookingPeriod.push(tmp);
    });
    props.setDateFn({
      value: tBookingPeriod
    });
  };

  const plusButttonClickFn = isReturn => {
    let tBookingPeriod = [...bookingPeriod];
    const lastIndex = tBookingPeriod.length - 1;
    if (
      tBookingPeriod[lastIndex].startDate &&
      tBookingPeriod[lastIndex].endDate
    ) {
      tBookingPeriod.push({
        startDate: startDate,
        endDate: ""
      });
    } else {
      if (!tBookingPeriod[lastIndex].startDate) {
        tBookingPeriod[
          lastIndex
        ].startErrorMessage = BOOKING_PERIOD_START_DATE_REQUIRED;
      }

      if (!tBookingPeriod[lastIndex].endDate) {
        tBookingPeriod[
          lastIndex
        ].endErrorMessage = BOOKING_PERIOD_START_DATE_REQUIRED;
      }
    }

    changeBookingPeriod(tBookingPeriod);
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tBookingPeriod = [...bookingPeriod];

    tBookingPeriod.splice(index, 1);
    changeBookingPeriod(tBookingPeriod);
  };

  const startDateChanged = (index, isReturn, value) => {
    let tBookingPeriod = [...bookingPeriod];

    tBookingPeriod[index].startDate = value;
    tBookingPeriod[index].startErrorMessage = "";

    changeBookingPeriod(tBookingPeriod);
  };

  const endDateChanged = (index, isReturn, value) => {
    let tBookingPeriod = [...bookingPeriod];
    tBookingPeriod[index].endErrorMessage = "";
    tBookingPeriod[index].endDate = value;

    changeBookingPeriod(tBookingPeriod);
  };

  return (
    <CriteriaLayout heading="BookingPeriod">
      <div className="container">
        {bookingPeriod.map((val, index) => (
          <div key={index}>
            <SingleStartEndDatePicker
              isReturn={false}
              startDateErrorMessage={val.startErrorMessage}
              endDateErrorMessage={val.endErrorMessage}
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
              startDatePlaceHolder={BOOKING_PERIOD_PLACEHOLDER}
              endDatePlaceHolder={BOOKING_PERIOD_PLACEHOLDER_END}
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
    bookingPeriodStartDate: state.BookingPeriod.bookingPeriodStartDate,
    isValid: state.BookingPeriod.isValid,
    bookingPeriodEndDate: state.BookingPeriod.bookingPeriodEndDate,
    isEdit: state.EditDetails.isEdit,
    bookingPeriod: state.EditDetails.bookingPeriod
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDateFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPeriod);
