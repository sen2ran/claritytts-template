const iniState = {
  isValid: true,
  stopOverGroup: [],
  stopOverCountry: [],
  stopOverAirport: [],

  excludeStopOverGroup: [],
  excludeStopOverCountry: [],
  excludeStopOverAirport: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_STOP_OVER__IS_VALID":
      let { isValid } = state;
      isValid = action.payload.value;
      return {
        ...state,
        isValid: isValid
      };

    case "SET_STOP_OVER_GROUP":
      let { stopOverGroup } = state;
      stopOverGroup = action.payload.value;
      return {
        ...state,
        stopOverGroup: stopOverGroup
      };
    case "SET_STOP_OVER_COUNTRY":
      let { stopOverCountry } = state;
      stopOverCountry = action.payload.value;
      return {
        ...state,
        stopOverCountry: stopOverCountry
      };

    case "SET_STOP_OVER_AIRPORT":
      let { stopOverAirport } = state;
      stopOverAirport = action.payload.value;
      return {
        ...state,
        stopOverAirport: stopOverAirport
      };

    case "SET_EXCLUDE_STOP_OVER_GROUP":
      let { excludeStopOverGroup } = state;
      excludeStopOverGroup = action.payload.value;
      return {
        ...state,
        excludeStopOverGroup: excludeStopOverGroup
      };
    case "SET_EXCLUDE_STOP_OVER_COUNTRY":
      let { excludeStopOverCountry } = state;
      excludeStopOverCountry = action.payload.value;
      return {
        ...state,
        excludeStopOverCountry: excludeStopOverCountry
      };

    case "SET_EXCLUDE_STOP_OVER_AIRPORT":
      let { excludeStopOverAirport } = state;
      excludeStopOverAirport = action.payload.value;
      return {
        ...state,
        excludeStopOverAirport: excludeStopOverAirport
      };
    default:
      return state;
  }
}
