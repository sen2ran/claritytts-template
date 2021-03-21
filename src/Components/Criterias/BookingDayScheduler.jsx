import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CheckBox from "../Input/CheckBox";
import DaySchedular from "./Common/DaySchedular";
import {
  ARIVAL_DAY_SCHEDULER_ALLOW_RETURN_LABEL_TITLE,
  WEEK,
  DAYS,
  MONTHS,
  ARRIVAL_DAY_SCHEDULER_DROPDOWN
} from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setTime,
  setMonth,
  setType,
  setWeek,
  setDay
} from "../../store/actions/BookingDaySchedulerAction";

import {
  MONTH_REQUIRED_SHEDULER,
  OPTION_REQUIRED_SHEDULER,
  DAY_DATES_REQUIRED_SHEDULER,
  START_TIME_REQUIRED_SHEDULER,
  END_TIME_REQUIRED_SHEDULER
} from "./Constants/ErrorMessages";

const BookingDayScheduler = props => {
  let { setTime, setMonth, setType, setWeek, setDay } = props;

  const [bookingDaySchedular, setBookingDaySchedular] = useState([]);
  if (!props.isValid) {
    let tArrivalDaySchedular = [...bookingDaySchedular];
    const lastIndex = tArrivalDaySchedular.length - 1;
    const lastValue = tArrivalDaySchedular[lastIndex];

    if (lastValue) {
      if (lastValue.month.length === 0 && !lastValue.monthErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].monthErrorMessage = MONTH_REQUIRED_SHEDULER;
        setBookingDaySchedular(tArrivalDaySchedular);
      }

      if (lastValue.option.length === 0 && !lastValue.optionErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].optionErrorMessage = OPTION_REQUIRED_SHEDULER;
        setBookingDaySchedular(tArrivalDaySchedular);
      }

      if (
        lastValue.bookingWeek.length === 0 &&
        !lastValue.dayDatesErrorMessage
      ) {
        tArrivalDaySchedular[
          lastIndex
        ].dayDatesErrorMessage = DAY_DATES_REQUIRED_SHEDULER;
        setBookingDaySchedular(tArrivalDaySchedular);
      }

      if (
        !lastValue.bookingWeek.startTime &&
        !lastValue.startTimeErrorMessage
      ) {
        tArrivalDaySchedular[
          lastIndex
        ].startTimeErrorMessage = START_TIME_REQUIRED_SHEDULER;
        setBookingDaySchedular(tArrivalDaySchedular);
      }

      if (!lastValue.bookingWeek.endTime && !lastValue.endTimeErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].endTimeErrorMessage = END_TIME_REQUIRED_SHEDULER;
        setBookingDaySchedular(tArrivalDaySchedular);
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (
        props.bookingMonth &&
        props.bookingMonth.length > 0 &&
        props.bookingWeek &&
        props.bookingWeek.length > 0
      ) {
        setBookingDaySchedular(
          getAllDetails(
            props.bookingMonth,
            props.schedulerType,
            props.bookingDay,
            props.bookingWeek,
            props.bookingTime
          )
        );
      } else {
        setBookingDaySchedular([
          {
            month: [],
            option: [],
            bookingWeek: [],
            startTime: "",
            endTime: "",
            type: []
          }
        ]);
      }
    } else {
      setBookingDaySchedular([
        {
          month: [],
          option: [],
          bookingWeek: [],
          startTime: "",
          endTime: "",
          type: []
        }
      ]);
    }
  }, []);
  //<<EditDetail

  const getAllDetails = (
    onwardArrivalMonth,
    arrivalSchedulerType,
    onwardArrivalDay,
    onwardArrivalWeek,
    onwardDepartureTime
  ) => {
    let tMonth = [];
    let tOption = [];
    let tBookingWeek = [];
    let tStartTime = [];
    let tEndTime = [];
    tMonth = onwardArrivalMonth.map((val, index) => {
      if (val.from_value === "ALL") {
        return MONTHS;
      } else {
        return val.from_value.split(",").map(mvalue => {
          let tmp = {
            name: mvalue,
            value: mvalue
          };
          return tmp;
        });
      }
    });
    tOption = arrivalSchedulerType.map((value, index) => {
      return ARRIVAL_DAY_SCHEDULER_DROPDOWN.filter(val => {
        if (val.name.toLowerCase() === value.from_value.toLowerCase()) {
          const tmp = {
            name: value.from_value,
            value: value.from_value
          };
          return tmp;
        }
      });
    });

    tBookingWeek = onwardArrivalWeek.map((value, index) => {
      if (value.from_value === "ALL") {
        return onwardArrivalDay[index].from_value.split(",").map(val => {
          let tmp = {
            name: val,
            value: val
          };
          return tmp;
        });
      } else {
        return value.from_value.split(",").map(val => {
          let tmp = {
            name: val,
            value: val
          };
          return tmp;
        });
      }
    });
    console.log("tBookingWeek", tBookingWeek);
    let schedular = [];

    tStartTime = onwardDepartureTime.map(val => {
      return val.from_value;
    });

    tEndTime = onwardDepartureTime.map(val => {
      return val.to_value;
    });

    schedular = tMonth.map((val, index) => {
      const tmp = {
        month: tMonth[index],
        option: tOption[index],
        bookingWeek: tBookingWeek[index],
        startTime: tStartTime[index],
        endTime: tEndTime[index],
        type: tOption[index].name === "Dates" ? DAYS : WEEK
      };

      return tmp;
    });

    return schedular;
  };

  useEffect(() => {
    updateToStore(bookingDaySchedular);
  }, [bookingDaySchedular]);

  const updateToStore = (tbookingDaySchedularReturn, isReturn) => {
    let tTime = [];
    let tMonth = [];
    let tType = [];
    let tDays = [];
    let tWeek = [];

    tbookingDaySchedularReturn.filter(val => {
      if (val.startTime != "" || val.endTime != "") {
        let tmpTime = {
          criteria_code: "bookingTime",
          from_value: val.startTime,
          to_value: val.endTime,
          operator: "BETWEEN",
          value_type: "D"
        };
        tTime.push(tmpTime);
      }

      let tmpMonthArray = [];
      if (val.month.length > 0) {
        val.month.filter(valMonth => {
          tmpMonthArray.push(valMonth.name);
        });

        let tmpMonth = {
          criteria_code: "bookingMonth",
          operator: "=",
          from_value: String(tmpMonthArray),
          to_value: "",
          value_type: "D"
        };
        tMonth.push(tmpMonth);
      }

      if (val.option.length > 0) {
        let tmpType = {
          criteria_code: "schedulerType",
          operator: "=",
          from_value: val.option[0].value.toLowerCase(),
          to_value: "",
          value_type: "D"
        };
        tType.push(tmpType);

        if (val.option[0].value.toLowerCase() === "days") {
          let tmpDate = [];
          if (val.bookingWeek.length > 0) {
            let bookingWeek = val.bookingWeek;
            bookingWeek.filter(valBooking => {
              tmpDate.push(valBooking.value);
            });

            tDays.push({
              criteria_code: "bookingDay",
              operator: "=",
              from_value: "ALL",
              to_value: "",
              value_type: "D"
            });

            tWeek.push({
              criteria_code: "bookingWeek",
              operator: "=",
              from_value: String(tmpDate),
              to_value: "",
              value_type: "D"
            });
          }
        } else {
          let tmpDays = [];
          if (val.bookingWeek.length > 0) {
            let bookingWeek = val.bookingWeek;
            bookingWeek.filter(valWeek => {
              tmpDays.push(valWeek.value);
            });

            tWeek.push({
              criteria_code: "bookingWeek",
              operator: "=",
              from_value: "ALL",
              to_value: "",
              value_type: "D"
            });

            tDays.push({
              criteria_code: "bookingDay",
              operator: "=",
              from_value: String(tmpDays),
              to_value: "",
              value_type: "D"
            });
          }
        }
      }
    });

    let val = "";
    val =
      tTime.length === 0
        ? (tTime = [
            {
              criteria_code: "bookingTime",
              from_value: "",
              to_value: "",
              operator: "BETWEEN",
              value_type: "D"
            }
          ])
        : null;

    val =
      tMonth.length === 0
        ? (tMonth = [
            {
              criteria_code: "bookingMonth",
              operator: "=",
              from_value: "",
              to_value: "",
              value_type: "D"
            }
          ])
        : null;

    val =
      tType.length === 0
        ? (tType = [
            {
              criteria_code: "schedulerType",
              operator: "=",
              from_value: "",
              to_value: "",
              value_type: "D"
            }
          ])
        : null;

    val =
      tWeek.length === 0
        ? (tWeek = [
            {
              criteria_code: "bookingWeek",
              operator: "=",
              from_value: "",
              to_value: "",
              value_type: "D"
            }
          ])
        : null;

    val =
      tDays.length === 0
        ? (tDays = [
            {
              criteria_code: "bookingDay",
              operator: "=",
              from_value: "",
              to_value: "",
              value_type: "D"
            }
          ])
        : null;

    setType({ value: tType });
    setTime({ value: tTime });
    setMonth({ value: tMonth });
    setWeek({ value: tWeek });
    setDay({ value: tDays });
  };

  const plusButttonClickFn = isReturn => {
    let tBookingDaySchedular = [...bookingDaySchedular];
    tBookingDaySchedular.push({
      month: [],
      option: [],
      startTime: "",
      bookingWeek: [],
      endTime: ""
    });

    setBookingDaySchedular(tBookingDaySchedular);
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tBookingDaySchedular = [...bookingDaySchedular];
    tBookingDaySchedular = tBookingDaySchedular.filter((val, i) => {
      return index != i;
    });

    setBookingDaySchedular(tBookingDaySchedular);
  };

  const monthChange = (value, index, isReturn) => {
    let tBookingDaySchedular = [...bookingDaySchedular];
    tBookingDaySchedular[index].month = value;

    setBookingDaySchedular(tBookingDaySchedular);
  };

  const optionChange = (value, index, isReturn) => {
    let tBookingDaySchedular = [...bookingDaySchedular];
    tBookingDaySchedular[index].option = value;
    if (value.length > 0) {
      if (value[0].name === "Dates") {
        tBookingDaySchedular[index].type = DAYS;
        tBookingDaySchedular[index].bookingWeek = [];
      } else {
        tBookingDaySchedular[index].type = WEEK;
        tBookingDaySchedular[index].bookingWeek = [];
      }
    }

    setBookingDaySchedular(tBookingDaySchedular);
  };

  const typeChanged = (value, index, isReturn) => {
    let tBookingDaySchedular = [...bookingDaySchedular];
    tBookingDaySchedular[index].bookingWeek = value;

    setBookingDaySchedular(tBookingDaySchedular);
  };

  const timeChanged = (isReturn, value, index, isStart) => {
    if (isStart) {
      let tBookingDaySchedular = [...bookingDaySchedular];
      if (value) {
        tBookingDaySchedular[index].startTime = value;
        tBookingDaySchedular[index].startTimeErrorMessage = ""
        setBookingDaySchedular(tBookingDaySchedular);
      }
    } else {
      let tBookingDaySchedular = [...bookingDaySchedular];
      if (value) {
        tBookingDaySchedular[index].endTime = value;
        tBookingDaySchedular[index].endTimeErrorMessage = ""
        setBookingDaySchedular(tBookingDaySchedular);
      }
    }
  };
  return (
    <CriteriaLayout heading="BookingDayScheduler">
      <div className="container">
        {bookingDaySchedular.map((val, index) => (
          <DaySchedular
            key={index}
            obj={val}
            index={index}
            arrayObj={bookingDaySchedular}
            monthChanged={(value, index, isReturn) =>
              monthChange(value, index, isReturn)
            }
            optionChanged={(value, index, isReturn) =>
              optionChange(value, index, isReturn)
            }
            typeChanged={(value, index, isReturn) =>
              typeChanged(value, index, isReturn)
            }
            timeChanged={(isReturn, value, index, isStart) =>
              timeChanged(isReturn, value, index, isStart)
            }
            plusButtonClicked={isReturn => plusButttonClickFn(isReturn)}
            minusButtonClicked={(index, isReturn) =>
              minusButttonClickFn(index, isReturn)
            }
            monthErrorMessage={val.monthErrorMessage}
            optionErrorMessage={val.optionErrorMessage}
            dayDatesErrorMessage={val.dayDatesErrorMessage}
            startTimeErrorMessage={val.startTimeErrorMessage}
            endTimeErrorMessage={val.endTimeErrorMessage}
            setMonthErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...bookingDaySchedular];
              tArrivalDaySchedular[index].monthErrorMessage = val;
              setBookingDaySchedular(tArrivalDaySchedular);
            }}
            setOptionErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...bookingDaySchedular];
              tArrivalDaySchedular[index].optionErrorMessage = val;
              setBookingDaySchedular(tArrivalDaySchedular);
            }}
            setDayDatesErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...bookingDaySchedular];
              tArrivalDaySchedular[index].dayDatesErrorMessage = val;
              setBookingDaySchedular(tArrivalDaySchedular);
            }}
            setStartTimeErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...bookingDaySchedular];
              tArrivalDaySchedular[index].startTimeErrorMessage = val;
              setBookingDaySchedular(tArrivalDaySchedular);
            }}
            setEndTimeErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...bookingDaySchedular];
              tArrivalDaySchedular[index].endTimeErrorMessage = val;
              setBookingDaySchedular(tArrivalDaySchedular);
            }}
          />
        ))}
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.BookingDaySchedular.isValid,
    isEdit: state.EditDetails.bookingMonth,
    bookingMonth: state.EditDetails.bookingMonth,
    schedulerType: state.EditDetails.schedulerType,
    bookingDay: state.EditDetails.bookingDay,
    bookingWeek: state.EditDetails.bookingWeek,
    bookingTime: state.EditDetails.bookingTime
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setTime,
      setMonth,
      setType,
      setWeek,
      setDay
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingDayScheduler);
