export function setBookingClassFn(payload) {
  return {
    type: "SET_BOOKING_CLASS_FN",
    payload: payload
  };
}

export function setExcludeBookingClassFn(payload) {
  return {
    type: "SET_EXCLUDE_BOOKING_CLASS_FN",
    payload: payload
  };
}

export function setReturnBookingClassFn(payload) {
  return {
    type: "SET_RETURN_BOOKING_CLASS_FN",
    payload: payload
  };
}

export function setReturnExcludeBookingClassFn(payload) {
  return {
    type: "SET_RETURN_EXCLUDE_BOOKING_CLASS_FN",
    payload: payload
  };
}

export function setIsValid(payload){
  return {
    type: "SET_BOOKING_CLASS_IS_VALID",
    payload: payload
  }
}
