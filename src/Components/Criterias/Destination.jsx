import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import DropDown from "../Input/DropDown";
import APIDropDown from "../Input/APIDropDown/components/DropdownMultiple";
import "react-tagsinput/react-tagsinput.css";
import {
  DISTINATION_GROUP,
  DISTINATION_GROUP_PLACEHOLDER,
  DISTINATION_COUNTRY_PLACEHOLDER,
  DISTINATION_AIRPORT_PLACEHOLDER,
  DISTINATION_GROUP_PLACEHOLDER_EXCLUDE,
  DISTINATION_COUNTRY_PLACEHOLDER_EXCLUDE,
  DISTINATION_AIRPORT_PLACEHOLDER_EXCLUDE
} from "./Constants";

import { getCountry } from "../../services/DestinationService";
import { getAirport } from "../../services/AirportService";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setDestinationGroup,
  setDestinationCountry,
  setDestinationAirport,
  setExcludeDestinationGroup,
  setExcludeDestinationCountry,
  setExcludeDestinationAirport
} from "../../store/actions/DestinationAction";

import {
  DESTINATION_DESTINATION_AIRPORT_LIST_REQUIRED,
  DESTINATION_GROUP_REQUIED,
  DESTINATION_DESTINATION_COUTRY_REQUIRED
} from './Constants/ErrorMessages'

