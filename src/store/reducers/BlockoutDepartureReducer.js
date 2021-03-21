const iniState = {
  isValid: true,
  onwardBlockoutDepartureDate: [],
  returnBlockoutDepartureDate: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_BLOCK_OUT_DEPARTURE_DATE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      };
    case "SET_BLOCKOUT_DATE":
      let { onwardBlockoutDepartureDate } = state;
      onwardBlockoutDepartureDate = action.payload.value;
      return {
        ...state,
        onwardBlockoutDepartureDate: onwardBlockoutDepartureDate
      };
    case "SET_RETURN_BLOCKOUT_DATE":
      let { returnBlockoutDepartureDate } = state;
      returnBlockoutDepartureDate = action.payload.value;
      return {
        ...state,
        returnBlockoutDepartureDate: returnBlockoutDepartureDate
      };
    default:
      return state;
  }
}
