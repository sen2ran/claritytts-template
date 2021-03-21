const iniState = {
  isValid: true,
  originGroup: [],
  originCountry: [],
  originAirport: [],

  excludeOriginGroup: [],
  excludeOriginCountry: [],
  excludeOriginAirport: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_ORIGIN_IS_VALID":
      let { isValid } = state;
      isValid = action.payload.value;
      return {
        ...state,
        isValid: isValid
      };

    case "SET_ORIGIN_GROUP":
      let { originGroup } = state;
      originGroup = action.payload.value;
      return {
        ...state,
        originGroup: originGroup
      };
    case "SET_ORIGIN_COUNTRY":
      let { originCountry } = state;
      originCountry = action.payload.value;
      return {
        ...state,
        originCountry: originCountry
      };

    case "SET_ORIGIN_AIRPORT":
      let { originAirport } = state;
      originAirport = action.payload.value;
      return {
        ...state,
        originAirport: originAirport
      };

    case "SET_EXCLUDE_ORIGIN_GROUP":
      let { excludeOriginGroup } = state;
      excludeOriginGroup = action.payload.value;
      return {
        ...state,
        excludeOriginGroup: excludeOriginGroup
      };
    case "SET_EXCLUDE_ORIGIN_COUNTRY":
      let { excludeOriginCountry } = state;
      excludeOriginCountry = action.payload.value;
      return {
        ...state,
        excludeOriginCountry: excludeOriginCountry
      };

    case "SET_EXCLUDE_ORIGIN_AIRPORT":
      let { excludeOriginAirport } = state;
      excludeOriginAirport = action.payload.value;
      return {
        ...state,
        excludeOriginAirport: excludeOriginAirport
      };
    default:
      return state;
  }
}
