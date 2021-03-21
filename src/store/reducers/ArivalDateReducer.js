const iniState = {
  isValid: true,
  onwardArrivalDate: [],
  returnArrivalDate: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_ARIVAL_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      };
    case "SET_ARRIVAL_DATE":
      let { onwardArrivalDate } = state;
      onwardArrivalDate = action.payload.value;
      return {
        ...state,
        onwardArrivalDate: onwardArrivalDate
      };
    case "SET_RETURN_ARRIVAL_DATE":
      let { returnArrivalDate } = state;
      returnArrivalDate = action.payload.value;
      return {
        ...state,
        returnArrivalDate: returnArrivalDate
      };
    default:
      return state;
  }
}
