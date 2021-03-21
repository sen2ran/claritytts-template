import React, { useEffect, useState } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CheckBox from "../Input/CheckBox";
import SingleBookingClass from "./Common/SingleBookingClass";
import { BOOKING_CLASS_ALLOW_RETURN_LABEL_TITLE } from "./Constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setBookingClassFn,
  setExcludeBookingClassFn,
  setReturnBookingClassFn,
  setReturnExcludeBookingClassFn
} from "../../store/actions/BookingClassAction";

import {
  BOOKING_CLASS_REQUIRED,
  BOOKING_CLASS_EXCLUDE_REQUIRED,
  BOOKING_CLASS_RETURN_REQUIRED,
  BOOKING_CLASS_EXCLUDE_RETURN_REQUIRED
} from "./Constants/ErrorMessages";

const BookingClass = props => {
  const [isReturn, setIsReturn] = useState(false);
  const [bookingClass, setBookingClass] = useState([]);
  const [excludeBookingClass, setExclueBookingClass] = useState([]);
  const [bookingClassReturn, setBookingClassReturn] = useState([]);
  const [excludeBookingClassReturn, setExclueBookingClassReturn] = useState([]);

  let bookingClassErrorMessage = "";
  let excludeBookingClassErrorMessage = "";
  let bookingClassReturnErrorMessage = "";
  let excludeBookingClassReturnMessage = "";

  if (!props.isValid) {
    console.log("BookingClass.length ", bookingClass);
    if (bookingClass && bookingClass.length === 0) {
      bookingClassErrorMessage = BOOKING_CLASS_REQUIRED;
    }
    if (excludeBookingClass && bookingClass.length === 0) {
      excludeBookingClassErrorMessage = BOOKING_CLASS_EXCLUDE_REQUIRED;
    }

    if (isReturn) {
      if (bookingClassReturn && bookingClassReturn.length === 0) {
        bookingClassReturnErrorMessage = BOOKING_CLASS_RETURN_REQUIRED;
      }

      if (excludeBookingClassReturn && excludeBookingClassReturn.length === 0) {
        excludeBookingClassReturnMessage = BOOKING_CLASS_EXCLUDE_RETURN_REQUIRED;
      }
    }
  }

  //>>EditDetail
  useEffect(() => {
    console.log("props.onwardBookingClass", props.onwardBookingClass);
    if (props.isEdit) {
      if (props.onwardBookingClass) {
        if (props.onwardBookingClass.length > 0) {
          if (props.onwardBookingClass[0].from_value !== "") {
            setBookingClass(props.onwardBookingClass[0].from_value.split(","));
          }
          else {
            setBookingClass([]);
          }
          
        }
      }

      if (props.excludeOnwardBookingClass) {
        if (props.excludeOnwardBookingClass.length > 0) {
          if (props.excludeOnwardBookingClass[0].from_value !== "") {
            setExclueBookingClass(props.excludeOnwardBookingClass[0].from_value.split(","));
          }
          else {
            setExclueBookingClass([])
          }
          
        }
      }

      if (props.returnBookingClass && props.returnBookingClass.length > 0) {
        if (props.returnBookingClass[0].from_value !== "") {
          setIsReturn(true);
          setBookingClassReturn(
            props.returnBookingClass[0].from_value.split(",")
          );
        }
      }
      if (
        props.excludeReturnBookingClass &&
        props.excludeReturnBookingClass.length > 0
      ) {
        if (props.excludeReturnBookingClass[0].from_value !== "") {
          setIsReturn(true);
          setExclueBookingClassReturn(
            props.excludeReturnBookingClass[0].from_value.split(",")
          );
        }
      }
    }
  }, []);
  //<<EditDetail

  props.setBookingClassFn([
    {
      criteria_code: "onwardBookingClass",
      operator: "=",
      from_value: String(bookingClass),
      to_value: "",
      value_type: "D"
    }
  ]);
  props.setExcludeBookingClassFn([
    {
      criteria_code: "excludeOnwardBookingClass",
      operator: "=",
      from_value: String(excludeBookingClass),
      to_value: "",
      value_type: "D"
    }
  ]);
  props.setReturnBookingClassFn(
    isReturn
      ? [
          {
            criteria_code: "returnBookingClass",
            operator: "=",
            from_value: String(bookingClassReturn),
            to_value: "",
            value_type: "D"
          }
        ]
      : []
  );
  props.setReturnExcludeBookingClassFn(
    isReturn
      ? [
          {
            criteria_code: "excludeReturnBookingClass",
            operator: "=",
            from_value: String(excludeBookingClassReturn),
            to_value: "",
            value_type: "D"
          }
        ]
      : []
  );

  const changeReturnFn = () => {
    setIsReturn(!isReturn);
  };

  return (
    <CriteriaLayout heading="BookingClass">
      <div className="container">
        <SingleBookingClass
          includeErrorMessage={bookingClassErrorMessage}
          excludeErrorMessage={excludeBookingClassErrorMessage}
          bookingClass={bookingClass}
          excludeBookingClass={excludeBookingClass}
          onChangeBookingClass={val => {
            setBookingClass(val);
            bookingClassErrorMessage = "";
          }}
          onChangeExcludeBookingClass={val => {
            setExclueBookingClass(val);
            excludeBookingClassErrorMessage = "";
          }}
        />

        <div className="row">
          <div className="col-12">
            <CheckBox
              isSelected={isReturn}
              label={BOOKING_CLASS_ALLOW_RETURN_LABEL_TITLE}
              onCheckboxChange={e => changeReturnFn()}
            />
          </div>
        </div>

        {isReturn ? (
          <SingleBookingClass
            includeErrorMessage={bookingClassReturnErrorMessage}
            excludeErrorMessage={excludeBookingClassReturnMessage}
            bookingClass={bookingClassReturn}
            excludeBookingClass={excludeBookingClassReturn}
            onChangeBookingClass={val => {
              setBookingClassReturn(val);
              bookingClassReturnErrorMessage = "";
            }}
            onChangeExcludeBookingClass={val => {
              setExclueBookingClassReturn(val);
              excludeBookingClassReturnMessage = "";
            }}
          />
        ) : null}
      </div>
    </CriteriaLayout>
  );
};
function mapStateToProps(state) {
  return {
    isValid: state.BookingClass.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardBookingClass: state.EditDetails.onwardBookingClass,
    excludeOnwardBookingClass: state.EditDetails.excludeOnwardBookingClass,
    returnBookingClass: state.EditDetails.returnBookingClass,
    excludeReturnBookingClass: state.EditDetails.excludeReturnBookingClass
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setBookingClassFn,
      setExcludeBookingClassFn,
      setReturnBookingClassFn,
      setReturnExcludeBookingClassFn
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingClass);
