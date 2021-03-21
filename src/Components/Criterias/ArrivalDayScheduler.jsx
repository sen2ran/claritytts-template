import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CheckBox from "../Input/CheckBox";
import DaySchedular from "./Common/DaySchedular";
import {
  ARIVAL_DAY_SCHEDULER_ALLOW_RETURN_LABEL_TITLE,
  WEEK,
  DAYS,
  ARRIVAL_DAY_SCHEDULER_DROPDOWN,
  MONTHS
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
} from "../../store/actions/ArrivalDaySchedulerAction";

import {
  MONTH_REQUIRED_SHEDULER,
  OPTION_REQUIRED_SHEDULER,
  DAY_DATES_REQUIRED_SHEDULER,
  START_TIME_REQUIRED_SHEDULER,
  END_TIME_REQUIRED_SHEDULER
} from "./Constants/ErrorMessages";

const ArrivalDayScheduler = props => {
  let {
    onwardDepartureTime,
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

  const [arrivalDaySchedular, setArrivalDaySchedular] = useState([]);
  const [arrivalDaySchedularReturn, setArrivalDaySchedularReturn] = useState(
    []
  );
  const [isReturn, setIsReturn] = useState(false);

  if (!props.isValid) {
    let tArrivalDaySchedular = [...arrivalDaySchedular];
    const lastIndex = tArrivalDaySchedular.length - 1;
    const lastValue = tArrivalDaySchedular[lastIndex];

    if (lastValue) {
      if (lastValue.month.length === 0 && !lastValue.monthErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].monthErrorMessage = MONTH_REQUIRED_SHEDULER;
        setArrivalDaySchedular(tArrivalDaySchedular);
      }

      if (lastValue.option.length === 0 && !lastValue.optionErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].optionErrorMessage = OPTION_REQUIRED_SHEDULER;
        setArrivalDaySchedular(tArrivalDaySchedular);
      }

      if (
        lastValue.bookingWeek.length === 0 &&
        !lastValue.dayDatesErrorMessage
      ) {
        tArrivalDaySchedular[
          lastIndex
        ].dayDatesErrorMessage = DAY_DATES_REQUIRED_SHEDULER;
        setArrivalDaySchedular(tArrivalDaySchedular);
      }

      if (
        !lastValue.bookingWeek.startTime &&
        !lastValue.startTimeErrorMessage
      ) {
        tArrivalDaySchedular[
          lastIndex
        ].startTimeErrorMessage = START_TIME_REQUIRED_SHEDULER;
        setArrivalDaySchedular(tArrivalDaySchedular);
      }

      if (!lastValue.bookingWeek.endTime && !lastValue.endTimeErrorMessage) {
        tArrivalDaySchedular[
          lastIndex
        ].endTimeErrorMessage = END_TIME_REQUIRED_SHEDULER;
        setArrivalDaySchedular(tArrivalDaySchedular);
      }
    }

    if (isReturn) {
      let tArrivalDaySchedular = [...arrivalDaySchedularReturn];
      const lastIndex = arrivalDaySchedularReturn.length - 1;
      const lastValue = arrivalDaySchedularReturn[lastIndex];

      if (lastValue) {
        if (lastValue.month.length === 0 && !lastValue.monthErrorMessage) {
          tArrivalDaySchedular[
            lastIndex
          ].monthErrorMessage = MONTH_REQUIRED_SHEDULER;
          setArrivalDaySchedularReturn(tArrivalDaySchedular);
        }

        if (lastValue.option.length === 0 && !lastValue.optionErrorMessage) {
          tArrivalDaySchedular[
            lastIndex
          ].optionErrorMessage = OPTION_REQUIRED_SHEDULER;
          setArrivalDaySchedularReturn(tArrivalDaySchedular);
        }

        if (
          lastValue.bookingWeek.length === 0 &&
          !lastValue.dayDatesErrorMessage
        ) {
          tArrivalDaySchedular[
            lastIndex
          ].dayDatesErrorMessage = DAY_DATES_REQUIRED_SHEDULER;
          setArrivalDaySchedularReturn(tArrivalDaySchedular);
        }

        if (
          !lastValue.bookingWeek.startTime &&
          !lastValue.startTimeErrorMessage
        ) {
          tArrivalDaySchedular[
            lastIndex
          ].startTimeErrorMessage = START_TIME_REQUIRED_SHEDULER;
          setArrivalDaySchedularReturn(tArrivalDaySchedular);
        }

        if (!lastValue.bookingWeek.endTime && !lastValue.endTimeErrorMessage) {
          tArrivalDaySchedular[
            lastIndex
          ].endTimeErrorMessage = END_TIME_REQUIRED_SHEDULER;
          setArrivalDaySchedularReturn(tArrivalDaySchedular);
        }
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.onwardArrivalMonth) {
        setArrivalDaySchedular(
          getAllDetails(
            props.onwardArrivalMonth,
            props.arrivalSchedulerType,
            props.onwardArrivalDay,
            props.onwardArrivalWeek,
            props.onwardArrivalTime
          )
        );
      } else {
        setArrivalDaySchedular([
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

      if (props.returnArrivalMonth) {
        setArrivalDaySchedularReturn(
          getAllDetails(
            props.returnArrivalMonth,
            props.returnArrivalSchedulerType,
            props.returnArrivalDay,
            props.returnArrivalWeek,
            props.returnArrivalTime
          )
        );
        setIsReturn(true);
      } else {
        setArrivalDaySchedularReturn([
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
      setArrivalDaySchedular([
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

    setArrivalDaySchedularReturn([
      {
        month: [],
        option: [],
        bookingWeek: [],
        startTime: "",
        endTime: "",
        type: []
      }
    ]);
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
    let tArrivalDaySchedular = [];

    tStartTime = onwardDepartureTime.map(val => {
      return val.from_value;
    });

    tEndTime = onwardDepartureTime.map(val => {
      return val.to_value;
    });

    tArrivalDaySchedular = tMonth.map((val, index) => {
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

    return tArrivalDaySchedular;
  };

  useEffect(() => {
    updateToStore(arrivalDaySchedular, false);
  }, [arrivalDaySchedular]);

  useEffect(() => {
    updateToStore(arrivalDaySchedularReturn, true);
  }, [arrivalDaySchedularReturn]);

  useEffect(() => {
    if (isReturn) {
      updateToStore(arrivalDaySchedularReturn, true);
    } else {
      setTypeReturn({ value: [] });
      setTimeReturn({ value: [] });
      setMonthReturn({ value: [] });
      setWeekReturn({ value: [] });
      setDayReturn({ value: [] });
    }
  }, [isReturn]);

  const updateToStore = (tarrivalDaySchedular, isReturnx) => {
    let tTime = [];
    let tMonth = [];
    let tType = [];
    let tDays = [];
    let tWeek = [];

    tarrivalDaySchedular.filter(val => {
      if (val.startTime != "" || val.endTime != "") {
        let tmpTime = {
          criteria_code: isReturn ? "returnArrivalTime" : "onwardArrivalTime",
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
          criteria_code: isReturn ? "returnArrivalMonth" : "onwardArrivalMonth",
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
            ? "returnArrivalSchedulerType"
            : "arrivalSchedulerType",
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
              criteria_code: isReturn ? "returnArrivalDay" : "onwardArrivalDay",
              operator: "=",
              from_value: "ALL",
              to_value: "",
              value_type: "D"
            });

            tWeek.push({
              criteria_code: isReturn
                ? "returnArrivalWeek"
                : "onwardArrivalWeek",
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

            tDays.push({
              criteria_code: isReturn ? "returnArrivalDay" : "onwardArrivalDay",
              operator: "=",
              from_value: String(tmpDays),
              to_value: "",
              value_type: "D"
            });

            tWeek.push({
              criteria_code: isReturn
                ? "returnArrivalWeek"
                : "onwardArrivalWeek",
              operator: "=",
              from_value: "ALL",
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
                ? "returnArrivalTime"
                : "onwardArrivalTime",
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
                ? "returnArrivalMonth"
                : "onwardArrivalMonth",
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
                ? "returnArrivalSchedulerType"
                : "arrivalSchedulerType",
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
                ? "returnArrivalWeek"
                : "onwardArrivalWeek",
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
              criteria_code: isReturn ? "returnArrivalDay" : "onwardArrivalDay",
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
      let tArrivalDaySchedular = [...arrivalDaySchedular];
      tArrivalDaySchedular.push({
        month: [],
        option: [],
        startTime: "",
        bookingWeek: [],
        endTime: ""
      });

      setArrivalDaySchedular(tArrivalDaySchedular);
    } else {
      let tArrivalDaySchedularReturn = [...arrivalDaySchedularReturn];
      tArrivalDaySchedularReturn.push({
        month: [],
        option: [],
        startTime: "",
        bookingWeek: [],
        endTime: ""
      });

      setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
    }
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tArrivalDaySchedular = [...arrivalDaySchedular];
    let tArrivalDaySchedularReturn = [...arrivalDaySchedularReturn];
    if (!isReturn) {
      tArrivalDaySchedular = tArrivalDaySchedular.filter((val, i) => {
        return index != i;
      });

      setArrivalDaySchedular(tArrivalDaySchedular);
    } else {
      tArrivalDaySchedularReturn = tArrivalDaySchedularReturn.filter(
        (val, i) => {
          return index != i;
        }
      );

      setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
    }
  };

  const monthChange = (value, index, isReturn) => {
    let tArrivalDaySchedular = [...arrivalDaySchedular];
    let tArrivalDaySchedularReturn = [...arrivalDaySchedularReturn];

    if (!isReturn) {
      tArrivalDaySchedular[index].month = value;

      setArrivalDaySchedular(tArrivalDaySchedular);
    } else {
      tArrivalDaySchedularReturn[index].month = value;

      setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
    }
  };

  const optionChange = (value, index, isReturn) => {
    let tArrivalDaySchedular = [...arrivalDaySchedular];
    let tArrivalDaySchedularReturn = [...arrivalDaySchedularReturn];
    if (!isReturn) {
      tArrivalDaySchedular[index].option = value;
      if (value.length > 0) {
        if (value[0].name === "Dates") {
          tArrivalDaySchedular[index].type = DAYS;
          tArrivalDaySchedular[index].bookingWeek = [];
        } else {
          tArrivalDaySchedular[index].type = WEEK;
          tArrivalDaySchedular[index].bookingWeek = [];
        }
      }

      setArrivalDaySchedular(tArrivalDaySchedular);
    } else {
      tArrivalDaySchedularReturn[index].option = value;

      if (value.length > 0) {
        if (value[0].name === "Dates") {
          tArrivalDaySchedularReturn[index].type = DAYS;
          tArrivalDaySchedularReturn[index].bookingWeek = [];
        } else {
          tArrivalDaySchedularReturn[index].type = WEEK;
          tArrivalDaySchedularReturn[index].bookingWeek = [];
        }
      }

      setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
    }
  };

  const typeChanged = (value, index, isReturn) => {
    let tArrivalDaySchedular = [...arrivalDaySchedular];
    let tArrivalDaySchedularReturn = [...arrivalDaySchedularReturn];

    if (!isReturn) {
      tArrivalDaySchedular[index].bookingWeek = value;

      setArrivalDaySchedular(tArrivalDaySchedular);
    } else {
      tArrivalDaySchedularReturn[index].bookingWeek = value;
      setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
    }
  };

  const handleCheckBoxChange = () => {
    const tReturn = !isReturn;
    setIsReturn(!isReturn);
  };

  const timeChanged = (isReturn, value, index, isStart) => {
    console.log("timeChanged", timeChanged)
    if (isStart) {
      let tArrivalDaySchedular = [...arrivalDaySchedular];
      let tArrivalDaySchedularReturn = [...arrivalDaySchedularReturn];
      if (value) {
        if (!isReturn) {
          tArrivalDaySchedular[index].startTime = value;
          tArrivalDaySchedular[index].startTimeErrorMessage = ""
          setArrivalDaySchedular(tArrivalDaySchedular);
        } else {
          tArrivalDaySchedularReturn[index].startTime = value;
          tArrivalDaySchedularReturn[index].startTimeErrorMessage = ""
          setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
        }
      }
    } else {
      let tArrivalDaySchedular = [...arrivalDaySchedular];
      let tArrivalDaySchedularReturn = [...arrivalDaySchedularReturn];
      if (value) {
        if (!isReturn) {
          tArrivalDaySchedular[index].endTime = value;
          tArrivalDaySchedular[index].endTimeErrorMessage = ""
          setArrivalDaySchedular(tArrivalDaySchedular);
        } else {
          tArrivalDaySchedularReturn[index].endTime = value;
          tArrivalDaySchedularReturn[index].endTimeErrorMessage = ""
          setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
        }
      }
    }
  };
  return (
    <CriteriaLayout heading="ArrivalDayScheduler">
      <div className="container">
        {arrivalDaySchedular.map((val, index) => (
          <DaySchedular
            key={index}
            obj={val}
            index={index}
            arrayObj={arrivalDaySchedular}
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
              let tArrivalDaySchedular = [...arrivalDaySchedular];
              tArrivalDaySchedular[index].monthErrorMessage = val;
              setArrivalDaySchedular(tArrivalDaySchedular);
            }}
            setOptionErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...arrivalDaySchedular];
              tArrivalDaySchedular[index].optionErrorMessage = val;
              setArrivalDaySchedular(tArrivalDaySchedular);
            }}
            setDayDatesErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...arrivalDaySchedular];
              tArrivalDaySchedular[index].dayDatesErrorMessage = val;
              setArrivalDaySchedular(tArrivalDaySchedular);
            }}
            setStartTimeErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...arrivalDaySchedular];
              tArrivalDaySchedular[index].startTimeErrorMessage = val;
              setArrivalDaySchedular(tArrivalDaySchedular);
            }}
            setEndTimeErrorMessage={(val, index) => {
              let tArrivalDaySchedular = [...arrivalDaySchedular];
              tArrivalDaySchedular[index].endTimeErrorMessage = val;
              setArrivalDaySchedular(tArrivalDaySchedular);
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
          ? arrivalDaySchedularReturn.map((val, index) => (
              <DaySchedular
                key={index}
                obj={val}
                index={index}
                isReturn={true}
                arrayObj={arrivalDaySchedularReturn}
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
                  let tArrivalDaySchedularReturn = [
                    ...arrivalDaySchedularReturn
                  ];
                  tArrivalDaySchedularReturn[index].monthErrorMessage = val;
                  setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
                }}
                setOptionErrorMessage={(val, index) => {
                  let tArrivalDaySchedularReturn = [...arrivalDaySchedular];
                  tArrivalDaySchedularReturn[index].optionErrorMessage = val;
                  setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
                }}
                setDayDatesErrorMessage={(val, index) => {
                  let tArrivalDaySchedularReturn = [...arrivalDaySchedular];
                  tArrivalDaySchedularReturn[index].dayDatesErrorMessage = val;
                  setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
                }}
                setStartTimeErrorMessage={(val, index) => {
                  let tArrivalDaySchedularReturn = [...arrivalDaySchedular];
                  tArrivalDaySchedularReturn[index].startTimeErrorMessage = val;
                  setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
                }}
                setEndTimeErrorMessage={(val, index) => {
                  let tArrivalDaySchedularReturn = [...arrivalDaySchedular];
                  tArrivalDaySchedularReturn[index].endTimeErrorMessage = val;
                  setArrivalDaySchedularReturn(tArrivalDaySchedularReturn);
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
    isValid: state.ArrivalDayScheduler.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardArrivalMonth: state.EditDetails.onwardArrivalMonth,
    arrivalSchedulerType: state.EditDetails.arrivalSchedulerType,
    onwardArrivalWeek: state.EditDetails.onwardArrivalWeek,
    onwardArrivalDay: state.EditDetails.onwardArrivalDay,
    onwardArrivalTime: state.EditDetails.onwardArrivalTime,
    returnArrivalMonth: state.EditDetails.returnArrivalMonth,
    returnArrivalSchedulerType: state.EditDetails.returnArrivalSchedulerType,
    returnArrivalWeek: state.EditDetails.returnArrivalWeek,
    returnArrivalDay: state.EditDetails.returnArrivalDay,
    returnArrivalTime: state.EditDetails.returnArrivalTime
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
)(ArrivalDayScheduler);
