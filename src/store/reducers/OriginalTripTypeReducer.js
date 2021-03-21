const iniState = {
  isValid: true,
  originalTripType: [null]
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_ORIGINAL_TRIP_TYPE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      };
    case "SET_ORIGINAL_TRIP_FN":
      return {
        ...state,
        originalTripType: action.payload
      };
    default:
      return state;
  }
}
