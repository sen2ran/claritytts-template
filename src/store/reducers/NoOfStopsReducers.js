const iniState = {
  isValid: true,
  onwardNoOfStops: [null]
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_NO_OF_STOPS_IS_VALID":
      return {
        ...state,
        isValid : action.payload
      }
    case "SET_NO_OF_STOPS_OBJ_FN":
      return {
        ...state,
        onwardNoOfStops: action.payload.onwardNoOfStops
      };
    default:
      return state;
  }
}
