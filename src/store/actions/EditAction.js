import { getEditDetails } from "../../services/Apicalls";

export async function loadEditDetailsFn(id) {
  // console.log(id);
  let payload;
  if (id.id) {
    const request = await getEditDetails(id).then(response => response);
    if (request.status !== "Failed") {
      payload = {
        isEdit: true,
        ...request.data.criteriaArray
      };
    } else {
      payload = {
        isEdit: false
      };
    }
  } else {
    payload = {
      isEdit: false
    };
  }

  return {
    type: "SET_EDIT_VALUE",
    payload: payload
  };
}


export function resetState() {
  return {
    type: "RESET_EDIT_STATE",
  };
}
