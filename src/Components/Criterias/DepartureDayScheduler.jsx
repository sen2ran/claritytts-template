import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CheckBox from "../Input/CheckBox";
import DaySchedular from "./Common/DaySchedular";
import {
  ARIVAL_DAY_SCHEDULER_ALLOW_RETURN_LABEL_TITLE,
  ARRIVAL_DAY_SCHEDULER_DROPDOWN,
  MONTHS,
  WEEK,
  DAYS
} from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setTime,
  setMonth,
  setType,
  setWeek,
  setDay,
  setTimeReturn,
  setMonthReturn,
  setTypeReturn,
  setWeekReturn,
  setDayReturn
} from "../../store/actions/DepartureDaySchedulerAction";

import {
  MONTH_REQUIRED_SHEDULER,
  OPTION_REQUIRED_SHEDULER,
  DAY_DATES_REQUIRED_SHEDULER,
  START_TIME_REQUIRED_SHEDULER,
  END_TIME_REQUIRED_SHEDULER
} from "./Constants/ErrorMessages";

const DepartureDayScheduler = props => {
  let {
    setTime,
    setMonth,
    setType,
    setWeek,
    setDay,
    setTimeReturn,
    setMonthReturn,
    setTypeReturn,
    setWeekReturn,
    setDayReturn
  } = props;
  const [DepartureDaySchedular, setDepartureDaySchedular] = useState([]);
  const [
    DepartureDaySchedularReturn,
    setDepartureDaySchedularReturn
  ] = useState([]);
  const [isReturn, setIsReturn] = useState(false);

  if (!props.isValid) {
    let tArrivalDaySchedular = [...DepartureDaySchedular];
    const lastIndex = tArrivalDaySchedular.length - 1;
    const lastValue = tArrivalDaySchedular[lastIndex];

    if (lastValue) {
      if (lastValue.month.length === 0 && !lastValue.monthErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].monthErrorMessage = MONTH_REQUIRED_SHEDULER;
        setDepartureDaySchedular(tArrivalDaySchedular);
      }

      if (lastValue.option.length === 0 && !lastValue.optionErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].optionErrorMessage = OPTION_REQUIRED_SHEDULER;
        setDepartureDaySchedular(tArrivalDaySchedular);
      }

      if (
        lastValue.bookingWeek.length === 0 &&
        !lastValue.dayDatesErrorMessage
      ) {
        tArrivalDaySchedular[
          lastIndex
        ].dayDatesErrorMessage = DAY_DATES_REQUIRED_SHEDULER;
        setDepartureDaySchedular(tArrivalDaySchedular);
      }

      if (
        !lastValue.bookingWeek.startTime &&
        !lastValue.startTimeErrorMessage
      ) {
        tArrivalDaySchedular[
          lastIndex
        ].startTimeErrorMessage = START_TIME_REQUIRED_SHEDULER;
        setDepartureDaySchedular(tArrivalDaySchedular);
      }

      if (!lastValue.bookingWeek.endTime && !lastValue.endTimeErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].endTimeErrorMessage = END_TIME_REQUIRED_SHEDULER;
        setDepartureDaySchedular(tArrivalDaySchedular);
      }
    }

    if (isReturn) {
      let tArrivalDaySchedular = [...DepartureDaySchedularReturn];
      const lastIndex = DepartureDaySchedularReturn.length - 1;
      const lastValue = DepartureDaySchedularReturn[lastIndex];

      if (lastValue) {
        if (lastValue.month.length === 0 && !lastValue.monthErrorMessage) {
          tArrivalDaySchedular[
            lastIndex
          ].monthErrorMessage = MONTH_REQUIRED_SHEDULER;
          setDepartureDaySchedularReturn(tArrivalDaySchedular);
        }

        if (lastValue.option.length === 0 && !lastValue.optionErrorMessage) {
          tArrivalDaySchedular[
            lastIndex
          ].optionErrorMessage = OPTION_REQUIRED_SHEDULER;
          setDepartureDaySchedularReturn(tArrivalDaySchedular);
        }

        if (
          lastValue.bookingWeek.length === 0 &&
          !lastValue.dayDatesErrorMessage
        ) {
          tArrivalDaySchedular[
            lastIndex
          ].dayDatesErrorMessage = DAY_DATES_REQUIRED_SHEDULER;
          setDepartureDaySchedularReturn(tArrivalDaySchedular);
        }

        if (
          !lastValue.bookingWeek.startTime &&
          !lastValue.startTimeErrorMessage
        ) {
          tArrivalDaySchedular[
            lastIndex
          ].startTimeErrorMessage = START_TIME_REQUIRED_SHEDULER;
          setDepartureDaySchedularReturn(tArrivalDaySchedular);
        }

        if (!lastValue.bookingWeek.endTime && !lastValue.endTimeErrorMessage) {
          tArrivalDaySchedular[
            lastIndex
          ].endTimeErrorMessage = END_TIME_REQUIRED_SHEDULER;
          setDepartureDaySchedularReturn(tArrivalDaySchedular);
        }
      }
    }
  }
  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (
        props.onwardDepartureMonth &&
        props.onwardDepartureMonth.length > 0 &&
        props.onwardDepartureWeek &&
        props.onwardDepartureWeek.length > 0
      ) {
        setDepartureDaySchedular(
          getAllDetails(
            props.onwardDepartureMonth,
            props.departureSchedulerType,
            props.onwardDepartureDay,
            props.onwardDepartureWeek,
            props.onwardDepartureTime
          )
        );
      } else {
        setDepartureDaySchedular([
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

      if (props.returnDepartureMonth) {
        setDepartureDaySchedularReturn(
          getAllDetails(
            props.returnDepartureMonth,
            props.returnDepartureSchedulerType,
            props.returnDepartureDay,
            props.returnDepartureWeek,
            props.returnDepartureTime
          )
        );
        setIsReturn(true);
      } else {
        setDepartureDaySchedularReturn([
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
      setDepartureDaySchedular([
        {
          month: [],
          option: [],
          bookingWeek: [],
          startTime: "",
          endTime: "",
          type: []
        }
      ]);

      setDepartureDaySchedularReturn([
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
    updateToStore(DepartureDaySchedular, false);
  }, [DepartureDaySchedular]);

  useEffect(() => {
    updateToStore(DepartureDaySchedularReturn, true);
  }, [DepartureDaySchedularReturn]);

  useEffect(() => {
    if (isReturn) {
      updateToStore(DepartureDaySchedularReturn, true);
    } else {
      setTypeReturn({ value: [] });
      setTimeReturn({ value: [] });
      setMonthReturn({ value: [] });
      setWeekReturn({ value: [] });
      setDayReturn({ value: [] });
    }
  }, [isReturn]);

  const updateToStore = (tDepartureDaySchedularReturn, isReturnx) => {
    let tTime = [];
    let tMonth = [];
    let tType = [];
    let tDays = [];
    let tWeek = [];

    tDepartureDaySchedularReturn.filter(val => {
      if (val.startTime != "" || val.endTime != "") {
        let tmpTime = {
          criteria_code: isReturn
            ? "returnDepartureTime"
            : "onwardDepartureTime",
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
          criteria_code: isReturn
            ? "returnDepartureMonth"
            : "onwardDepartureMonth",
          operator: "=",
          from_value: String(tmpMonthArray),
          to_value: "",
          value_type: "D"
        };
        tMonth.push(tmpMonth);
      }

      if (val.option.length > 0) {
        let tmpType = {
          criteria_code: isReturn
            ? "returnDepartureSchedulerType"
            : "departureSchedulerType",
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
              criteria_code: isReturn
                ? "returnDepartureDay"
                : "onwardDepartureDay",
              operator: "=",
              from_value: "ALL",
              to_value: "",
              value_type: "D"
            });

            tWeek.push({
              criteria_code: isReturn
                ? "returnDepartureWeek"
                : "onwardDepartureWeek",
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
              criteria_code: isReturn
                ? "returnDepartureWeek"
                : "onwardDepartureWeek",
              operator: "=",
              from_value: "ALL",
              to_value: "",
              value_type: "D"
            });

            tDays.push({
              criteria_code: isReturn
                ? "returnDepartureDay"
                : "onwardDepartureDay",
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
              criteria_code: isReturn
                ? "returnDepartureTime"
                : "onwardDepartureTime",
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
              criteria_code: isReturn
                ? "returnDepartureMonth"
                : "onwardDepartureMonth",
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
              criteria_code: isReturn
                ? "returnDepartureSchedulerType"
                : "departureSchedulerType",
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
              criteria_code: isReturn
                ? "returnDepartureWeek"
                : "onwardDepartureWeek",
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
              criteria_code: isReturn
                ? "returnDepartureDay"
                : "onwardDepartureDay",
              operator: "=",
              from_value: "",
              to_value: "",
              value_type: "D"
            }
          ])
        : null;
    if (isReturn) {
      setTypeReturn({ value: tType });
      setTimeReturn({ value: tTime });
      setMonthReturn({ value: tMonth });
      setWeekReturn({ value: tWeek });
      setDayReturn({ value: tDays });
    } else {
      setType({ value: tType });
      setTime({ value: tTime });
      setMonth({ value: tMonth });
      setWeek({ value: tWeek });
      setDay({ value: tDays });
    }
  };

  const plusButttonClickFn = isReturn => {
    if (!isReturn) {
      let tDepartureDaySchedular = [...DepartureDaySchedular];
      tDepartureDaySchedular.push({
        month: [],
        option: [],
        startTime: "",
        bookingWeek: [],
        endTime: ""
      });

      setDepartureDaySchedular(tDepartureDaySchedular);
    } else {
      let tDepartureDaySchedularReturn = [...DepartureDaySchedularReturn];
      tDepartureDaySchedularReturn.push({
        month: [],
        option: [],
        startTime: "",
        bookingWeek: [],
        endTime: ""
      });

      setDepartureDaySchedularReturn(tDepartureDaySchedularReturn);
    }
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tDepartureDaySchedular = [...DepartureDaySchedular];
    let tDepartureDaySchedularReturn = [...DepartureDaySchedularReturn];
    if (!isReturn) {
      tDepartureDaySchedular = tDepartureDaySchedular.filter((val, i) => {
        return index != i;
      });

      setDepartureDaySchedular(tDepartureDaySchedular);
    } else {
      tDepartureDaySchedularReturn = tDepartureDaySchedularReturn.filter(
        (val, i) => {
          return index != i;
        }
      );

      setDepartureDaySchedularReturn(tDepartureDaySchedularReturn);
    }
  };

  const monthChange = (value, index, isReturn) => {
    let tDepartureDaySchedular = [...DepartureDaySchedular];
    let tDepartureDaySchedularReturn = [...DepartureDaySchedularReturn];

    if (!isReturn) {
      tDepartureDaySchedular[index].month = value;

      setDepartureDaySchedular(tDepartureDaySchedular);
    } else {
      tDepartureDaySchedularReturn[index].month = value;

      setDepartureDaySchedularReturn(tDepartureDaySchedularReturn);
    }
  };

  const optionChange = (value, index, isReturn) => {
    let tDepartureDaySchedular = [...DepartureDaySchedular];
    let tDepartureDaySchedularReturn = [...DepartureDaySchedularReturn];
    if (!isReturn) {
      tDepartureDaySchedular[index].option = value;
      if (value.length > 0) {
        if (value[0].name === "Dates") {
          tDepartureDaySchedular[index].type = DAYS;
          tDepartureDaySchedular[index].bookingWeek = [];
        } else {
          tDepartureDaySchedular[index].type = WEEK;
          tDepartureDaySchedular[index].bookingWeek = [];
        }
      }

      setDepartureDaySchedular(tDepartureDaySchedular);
    } else {
      tDepartureDaySchedularReturn[index].option = value;

      if (value.length > 0) {
        if (value[0].name === "Dates") {
          tDepartureDaySchedularReturn[index].type = DAYS;
          tDepartureDaySchedularReturn[index].bookingWeek = [];
        } else {
          tDepartureDaySchedularReturn[index].type = WEEK;
          tDepartureDaySchedularReturn[index].bookingWeek = [];
        }
      }

      setDepartureDaySchedularReturn(tDepartureDaySchedularReturn);
    }
  };

  const typeChanged = (value, index, isReturn) => {
    let tDepartureDaySchedular = [...DepartureDaySchedular];
    let tDepartureDaySchedularReturn = [...DepartureDaySchedularReturn];

    if (!isReturn) {
      tDepartureDaySchedular[index].bookingWeek = value;

      setDepartureDaySchedular(tDepartureDaySchedular);
    } else {
      tDepartureDaySchedularReturn[index].bookingWeek = value;
      setDepartureDaySchedularReturn(tDepartureDaySchedularReturn);
    }
  };

  const handleCheckBoxChange = () => {
    setIsReturn(!isReturn);
  };

  const timeChanged = (isReturn, value, index, isStart) => {
    if (isStart) {
      let tDepartureDaySchedular = [...DepartureDaySchedular];
      let tDepartureDaySchedularReturn = [...DepartureDaySchedularReturn];
      if (value) {
        if (!isReturn) {
          tDepartureDaySchedular[index].startTime = value;
          tDepartureDaySchedular[index].startTimeErrorMessage = ""
          setDepartureDaySchedular(tDepartureDaySchedular);
        } else {
          tDepartureDaySchedularReturn[index].startTime = value;
          tDepartureDaySchedularReturn[index].startTimeErrorMessage = ""
          setDepartureDaySchedularReturn(tDepartureDaySchedularReturn);
        }
      }
    } else {
      let tDepartureDaySchedular = [...DepartureDaySchedular];
      let tDepartureDaySchedularReturn = [...DepartureDaySchedularReturn];
      if (value) {
        if (!isReturn) {
          tDepartureDaySchedular[index].endTime = value;
          tDepartureDaySchedular[index].endTimeErrorMessage = ""
          setDepartureDaySchedular(tDepartureDaySchedular);
        } else {
          tDepartureDaySchedularReturn[index].endTime = value;
          tDepartureDaySchedularReturn[index].endTimeErrorMessage = ""
          setDepartureDaySchedularReturn(tDepartureDaySchedularReturn);
        }
      }
    }
  };
  return (
    <CriteriaLayout heading="DepartureDayScheduler">
      <div className="container">
        {DepartureDaySchedular.map((val, index) => (
          <DaySchedular
            key={index}
            obj={val}
            index={index}
            arrayObj={DepartureDaySchedular}
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
              let tArrivalDaySchedular = [...DepartureDaySchedular];
              tArrivalDaySchedular[index].monthErrorMessage = val;
              setDepartureDaySchedular(tArrivalDaySchedular);
            }}
            setOptionErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...DepartureDaySchedular];
              tArrivalDaySchedular[index].optionErrorMessage = val;
              setDepartureDaySchedular(tArrivalDaySchedular);
            }}
            setDayDatesErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...DepartureDaySchedular];
              tArrivalDaySchedular[index].dayDatesErrorMessage = val;
              setDepartureDaySchedular(tArrivalDaySchedular);
            }}
            setStartTimeErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...DepartureDaySchedular];
              tArrivalDaySchedular[index].startTimeErrorMessage = val;
              setDepartureDaySchedular(tArrivalDaySchedular);
            }}
            setEndTimeErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...DepartureDaySchedular];
              tArrivalDaySchedular[index].endTimeErrorMessage = val;
              setDepartureDaySchedular(tArrivalDaySchedular);
            }}
          />
        ))}

        <div className="row">
          <div className="col-12">
            <CheckBox
              label={ARIVAL_DAY_SCHEDULER_ALLOW_RETURN_LABEL_TITLE}
              onCheckboxChange={handleCheckBoxChange}
              isSelected={isReturn}
            />
          </div>
        </div>
        {isReturn
          ? DepartureDaySchedularReturn.map((val, index) => (
              <DaySchedular
                key={index}
                obj={val}
                index={index}
                isReturn={true}
                arrayObj={DepartureDaySchedularReturn}
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
                  let tArrivalDaySchedular = [...DepartureDaySchedularReturn];
                  tArrivalDaySchedular[index].monthErrorMessage = val;
                  setDepartureDaySchedularReturn(tArrivalDaySchedular);
                }}
                setOptionErrorMessage={(val, index) => {
                  let tArrivalDaySchedular = [...DepartureDaySchedularReturn];
                  tArrivalDaySchedular[index].optionErrorMessage = val;
                  setDepartureDaySchedularReturn(tArrivalDaySchedular);
                }}
                setDayDatesErrorMessage={(val, index) => {
                  let tArrivalDaySchedular = [...DepartureDaySchedularReturn];
                  tArrivalDaySchedular[index].dayDatesErrorMessage = val;
                  setDepartureDaySchedularReturn(tArrivalDaySchedular);
                }}
                setStartTimeErrorMessage={(val, index) => {
                  let tArrivalDaySchedular = [...DepartureDaySchedularReturn];
                  tArrivalDaySchedular[index].startTimeErrorMessage = val;
                  setDepartureDaySchedularReturn(tArrivalDaySchedular);
                }}
                setEndTimeErrorMessage={(val, index) => {
                  let tArrivalDaySchedular = [...DepartureDaySchedularReturn];
                  tArrivalDaySchedular[index].endTimeErrorMessage = val;
                  setDepartureDaySchedularReturn(tArrivalDaySchedular);
                }}
              />
            ))
          : null}
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.DepartureDaySchedular.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardDepartureMonth: state.EditDetails.onwardDepartureMonth,
    departureSchedulerType: state.EditDetails.departureSchedulerType,
    onwardDepartureWeek: state.EditDetails.onwardDepartureWeek,
    onwardDepartureDay: state.EditDetails.onwardDepartureDay,
    onwardDepartureTime: state.EditDetails.onwardDepartureTime,
    returnDepartureMonth: state.EditDetails.returnDepartureMonth,
    returnDepartureSchedulerType:
      state.EditDetails.returnDepartureSchedulerType,
    returnDepartureWeek: state.EditDetails.returnDepartureWeek,
    returnDepartureDay: state.EditDetails.returnDepartureDay,
    returnDepartureTime: state.EditDetails.returnDepartureTime
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setTime,
      setMonth,
      setType,
      setWeek,
      setDay,
      setTimeReturn,
      setMonthReturn,
      setTypeReturn,
      setWeekReturn,
      setDayReturn
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartureDayScheduler);
