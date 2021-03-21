const iniState = {
  isValid: true,
  tourCode: [],
  excludeTourCode: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_TOUR_CODE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      };
    case "SET_TOUR_CODE_FN":
      return {
        ...state,
        tourCode: action.payload.tourCode,
        excludeTourCode: action.payload.excludeTourCode
      };

    default:
      return state;
  }
}
