import Axios from "axios";
import Config from "../Configuration/config";

let URL = Config.BASE_URL + "/getAirlineListForMultiSelect";

export async function getAirline(payload) {
  return Axios.post(URL, payload, {})
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      
    });
}
