const iniState = {
  isValid: true,
  fareRange: []
};

// const testJson = {
//   criteria_code: "fareRange",
//   operator: "PPBF",
//   from_value: "90",
//   to_value: "100",
//   value_type: "D"
// };

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_FARE_RANGE_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_FARE_RANGE":
      return {
        ...state,
        fareRange: action.payload
      };
    default:
      return state;
  }
}
