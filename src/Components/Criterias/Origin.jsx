import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import APIDropDown from "../Input/APIDropDown/components/DropdownMultiple";
import "react-tagsinput/react-tagsinput.css";
import {
  ORIGIN_GROUP,
  ORIGIN_GROUP_PLACEHOLDER,
  ORIGIN_GROUP_COUNTRY_PLACEHOLDER,
  ORIGIN_GROUP_AIRPORT_PLACEHOLDER,
  ORIGIN_GROUP_EXCLUDE,
  ORIGIN_GROUP_PLACEHOLDER_EXCLUDE,
  ORIGIN_GROUP_COUNTRY_PLACEHOLDER_EXCLUDE,
  ORIGIN_GROUP_AIRPORT_PLACEHOLDER_EXCLUDE
} from "./Constants";

import { getCountry } from "../../services/DestinationService";
import { getAirport } from "../../services/AirportService";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setOriginGroup,
  setOriginCountry,
  setOriginAirport,
  setExcludeOriginGroup,
  setExcludeOriginCountry,
  setExcludeOriginAirport
} from "../../store/actions/OriginAction";

import {
  ORIGIN_GROUP_REQUIED,
  ORIGIN_AIRPORT_LIST_REQUIRED,
  ORIGIN_DESTINATION_COUTRY_REQUIRED
} from "./Constants/ErrorMessages";

