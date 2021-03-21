const iniState = {
  isValid: true,
  onwardFlightNumber: [],
  excludeOnwardFlightNumber: [],
  returnFlightNumber: [],
  excludeReturnFlightNumber: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_FLIGHT_NUMBER_IS_REQUIRED":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_FLIGHT_NUMBER":
      let { onwardFlightNumber } = state;
      onwardFlightNumber = action.payload.value;
      return {
        ...state,
        onwardFlightNumber: onwardFlightNumber
      };

    case "SET_EXCLUDE_FLIGHT_NUMBER":
      let { excludeOnwardFlightNumber } = state;
      excludeOnwardFlightNumber = action.payload.value;
      return {
        ...state,
        excludeOnwardFlightNumber: excludeOnwardFlightNumber
      };

    case "SET_RETURN_FLIGHT_NUMBER":
      let { returnFlightNumber } = state;
      returnFlightNumber = action.payload.value;
      return {
        ...state,
        returnFlightNumber: returnFlightNumber
      };

    case "SET_RETURN_EXCLUDE_FLIGHT_NUMBER":
      let { excludeReturnFlightNumber } = state;
      excludeReturnFlightNumber = action.payload.value;
      return {
        ...state,
        excludeReturnFlightNumber: excludeReturnFlightNumber
      };
    default:
      return state;
  }
}
