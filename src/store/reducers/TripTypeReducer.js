const iniState = {
  isValid: true,
  tripType: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_TRIP_TYPE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_TRIP_TYPE_FN":
      let {tripType} = state
      tripType = action.payload.value
      return {
        ...state,
        tripType: tripType
      };
    default:
      return state;
  }
}
