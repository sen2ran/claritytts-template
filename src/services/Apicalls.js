import Axios from "axios";
const URL = 'https://m-city-7c464.firebaseio.com/metatest/'
const BASE_URL = 'https://m-city-7c464.firebaseio.com/'


export async function getDetails(payload) {
    const request = await Axios.get(`${URL}/${payload}`)
    return {
        name: request.data.name,
        metaTag: request.data.metaTag
    }
}

export async function getCriterias(payload) {
    const request = await Axios.get(`${BASE_URL}/criterias/${payload}`)
    return {
        ...request.data,
    }
}