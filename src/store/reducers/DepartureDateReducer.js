const iniState = {
  isValid: true,
  onwardDepartureDate: [],
  returnDepartureDate: [],
};


export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_DEPARTURE_DATE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_DATE_DEPARTURE":
      let { onwardDepartureDate } = state;
      onwardDepartureDate = action.payload.value;
      return {
        ...state,
        onwardDepartureDate: onwardDepartureDate
      };
    case "SET_RETURN_DATE_DEPARTURE":
      let { returnDepartureDate } = state;
      returnDepartureDate = action.payload.value;
      return {
        ...state,
        returnDepartureDate: returnDepartureDate
      };
    default:
      return state;
  }
}
