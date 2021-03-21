export function setFareRangeFn(payload) {
  return {
    type: "SET_FARE_RANGE",
    payload: payload
  };
}

export function setIsValid(payload){
  return {
    type: "SET_FARE_RANGE_IS_VALID",
    payload: payload
  }
}
