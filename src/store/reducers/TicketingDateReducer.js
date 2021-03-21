const iniState = {
  isValid: true,
  ticketingDate: [],
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_TICKETING_DATE_IS_VALID":
      return{
        ...state,
        isValid: action.payload
      }
    case "SET_TICKETING_DATE":
      let { ticketingDate } = state;
      ticketingDate = action.payload.value;
      return {
        ...state,
        ticketingDate: ticketingDate
      };
    default:
      return state;
  }
}
