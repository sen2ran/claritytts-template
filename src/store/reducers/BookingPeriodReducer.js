const iniState = {
  isValid: true,
  bookingPeriod: [],
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_BOOKING_PERIOD_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_DATE_BOOKING_PERIOD":
      let { bookingPeriod } = state;
      bookingPeriod = action.payload.value;
      return {
        ...state,
        bookingPeriod: bookingPeriod
      };
    default:
      return state;
  }
}
