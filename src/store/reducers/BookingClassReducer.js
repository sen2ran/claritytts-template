const iniState = {
  isValid: true,
  onwardBookingClass: [],
  excludeOnwardBookingClass: [],
  //   returnBookingClassCheck: false,
  returnBookingClass: [],
  excludeReturnBookingClass: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_BOOKING_CLASS_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_BOOKING_CLASS_FN":
      return {
        ...state,
        onwardBookingClass: action.payload
      };
    case "SET_EXCLUDE_BOOKING_CLASS_FN":
      return {
        ...state,
        excludeOnwardBookingClass: action.payload
      };
    case "SET_RETURN_BOOKING_CLASS_FN":
      return {
        ...state,
        returnBookingClass: action.payload
      };
    case "SET_RETURN_EXCLUDE_BOOKING_CLASS_FN":
      return {
        ...state,
        excludeReturnBookingClass: action.payload
      };
    default:
      return state;
  }
}
