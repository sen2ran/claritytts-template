const iniState = {
  isValid: true,
  destinationGroup: [null],
  destinationCountry: [null],
  destinationAirport: [null],

  excludeDestinationGroup: [null],
  excludeDestinationCountry: [null],
  excludeDestinationAirport: [null]
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_DESTINATION_IS_VALID":
      let { isValid } = state;
      isValid = action.payload.value;
      return {
        ...state,
        isValid: isValid
      };

    case "SET_DESTINATION_GROUP":
      let { destinationGroup } = state;
      destinationGroup = action.payload.value;
      return {
        ...state,
        destinationGroup: destinationGroup
      };
    case "SET_DESTINATION_COUNTRY":
      let { destinationCountry } = state;
      destinationCountry = action.payload.value;
      return {
        ...state,
        destinationCountry: destinationCountry
      };

    case "SET_DESTINATION_AIRPORT":
      let { destinationAirport } = state;
      destinationAirport = action.payload.value;
      return {
        ...state,
        destinationAirport: destinationAirport
      };

    case "SET_EXCLUDE_DESTINATION_GROUP":
      let { excludeDestinationGroup } = state;
      excludeDestinationGroup = action.payload.value;
      return {
        ...state,
        excludeDestinationGroup: excludeDestinationGroup
      };
    case "SET_EXCLUDE_DESTINATION_COUNTRY":
      let { excludeDestinationCountry } = state;
      excludeDestinationCountry = action.payload.value;
      return {
        ...state,
        excludeDestinationCountry: excludeDestinationCountry
      };

    case "SET_EXCLUDE_DESTINATION_AIRPORT":
      let { excludeDestinationAirport } = state;
      excludeDestinationAirport = action.payload.value;
      return {
        ...state,
        excludeDestinationAirport: excludeDestinationAirport
      };
    default:
      return state;
  }
}
