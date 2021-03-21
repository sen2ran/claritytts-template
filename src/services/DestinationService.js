import Axios from "axios";
import Config from "../Configuration/config";

let URL = Config.BASE_URL + "/getCountryListForMultiSelect";

export async function getCountry(payload) {
  return Axios.post(URL, payload, {})
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      
    });
}
