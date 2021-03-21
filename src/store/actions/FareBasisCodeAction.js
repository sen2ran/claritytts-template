export function setFareBasisCodeFn(payload) {
  return {
    type: "SET_FARE_BASIS_CODE",
    payload: payload
  };
}

export function setExcludeFareBasisCodeFn(payload) {
  return {
    type: "SET_EXCLUDE_FARE_BASIS_CODE",
    payload: payload
  };
}

export function setIsValid(payload){
  return {
    type : "FARE_BASIS_CODE_IS_VALID",
    payload: payload
  }
}
