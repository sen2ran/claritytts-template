const iniState = {
  isValid: true,
  onwardSegmentCount: [],
  returnSegmentCount: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_SEGMENT_COUNT_IS_VALID":
      return{
        ...state,
        isValid: action.payload
      }
    case "SET_SEGMENT_COUNT_OBJ_FN":
      return {
        ...state,
        onwardSegmentCount: action.payload.onwardSegmentCount,
        returnSegmentCount: action.payload.returnSegmentCount
      };
    default:
      return state;
  }
}
