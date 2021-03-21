const iniState = {
  isValid: true,
  bookingTime: [],
  bookingMonth: [],
  schedulerType: [],
  bookingDay: [],
  bookingWeek: [],
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "SET_BOOKING_DAY_SCHEDULER_IS_VALID":
      return{
        ...state,
        isValid: action.payload
      }
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };    
    case "SET_START_TIME_BOOKING_DAY_SCHEDULER":
      let { bookingTime } = state;
      bookingTime = action.payload.value;
      return {
        ...state,
        bookingTime: bookingTime
      };
    case "SET_MONTH_BOOKING_DAY_SCHEDULER":
      let { bookingMonth } = state;
      bookingMonth = action.payload.value;
      return {
        ...state,
        bookingMonth: bookingMonth
      };
    case "SET_TYPE_BOOKING_DAY_SCHEDULER":
      let { schedulerType } = state;
      schedulerType = action.payload.value;
      return {
        ...state,
        schedulerType: schedulerType
      };

    case "SET_WEEK_BOOKING_DAY_SCHEDULER":
      let { bookingWeek } = state;
      bookingWeek = action.payload.value;
      return {
        ...state,
        bookingWeek: bookingWeek
      };

    case "SET_DAY_BOOKING_DAY_SCHEDULER":
      let { bookingDay } = state;
      bookingDay = action.payload.value;
      return {
        ...state,
        bookingDay: bookingDay
      };

    default:
      return state;
  }
}
