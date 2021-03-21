const iniState = {
  isValid: true,
  contentSource : [],
  excludeContentSource :[]
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState
      };
    case "SET_CONTENT_SOURCE_MAPPING_IS_VALID":
      return {
        ...state,
        isValid: action.payload
      }
    case "SET_CONTENT_SOURCE_MAPPING_INCLUDE":
      return {
        ...state,
        contentSource: action.payload
      };
    case "SET_CONTENT_SOURCE_MAPPING_EXCLUDE":
      return {
        ...state,
        excludeContentSource: action.payload
      };
    default:
      return state;
  }
}
