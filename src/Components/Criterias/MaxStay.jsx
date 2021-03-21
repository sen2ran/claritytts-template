import React, { useState, useEffect } from "react";
import {
  SELECTION_ARRAY_DAY_OR_MONTH,
  SELECTION_ARRAY_DAYS_NAME,
  SELECTION_ARRAY_MONTH_NAME
} from "./Constants/index";
import {
  MAX_STAY_MONTH_OR_DAYS_REQUIRED,
  MAX_STAY_NO_OF_WEEK_REQUIRED,
  MAX_STAY_OPTION_REQUIRED,
  MAX_STAY_TYPE_REQUIRED
} from "./Constants/ErrorMessages";

import MinMaxStay from "./Common/MinMaxStay";
import CriteriaLayout from "../../Hoc/CriteriaLayout";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setMaxStayFn } from "../../store/actions/MaxStayAction";

const MaxStay = props => {
  const [numOfDayOrMOnth, setNumOfDayOrMOnth] = useState("");
  const [numOfWeek, setNumOfWeek] = useState("");
  const [dayOrMonth, setDayOrMonth] = useState([]);
  const [startDay, setStartDay] = useState([]);

  let monthOrDaysRequried = "";
  let optionRequiredMessage = "";
  let noOfWeekRequired = "";
  let typeRequiredMessage = "";

  if (!props.isValid) {
    if (!numOfDayOrMOnth && !monthOrDaysRequried) {
      monthOrDaysRequried = MAX_STAY_MONTH_OR_DAYS_REQUIRED;
    }

    if (dayOrMonth.length === 0) {
      optionRequiredMessage = MAX_STAY_OPTION_REQUIRED;
    }

    if (startDay.length === 0) {
      typeRequiredMessage = MAX_STAY_TYPE_REQUIRED;
    }

    if (!numOfWeek) {
      noOfWeekRequired = MAX_STAY_NO_OF_WEEK_REQUIRED;
    }
  }

  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      if (props.maxStay && props.maxStay.length > 0) {
        let tmpMaxStay = props.maxStay[0];
        let operator = tmpMaxStay.operator.split("@");
        setNumOfWeek(tmpMaxStay.from_value);
        setNumOfDayOrMOnth(tmpMaxStay.to_value);
        let temDayOrMonth = SELECTION_ARRAY_DAY_OR_MONTH.filter(
          obj => operator[0] === obj.name
        );
        setDayOrMonth(temDayOrMonth);
        let tmpStartDay =
          operator[0] === "Day"
            ? SELECTION_ARRAY_DAYS_NAME.filter(obj => operator[1] === obj.name)
            : SELECTION_ARRAY_MONTH_NAME.filter(
                obj => operator[1] === obj.name
              );

        setStartDay(tmpStartDay);
      }
    }
  }, []);
  //<<EditDetail

  //redux > start
  let monthString = "";
  monthString = dayOrMonth.length > 0 ? dayOrMonth[0].value : "";
  monthString =
    startDay.length > 0 ? monthString + "@" + startDay[0].value : "";
  props.setMaxStayFn({
    value: [
      {
        criteria_code: "maxStay",
        operator: monthString,
        from_value: numOfWeek,
        to_value: numOfDayOrMOnth,
        value_type: "D"
      }
    ]
  });
  //redux > end

  const setDayOrMonthFn = value => {
    setDayOrMonth(value);
    if (value > 0) {
      optionRequiredMessage = "";
    }
    setStartDay([]);
  };

  return (
    <CriteriaLayout heading="MaxStay">
      <MinMaxStay
        monthOrDaysRequried={monthOrDaysRequried}
        optionRequiredMessage={optionRequiredMessage}
        noOfWeekRequired={noOfWeekRequired}
        typeRequiredMessage={typeRequiredMessage}
        name={"MaxStay"}
        placeHolder="Select Type"
        numOfDayOrMOnth={numOfDayOrMOnth}
        setNumOfDayOrMOnth={e => {
          setNumOfDayOrMOnth(e);
          optionRequiredMessage = "";
        }}
        SELECTION_ARRAY_DAY_OR_MONTH={SELECTION_ARRAY_DAY_OR_MONTH}
        dayOrMonth={dayOrMonth}
        setDayOrMonth={val => {
          setDayOrMonthFn(val);
        }}
        SELECTION_ARRAY_DAYS_NAME={
          dayOrMonth.length == 0 || dayOrMonth[0].value === "Day"
            ? SELECTION_ARRAY_DAYS_NAME
            : SELECTION_ARRAY_MONTH_NAME
        }
        numOfWeek={numOfWeek}
        setNumOfWeek={e => {
          setNumOfWeek(e);
          noOfWeekRequired = "";
        }}
        setStartDay={(e)=>{
          setStartDay(e)
          typeRequiredMessage = ""
        }}
        startDay={startDay}
      />
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.MaxStay.isValid,
    isEdit: state.EditDetails.isEdit,
    maxStay: state.EditDetails.maxStay
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMaxStayFn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MaxStay);