const Origin = props => {
  let {
    originGroupArray,
    isValid,
    originCountry,
    originAirport,
    excludeOriginGroup,
    excludeOriginCountry,
    excludeOriginAirport,
    setOriginCountry,
    setOriginAirport,
    setExcludeOriginGroup,
    setExcludeOriginCountry,
    setExcludeOriginAirport
  } = props;

  const [originGroup, setOriginGroup] = useState([]);

  const [countryArray, setCountryArray] = useState([]);
  const [selectedCountryArray, setSelectedCountryArray] = useState([]);

  const [airportArray, setAirportArray] = useState([]);
  const [selectedAirportArray, setSelectedAirportArray] = useState([]);

  const [originGroupExclude, setOriginGroupExclude] = useState([]);

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

  let groupErrorMessage = "";
  let airportListErrorMessage = "";
  let countryErrorMessage = "";
  let excludeGroupErrorMessage = "";
  let excludeCountryErrorMessage = "";
  let excludeAirportListErrorMessage = "";

  if (!props.isValid) {
    if (originGroup) {
      if (originGroup.length === 0) {
        groupErrorMessage = ORIGIN_GROUP_REQUIED;
      }
    }

    if (selectedCountryArray) {
      if (selectedCountryArray.length === 0) {
        countryErrorMessage = ORIGIN_DESTINATION_COUTRY_REQUIRED;
      }
    }

    if (selectedAirportArray) {
      if (selectedAirportArray.length === 0) {
        airportListErrorMessage = ORIGIN_DESTINATION_COUTRY_REQUIRED;
      }
    }

    if (originGroupExclude) {
      if (originGroupExclude.length === 0) {
        excludeGroupErrorMessage = ORIGIN_GROUP_REQUIED;
      }
    }

    if (selectedCountryArrayExclude) {
      if (selectedCountryArrayExclude.length === 0) {
        excludeCountryErrorMessage = ORIGIN_DESTINATION_COUTRY_REQUIRED;
      }
    }

    if (selectedAirportArrayExclude) {
      if (selectedAirportArrayExclude.length === 0) {
        excludeAirportListErrorMessage = ORIGIN_DESTINATION_COUTRY_REQUIRED;
      }
    }
  }

  useEffect(() => {
    if (props.isEdit) {
      if (props.originGroup && props.originGroup.length > 0) {
        setOriginGroup(
          ORIGIN_GROUP.filter(
            val => val.name == props.originGroup[0].from_value
          )
        );
      }

      if (props.excludeOriginGroup && props.excludeOriginGroup.length > 0) {
        setOriginGroupExclude(
          ORIGIN_GROUP.filter(
            val => val.name == props.excludeOriginGroup[0].from_value
          )
        );
      }

      if (props.originCountry && props.originCountry.length > 0) {
        const tSelectedCountry = props.originCountry[0].from_value.split(",");
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

      if (props.excludeOriginCountry && props.excludeOriginCountry.length > 0) {
        const tSelectedCountry = props.excludeOriginCountry[0].from_value.split(
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

      if (props.originAirport && props.originAirport.length > 0) {
        const tSelectedCountry = props.originAirport[0].from_value.split(",");

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

      if (props.excludeOriginAirport && props.excludeOriginAirport.length > 0) {
        const tSelectedCountry = props.excludeOriginAirport[0].from_value.split(
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
    originGroup.length > 0
      ? props.setOriginGroup({
          value: [
            {
              criteria_code: "originGroup",
              operator: "IN",
              from_value: originGroup[0].value,
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : props.setOriginGroup({ value: [null] });
  }, [originGroup]);

  useEffect(() => {
    let tSelectedCountryArray = [];
    selectedCountryArray.filter(val => {
      tSelectedCountryArray.push(val.country_code);
    });

    tSelectedCountryArray.length > 0
      ? setOriginCountry({
          value: [
            {
              criteria_code: "originCountry",
              operator: "IN",
              from_value: String(tSelectedCountryArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : setOriginCountry({ value: [null] });
  }, [selectedCountryArray]);

  useEffect(() => {
    let tSelectedAirportArray = [];
    selectedAirportArray.filter(val => {
      tSelectedAirportArray.push(val.airport_iata_code);
    });

    tSelectedAirportArray.length > 0
      ? setOriginAirport({
          value: [
            {
              criteria_code: "originAirport",
              operator: "IN",
              from_value: String(tSelectedAirportArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : setOriginAirport({ value: [null] });
  }, [selectedAirportArray]);

  useEffect(() => {
    originGroupExclude.length > 0
      ? setExcludeOriginGroup({
          value: [
            {
              criteria_code: "excludeOriginGroup",
              operator: "IN",
              from_value: originGroupExclude[0].value,
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : setExcludeOriginGroup({ value: [null] });
  }, [originGroupExclude]);

  useEffect(() => {
    let tSelectedCountryArray = [];
    selectedCountryArrayExclude.filter(val => {
      tSelectedCountryArray.push(val.country_code);
    });

    tSelectedCountryArray.length > 0
      ? setExcludeOriginCountry({
          value: [
            {
              criteria_code: "excludeOriginCountry",
              operator: "IN",
              from_value: String(tSelectedCountryArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : setExcludeOriginCountry({ value: [null] });
  }, [selectedCountryArrayExclude]);

  useEffect(() => {
    let tSelectedAirportArray = [];
    selectedAirportArrayExclude.filter(val => {
      tSelectedAirportArray.push(val.airport_iata_code);
    });

    tSelectedAirportArray.length > 0
      ? setExcludeOriginAirport({
          value: [
            {
              criteria_code: "excludeOriginAirport",
              operator: "IN",
              from_value: String(tSelectedAirportArray),
              to_value: "",
              value_type: "D"
            }
          ]
        })
      : setExcludeOriginAirport({ value: [null] });
  }, [selectedAirportArrayExclude]);

  const originGroupChanged = (val, isExclude) => {
    if (!isExclude) {
      groupErrorMessage = "";
      setOriginGroup(val);
    } else {
      excludeGroupErrorMessage = "";
      setOriginGroupExclude(val);
    }
  };

  const apiGroupChanged = (type, val, isExclude) => {
    if (type === "country") {
      if (!isExclude) {
        countryErrorMessage = "";
        setSelectedCountryArray(JSON.parse(JSON.stringify(val)));
      } else {
        excludeCountryErrorMessage = "";
        setSelectedCountryArrayExclude(JSON.parse(JSON.stringify(val)));
      }
    } else if (type === "airport") {
      if (!isExclude) {
        airportListErrorMessage = "";
        setSelectedAirportArray(JSON.parse(JSON.stringify(val)));
      } else {
        excludeAirportListErrorMessage = "";
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
        if (key.length >= 2) {
          getAirport(payload)
            .then(res => {
              if (res.status === "Success") {
                let output = [...searchKey, ...res.data];

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
    <CriteriaLayout heading="Origin">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <DropDown
              defaultDropDownArray={ORIGIN_GROUP.filter(
                val =>
                  !checkObjectExistInArray(val, originGroupExclude, "value")
              )}
              placeHolder={ORIGIN_GROUP_PLACEHOLDER}
              selectedValue={originGroup}
              onChangeAction={values => originGroupChanged(values, false)}
              errorMessage={groupErrorMessage}
            />
          </div>

          <div className="col-4">
            <APIDropDown
              headerTitle={ORIGIN_GROUP_COUNTRY_PLACEHOLDER}
              labelName="country_name"
              selectedlabelName="country_code"
              isSingle={false}
              list={countryArray.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedCountryArrayExclude,
                    "country_code"
                  )
              )}
              selectedList={selectedCountryArray}
              toggleItem={selectedList => {
                apiGroupChanged("country", selectedList, false);
              }}
              inputChanged={val => {
                keyChange("country", val, false);
              }}
              errorMessage={countryErrorMessage}
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={ORIGIN_GROUP_AIRPORT_PLACEHOLDER}
              labelName="airport_name"
              selectedlabelName="airport_iata_code"
              isSingle={false}
              list={airportArray.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedAirportArrayExclude,
                    "airport_iata_code"
                  )
              )}
              selectedList={selectedAirportArray}
              toggleItem={selectedList => {
                apiGroupChanged("airport", selectedList, false);
              }}
              inputChanged={val => {
                keyChange("airport", val, false);
              }}
              errorMessage={airportListErrorMessage}
            />
          </div>
        </div>
      </div>

      <br />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <DropDown
              defaultDropDownArray={ORIGIN_GROUP_EXCLUDE.filter(
                val => !checkObjectExistInArray(val, originGroup, "value")
              )}
              placeHolder={ORIGIN_GROUP_PLACEHOLDER_EXCLUDE}
              selectedValue={originGroupExclude}
              onChangeAction={values => originGroupChanged(values, true)}
              errorMessage={excludeGroupErrorMessage}
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={ORIGIN_GROUP_COUNTRY_PLACEHOLDER_EXCLUDE}
              labelName="country_name"
              selectedlabelName="country_code"
              isSingle={false}
              list={countryArrayExclude.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedCountryArray,
                    "country_code"
                  )
              )}
              selectedList={selectedCountryArrayExclude}
              toggleItem={selectedList => {
                apiGroupChanged("country", selectedList, true);
              }}
              inputChanged={val => {
                keyChange("country", val, true);
              }}
              errorMessage={excludeCountryErrorMessage}
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={ORIGIN_GROUP_AIRPORT_PLACEHOLDER_EXCLUDE}
              labelName="airport_name"
              selectedlabelName="airport_iata_code"
              isSingle={false}
              list={airportArrayExclude.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    selectedAirportArray,
                    "airport_iata_code"
                  )
              )}
              selectedList={selectedAirportArrayExclude}
              toggleItem={selectedList => {
                apiGroupChanged("airport", selectedList, true);
              }}
              inputChanged={val => {
                keyChange("airport", val, true);
              }}
              errorMessage={excludeAirportListErrorMessage}
            />
          </div>
        </div>
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    originGroupArray: state.Origin.originGroup,
    isValid: state.Origin.isValid,
    originCountry: state.Origin.originCountry,
    originAirport: state.Origin.originAirport,

    isEdit: state.EditDetails.isEdit,
    originGroup: state.EditDetails.originGroup,
    originCountry: state.EditDetails.originCountry,
    excludeOriginGroup: state.EditDetails.excludeOriginGroup,
    excludeOriginCountry: state.EditDetails.excludeOriginCountry,
    originAirport: state.EditDetails.originAirport,
    excludeOriginAirport: state.EditDetails.excludeOriginAirport
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setOriginGroup,
      setOriginCountry,
      setOriginAirport,
      setExcludeOriginGroup,
      setExcludeOriginCountry,
      setExcludeOriginAirport
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Origin);
