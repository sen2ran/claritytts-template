import React, { useState } from "react";
import {
  BOOKING_CLASS_INCLUDE_CLASS_PLACEHOLDER,
  BOOKING_CLASS_EXCLUDE_CLASS_PLACEHOLDER,
} from "../Constants";
import Input from "../../Input/InputField";

const SingleBookingClass = ({
  bookingClass = [],
  excludeBookingClass = [],
  onChangeBookingClass,
  onChangeExcludeBookingClass,
  includeErrorMessage="",
  excludeErrorMessage=""
}) => {
  

  const [bookingClassSingle, setBookingClassSingle] = useState([]);
  const [excludeBookingClassSingle, setExcludeBookingClassSingle] = useState([]);

  

  const addBookingClassFn = value => {
    let stripped = value
      .split(",")
      .join("")
      .replace(/[^a-zA-Z]/g, "");

    let tBookingClassSingle = stripped.toUpperCase().split("");
    if (excludeBookingClassSingle.length > 0) {
      
      tBookingClassSingle = tBookingClassSingle.filter(val => {
        return val !== "," && excludeBookingClassSingle.indexOf(val) < 0;
      });

      tBookingClassSingle = [...new Set(tBookingClassSingle)];
      
      setBookingClassSingle(tBookingClassSingle);
    } else {
      
      tBookingClassSingle = tBookingClassSingle.filter(val => {
        return val !== ",";
      });
      tBookingClassSingle = [...new Set(tBookingClassSingle)];
      
    }
    setBookingClassSingle(tBookingClassSingle);
    onChangeBookingClass(tBookingClassSingle);
  };

  const addBookingExcludeClassFn = value => {
    let stripped = value
      .split(",")
      .join("")
      .replace(/[^a-zA-Z]/g, "");

    let tExcludeBookingClassSingle = stripped.toUpperCase().split("");
    if (bookingClassSingle.length > 0) {
      
      tExcludeBookingClassSingle = tExcludeBookingClassSingle.filter(val => {
        return val !== "," && bookingClassSingle.indexOf(val) < 0;
      });
      tExcludeBookingClassSingle = [...new Set(tExcludeBookingClassSingle)];
      
    } else {
      
      tExcludeBookingClassSingle = tExcludeBookingClassSingle.filter(val => {
        return val !== ",";
      });
      tExcludeBookingClassSingle = [...new Set(tExcludeBookingClassSingle)];
      
    }
    setExcludeBookingClassSingle(tExcludeBookingClassSingle);
    onChangeExcludeBookingClass(tExcludeBookingClassSingle);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Input
            placeholder={BOOKING_CLASS_INCLUDE_CLASS_PLACEHOLDER}
            value={bookingClass}
            changeHandler={val => addBookingClassFn(val)}
            errorMessage = {includeErrorMessage}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <Input
            placeholder={BOOKING_CLASS_EXCLUDE_CLASS_PLACEHOLDER}
            value={excludeBookingClass}
            changeHandler={val => addBookingExcludeClassFn(val)}
            errorMessage = {excludeErrorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleBookingClass;
