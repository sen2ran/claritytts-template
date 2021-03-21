import React, { useState } from "react";
import APISearchDrown from "../../Input/APIDropDown/components/DropdownMultiple";
import Input from "../../Input/InputField";
import PlusButton from "../../Input/PlusButton";
import MinusButton from "../../Input/MinusButton";

import { getAirline } from "../../../services/AirLineService";

const SingleFlightNumber = ({
  index,
  dropDownPlaceHolder = "",
  fromPlaceHolder = "",
  toPlaceHolder = "",
  selectedDropDown = [],
  excludeDropDown = [],
  fromFlight = "",
  toFlight = "",
  isExclude = false,
  dropDownChange = {},
  addArray = {},
  minusArray = {},
  addFromValue = {},
  addToValue = {},
  includeAirlineRequriedMessage = "",
  includeFromFlightNumberRequiredMessage = "",
  includeToFlightNumberRequriedMessage = "",
}) => {
  const [airLine, setAirLine] = useState([]);

  const apiCallForAirline = key => {
    
    let searchKey = [];

    

    const payload = {
      term: key,
      allOption : "N"
    };

    if (key) {
      searchKey = [];
      

      if (key.length >= 2) {
        key.match(/.{1,2}/g).map(val =>
          searchKey.push({
            airline_code: val,
            airline_name: val,
            airline_country: val
          })
        );
  
        if (key.length % 2 != 0) {
          searchKey.pop();
        }

        getAirline(payload)
          .then(res => {
            if (res.status === "Success") {
              
              let output = [...searchKey, ...res.data];
              // output.concat(res.data);
              
              setAirLine(output);
            } else {
              let output = [...searchKey, ...res.data];
              setAirLine(output);
            }
          })
          .catch(error => {
            
          });
      }
    } else {
      setAirLine([]);
    }
  };

  const checkObjectExistInArray = (object, objectArray, labelName) => {
    return objectArray.some(list => list[labelName] == object[labelName]);
  };

  const plusButtonClick = index => {
    
    addArray(isExclude);
  };

  const minusButtonClick = index => {
    
    minusArray(isExclude, index);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <APISearchDrown
            selectedList={selectedDropDown}
            list={airLine.filter(
              val =>
                !checkObjectExistInArray(val, excludeDropDown, "airline_code")
            )}
            isSingle={true}
            labelName="airline_name"
            selectedlabelName = "airline_code"
            headerTitle={dropDownPlaceHolder}
            inputChanged={val => apiCallForAirline(val)}
            toggleItem={val => dropDownChange(val, index, isExclude)}
            errorMessage = {includeAirlineRequriedMessage}
          />
        </div>
        <div className="col-3">
          <Input
            placeholder={fromPlaceHolder}
            value={fromFlight}
            changeHandler={val =>
              !isNaN(val) ? addFromValue(val, index, isExclude) : ""
            }
            errorMessage = {includeFromFlightNumberRequiredMessage}
          />
        </div>

        <div className="col-3">
          <Input
            placeholder={toPlaceHolder}
            value={toFlight}
            changeHandler={val =>
              !isNaN(val) ? addToValue(val, index, isExclude) : ""
            }
            errorMessage={includeToFlightNumberRequriedMessage}
          />
        </div>
        {index === 0 ? (
          <div className="col-2">
            <PlusButton
              index={index}
              onClickHandler={index => plusButtonClick(index)}
            />
          </div>
        ) : (
          <div className="col-2">
            <MinusButton
              index={index}
              onClickHandler={index => minusButtonClick(index)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleFlightNumber;
