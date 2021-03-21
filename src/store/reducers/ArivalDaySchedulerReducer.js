const iniState = {
  isValid: true,
  onwardArrivalTime: [],
  onwardArrivalMonth: [],
  arrivalSchedulerType: [],
  onwardArrivalDay: [],
  onwardArrivalWeek: [],
  returnArrivalTime: [],
  returnArrivalMonth: [],
  returnArrivalSchedulerType: [],
  returnArrivalWeek: [],
  returnArrivalDay: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_ARRIVAL_SCHEDULER_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      };
    case "SET_START_TIME_ARRIVAL_SCHEDULER":
      let { onwardArrivalTime } = state;
      onwardArrivalTime = action.payload.value;
      return {
        ...state,
        onwardArrivalTime: onwardArrivalTime
      };
    case "SET_MONTH_ARRIVAL_SCHEDULER":
      let { onwardArrivalMonth } = state;
      onwardArrivalMonth = action.payload.value;
      return {
        ...state,
        onwardArrivalMonth: onwardArrivalMonth
      };
    case "SET_TYPE_ARRIVAL_SCHEDULER":
      let { arrivalSchedulerType } = state;
      arrivalSchedulerType = action.payload.value;
      return {
        ...state,
        arrivalSchedulerType: arrivalSchedulerType
      };
    case "SET_WEEK_ARRIVAL_SCHEDULER":
      let { onwardArrivalWeek } = state;
      onwardArrivalWeek = action.payload.value;
      return {
        ...state,
        onwardArrivalWeek: onwardArrivalWeek
      };
    case "SET_DAY_ARRIVAL_SCHEDULER":
      let { onwardArrivalDay } = state;
      onwardArrivalDay = action.payload.value;
      return {
        ...state,
        onwardArrivalDay: onwardArrivalDay
      };

    case "SET_RETURN_START_TIME_ARRIVAL_SCHEDULER":
      let { returnArrivalTime } = state;
      returnArrivalTime = action.payload.value;
      return {
        ...state,
        returnArrivalTime: returnArrivalTime
      };
    case "SET_RETURN_MONTH_ARRIVAL_SCHEDULER":
      let { returnArrivalMonth } = state;
      returnArrivalMonth = action.payload.value;
      return {
        ...state,
        returnArrivalMonth: returnArrivalMonth
      };
    case "SET_RETURN_TYPE_ARRIVAL_SCHEDULER":
      let { returnArrivalSchedulerType } = state;
      returnArrivalSchedulerType = action.payload.value;
      return {
        ...state,
        returnArrivalSchedulerType: returnArrivalSchedulerType
      };
    case "SET_RETURN_WEEK_ARRIVAL_SCHEDULER":
      let { returnArrivalWeek } = state;
      returnArrivalWeek = action.payload.value;
      return {
        ...state,
        returnArrivalWeek: returnArrivalWeek
      };
    case "SET_RETURN_DAY_ARRIVAL_SCHEDULER":
      let { returnArrivalDay } = state;
      returnArrivalDay = action.payload.value;
      return {
        ...state,
        returnArrivalDay: returnArrivalDay
      };
    default:
      return state;
  }
}
