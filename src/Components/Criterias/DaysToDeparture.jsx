import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import {
  DAYS_TO_DEPARTURE_ARRAY_OBJECT,
  DAYS_TO_DEPARTURE_PLACEHOLDER
} from "./Constants";
import PlusButton from "../Input/PlusButton";
import MinusButton from "../Input/MinusButton";
import CounterInput from "../Input/CounterInput";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDaysToDepartureFn } from "../../store/actions/DaysToDepartureAction";

import {
  DAYS_TO_DEPARTURE_OPTION_REQUIRED,
  DAYS_TO_DEPARTURE_VALUE_REQUIRED
} from "./Constants/ErrorMessages";

const DaysToDeparture = props => {
  const [daysToDeparture, setDaysTODeparture] = useState([]);

  if (!props.isValid) {
    const tDaysToDeparture = [...daysToDeparture];

    const lastIndex = tDaysToDeparture.length - 1;
    const lastValue = tDaysToDeparture[lastIndex];
    if(lastValue){
      if(lastValue.days.length === 0 || !lastValue.value){
        if(lastValue.days.length === 0 && !lastValue.optionErrorMessage){
          tDaysToDeparture[lastIndex].optionErrorMessage= DAYS_TO_DEPARTURE_OPTION_REQUIRED
          setDaysTODeparture(tDaysToDeparture)
        }

        if(lastValue.value === 0 && !lastValue.valueErrorMessage){
          tDaysToDeparture[lastIndex].valueErrorMessage= DAYS_TO_DEPARTURE_OPTION_REQUIRED
          setDaysTODeparture(tDaysToDeparture)
        }
        
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.daysToDeparture && props.daysToDeparture.length > 0) {
        let tmpDaysToDeparture = props.daysToDeparture;

        let convertedArray = tmpDaysToDeparture.map(function(obj) {
          return {
            value: obj.from_value,
            days: DAYS_TO_DEPARTURE_ARRAY_OBJECT.filter(
              val => val.value === obj.operator
            )
          };
        });
        setDaysTODeparture(convertedArray);
      } else {
        setDaysTODeparture([
          {
            value: 0,
            days: []
          }
        ]);
      }
    } else {
      setDaysTODeparture([
        {
          value: 0,
          days: []
        }
      ]);
    }
  }, []);
  //<<EditDetail

  const convertedDaysToDeparture = daysToDeparture.map(function(val) {
    return {
      criteria_code: "daysToDeparture",
      operator: val.days.length > 0 ? val.days[0].value : "",
      from_value: val.value,
      to_value: "",
      value_type: "D"
    };
  });

  props.setDaysToDepartureFn(convertedDaysToDeparture);

  const plusButttonClickFn = () => {
    const tDaysToDeparture = [...daysToDeparture];

    const lastDaysToDeparture = tDaysToDeparture[tDaysToDeparture.length - 1];
    if (lastDaysToDeparture.days.length > 0 && lastDaysToDeparture.value > 0) {
      if (tDaysToDeparture.length === new Set(tDaysToDeparture).size) {
        tDaysToDeparture.push({
          value: 0,
          days: []
        });
        setDaysTODeparture(tDaysToDeparture);
      }
    } else {
      const lastIndex = tDaysToDeparture.length - 1;
      if (lastDaysToDeparture.days.length === 0) {
        tDaysToDeparture[
          lastIndex
        ].optionErrorMessage = DAYS_TO_DEPARTURE_OPTION_REQUIRED;
      }

      if (lastDaysToDeparture.value === 0) {
        tDaysToDeparture[
          lastIndex
        ].valueErrorMessage = DAYS_TO_DEPARTURE_VALUE_REQUIRED;
      }
      setDaysTODeparture(tDaysToDeparture);
    }
  };

  const minusButttonClickFn = index => {
    let tDaysToDeparture = [...daysToDeparture];
    tDaysToDeparture = tDaysToDeparture.filter((val, i) => {
      return index != i;
    });

    setDaysTODeparture(tDaysToDeparture);
  };

  const setNumOfDayOrMOnth = (val, index) => {
    const tDaysToDeparture = [...daysToDeparture];

    tDaysToDeparture[index].value = val;
    tDaysToDeparture[index].valueErrorMessage = "";
    setDaysTODeparture(tDaysToDeparture);
  };
  const onChangeHandler = (value, index) => {
    let tDaysToDeparture = [...daysToDeparture];
    if (value.length >= 0) {
      tDaysToDeparture[index].days = value;
    } else if (tDaysToDeparture.length === 0) {
      tDaysToDeparture = [
        {
          value: 0,
          days: [],
          valueErrorMessage: "",
          optionErrorMessage: ""
        }
      ];
    }
    tDaysToDeparture[tDaysToDeparture.length - 1].optionErrorMessage = "";
    setDaysTODeparture(tDaysToDeparture);
  };

  return (
    <CriteriaLayout heading="DaysToDeparture">
      {daysToDeparture.map((val, index) => (
        <div className="form-group" key={index}>
          <div className="row">
            <div className="col-6">
              <DropDown
                isMulti={false}
                placeHolder={DAYS_TO_DEPARTURE_PLACEHOLDER}
                defaultDropDownArray={DAYS_TO_DEPARTURE_ARRAY_OBJECT}
                onChangeAction={onChangeHandler}
                index={index}
                selectedValue={val.days}
                errorMessage={val.optionErrorMessage}
              />
            </div>
            <div className="col-4">
              <CounterInput
                min={0}
                max={100}
                value={val.value}
                index={index}
                counterNumber={(value, index) =>
                  setNumOfDayOrMOnth(value, index)
                }
                errorMessage={val.valueErrorMessage}
              />
            </div>
            <div className="col-2">
              {index === 0 ? (
                <PlusButton onClickHandler={plusButttonClickFn} index={index} />
              ) : (
                <MinusButton
                  onClickHandler={minusButttonClickFn}
                  index={index}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.DaysToDeparture.isValid,
    isEdit: state.EditDetails.isEdit,
    daysToDeparture: state.EditDetails.daysToDeparture
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setDaysToDepartureFn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysToDeparture);
