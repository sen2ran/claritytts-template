import Axios from "axios";
import Config from "../Configuration/config";

export async function getMarketingAirLine(payload) {
  let URL = Config.BASE_URL + "/getAirlineListForMultiSelect";
  return Axios.post(URL, payload, {})
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      
    });
}

export async function getMarketingAirLineFromGroup(payload) {
  let URL = Config.BASE_URL + "/getAirlineGroupListForMultiSelect";
  return Axios.post(URL, payload, {})
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      
    });
}
