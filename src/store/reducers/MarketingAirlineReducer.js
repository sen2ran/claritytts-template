const iniState = {
  isValid: true,
  onwardMarketingAirline: [null],
  excludeOnwardMarketingAirline: [null],
  returnMarketingAirline: [null],
  excludeReturnMarketingAirline: [null]
};

export default function(state = iniState, action) {
  // [String(action.payload)]
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_MARKETING_AIRLINE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_MARKETING_AIRLINE_OBJ_FN":
      return {
        ...state,
        onwardMarketingAirline: action.payload.onwardMarketingAirline,
        excludeOnwardMarketingAirline:
          action.payload.excludeOnwardMarketingAirline,
        returnMarketingAirline: action.payload.returnMarketingAirline,
        excludeReturnMarketingAirline:
          action.payload.excludeReturnMarketingAirline
      };
    default:
      return state;
  }
}
