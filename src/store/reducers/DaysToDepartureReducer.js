const iniState = {
  isValid: true,
  daysToDeparture: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_DAYS_TO_DEPARTURE_IS_VALID":
      return{
        ...state,
        isValid: action.payload
      }
    case "SET_DAYS_TO_DEPARTURE":
      return {
        ...state,
        daysToDeparture: action.payload
      };
    default:
      return state;
  }
}
