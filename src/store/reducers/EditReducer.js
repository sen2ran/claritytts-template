const iniState = {
  isEdit: false,
  isLoaded: false
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "SET_EDIT_VALUE":
      return {
        ...state,
        ...action.payload,
        isLoaded: true
      };
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    default:
      return state;
  }
}
