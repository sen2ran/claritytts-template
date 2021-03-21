const iniState = {
  isValid: true,
  onwardOperatingAirline: [null],
  excludeOnwardOperatingAirline: [null],
  returnOperatingAirline: [null],
  excludeReturnOperatingAirline: [null]
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_OPERATING_AIRLINE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_OPERATING_AIRLINE_OBJ_FN":
      return {
        ...state,
        onwardOperatingAirline: action.payload.onwardOperatingAirline,
        excludeOnwardOperatingAirline:
          action.payload.excludeOnwardOperatingAirline,
        returnOperatingAirline: action.payload.returnOperatingAirline,
        excludeReturnOperatingAirline:
          action.payload.excludeReturnOperatingAirline
      };
    default:
      return state;
  }
}
