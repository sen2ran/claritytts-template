import Axios from "axios";
import Config from "../Configuration/config";

let URL = Config.BASE_URL + "/getAirportListForMultiSelect";

export async function getAirport(payload) {
  return Axios.post(URL, payload, {})
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      
    });
}
