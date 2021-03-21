const iniState = {
  isValid: true,
  minStay: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_MIN_STAY_IS_VALID":
      return {
        ...state,
        isValid : action.payload
      }
    case "SET_MIN_STAY":
      return {
        ...state,
        minStay: action.payload.value
      };
    default:
      return state;
  }
}
