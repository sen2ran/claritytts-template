import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import APIDropDown from "../Input/APIDropDown/components/DropdownMultiple";
import "react-tagsinput/react-tagsinput.css";
import {
  STOP_OVER_GROUP,
  STOP_OVER_PLACEHOLDER,
  STOP_OVER_COUNTRY_PLACEHOLDER,
  STOP_OVER_AIRPORT_PLACEHOLDER,
  STOP_OVER_EXCLUDE,
  STOP_OVER_PLACEHOLDER_EXCLUDE,
  STOP_OVER_COUNTRY_PLACEHOLDER_EXCLUDE,
  STOP_OVER_AIRPORT_PLACEHOLDER_EXCLUDE
} from "./Constants";

import { getCountry } from "../../services/DestinationService";
import { getAirport } from "../../services/AirportService";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  setStopOverGroup,
  setStopOverCountry,
  setStopOverAirport,
  setExcludeStopOverGroup,
  setExcludeStopOverCountry,
  setExcludeStopOverAirport
} from "../../store/actions/StopOverAction";

import {
  STOP_OVER_GROUP_REQUIED,
  STOP_OVER_DESTINATION_COUTRY_REQUIRED,
  STOP_OVER_AIRPORT_LIST_REQUIRED
} from "./Constants/ErrorMessages";

