const iniState = {
  isValid: true,
  passengerType: [null]
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_PASSENGER_TYPE_IS_VALID":
      return{
        ...state,
        isValid : action.payload
      }
    case "SET_PASSENGER_TYPE":
      return {
        ...state,
        passengerType: action.payload.passengerType
      };
    default:
      return state;
  }
}
