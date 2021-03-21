import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";

import {
  NO_END_DATE_PLACEHOLDER,
  SELECT_DATE_PLACEHOLDER,
  SEGMENT_ALLOW_RETURN_LABEL_TITLE
} from "./Constants";
import CheckBox from "../Input/CheckBox";
import SingleStartEndDatePicker from "../Criterias/Common/SingleStartEndDatePickerWithButton";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setDateFn,
  setReturnDateFn
} from "../../store/actions/DepartureDateAction";

import {
  DEPARTURE_DATE_START_DATE_REQUIRED,
  DEPARTURE_DATE_END_DATE_REQUIRED
} from "./Constants/ErrorMessages";

const DepartureDate = props => {
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

  const [departureDate, changeDepartureDate] = useState([]);

  const [departureDateReturn, changeDepartureDateReturn] = useState([]);

  const [disableDates, changeDisableDates] = useState([]);

  const [isReturn, changeIsReturn] = useState(false);

  if (!props.isValid) {
    let tDepartureDate = [...departureDate];
    let tDepartureDateReturn = [...departureDateReturn];

    const lastIndex = tDepartureDate.length - 1;
    const lastIndexValue = tDepartureDate[lastIndex];
    if (lastIndexValue) {
      if (!lastIndexValue.startDate || !lastIndexValue.endDate) {
        if (!lastIndexValue.startDate && !lastIndexValue.startErrorMessage) {
          tDepartureDate[
            lastIndex
          ].startErrorMessage = DEPARTURE_DATE_START_DATE_REQUIRED;
          changeDepartureDate(tDepartureDate);
        }

        if (!lastIndexValue.endDate && !lastIndexValue.endErrorMessage) {
          tDepartureDate[
            lastIndex
          ].endErrorMessage = DEPARTURE_DATE_END_DATE_REQUIRED;
          changeDepartureDate(tDepartureDate);
        }
      }
    }
    if (isReturn) {
      const lastIndex = tDepartureDateReturn.length - 1;
      const lastIndexValue = tDepartureDateReturn[lastIndex];
      if (lastIndexValue) {
        if (!lastIndexValue.startDate || !lastIndexValue.endDate) {
          if (!lastIndexValue.startDate && !lastIndexValue.startErrorMessage) {
            tDepartureDateReturn[
              lastIndex
            ].startErrorMessage = DEPARTURE_DATE_START_DATE_REQUIRED;
            changeDepartureDateReturn(tDepartureDateReturn);
          }

          if (!lastIndexValue.endDate && !lastIndexValue.endErrorMessage) {
            tDepartureDateReturn[
              lastIndex
            ].endErrorMessage = DEPARTURE_DATE_END_DATE_REQUIRED;
            changeDepartureDateReturn(tDepartureDateReturn);
          }
        }
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.onwardDepartureDate && props.onwardDepartureDate.length > 0) {
        changeDepartureDate(
          props.onwardDepartureDate.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeDepartureDate([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }

      if (props.returnDepartureDate && props.returnDepartureDate.length > 0) {
        if (props.returnDepartureDate.length > 0) {
          changeIsReturn(true);
        }

        changeDepartureDateReturn(
          props.returnDepartureDate.map(val => {
            let tmp = {
              startDate: val.from_value,
              endDate: val.to_value
            };
            return tmp;
          })
        );
      } else {
        changeDepartureDateReturn([
          {
            startDate: startDate,
            endDate: ""
          }
        ]);
      }
    } else {
      changeDepartureDate([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);
      changeDepartureDateReturn([
        {
          startDate: startDate,
          endDate: ""
        }
      ]);
    }
  }, []);
  //<<EditDetail

  useEffect(() => {
    updateDatesToStore(departureDate);
  }, [departureDate]);

  useEffect(() => {
    if (isReturn) updateReturnDatesToStore(departureDateReturn);
  }, [departureDateReturn]);

  useEffect(() => {
    isReturn
      ? updateReturnDatesToStore(departureDateReturn)
      : updateReturnDatesToStore([]);
  }, [isReturn]);

  const updateReturnDatesToStore = tDepartureDate => {
    let tmpDate = [];
    tDepartureDate.filter(val => {
      let tmp = {
        criteria_code: "returnDepartureDate",
        from_value: val.startDate,
        to_value: val.endDate,
        operator: "BETWEEN",
        value_type: "D"
      };
      tmpDate.push(tmp);
    });
    setReturnDateFn({ value: tmpDate });
  };

  const updateDatesToStore = tDepartureDate => {
    let tmpDate = [];
    tDepartureDate.filter(val => {
      let tmp = {
        criteria_code: "onwardDepartureDate",
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
    let tDepartureDate = [...departureDate];
    let tDepartureDateReturn = [...departureDateReturn];
    if (!isReturn) {
      const lastIndex = tDepartureDate.length - 1;
      if (
        tDepartureDate[lastIndex].startDate &&
        tDepartureDate[lastIndex].endDate
      ) {
        tDepartureDate.push({
          startDate: startDate,
          endDate: ""
        });
      } else {
        if (!tDepartureDate[lastIndex].startDate) {
          tDepartureDate[
            lastIndex
          ].startErrorMessage = DEPARTURE_DATE_START_DATE_REQUIRED;
        }
        if (!tDepartureDate[lastIndex].endDate) {
          tDepartureDate[
            lastIndex
          ].endErrorMessage = DEPARTURE_DATE_END_DATE_REQUIRED;
        }
      }

      changeDepartureDate(tDepartureDate);
    } else {
      const lastIndex = tDepartureDateReturn.length - 1;
      if (
        tDepartureDateReturn[lastIndex].startDate &&
        tDepartureDateReturn[lastIndex].endDate
      ) {
        tDepartureDateReturn.push({
          startDate: startDate,
          endDate: ""
        });
      } else {
        if (!tDepartureDateReturn[lastIndex].startDate) {
          tDepartureDateReturn[
            lastIndex
          ].startErrorMessage = DEPARTURE_DATE_START_DATE_REQUIRED;
        }
        if (!tDepartureDateReturn[lastIndex].endDate) {
          tDepartureDateReturn[
            lastIndex
          ].endErrorMessage = DEPARTURE_DATE_END_DATE_REQUIRED;
        }
      }

      changeDepartureDateReturn(tDepartureDateReturn);
    }
  };

  const minusButttonClickFn = (index, isReturn) => {
    let tDepartureDate = [...departureDate];
    let tDepartureDateReturn = [...departureDateReturn];
    if (!isReturn) {
      tDepartureDate.splice(index, 1);
      changeDepartureDate(tDepartureDate);
    } else {
      tDepartureDateReturn.splice(index, 1);
      changeDepartureDateReturn(tDepartureDateReturn);
    }
  };

  const startDateChanged = (index, isReturn, value) => {
    let tDepartureDate = [...departureDate];
    let tDepartureDateReturn = [...departureDateReturn];
    if (!isReturn) {
      tDepartureDate[index].startDate = value;
      tDepartureDate[index].startErrorMessage = "";
    } else {
      tDepartureDateReturn[index].startDate = value;
      tDepartureDateReturn[index].startErrorMessage = "";
    }
    changeDepartureDate(tDepartureDate);
    changeDepartureDateReturn(tDepartureDateReturn);
  };

  const endDateChanged = (index, isReturn, value) => {
    let tDepartureDate = [...departureDate];
    let tDepartureDateReturn = [...departureDateReturn];
    if (!isReturn) {
      tDepartureDate[index].endDate = value;
      tDepartureDate[index].endErrorMessage = "";
    } else {
      tDepartureDateReturn[index].endDate = value;
      tDepartureDateReturn[index].endErrorMessage = "";
    }
    changeDepartureDate(tDepartureDate);
    changeDepartureDateReturn(tDepartureDateReturn);
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
      return departureDateReturn.map((val, index) => (
        <div key={index}>
          <SingleStartEndDatePicker
            startErrorMessage={val.startErrorMessage}
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
      ));
    }
  };

  return (
    <CriteriaLayout heading="departureDate">
      <div className="container">
        {departureDate.map((val, index) => (
          <div key={index}>
            <SingleStartEndDatePicker
              startErrorMessage={val.startErrorMessage}
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
        <div className="row">
          <CheckBox
            label={SEGMENT_ALLOW_RETURN_LABEL_TITLE}
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
    isValid: state.DepartureDate.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardDepartureDate: state.EditDetails.onwardDepartureDate,
    returnDepartureDate: state.EditDetails.returnDepartureDate
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDateFn, setReturnDateFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartureDate);
