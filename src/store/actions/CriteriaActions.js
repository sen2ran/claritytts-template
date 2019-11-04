import {
    getCriterias
} from "../../services/Apicalls"

export async function loadCriteriaFn(URL) {
    const request = await getCriterias(URL).then(response => response)
    const payload = {
        defaultCriteriasList: request.default_criterias,
        optionalCriteriasList: request.optional_criterias
    }
    return {
        type: 'SET_CRITERIA',
        payload: payload
    }
}