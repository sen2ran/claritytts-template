const iniState = {
  defaultCriteriasList: [],
  optionalCriteriasList: [],
  selectedOptionalCriteriasList: []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "RESET_EDIT_STATE":
      return {
        ...iniState,
        selectedOptionalCriteriasList: []
      };
    case "SET_CRITERIA":
      return {
        ...state,
        defaultCriteriasList: action.payload.defaultCriteriasList,
        optionalCriteriasList: action.payload.optionalCriteriasList
          ? action.payload.optionalCriteriasList
          : []
      };
    case "SET_CHECKBOX_VALUE":
      let { selectedOptionalCriteriasList } = state;

      if (!selectedOptionalCriteriasList.includes(action.payload)) {
        selectedOptionalCriteriasList.push(action.payload);
      } else {
        selectedOptionalCriteriasList.splice(
          selectedOptionalCriteriasList.indexOf(action.payload),
          1
        );
      }

      return {
        ...state,
        selectedOptionalCriteriasList: selectedOptionalCriteriasList
      };
    default:
      return state;
  }
}
