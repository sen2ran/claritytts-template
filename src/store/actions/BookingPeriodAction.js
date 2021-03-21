export function setDateFn(payload) {
  return {
    type: "SET_DATE_BOOKING_PERIOD",
    payload: payload
  };
}

export function setIsValid(payload) {
  return {
    type: "SET_BOOKING_PERIOD_IS_VALID",
    payload: payload
  };
}
