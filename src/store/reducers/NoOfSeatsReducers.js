const iniState = {
  isValid: true,
  noOfSeats: [null]
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_NO_OF_SEATS_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_NO_OF_SEATS_OBJ_FN":
      return {
        ...state,
        noOfSeats: action.payload.noOfSeats
      };
    default:
      return state;
  }
}
