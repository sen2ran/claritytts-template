import React from "react";
import {
  getMarketingAirLine,
  getMarketingAirLineFromGroup
} from "../../../services/MarketingAirline";
import APIMultiDropDown from "../../Input/APIDropDown/components/DropdownMultiple";
import CheckBox from "../../Input/CheckBox";
import {
  AIRLINE_COMMON_SELECT_FROM_GROUP,
} from "../Constants";

const MarketingAirLineAndOperatingAirLineSingle = ({
  airline,
  airlineReturn,
  checkBoxChanged,
  selectedDropDown,
  includePlaceHolder,
  excludePlaceHolder,
  returnIncludePlaceHolder,
  returnExcludePlaceHolder,
  isReturnAirLine,
  searchResponse,
  returnLabel,
}) => {
  const dropDownSearch = (isReturn, isExclude, key) => {
    
    
    

    if (key.length >= 2) {
      let searchKey = [];
      key.match(/.{1,2}/g).map(val =>
        searchKey.push({
          airline_code: val,
          airline_country: val,
          airline_name: val
        })
      );

      if (key.length % 2 !== 0) {
        searchKey.pop();
      }

      if (isReturn) {
        if (isExclude) {
          if (airlineReturn.isExcludeFromGroup) {
            const payload = {
              term: key,
              templateAcId: "3"
            };
            groupAPICall(isReturn, isExclude, payload, searchKey);
          } else {
            const payload = {
              term: key,
              allOption: "N"
            };
            singleAPICall(isReturn, isExclude, payload, searchKey);
          }
        } else {
          if (airlineReturn.isIncludeFromGroup) {
            const payload = {
              term: key,
              templateAcId: "3"
            };
            groupAPICall(isReturn, isExclude, payload, searchKey);
          } else {
            const payload = {
              term: key,
              allOption: "N"
            };
            singleAPICall(isReturn, isExclude, payload, searchKey);
          }
        }
      } else {
        if (isExclude) {
          if (airline.isExcludeFromGroup) {
            const payload = {
              term: key,
              templateAcId: "3"
            };
            groupAPICall(isReturn, isExclude, payload, searchKey);
          } else {
            const payload = {
              term: key,
              allOption: "N"
            };
            singleAPICall(isReturn, isExclude, payload, searchKey);
          }
        } else {
          if (airline.isIncludeFromGroup) {
            const payload = {
              term: key,
              templateAcId: "3"
            };
            groupAPICall(isReturn, isExclude, payload, searchKey);
          } else {
            const payload = {
              term: key,
              allOption: "N"
            };
            singleAPICall(isReturn, isExclude, payload, searchKey);
          }
        }
      }
    }
  };

  const singleAPICall = (isReturn, isExclude, payload, searchKey) => {
    getMarketingAirLine(payload)
      .then(res => {
        if (res.status === "Success") {
          
          let output = [...searchKey, ...res.data];
          // output.concat(res.data);
          
          if (isReturn) {
            if (!isExclude) {
              searchResponse(isReturn, isExclude, output);
            } else {
              searchResponse(isReturn, isExclude, output);
            }
          } else {
            if (isReturn) {
              if (!isExclude) {
                searchResponse(isReturn, isExclude, output);
              } else {
                searchResponse(isReturn, isExclude, output);
              }
            } else {
              if (!isExclude) {
                searchResponse(isReturn, isExclude, output);
              } else {
                searchResponse(isReturn, isExclude, output);
              }
            }
          }
        } else {
          let output = [...searchKey, ...res.data];
          if (isReturn) {
            if (!isExclude) {
              searchResponse(isReturn, isExclude, output);
            } else {
              searchResponse(isReturn, isExclude, output);
            }
          } else {
            if (!isExclude) {
              searchResponse(isReturn, isExclude, output);
            } else {
              searchResponse(isReturn, isExclude, output);
            }
          }
        }
      })
      .catch(error => {
        
      });
  };

  const groupAPICall = (isReturn, isExclude, payload, searchKey) => {
    getMarketingAirLineFromGroup(payload)
      .then(res => {
        if (res.status === "Success") {
          
          let output = [...searchKey, ...res.data];
          // output.concat(res.data);
          
          if (isReturn) {
            if (!isExclude) {
              searchResponse(isReturn, isExclude, output);
            } else {
              searchResponse(isReturn, isExclude, output);
            }
          } else {
            if (!isExclude) {
              searchResponse(isReturn, isExclude, output);
            } else {
              searchResponse(isReturn, isExclude, output);
            }
          }
        } else {
          let output = [...searchKey, ...res.data];
          if (isReturn) {
            if (!isExclude) {
              searchResponse(isReturn, isExclude, output);
            } else {
              searchResponse(isReturn, isExclude, output);
            }
          } else {
            if (!isExclude) {
              searchResponse(isReturn, isExclude, output);
            } else {
              searchResponse(isReturn, isExclude, output);
            }
          }
        }
      })
      .catch(error => {
        
      });
  };

  const checkObjectExistInArray = (object, objectArray, labelName) => {
    return objectArray.some(list => list[labelName] === object[labelName]);
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <CheckBox
            label={AIRLINE_COMMON_SELECT_FROM_GROUP}
            isSelected={airline.isIncludeFromGroup}
            onCheckboxChange={() => checkBoxChanged(false, false, false)}
          />
        </div>
        <div className="row">
          <APIMultiDropDown
            headerTitle={includePlaceHolder}
            selectedList={airline.include}
            list={airline.array.filter(
              val =>
                !checkObjectExistInArray(val, airline.exclude, "airline_code")
            )}
            labelName="airline_name"
            selectedlabelName = "airline_code"
            toggleItem={val => selectedDropDown(false, false, val)}
            inputChanged={val => dropDownSearch(false, false, val)}
            errorMessage = {airline.errorIncludeAirline}
          />
        </div>

        <div className="row">
          <CheckBox
            label={AIRLINE_COMMON_SELECT_FROM_GROUP}
            isSelected={airline.isExcludeFromGroup}
            onCheckboxChange={() => checkBoxChanged(false, true, false)}
          />
        </div>
        <div className="row">
          <APIMultiDropDown
            headerTitle={excludePlaceHolder}
            selectedList={airline.exclude}
            list={airline.arrayExclude.filter(
              val =>
                !checkObjectExistInArray(val, airline.include, "airline_code")
            )}
            labelName="airline_name"
            selectedlabelName = "airline_code"
            toggleItem={val => selectedDropDown(false, true, val)}
            inputChanged={val => dropDownSearch(false, true, val)}
            errorMessage = {airline.errorExcludeAirline}
          />
        </div>

        <div className="row">
          <CheckBox
            label={returnLabel}
            isSelected={isReturnAirLine}
            onCheckboxChange={() => checkBoxChanged(false, false, true)}
          />
        </div>

        {isReturnAirLine ? (
          <div>
            <div className="row">
              <CheckBox
                label={AIRLINE_COMMON_SELECT_FROM_GROUP}
                isSelected={airlineReturn.isIncludeFromGroup}
                onCheckboxChange={() => checkBoxChanged(true, false, false)}
              />
            </div>
            <div className="row">
              <APIMultiDropDown
                headerTitle={returnIncludePlaceHolder}
                selectedList={airlineReturn.include}
                list={airlineReturn.array.filter(
                  val =>
                    !checkObjectExistInArray(
                      val,
                      airlineReturn.exclude,
                      "airline_code"
                    )
                )}
                labelName="airline_name"
                selectedlabelName = "airline_code"
                toggleItem={val => selectedDropDown(true, false, val)}
                inputChanged={val => dropDownSearch(true, false, val)}
                errorMessage = {airlineReturn.errorIncludeAirline}
              />
            </div>

            <div className="row">
              <CheckBox
                label={AIRLINE_COMMON_SELECT_FROM_GROUP}
                isSelected={airlineReturn.isExcludeFromGroup}
                onCheckboxChange={() => checkBoxChanged(true, true, false)}
              />
            </div>
            <div className="row">
              <APIMultiDropDown
                headerTitle={returnExcludePlaceHolder}
                selectedList={airlineReturn.exclude}
                list={airlineReturn.arrayExclude.filter(
                  val =>
                    !checkObjectExistInArray(
                      val,
                      airlineReturn.include,
                      "airline_code"
                    )
                )}
                labelName="airline_name"
                selectedlabelName = "airline_code"
                toggleItem={val => selectedDropDown(true, true, val)}
                inputChanged={val => dropDownSearch(true, true, val)}
                errorMessage = {airlineReturn.errorExcludeAirline}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MarketingAirLineAndOperatingAirLineSingle;
