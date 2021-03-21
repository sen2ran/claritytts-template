const iniState = {
  isValid: true,
  onwardDepartureTime: [],
  onwardDepartureMonth: [],
  arrivalSchedulerType: [],
  onwardDepartureDay: [],
  onwardDepartureWeek: [],
  returnDepartureTime:[],
  returnDepartureMonth: [],
  returnDepartureSchedulerType:[],
  returnDepartureWeek:[],
  returnDepartureDay:[],
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "SET_DEPARTURE_SCHEDULER_IS_VALID":{
      return {
        ...state,
        isValid: action.payload
      }
    }
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_START_TIME_DEPARTURE_SCHEDULER":
      let { onwardDepartureTime } = state;
      onwardDepartureTime = action.payload.value;
      return {
        ...state,
        onwardDepartureTime: onwardDepartureTime
      };
    case "SET_MONTH_DEPARTURE_SCHEDULER":
      let { onwardDepartureMonth } = state;
      onwardDepartureMonth = action.payload.value;
      return {
        ...state,
        onwardDepartureMonth: onwardDepartureMonth
      };
    case "SET_TYPE_DEPARTURE_SCHEDULER":
      let { arrivalSchedulerType } = state;
      arrivalSchedulerType = action.payload.value;
      return {
        ...state,
        arrivalSchedulerType: arrivalSchedulerType
      };

    case "SET_WEEK_DEPARTURE_SCHEDULER":
      let { onwardDepartureWeek } = state;
      onwardDepartureWeek = action.payload.value;
      return {
        ...state,
        onwardDepartureWeek: onwardDepartureWeek
      };

    case "SET_DAY_DEPARTURE_SCHEDULER":
      let { onwardDepartureDay } = state;
      onwardDepartureDay = action.payload.value;
      return {
        ...state,
        onwardDepartureDay: onwardDepartureDay
      };

      case "SET_RETURN_START_TIME_DEPARTURE_SCHEDULER":
      let { returnDepartureTime } = state;
      returnDepartureTime = action.payload.value;
      return {
        ...state,
        returnDepartureTime: returnDepartureTime
      };
    case "SET_RETURN_MONTH_DEPARTURE_SCHEDULER":
      let { returnDepartureMonth } = state;
      returnDepartureMonth = action.payload.value;
      return {
        ...state,
        returnDepartureMonth: returnDepartureMonth
      };
    case "SET_RETURN_TYPE_DEPARTURE_SCHEDULER":
      let { returnDepartureSchedulerType } = state;
      returnDepartureSchedulerType = action.payload.value;
      return {
        ...state,
        returnDepartureSchedulerType: returnDepartureSchedulerType
      };

    case "SET_RETURN_WEEK_DEPARTURE_SCHEDULER":
      let { returnDepartureWeek } = state;
      returnDepartureWeek = action.payload.value;
      return {
        ...state,
        returnDepartureWeek: returnDepartureWeek
      };

    case "SET_RETURN_DAY_DEPARTURE_SCHEDULER":
      let { returnDepartureDay } = state;
      returnDepartureDay = action.payload.value;
      return {
        ...state,
        returnDepartureDay: returnDepartureDay
      };

    default:
      return state;
  }
}
