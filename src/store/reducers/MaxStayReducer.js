const iniState = {
  isValid: true,
  maxStay: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_MAX_STAY_IS_VALID":
    return {
      ...state,
      isValid: action.payload
    }
    case "SET_MAX_STAY":
      return {
        ...state,
        maxStay: action.payload.value
      };
    default:
      return state;
  }
}
