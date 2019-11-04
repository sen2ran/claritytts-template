const iniState = {
  defaultCriteriasList : [],
  optionalCriteriasList : []
};

export default function(state = iniState, action) {
  switch (action.type) {
    case "SET_CRITERIA":
      console.log(action.payload);
      
      return {
        ...state,
        defaultCriteriasList: action.payload.defaultCriteriasList,
        optionalCriteriasList: action.payload.optionalCriteriasList
      };
    default:
      return state;
  }
}
