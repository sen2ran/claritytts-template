import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CheckBox from "../Input/CheckBox";
import {
  BLOCKOUT_DEPARTURE_DATE_START_DATE,
  BLOCKOUT_DEPARTURE_DATE_END_DATE,
  BLOCKOUT_DEPARTURE_RETURN_LABEL
} from "./Constants";
import SingleStartEndDatePicker from "../Criterias/Common/SingleStartEndDatePickerWithButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setDateFn,
  setReturnDateFn
} from "../../store/actions/BlockoutDepartureAction";

import {
  BLOCKOUT_DEPARTURE_START_DATE_REQURIED,
  BLOCKOUT_DEPARTURE_END_DATE_REQURIED
} from "./Constants/ErrorMessages";

const BlockedOutDepartureDate = props => {
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

  const [blockedOutDepartureDate, changeBlockedOutDepartureDate] = useState([]);

  const [
    blockedOutDepartureDateReturn,
    changeBlockedOutDepartureDateReturn
  ] = useState([]);

  const [disableDates, changeDisableDates] = useState([]);

  const [isReturn, changeIsReturn] = useState(false);

  if (!props.isValid) {
    let tBlockedOutDepartureDate = [...blockedOutDepartureDate];
    let tBlockedOutDepartureDateReturn = [...blockedOutDepartureDateReturn];
    let lastIndex = tBlockedOutDepartureDate.length - 1;
    let lastValue = tBlockedOutDepartureDate[lastIndex];
    if (lastValue) {
      if (!lastValue.startDate || !lastValue.endDate) {
        if (!lastValue.startDate && !lastValue.startErrorMessage) {
          tBlockedOutDepartureDate[
            lastIndex
          ].startErrorMessage = BLOCKOUT_DEPARTURE_START_DATE_REQURIED;
          changeBlockedOutDepartureDate(tBlockedOutDepartureDate);
        }

        if (!lastValue.endDate && !lastValue.endErrorMessage) {
          tBlockedOutDepartureDate[
            lastIndex
          ].endErrorMessage = BLOCKOUT_DEPARTURE_END_DATE_REQURIED;
          changeBlockedOutDepartureDate(tBlockedOutDepartureDate);
        }
      }
    }

    if (isReturn) {
      const lastIndex = tBlockedOutDepartureDateReturn.length - 1;
      const lastValue = tBlockedOutDepartureDateReturn[lastIndex];
      if (lastValue) {
        if (!lastValue.startDate || !lastValue.endDate) {
          if (!lastValue.startDate && !lastValue.startErrorMessage) {
            tBlockedOutDepartureDateReturn[
              lastIndex
            ].startErrorMessage = BLOCKOUT_DEPARTURE_START_DATE_REQURIED;
            changeBlockedOutDepartureDateReturn(tBlockedOutDepartureDateReturn);
          }

          if (!lastValue.endDate && !lastValue.endErrorMessage) {
            tBlockedOutDepartureDateReturn[
              lastIndex
            ].endErrorMessage = BLOCKOUT_DEPARTURE_END_DATE_REQURIED;
            changeBlockedOutDepartureDateReturn(tBlockedOutDepartureDateReturn);
          }
        }
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (
        props.onwardBlockoutDepartureDate &&
        props.onwardBlockoutDepartureDate.length > 0
      ) {
        changeBlockedOutDepartureDate(
          props.onwardBlockoutDepartureDate.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeBlockedOutDepartureDate([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }

      if (
        props.returnBlockoutDepartureDate &&
        props.returnBlockoutDepartureDate.length > 0
      ) {
        if (props.returnBlockoutDepartureDate.length > 0) {
          changeIsReturn(true);
        }

        changeBlockedOutDepartureDateReturn(
          props.returnBlockoutDepartureDate.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeBlockedOutDepartureDateReturn([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }
    } else {
      changeBlockedOutDepartureDate([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);

      changeBlockedOutDepartureDateReturn([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);
    }
  }, []);
  //<<EditDetail

  useEffect(() => {
    updateDatesToStore(blockedOutDepartureDate);
  }, [blockedOutDepartureDate]);

  useEffect(() => {
    if (isReturn) updateReturnDatesToStore(blockedOutDepartureDateReturn);
  }, [blockedOutDepartureDateReturn]);

  useEffect(() => {
    isReturn
      ? updateReturnDatesToStore(blockedOutDepartureDateReturn)
      : updateReturnDatesToStore([]);
  }, [isReturn]);

  const updateReturnDatesToStore = tArrivalDateReturn => {
    let tmpDate = [];
    tArrivalDateReturn.filter(val => {
      let tmp = {
        criteria_code: "onwardBlockoutDepartureDate",
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
    let tmpReturnDate = [];
    tArrivalDate.filter(val => {
      let tmp = {
        criteria_code: "returnBlockoutDepartureDate",
        from_value: val.startDate,
        to_value: val.endDate,
        operator: "BETWEEN",
        value_type: "D"
      };
      tmpReturnDate.push(tmp);
    });
    setDateFn({ value: tmpReturnDate });
  };

  const plusButttonClickFn = isReturn => {
    let tBlockedOutDepartureDate = [...blockedOutDepartureDate];
    let tBlockedOutDepartureDateReturn = [...blockedOutDepartureDateReturn];
    if (!isReturn) {
      const lastIndex = tBlockedOutDepartureDate.length - 1;
      const lastValue = tBlockedOutDepartureDate[lastIndex];
      if (lastValue.startDate && lastValue.endDate) {
        tBlockedOutDepartureDate.push({
          startDate: startDate,
          endDate: ""
        });
      } else {
        if (!lastValue.startDate) {
          tBlockedOutDepartureDate[
            lastIndex
          ].startErrorMessage = BLOCKOUT_DEPARTURE_START_DATE_REQURIED;
        }

        if (!lastValue.endDate) {
          tBlockedOutDepartureDate[
            lastIndex
          ].endErrorMessage = BLOCKOUT_DEPARTURE_END_DATE_REQURIED;
        }
      }
      console.log("tBlockedOutDepartureDate", tBlockedOutDepartureDate);
      changeBlockedOutDepartureDate(tBlockedOutDepartureDate);
    } else {
      const lastIndex = tBlockedOutDepartureDateReturn.length - 1;
      const lastValue = tBlockedOutDepartureDateReturn[lastIndex];
      if (lastValue.startDate && lastValue.endDate) {
        tBlockedOutDepartureDateReturn.push({
          startDate: startDate,
          endDate: ""
        });
      } else {
        if (!lastValue.startDate) {
          tBlockedOutDepartureDateReturn[
            lastIndex
          ].startErrorMessage = BLOCKOUT_DEPARTURE_START_DATE_REQURIED;
        }

        if (!lastValue.endDate) {
          tBlockedOutDepartureDateReturn[
            lastIndex
          ].endErrorMessage = BLOCKOUT_DEPARTURE_END_DATE_REQURIED;
        }
      }

      changeBlockedOutDepartureDateReturn(tBlockedOutDepartureDateReturn);
    }
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tBlockedOutDepartureDate = [...blockedOutDepartureDate];
    let tBlockedOutDepartureDateReturn = [...blockedOutDepartureDateReturn];
    if (!isReturn) {
      tBlockedOutDepartureDate.splice(index, 1);
      changeBlockedOutDepartureDate(tBlockedOutDepartureDate);
    } else {
      tBlockedOutDepartureDateReturn.splice(index, 1);
      changeBlockedOutDepartureDateReturn(tBlockedOutDepartureDateReturn);
    }
  };

  const startDateChanged = (index, isReturn, value) => {
    console.log("index", index);
    console.log("isReturn", isReturn);
    console.log("value", value);
    let tBlockedOutDepartureDate = [...blockedOutDepartureDate];
    let tBlockedOutDepartureDateReturn = [...blockedOutDepartureDateReturn];
    if (!isReturn) {
      tBlockedOutDepartureDate[index].startDate = value;
      tBlockedOutDepartureDate[index].startErrorMessage = "";
    } else {
      tBlockedOutDepartureDateReturn[index].startDate = value;
      tBlockedOutDepartureDateReturn[index].startErrorMessage = "";
    }
    changeBlockedOutDepartureDate(tBlockedOutDepartureDate);
    changeBlockedOutDepartureDateReturn(tBlockedOutDepartureDateReturn);
  };

  const endDateChanged = (index, isReturn, value) => {
    let tBlockedOutDepartureDate = [...blockedOutDepartureDate];
    let tBlockedOutDepartureDateReturn = [...blockedOutDepartureDateReturn];
    if (!isReturn) {
      tBlockedOutDepartureDate[index].endDate = value;
      tBlockedOutDepartureDate[index].endErrorMessage = "";
    } else {
      tBlockedOutDepartureDateReturn[index].endDate = value;
      tBlockedOutDepartureDateReturn[index].endErrorMessage = "";
    }
    changeBlockedOutDepartureDate(tBlockedOutDepartureDate);
    changeBlockedOutDepartureDateReturn(tBlockedOutDepartureDateReturn);
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
      return blockedOutDepartureDateReturn.map((val, index) => (
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
            startDatePlaceHolder={BLOCKOUT_DEPARTURE_DATE_START_DATE}
            endDatePlaceHolder={BLOCKOUT_DEPARTURE_DATE_END_DATE}
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
    <CriteriaLayout heading="BlockedOutDepartureDate">
      <div className="container">
        {blockedOutDepartureDate.map((val, index) => (
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
              startDatePlaceHolder={BLOCKOUT_DEPARTURE_DATE_START_DATE}
              endDatePlaceHolder={BLOCKOUT_DEPARTURE_DATE_END_DATE}
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
            label={BLOCKOUT_DEPARTURE_RETURN_LABEL}
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
    isValid: state.BlockoutDepartue.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardBlockoutDepartureDate: state.EditDetails.onwardBlockoutDepartureDate,
    returnBlockoutDepartureDate: state.EditDetails.returnBlockoutDepartureDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDateFn, setReturnDateFn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockedOutDepartureDate);