const StopOver = props => {
  const [stopOver, setStopOver] = useState([]);

  const [countryArray, setCountryArray] = useState([]);
  const [selectedCountryArray, setSelectedCountryArray] = useState([]);

  const [airportArray, setAirportArray] = useState([]);
  const [selectedAirportArray, setSelectedAirportArray] = useState([]);

  const [stopOverExclude, setStopOverExclude] = useState([]);

  const [countryArrayExclude, setCountryArrayExclude] = useState([]);
  const [
    selectedCountryArrayExclude,
    setSelectedCountryArrayExclude
  ] = useState([]);

  const [airportArrayExclude, setAirportArrayExclude] = useState([]);
  const [
    selectedAirportArrayExclude,
    setSelectedAirportArrayExclude
  ] = useState([]);

  let groupRequiredMessage = ""
  let countryRequriedMessage = ""
  let airlineRequiredMessage = ""

  let excludeGroupRequiredMessage = ""
  let excludeCountryRequriedMessage = ""
  let excludeAirlineRequiredMessage = ""

  if (!props.isValid) {
    if(stopOver){
      if(stopOver.length === 0){
        groupRequiredMessage = STOP_OVER_GROUP_REQUIED
      }
    }

    if(selectedCountryArray){
      if(selectedCountryArray.length === 0){
        countryRequriedMessage = STOP_OVER_GROUP_REQUIED
      }
    }

    if(selectedAirportArray){
      if(selectedAirportArray.length === 0){
        airlineRequiredMessage = STOP_OVER_GROUP_REQUIED
      }
    }

    if(stopOverExclude){
      if(stopOverExclude.length === 0){
        excludeGroupRequiredMessage = STOP_OVER_GROUP_REQUIED
      }
    }

    if(selectedCountryArrayExclude){
      if(selectedCountryArrayExclude.length === 0){
        excludeCountryRequriedMessage = STOP_OVER_GROUP_REQUIED
      }
    }

    if(selectedAirportArrayExclude){
      if(selectedAirportArrayExclude.length === 0){
        excludeAirlineRequiredMessage = STOP_OVER_GROUP_REQUIED
      }
    }
  }

  useEffect(() => {
    if (props.isEdit) {
      if (props.stopOverGroup && props.stopOverGroup.length > 0) {
        setStopOver(
          STOP_OVER_GROUP.filter(
            val => val.name == props.stopOverGroup[0].from_value
          )
        );
      }

      if (props.excludeStopOverGroup && props.excludeStopOverGroup.length > 0) {
        setStopOverExclude(
          STOP_OVER_GROUP.filter(
            val => val.name == props.excludeStopOverGroup[0].from_value
          )
        );
      }

      if (props.stopOverCountry && props.stopOverCountry.length > 0) {
        const tSelectedCountry = props.stopOverCountry[0].from_value.split(",");
        const output = tSelectedCountry.map(val => {
          const tmp = {
            country_name: val,
            country_code: val,
            country_iata_code: val
          };
          return tmp;
        });
        setSelectedCountryArray(output);
        //
      }

      if (
        props.excludeStopOverCountry &&
        props.excludeStopOverCountry.length > 0
      ) {
        const tSelectedCountry = props.excludeStopOverCountry[0].from_value.split(
          ","
        );
        const output = tSelectedCountry.map(val => {
          const tmp = {
            country_name: val,
            country_code: val,
            country_iata_code: val
          };
          return tmp;
        });
        setSelectedCountryArrayExclude(output);
      }

      if (props.stopOverAirport && props.stopOverAirport.length > 0) {
        const tSelectedCountry = props.stopOverAirport[0].from_value.split(",");

        setSelectedAirportArray(
          tSelectedCountry.map(val => {
            const tmp = {
              airport_iata_code: val,
              airport_name: val,
              city_name: val,
              iso_country_code: val
            };
            return tmp;
          })
        );
      }

      if (
        props.excludeStopOverAirport &&
        props.excludeStopOverAirport.length > 0
      ) {
        const tSelectedCountry = props.excludeStopOverAirport[0].from_value.split(
          ","
        );
        setSelectedAirportArrayExclude(
          tSelectedCountry.map(val => {
            const tmp = {
              airport_iata_code: val,
              airport_name: val,
              city_name: val,
              iso_country_code: val
            };
            return tmp;
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    stopOver.length > 0
      ? props.setStopOverGroup({
          value: [
            {
              criteria_code: "stopOverGroup",
              operator: "IN",
              from_value: stopOver[0].value,
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : props.setStopOverGroup({ value: [null] });
  }, [stopOver]);

  useEffect(() => {
    let tSelectedCountryArray = [];
    selectedCountryArray.filter(val => {
      tSelectedCountryArray.push(val.country_code);
    });

    tSelectedCountryArray.length > 0
      ? props.setStopOverCountry({
          value: [
            {
              criteria_code: "stopOverCountry",
              operator: "IN",
              from_value: String(tSelectedCountryArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : props.setStopOverCountry({ value: [null] });
  }, [selectedCountryArray]);

  useEffect(() => {
    let tSelectedAirportArray = [];
    selectedAirportArray.filter(val => {
      tSelectedAirportArray.push(val.airport_iata_code);
    });

    tSelectedAirportArray.length > 0
      ? props.setStopOverAirport({
          value: [
            {
              criteria_code: "stopOverAirport",
              operator: "IN",
              from_value: String(tSelectedAirportArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : props.setStopOverAirport({ value: [null] });
  }, [selectedAirportArray]);

  useEffect(() => {
    stopOverExclude.length > 0
      ? props.setExcludeStopOverGroup({
          value: [
            {
              criteria_code: "excludeStopOverGroup",
              operator: "IN",
              from_value: stopOverExclude[0].value,
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : props.setExcludeStopOverGroup({ value: [null] });
  }, [stopOverExclude]);

  useEffect(() => {
    let tSelectedCountryArray = [];
    selectedCountryArrayExclude.filter(val => {
      tSelectedCountryArray.push(val.country_code);
    });

    tSelectedCountryArray.length > 0
      ? props.setExcludeStopOverCountry({
          value: [
            {
              criteria_code: "excludeStopOverCountry",
              operator: "IN",
              from_value: String(tSelectedCountryArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : props.setExcludeStopOverCountry({ value: [null] });
  }, [selectedCountryArrayExclude]);

  useEffect(() => {
    let tSelectedAirportArray = [];
    selectedAirportArrayExclude.filter(val => {
      tSelectedAirportArray.push(val.airport_iata_code);
    });

    tSelectedAirportArray.length > 0
      ? props.setExcludeStopOverAirport({
          value: [
            {
              criteria_code: "excludeStopOverAirport",
              operator: "IN",
              from_value: String(tSelectedAirportArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : props.setExcludeStopOverAirport({ value: [null] });
  }, [selectedAirportArrayExclude]);

  const stopOverChanged = (val, isExclude) => {
    if (!isExclude) {
      if(val.length > 0 ){
        groupRequiredMessage = ""
      }
      setStopOver(val);
    } else {
      if(val.length > 0 ){
        excludeGroupRequiredMessage = ""
      }
      setStopOverExclude(val);
    }
  };

  const apiGroupChanged = (type, val, isExclude) => {
    if (type === "country") {
      if (!isExclude) {
        countryRequriedMessage = ""
        setSelectedCountryArray(JSON.parse(JSON.stringify(val)));
      } else {
        excludeCountryRequriedMessage = ""
        setSelectedCountryArrayExclude(JSON.parse(JSON.stringify(val)));
      }
    } else if (type === "airport") {
      if (!isExclude) {
        airlineRequiredMessage = ""
        setSelectedAirportArray(JSON.parse(JSON.stringify(val)));
      } else {
        excludeAirlineRequiredMessage = ""
        setSelectedAirportArrayExclude(JSON.parse(JSON.stringify(val)));
      }
    }
  };

  const keyChange = (type, key, isExclude) => {
    let searchKey = [];

    const payload = {
      term: key
    };
    if (type === "country") {
      if (key) {
        searchKey = [];

        if (key.length >= 2) {
          key.match(/.{1,2}/g).map(val =>
            searchKey.push({
              country_name: val,
              country_code: val,
              country_iata_code: val
            })
          );
          if (key.length % 2 != 0) {
            searchKey.pop();
          }
          getCountry(payload)
            .then(res => {
              if (res.status === "Success") {
                let output = [...searchKey, ...res.data];
                // output.concat(res.data);

                if (!isExclude) {
                  setCountryArray(output);
                } else {
                  setCountryArrayExclude(output);
                }
              } else {
                let output = [...searchKey, ...res.data];
                if (!isExclude) {
                  setCountryArray(output);
                } else {
                  setCountryArrayExclude(output);
                }
              }
            })
            .catch(error => {});
        }
      } else {
        if (!isExclude) {
          setCountryArray([]);
        } else {
          setCountryArrayExclude([]);
        }
      }
    } else if (type === "airport") {
      if (key) {
        searchKey = [];

        if (key.length >= 3) {
          key.match(/.{1,3}/g).map(val =>
            searchKey.push({
              airport_iata_code: val,
              airport_name: val,
              city_name: val,
              iso_country_code: val
            })
          );
          if (key.length % 3 != 0) {
            searchKey.pop();
          }
          getAirport(payload)
            .then(res => {
              if (res.status === "Success") {
                let output = [...searchKey, ...res.data];
                // output.concat(res.data);

                if (!isExclude) {
                  setAirportArray(output);
                } else {
                  setAirportArrayExclude(output);
                }
              } else {
                let output = [...searchKey, ...res.data];
                if (!isExclude) {
                  setAirportArray(output);
                } else {
                  setAirportArrayExclude(output);
                }
              }
            })
            .catch(error => {});
        }
      } else {
        if (!isExclude) {
          setAirportArray([]);
        } else {
          setAirportArrayExclude([]);
        }
      }
    }
  };

  const checkObjectExistInArray = (object, objectArray, labelName) => {
    return objectArray.some(list => list[labelName] === object[labelName]);
  };

  return (
    <CriteriaLayout heading="StopOver">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <DropDown
              defaultDropDownArray={STOP_OVER_GROUP.filter(
                val => !checkObjectExistInArray(val, stopOverExclude, "value")
              )}
              placeHolder={STOP_OVER_PLACEHOLDER}
              selectedValue={stopOver}
              onChangeAction={values => stopOverChanged(values, false)}
              errorMessage={
                groupRequiredMessage
              }
            />
          </div>

          <div className="col-4">
            <APIDropDown
              headerTitle={STOP_OVER_COUNTRY_PLACEHOLDER}
              labelName="country_name"
              selectedlabelName="country_code"
              isSingle={false}
              list={countryArray.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedCountryArrayExclude,
                    "country_name"
                  )
              )}
              selectedList={selectedCountryArray}
              toggleItem={selectedList => {
                apiGroupChanged("country", selectedList, false);
              }}
              inputChanged={val => {
                keyChange("country", val, false);
              }}
              
              errorMessage= {
                countryRequriedMessage
              }
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={STOP_OVER_AIRPORT_PLACEHOLDER}
              labelName="airport_name"
              selectedlabelName="airport_iata_code"
              isSingle={false}
              list={airportArray.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedAirportArrayExclude,
                    "airport_name"
                  )
              )}
              selectedList={selectedAirportArray}
              toggleItem={selectedList => {
                apiGroupChanged("airport", selectedList, false);
              }}
              inputChanged={val => {
                keyChange("airport", val, false);
              }}
              errorMessage = {
                airlineRequiredMessage
              }
            />
          </div>
        </div>
      </div>

      <br />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <DropDown
              defaultDropDownArray={STOP_OVER_EXCLUDE.filter(
                val => !checkObjectExistInArray(val, stopOver, "value")
              )}
              placeHolder={STOP_OVER_PLACEHOLDER_EXCLUDE}
              selectedValue={stopOverExclude}
              onChangeAction={values => stopOverChanged(values, true)}
              errorMessage = {
                excludeGroupRequiredMessage
              }
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={STOP_OVER_COUNTRY_PLACEHOLDER_EXCLUDE}
              labelName="country_name"
              selectedlabelName="country_code"
              isSingle={false}
              list={countryArrayExclude.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedCountryArray,
                    "country_name"
                  )
              )}
              selectedList={selectedCountryArrayExclude}
              toggleItem={selectedList => {
                apiGroupChanged("country", selectedList, true);
              }}
              inputChanged={val => {
                keyChange("country", val, true);
              }}
              errorMessage = {
                excludeCountryRequriedMessage
              }
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={STOP_OVER_AIRPORT_PLACEHOLDER_EXCLUDE}
              labelName="airport_name"
              selectedlabelName="airport_iata_code"
              isSingle={false}
              list={airportArrayExclude.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedAirportArray,
                    "airport_name"
                  )
              )}
              selectedList={selectedAirportArrayExclude}
              toggleItem={selectedList => {
                apiGroupChanged("airport", selectedList, true);
              }}
              inputChanged={val => {
                keyChange("airport", val, true);
              }}
              errorMessage= {
                excludeAirlineRequiredMessage
              }
            />
          </div>
        </div>
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    isValid: state.StopOver.isValid,
    isEdit: state.EditDetails.isEdit,
    stopOverGroup: state.EditDetails.stopOverGroup,
    excludeStopOverGroup: state.EditDetails.excludeStopOverGroup,
    stopOverCountry: state.EditDetails.stopOverCountry,
    excludeStopOverCountry: state.EditDetails.excludeStopOverCountry,
    stopOverAirport: state.EditDetails.stopOverAirport,
    excludeStopOverAirport: state.EditDetails.excludeStopOverAirport
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setStopOverGroup,
      setStopOverCountry,
      setStopOverAirport,
      setExcludeStopOverGroup,
      setExcludeStopOverCountry,
      setExcludeStopOverAirport
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StopOver);
