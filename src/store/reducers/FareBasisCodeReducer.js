const iniState = {
  isValid: true,
  onwardFareBasisCode: [],
  excludeOnwardFareBasisCode: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "FARE_BASIS_CODE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_FARE_BASIS_CODE":
      let { onwardFareBasisCode } = state;
      onwardFareBasisCode = action.payload.value;
      return {
        ...state,
        onwardFareBasisCode: onwardFareBasisCode
      };

    case "SET_EXCLUDE_FARE_BASIS_CODE":
      let { excludeOnwardFareBasisCode } = state;
      excludeOnwardFareBasisCode = action.payload.value;
      return {
        ...state,
        excludeOnwardFareBasisCode: excludeOnwardFareBasisCode
      };
    default:
      return state;
  }
}