const Destination = props => {
  let { destinationGroupArray } = props;
  let { isValid } = props;
  let { destinationCountry } = props;
  let { destinationAirport } = props;
  let { excludeDestinationGroup } = props;
  let { excludeDestinationCountry } = props;
  let { excludeDestinationAirport } = props;

  const [destinationGroup, setDestinationGroup] = useState([]);

  const [countryArray, setCountryArray] = useState([]);
  const [selectedCountryArray, setSelectedCountryArray] = useState([]);

  const [airportArray, setAirportArray] = useState([]);
  const [selectedAirportArray, setSelectedAirportArray] = useState([]);

  const [destinationGroupExclude, setDestinationGroupExclude] = useState([]);

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

  let groupErrorMessage  = ""
  let countryErrorMessage = ""
  let airlineErrorMessage = ""
  let excludeGroupErrorMessage = ""
  let excludeCountryErrorMessage = ""
  let excludeAirlineErrorMessage = ""

  if(!isValid){
    if(destinationGroup && destinationGroup.length === 0){
      groupErrorMessage = DESTINATION_GROUP_REQUIED
    }

    if(selectedCountryArray && selectedCountryArray.length === 0 ){
      countryErrorMessage = DESTINATION_DESTINATION_COUTRY_REQUIRED
    }

    if(selectedAirportArray && selectedAirportArray.length === 0){
      airlineErrorMessage = DESTINATION_DESTINATION_AIRPORT_LIST_REQUIRED
    }

    if(destinationGroupExclude && destinationGroupExclude.length === 0){
      excludeGroupErrorMessage = DESTINATION_GROUP_REQUIED
    }

    if(selectedCountryArrayExclude && selectedCountryArrayExclude.length === 0 ){
      excludeCountryErrorMessage = DESTINATION_DESTINATION_COUTRY_REQUIRED
    }

    if(selectedAirportArrayExclude && selectedAirportArrayExclude.length === 0){
      excludeAirlineErrorMessage = DESTINATION_DESTINATION_AIRPORT_LIST_REQUIRED
    }
  }

  useEffect(() => {
    if (props.isEdit) {
      if (props.destinationGroup && props.destinationGroup.length > 0) {
        setDestinationGroup(
          DISTINATION_GROUP.filter(
            val => val.name == props.destinationGroup[0].from_value
          )
        );
      }

      if (
        props.excludeDestinationGroup &&
        props.excludeDestinationGroup.length > 0
      ) {
        setDestinationGroupExclude(
          DISTINATION_GROUP.filter(
            val => val.name == props.excludeDestinationGroup[0].from_value
          )
        );
      }

      if (props.destinationCountry && props.destinationCountry.length > 0) {
        const tSelectedCountry = props.destinationCountry[0].from_value.split(
          ","
        );
        const output = tSelectedCountry.map(val => {
          const tmp = {
            country_name: val,
            country_code: val,
            country_iata_code: val
          };
          return tmp;
        })
        setSelectedCountryArray(
          output
        );
        // 
      } 

      if(props.excludeDestinationCountry && props.excludeDestinationCountry.length >0){
        const tSelectedCountry = props.excludeDestinationCountry[0].from_value.split(
          ","
        );
        const output = tSelectedCountry.map(val => {
          const tmp = {
            country_name: val,
            country_code: val,
            country_iata_code: val
          };
          return tmp;
        })
        setSelectedCountryArrayExclude(
          output
        );
        
      }

      if (props.destinationAirport && props.destinationAirport.length > 0) {
        const tSelectedCountry = props.destinationAirport[0].from_value.split(
          ","
        );
        
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

      if (props.excludeDestinationAirport && props.excludeDestinationAirport.length > 0) {
        const tSelectedCountry = props.excludeDestinationAirport[0].from_value.split(
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
    if (destinationGroup && destinationGroup.length > 0) {
      destinationGroup.length > 0
        ? props.setDestinationGroup({
            value: [
              {
                criteria_code: "destinationGroup",
                operator: "IN",
                from_value: destinationGroup[0].value,
                to_value: "",
                value_type: "D"
              }
            ]
          })
        : props.setDestinationGroup({ value: [] });
    }
  }, [destinationGroup]);

  useEffect(() => {
    let tSelectedCountryArray = [];
    if (selectedCountryArray) {
      selectedCountryArray.filter(val => {
        tSelectedCountryArray.push(val.country_code);
      });

      tSelectedCountryArray.length > 0
        ? props.setDestinationCountry({
            value: [
              {
                criteria_code: "destinationCountry",
                operator: "IN",
                from_value: String(tSelectedCountryArray),
                to_value: "",
                value_type: "D"
              }
            ]
          })
        : props.setDestinationCountry({ value: [] });
    }
  }, [selectedCountryArray]);

  useEffect(() => {
    let tSelectedAirportArray = [];
    if (selectedAirportArray) {
      selectedAirportArray.filter(val => {
        tSelectedAirportArray.push(val.airport_iata_code);
      });

      tSelectedAirportArray.length > 0
        ? props.setDestinationAirport({
            value: [
              {
                criteria_code: "destinationAirport",
                operator: "IN",
                from_value: String(tSelectedAirportArray),
                to_value: "",
                value_type: "D"
              }
            ]
          })
        : props.setDestinationAirport({ value: [] });
    }
  }, [selectedAirportArray]);

  useEffect(() => {
    if (destinationGroup) {
      destinationGroupExclude.length > 0
        ? props.setExcludeDestinationGroup({
            value: [
              {
                criteria_code: "excludeDestinationGroup",
                operator: "IN",
                from_value: destinationGroupExclude[0].value,
                to_value: "",
                value_type: "D"
              }
            ]
          })
        : props.setExcludeDestinationGroup({ value: [] });
    }
  }, [destinationGroupExclude]);

  useEffect(() => {
    let tSelectedCountryArray = [];
    if (selectedCountryArrayExclude) {
      selectedCountryArrayExclude.filter(val => {
        tSelectedCountryArray.push(val.country_code);
      });

      tSelectedCountryArray.length > 0
        ? props.setExcludeDestinationCountry({
            value: [
              {
                criteria_code: "excludeDestinationCountry",
                operator: "IN",
                from_value: String(tSelectedCountryArray),
                to_value: "",
                value_type: "D"
              }
            ]
          })
        : props.setExcludeDestinationCountry({ value: [] });
    }
  }, [selectedCountryArrayExclude]);

  useEffect(() => {
    let tSelectedAirportArray = [];
    if (selectedAirportArrayExclude) {
      selectedAirportArrayExclude.filter(val => {
        tSelectedAirportArray.push(val.airport_iata_code);
      });

      tSelectedAirportArray.length > 0
        ? props.setExcludeDestinationAirport({
            value: [
              {
                criteria_code: "excludeDestinationAirport",
                operator: "IN",
                from_value: String(tSelectedAirportArray),
                to_value: "",
                value_type: "D"
              }
            ]
          })
        : props.setExcludeDestinationAirport({ value: [] });
    }
  }, [selectedAirportArrayExclude]);

  const destinationGroupChanged = (val, isExclude) => {
    if (!isExclude) {
      if(val.length > 0){
        groupErrorMessage = ""
      }
      setDestinationGroup(val);
    } else {
      if(val.length > 0){
        excludeGroupErrorMessage = ""
      }
      setDestinationGroupExclude(val);
    }
  };

  const apiGroupChanged = (type, val, isExclude) => {
    
    if (type === "country") {
      if (!isExclude) {
        if(val.length > 0){
          countryErrorMessage = ""
        }
        setSelectedCountryArray(val);
      } else {
        if(val.length > 0){
          excludeCountryErrorMessage = ""
        }
        setSelectedCountryArrayExclude(val);
      }
    } else if (type === "airport") {
      if (!isExclude) {
        if(val.length > 0){
          airlineErrorMessage = ""
        }
        setSelectedAirportArray(val);
      } else {
        if(val.length > 0){
          excludeAirlineErrorMessage = ""
        }
        setSelectedAirportArrayExclude(val);
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

        if (key.length >= 2) {
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
    <CriteriaLayout heading="Destination">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <DropDown
              defaultDropDownArray={DISTINATION_GROUP.filter(
                val =>
                  !checkObjectExistInArray(
                    val,
                    destinationGroupExclude,
                    "value"
                  )
              )}
              placeHolder={DISTINATION_GROUP_PLACEHOLDER}
              selectedValue={destinationGroup}
              onChangeAction={values => destinationGroupChanged(values, false)}
              errorMessage = {groupErrorMessage}
            />
          </div>

          <div className="col-4">
            <APIDropDown
              headerTitle={DISTINATION_COUNTRY_PLACEHOLDER}
              labelName="country_name"
              isEdit={props.isEdit}
              editLableName="country_code"
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
              errorMessage = {countryErrorMessage}
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={DISTINATION_AIRPORT_PLACEHOLDER}
              labelName="airport_name"
              isEdit={props.isEdit}
              editLableName="airport_iata_code"
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
              errorMessage={airlineErrorMessage}
            />
          </div>
        </div>
      </div>

      <br />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <DropDown
              defaultDropDownArray={DISTINATION_GROUP.filter(
                val => !checkObjectExistInArray(val, destinationGroup, "value")
              )}
              placeHolder={DISTINATION_GROUP_PLACEHOLDER_EXCLUDE}
              selectedValue={destinationGroupExclude}
              onChangeAction={values => destinationGroupChanged(values, true)}
              errorMessage = {excludeGroupErrorMessage}
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={DISTINATION_COUNTRY_PLACEHOLDER_EXCLUDE}
              labelName="country_name"
              isEdit={props.isEdit}
              editLableName="country_code"
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
              errorMessage = {excludeCountryErrorMessage}
            />
          </div>
          <div className="col-4">
            <APIDropDown
              headerTitle={DISTINATION_AIRPORT_PLACEHOLDER_EXCLUDE}
              labelName="airport_name"
              isEdit={props.isEdit}
              editLableName="airport_iata_code"
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
              errorMessage = {excludeAirlineErrorMessage}
            />
          </div>
        </div>
      </div>
    </CriteriaLayout>
  );
};

function mapStateToProps(state) {
  return {
    destinationGroupArray: state.Destination.destinationGroup,
    isValid: state.Destination.isValid,
    destinationCountry: state.Destination.destinationCountry,
    destinationAirport: state.Destination.destinationAirport,

    excludeDestinationGroup: state.Destination.excludeDestinationGroup,
    excludeDestinationCountry: state.Destination.excludeDestinationCountry,
    excludeDestinationAirport: state.Destination.excludeDestinationAirport,
    isEdit: state.EditDetails.isEdit,
    destinationGroup: state.EditDetails.destinationGroup,
    excludeDestinationGroup: state.EditDetails.excludeDestinationGroup,
    destinationCountry: state.EditDetails.destinationCountry,
    excludeDestinationCountry: state.EditDetails.excludeDestinationCountry,
    destinationAirport: state.EditDetails.destinationAirport,
    excludeDestinationAirport: state.EditDetails.excludeDestinationAirport
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setDestinationGroup,
      setDestinationCountry,
      setDestinationAirport,
      setExcludeDestinationGroup,
      setExcludeDestinationCountry,
      setExcludeDestinationAirport
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
