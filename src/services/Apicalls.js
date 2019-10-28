import Axios from "axios";
const URL = 'https://m-city-7c464.firebaseio.com/metatest/'

export async function getDetails(payload) {
    const request = await Axios.get(`${URL}/${payload}`)
    return {
        name: request.data.name,
        metaTag: request.data.metaTag
    }
}