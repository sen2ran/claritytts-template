import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CheckBox from "../Input/CheckBox";
import { ARRIVAL_DATE_ALLOW_RETURN_LABEL_TITLE } from "./Constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SingleStartEndDatePicker from "../Criterias/Common/SingleStartEndDatePickerWithButton";
import {
  setDateFn,
  setReturnDateFn,
  setIsValid
} from "../../store/actions/ArrivalDateAction";

import {
  ARRIVAL_START_DATE_REQUIRED,
  ARRIVAL_END_DATE_REQUIRED
} from "./Constants/ErrorMessages";

const ArrivalDate = props => {
  let { setDateFn, setReturnDateFn } = props;

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

  const [arrivalDate, changeArrivalDate] = useState([]);

  const [arrivalDateReturn, changeArrivalDateReturn] = useState([]);

  const [disableDates, changeDisableDates] = useState([]);

  const [isReturn, changeIsReturn] = useState(false);

  if (!props.isValid) {
    // console.log("validation here");
    let tArrivalDate = [...arrivalDate];
    let tArrivalDateReturn = [...arrivalDateReturn];
    // console.log("isReturn", isReturn);

    const lastIndex = tArrivalDate.length - 1;
    const lastIndexValue = tArrivalDate[lastIndex];
    // console.log("lastIndexValue", lastIndexValue);
    if (lastIndexValue) {
      if (!lastIndexValue.startDate || !lastIndexValue.endDate) {
        //Error message here
        if (
          !lastIndexValue.startDate &&
          !lastIndexValue.startDateErrorMessage
        ) {
          tArrivalDate[
            lastIndex
          ].startErrorMessage = ARRIVAL_START_DATE_REQUIRED;
          changeArrivalDate(tArrivalDate);
        }

        if (!lastIndexValue.endDate && !lastIndexValue.endErrorMessage) {
          tArrivalDate[lastIndex].endErrorMessage = ARRIVAL_END_DATE_REQUIRED;
          changeArrivalDate(tArrivalDate);
        }
      }
    }
    if (isReturn) {
      const lastIndex = tArrivalDateReturn.length - 1;
      const lastIndexValue = tArrivalDateReturn[lastIndex];
      if (lastIndexValue) {
        if (!lastIndexValue.startDate || !lastIndexValue.endDate) {
          //Error message here
          if (!lastIndexValue.startDate) {
            tArrivalDateReturn[
              lastIndex
            ].startErrorMessage = ARRIVAL_START_DATE_REQUIRED;
          }

          if (!lastIndexValue.endDate) {
            tArrivalDateReturn[
              lastIndex
            ].endErrorMessage = ARRIVAL_END_DATE_REQUIRED;
          }
          //changeArrivalDateReturn(tArrivalDateReturn);
        }
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.onwardArrivalDate && props.onwardArrivalDate.length > 0) {
        changeArrivalDate(
          props.onwardArrivalDate.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeArrivalDate([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }

      if (props.returnArrivalDate && props.returnArrivalDate.length > 0) {
        if (props.returnArrivalDate.length > 0) {
          changeIsReturn(true);
        }

        changeArrivalDateReturn(
          props.returnArrivalDate.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeArrivalDateReturn([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }
    } else {
      changeArrivalDate([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);
      changeArrivalDateReturn([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);
    }
  }, []);
  //<<EditDetail

  useEffect(() => {
    updateDatesToStore(arrivalDate);
  }, [arrivalDate]);

  useEffect(() => {
    if (isReturn) updateReturnDatesToStore(arrivalDateReturn);
  }, [arrivalDateReturn]);

  useEffect(() => {
    isReturn
      ? updateReturnDatesToStore(arrivalDateReturn)
      : updateReturnDatesToStore([]);
  }, [isReturn]);

  const updateReturnDatesToStore = tArrivalDateReturn => {
    let tmpDate = [];
    tArrivalDateReturn.filter(val => {
      let tmp = {
        criteria_code: "returnArrivalDate",
        from_value: val.startDate,
        to_value: val.endDate,
        operator: "BETWEEN",
        value_type: "D"
      };
      tmpDate.push(tmp);
    });

    setReturnDateFn({ value: tmpDate });
  };

  const updateDatesToStore = tArrivalDate => {
    let tmpDate = [];
    tArrivalDate.filter(val => {
      let tmp = {
        criteria_code: "onwardArrivalDate",
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
    let tArrivalDate = [...arrivalDate];
    let tArrivalDateReturn = [...arrivalDateReturn];
    if (!isReturn) {
      const lastIndex = tArrivalDate.length - 1;
      const lastIndexValue = tArrivalDate[lastIndex];
      if (lastIndexValue.startDate && lastIndexValue.endDate) {
        tArrivalDate.push({
          startDate: startDate,
          endDate: ""
        });
      } else {
        //Error message here
        if (!lastIndexValue.startDate) {
          tArrivalDate[
            lastIndex
          ].startErrorMessage = ARRIVAL_START_DATE_REQUIRED;
        }

        if (!lastIndexValue.endDate) {
          tArrivalDate[lastIndex].endErrorMessage = ARRIVAL_END_DATE_REQUIRED;
        }
      }

      changeArrivalDate(tArrivalDate);
    } else {
      const lastIndex = tArrivalDateReturn.length - 1;
      const lastIndexValue = tArrivalDateReturn[lastIndex];
      if (lastIndexValue.startDate && lastIndexValue.endDate) {
        tArrivalDateReturn.push({
          startDate: startDate,
          endDate: ""
        });
      } else {
        //Error message here
        if (!lastIndexValue.startDate) {
          tArrivalDateReturn[
            lastIndex
          ].startErrorMessage = ARRIVAL_START_DATE_REQUIRED;
        }

        if (!lastIndexValue.endDate) {
          tArrivalDateReturn[
            lastIndex
          ].endErrorMessage = ARRIVAL_END_DATE_REQUIRED;
        }
      }

      changeArrivalDateReturn(tArrivalDateReturn);
    }
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tArrivalDate = [...arrivalDate];
    let tArrivalDateReturn = [...arrivalDateReturn];
    if (!isReturn) {
      tArrivalDate.splice(index, 1);
      changeArrivalDate(tArrivalDate);
    } else {
      tArrivalDateReturn.splice(index, 1);
      changeArrivalDateReturn(tArrivalDateReturn);
    }
  };

  const startDateChanged = (index, isReturn, value) => {
    let tArrivalDate = [...arrivalDate];
    let tArrivalDateReturn = [...arrivalDateReturn];
    if (!isReturn) {
      tArrivalDate[index].startDate = value;
      tArrivalDate[index].startErrorMessage = "";
    } else {
      tArrivalDateReturn[index].startDate = value;
      tArrivalDateReturn[index].startErrorMessage = "";
    }
    changeArrivalDate(tArrivalDate);
    changeArrivalDateReturn(tArrivalDateReturn);
  };

  const endDateChanged = (index, isReturn, value) => {
    let tArrivalDate = [...arrivalDate];
    let tArrivalDateReturn = [...arrivalDateReturn];
    if (!isReturn) {
      tArrivalDate[index].endDate = value;
      tArrivalDate[index].endErrorMessage = "";
    } else {
      tArrivalDateReturn[index].endDate = value;
      tArrivalDateReturn[index].endErrorMessage = "";
    }
    changeArrivalDate(tArrivalDate);

    changeArrivalDateReturn(tArrivalDateReturn);
  };

  const handleCheckBoxChange = () => {
    changeIsReturn(!isReturn);
  };

  const returnDateRender = () => {
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

    if (isReturn) {
      return arrivalDateReturn.map((val, index) => (
        <div key={index}>
          <SingleStartEndDatePicker
            startDateErrorMessage={val.startErrorMessage}
            endDateErrorMessage={val.endErrorMessage}
            isReturn={true}
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
      ));
    }
  };

  return (
    <CriteriaLayout heading="ArrivalDate">
      <div className="container">
        {arrivalDate.map((val, index) => (
          <div key={index}>
            <SingleStartEndDatePicker
              startDateErrorMessage={val.startErrorMessage}
              endDateErrorMessage={val.endErrorMessage}
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
        <div className="row">
          <CheckBox
            label={ARRIVAL_DATE_ALLOW_RETURN_LABEL_TITLE}
            onCheckboxChange={handleCheckBoxChange}
            isSelected={isReturn}
          />
        </div>
        {returnDateRender()}
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isEdit: state.EditDetails.isEdit,
    onwardArrivalDate: state.EditDetails.onwardArrivalDate,
    returnArrivalDate: state.EditDetails.returnArrivalDate,
    isValid: state.ArrivalDate.isValid
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setDateFn, setReturnDateFn, setIsValid },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrivalDate);
