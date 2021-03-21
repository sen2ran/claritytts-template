import { getCriterias } from "../../services/Apicalls";

export async function loadCriteriaFn(URL) {
  const request = await getCriterias(URL).then(response => response);
  const payload = {
    defaultCriteriasList: request.default_criterias,
    optionalCriteriasList: request.optional_criterias
      ? request.optional_criterias.filter(obj => obj)
      : []
  };
  return {
    type: "SET_CRITERIA",
    payload: payload
  };
}

export async function CheckBoxCheckFn(payload) {
  return {
    type: "SET_CHECKBOX_VALUE",
    payload: payload
  };
}
