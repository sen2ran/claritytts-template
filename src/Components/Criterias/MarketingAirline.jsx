import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CommonChild from "./Common/MarketingAirLineAndOperatingAirLine";
import {
  MARKETING_AIRLINE_PLACEHOLDER,
  MARKETING_AIRLINE_PLACEHOLDER_EXCLUDE,
  MARKETING_AIRLINE_PLACEHOLDER_RETURN,
  MARKETING_AIRLINE_PLACEHOLDER_EXCLUDE_RETURN,
  MARKETING_AIRLINE_RETURN
} from "./Constants";

import {
  MARKETING_AIRLINE_INCLUDE_REQUIRED,
  MARKETING_AIRLINE_EXCLUDE_REQUIRED,
  MARKETING_AIRLINE_RETURN_INCLUDE_REQUIRED,
  MARKETING_AIRLINE_RETURN_EXCLUDE_REQUIRED
} from "./Constants/ErrorMessages";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setMarketingAirlineObjFn } from "../../store/actions/MarketingAirlineAction";
const MarketingAirline = props => {
  const [marketingAirline, setMarketingAirline] = useState({});
  const [marketingAirlineReturn, setMarketingAirlineReturn] = useState({});
  const [isReturnAirLine, setIsReturn] = useState(false);
  if(!props.isValid){
    let tMarketingAirLine = {...marketingAirline}
    let tMarketingAirLineReturn = {...marketingAirlineReturn}
    console.log(tMarketingAirLine)
    if(tMarketingAirLine.include){
      if(tMarketingAirLine.include.length === 0 && !tMarketingAirLine.errorIncludeAirline){
        tMarketingAirLine.errorIncludeAirline = MARKETING_AIRLINE_INCLUDE_REQUIRED
        setMarketingAirline(tMarketingAirLine)
      }
    }
    if(tMarketingAirLine.exclude){
      if(tMarketingAirLine.exclude.length === 0 && !tMarketingAirLine.errorExcludeAirline){
        tMarketingAirLine.errorExcludeAirline = MARKETING_AIRLINE_EXCLUDE_REQUIRED
        setMarketingAirline(tMarketingAirLine)
      }
    }

    
    if(isReturnAirLine){
      console.log("tMarketingAirLineReturn",tMarketingAirLineReturn)
      if(tMarketingAirLineReturn.include){
        if(tMarketingAirLineReturn.include.length === 0 && !tMarketingAirLineReturn.errorIncludeAirline){
          tMarketingAirLineReturn.errorIncludeAirline = MARKETING_AIRLINE_RETURN_INCLUDE_REQUIRED
          setMarketingAirlineReturn(tMarketingAirLine)
        }
      }
      if(tMarketingAirLineReturn.exclude){
        if(tMarketingAirLineReturn.exclude.length === 0 && !tMarketingAirLineReturn.errorExcludeAirline){
          tMarketingAirLineReturn.errorExcludeAirline = MARKETING_AIRLINE_RETURN_EXCLUDE_REQUIRED
          setMarketingAirlineReturn(tMarketingAirLineReturn)
        }
      }
    }
  }
  //>>EditDetail
  useEffect(() => {
    if (props.isEdit) {
      const tMarketingAirLine = {
        isIncludeFromGroup: false,
        isExcludeFromGroup: false,
        include: [],
        exclude: [],
        array: [],
        arrayExclude: []
      };
      if (
        props.onwardMarketingAirline &&
        props.onwardMarketingAirline.length > 0
      ) {
        if (props.onwardMarketingAirline[0].value_type === "S") {
          tMarketingAirLine.isIncludeFromGroup = true;
        }
        const tArray = props.onwardMarketingAirline[0].from_value ? props.onwardMarketingAirline[0].from_value.split(",") : [];
        tMarketingAirLine.include = tArray.map(airValval => {
          const tmp = {
            airline_code: airValval,
            airline_name: airValval,
            airline_country: airValval
          };
          return airValval ? tmp : "";
        });
      }
      if (
        props.excludeOnwardMarketingAirline &&
        props.excludeOnwardMarketingAirline.length > 0
      ) {
        if (props.excludeOnwardMarketingAirline[0].value_type === "S") {
          tMarketingAirLine.isExcludeFromGroup = true;
        }
        tMarketingAirLine.exclude = props.excludeOnwardMarketingAirline[0].from_value ? props.excludeOnwardMarketingAirline[0].from_value
          .split(",") : []
          .map(airValval => {
            const tmp = {
              airline_code: airValval,
              airline_name: airValval,
              airline_country: airValval
            };
            return airValval ? tmp : "";
          });
      }
      setMarketingAirline(tMarketingAirLine);
      let tMarketingAirLineReturn = {
        isIncludeFromGroup: false,
        isExcludeFromGroup: false,
        include: [],
        exclude: [],
        array: [],
        arrayExclude: []
      };
      if (
        props.returnMarketingAirline &&
        props.returnMarketingAirline.length > 0
      ) {
        if (props.returnMarketingAirline[0].value_type === "S") {
          tMarketingAirLineReturn.isIncludeFromGroup = true;
        }
        tMarketingAirLineReturn.include = (props.returnMarketingAirline[0].from_value ? props.returnMarketingAirline[0].from_value
          .split(","): [])
          .map(airValval => {
            const tmp = {
              airline_code: airValval,
              airline_name: airValval,
              airline_country: airValval
            };
            return airValval ? tmp : "";
          });
      }
      if (
        props.excludeReturnMarketingAirline &&
        props.excludeReturnMarketingAirline.length > 0
      ) {
        if (props.excludeReturnMarketingAirline[0].value_type === "S") {
          tMarketingAirLineReturn.isExcludeFromGroup = true;
        }
        tMarketingAirLineReturn.exclude = (props.excludeReturnMarketingAirline[0].from_value ? props.excludeReturnMarketingAirline[0].from_value
          .split(","): [])
          .map(airValval => {
            const tmp = {
              airline_code: airValval,
              airline_name: airValval,
              airline_country: airValval
            };
            return airValval ? tmp : "";
          });
      }
      if (
        tMarketingAirLineReturn.include.length > 0 ||
        tMarketingAirLineReturn.exclude.length > 0
      ) {
        setIsReturn(true);
      }
      setMarketingAirlineReturn(tMarketingAirLineReturn);
    } else {
      setMarketingAirline({
        isIncludeFromGroup: false,
        isExcludeFromGroup: false,
        include: [],
        exclude: [],
        array: [],
        arrayExclude: []
      });
      setMarketingAirlineReturn({
        isIncludeFromGroup: false,
        isExcludeFromGroup: false,
        include: [],
        exclude: [],
        array: [],
        arrayExclude: []
      });
    }
  }, []);
  //<<EditDetail
  const convertedInclude = marketingAirline.include
    ? marketingAirline.include.map(val => val.airline_code)
    : [];
  const convertedExclude = marketingAirline.exclude
    ? marketingAirline.exclude.map(val => val.airline_code)
    : [];
  const convertedReInclude = marketingAirlineReturn.include
    ? marketingAirlineReturn.include.map(val => val.airline_code)
    : [];
  const convertedReExclude = marketingAirlineReturn.exclude
    ? marketingAirlineReturn.exclude.map(val => val.airline_code)
    : [];
  const convertedObj = {
    onwardMarketingAirline: [
      {
        criteria_code: "onwardMarketingAirline",
        operator: "IN",
        from_value: String(convertedInclude),
        to_value: "",
        value_type: marketingAirline.isIncludeFromGroup ? "S" : "D"
      }
    ],
    excludeOnwardMarketingAirline: [
      {
        criteria_code: "excludeOnwardMarketingAirline",
        operator: "IN",
        from_value: String(convertedExclude),
        to_value: "",
        value_type: marketingAirline.isExcludeFromGroup ? "S" : "D"
      }
    ],
    returnMarketingAirline: isReturnAirLine
      ? [
          {
            criteria_code: "returnMarketingAirline",
            operator: "IN",
            from_value: String(convertedReInclude),
            to_value: "",
            value_type: marketingAirlineReturn.isIncludeFromGroup ? "S" : "D"
          }
        ]
      : [],
    excludeReturnMarketingAirline: isReturnAirLine
      ? [
          {
            criteria_code: "excludeReturnMarketingAirline",
            operator: "IN",
            from_value: String(convertedReExclude),
            to_value: "",
            value_type: marketingAirlineReturn.isExcludeFromGroup ? "S" : "D"
          }
        ]
      : []
  };
  props.setMarketingAirlineObjFn(convertedObj);
  const checkBoxChanged = (isReturn, isExclude, isReturnChange) => {
    if (isReturnChange) {
      setIsReturn(!isReturnAirLine);
    } else {
      if (isReturn) {
        if (isExclude) {
          let tmp = { ...marketingAirlineReturn };
          tmp.isExcludeFromGroup = !tmp.isExcludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setMarketingAirlineReturn(tmp);
        } else {
          let tmp = { ...marketingAirlineReturn };
          tmp.isIncludeFromGroup = !tmp.isIncludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setMarketingAirlineReturn(tmp);
        }
      } else {
        if (isExclude) {
          let tmp = { ...marketingAirline };
          tmp.isExcludeFromGroup = !tmp.isExcludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setMarketingAirline(tmp);
        } else {
          let tmp = { ...marketingAirline };
          tmp.isIncludeFromGroup = !tmp.isIncludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setMarketingAirline(tmp);
        }
      }
    }
  };
  const selectedDropDown = (isReturn, isExclude, val) => {
    if (isReturn) {
      if (isExclude) {
        let tmp = { ...marketingAirlineReturn };
        tmp.exclude = val;
        setMarketingAirlineReturn(tmp);
      } else {
        let tmp = { ...marketingAirlineReturn };
        tmp.include = val;
        setMarketingAirlineReturn(tmp);
      }
    } else {
      if (isExclude) {
        let tmp = { ...marketingAirline };
        tmp.exclude = val;
        setMarketingAirline(tmp);
      } else {
        let tmp = { ...marketingAirline };
        tmp.include = val;
        setMarketingAirline(tmp);
      }
    }
  };
  const searchResponse = (isReturn, isExclude, value) => {
    if (isReturn) {
      if (isExclude) {
        let tmp = { ...marketingAirlineReturn };
        tmp.arrayExclude = value;
        setMarketingAirlineReturn(tmp);
      } else {
        let tmp = { ...marketingAirlineReturn };
        tmp.array = value;
        setMarketingAirlineReturn(tmp);
      }
    } else {
      if (isExclude) {
        let tmp = { ...marketingAirline };
        tmp.arrayExclude = value;
        setMarketingAirline(tmp);
      } else {
        let tmp = { ...marketingAirline };
        tmp.array = value;
        setMarketingAirline(tmp);
      }
    }
  };
  return (
    <CriteriaLayout heading="MarketingAirline">
      {marketingAirline.include ? (
        <CommonChild
          airline={marketingAirline}
          isReturnAirLine={isReturnAirLine}
          airlineReturn={marketingAirlineReturn}
          includePlaceHolder={MARKETING_AIRLINE_PLACEHOLDER}
          excludePlaceHolder={MARKETING_AIRLINE_PLACEHOLDER_EXCLUDE}
          returnIncludePlaceHolder={MARKETING_AIRLINE_PLACEHOLDER_RETURN}
          returnExcludePlaceHolder={
            MARKETING_AIRLINE_PLACEHOLDER_EXCLUDE_RETURN
          }
          returnLabel={MARKETING_AIRLINE_RETURN}
          checkBoxChanged={(isReturn, isExclude, isReturnChange) =>
            checkBoxChanged(isReturn, isExclude, isReturnChange)
          }
          selectedDropDown={(isReturn, isExclude, val) =>
            selectedDropDown(isReturn, isExclude, val)
          }
          searchResponse={(isReturn, isExclude, tmp) =>
            searchResponse(isReturn, isExclude, tmp)
          }
        />
      ) : null}
    </CriteriaLayout>
  );
};
function mapStateToProps(state) {
  return {
    isValid: state.MarketingAirline.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardMarketingAirline: state.EditDetails.onwardMarketingAirline,
    excludeOnwardMarketingAirline:
      state.EditDetails.excludeOnwardMarketingAirline,
    returnMarketingAirline: state.EditDetails.returnMarketingAirline,
    excludeReturnMarketingAirline:
      state.EditDetails.excludeReturnMarketingAirline
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setMarketingAirlineObjFn
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(MarketingAirline);
