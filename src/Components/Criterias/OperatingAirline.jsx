import React, { useState, useEffect } from "react";
import CriteriaLayout from "../../Hoc/CriteriaLayout";
import CommonChild from "./Common/MarketingAirLineAndOperatingAirLine";
import {
  OPERATING_AIRLINE_PLACEHOLDER,
  OPERATING_AIRLINE_PLACEHOLDER_EXCLUDE,
  OPERATING_AIRLINE_PLACEHOLDER_RETURN,
  OPERATING_AIRLINE_PLACEHOLDER_EXCLUDE_RETURN,
  OPERATING_AIRLINE_RETURN
} from "./Constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setOperatingAirlineObjFn } from "../../store/actions/OperatingAirlineAction";
import {
  OPERATING_AIRLINE_INCLUDE_REQUIRED,
  OPERATING_AIRLINE_EXCLUDE_REQUIRED,
  OPERATING_AIRLINE_RETURN_INCLUDE_REQUIRED,
  OPERATING_AIRLINE_RETURN_EXCLUDE_REQUIRED
} from './Constants/ErrorMessages'
const OperatingAirline = props => {
  const [operatingAirline, setOperatingAirline] = useState({});
  const [operatingAirlineReturn, setOperatingAirlineReturn] = useState({});
  const [isReturnAirLine, setIsReturn] = useState(false);

  if(!props.isValid){
    let tMarketingAirLine = {...operatingAirline}
    if(tMarketingAirLine.include ){
      if(tMarketingAirLine.include.length === 0 && !tMarketingAirLine.errorIncludeAirline){
        tMarketingAirLine.errorIncludeAirline = OPERATING_AIRLINE_INCLUDE_REQUIRED
        setOperatingAirline(tMarketingAirLine)
      }
    }

    if(tMarketingAirLine.exclude){
      if(tMarketingAirLine.exclude.length === 0 && !tMarketingAirLine.errorExcludeAirline){
        tMarketingAirLine.errorExcludeAirline = OPERATING_AIRLINE_EXCLUDE_REQUIRED
        setOperatingAirline(tMarketingAirLine)
      }
    }

    if(isReturnAirLine){
      let tMarketingAirLineReturn = {...operatingAirlineReturn}
      if(tMarketingAirLineReturn.include ){
        if(tMarketingAirLineReturn.include.length === 0 && !tMarketingAirLineReturn.errorIncludeAirline){
          tMarketingAirLineReturn.errorIncludeAirline = OPERATING_AIRLINE_RETURN_INCLUDE_REQUIRED
          setOperatingAirlineReturn(tMarketingAirLineReturn)
        }
      }
  
      if(tMarketingAirLineReturn.exclude){
        if(tMarketingAirLineReturn.exclude.length === 0 && !tMarketingAirLineReturn.errorExcludeAirline){
          tMarketingAirLineReturn.errorExcludeAirline = OPERATING_AIRLINE_RETURN_EXCLUDE_REQUIRED
          setOperatingAirlineReturn(tMarketingAirLineReturn)
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
        props.onwardOperatingAirline &&
        props.onwardOperatingAirline.length > 0
      ) {
        if (props.onwardOperatingAirline[0].value_type === "S") {
          tMarketingAirLine.isIncludeFromGroup = true;
        }
        tMarketingAirLine.include = (props.onwardOperatingAirline[0].from_value? props.onwardOperatingAirline[0].from_value
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
        props.excludeOnwardOperatingAirline &&
        props.excludeOnwardOperatingAirline.length > 0
      ) {
        if (props.excludeOnwardOperatingAirline[0].value_type === "S") {
          tMarketingAirLine.isExcludeFromGroup = true;
        }
        tMarketingAirLine.exclude =( props.excludeOnwardOperatingAirline[0].from_value?  props.excludeOnwardOperatingAirline[0].from_value
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
      setOperatingAirline(tMarketingAirLine);
      let tMarketingAirLineReturn = {
        isIncludeFromGroup: false,
        isExcludeFromGroup: false,
        include: [],
        exclude: [],
        array: [],
        arrayExclude: []
      };
      if (
        props.returnOperatingAirline &&
        props.returnOperatingAirline.length > 0
      ) {
        if (props.returnOperatingAirline[0].value_type === "S") {
          tMarketingAirLineReturn.isIncludeFromGroup = true;
        }
        tMarketingAirLineReturn.include = (props.returnOperatingAirline[0].from_value ? props.returnOperatingAirline[0].from_value
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
        props.excludeReturnOperatingAirline &&
        props.excludeReturnOperatingAirline.length > 0
      ) {
        if (props.excludeReturnOperatingAirline[0].value_type === "S") {
          tMarketingAirLineReturn.isExcludeFromGroup = true;
        }
        tMarketingAirLineReturn.exclude = 
        (props.excludeReturnOperatingAirline[0].from_value ?  props.excludeReturnOperatingAirline[0].from_value
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
      setOperatingAirlineReturn(tMarketingAirLineReturn);
    } else {
      setOperatingAirline({
        isIncludeFromGroup: false,
        isExcludeFromGroup: false,
        include: [],
        exclude: [],
        array: [],
        arrayExclude: []
      });
      setOperatingAirlineReturn({
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
  //converted value
  const convertedInclude = operatingAirline.include
    ? operatingAirline.include.map(val => val.airline_code)
    : [];
  const convertedExclude = operatingAirline.exclude
    ? operatingAirline.exclude.map(val => val.airline_code)
    : [];
  const convertedReInclude = operatingAirlineReturn.include
    ? operatingAirlineReturn.include.map(val => val.airline_code)
    : [];
  const convertedReExclude = operatingAirlineReturn.exclude
    ? operatingAirlineReturn.exclude.map(val => val.airline_code)
    : [];
  const convertedObj = {
    onwardOperatingAirline: [
      {
        criteria_code: "onwardOperatingAirline",
        operator: "IN",
        from_value: String(convertedInclude),
        to_value: "",
        value_type: operatingAirline.isIncludeFromGroup ? "S" : "D"
      }
    ],
    excludeOnwardOperatingAirline: [
      {
        criteria_code: "excludeOnwardOperatingAirline",
        operator: "IN",
        from_value: String(convertedExclude),
        to_value: "",
        value_type: operatingAirline.isExcludeFromGroup ? "S" : "D"
      }
    ],
    returnOperatingAirline: isReturnAirLine
      ? [
          {
            criteria_code: "returnOperatingAirline",
            operator: "IN",
            from_value: String(convertedReInclude),
            to_value: "",
            value_type: operatingAirlineReturn.isIncludeFromGroup ? "S" : "D"
          }
        ]
      : [],
    excludeReturnOperatingAirline: isReturnAirLine
      ? [
          {
            criteria_code: "excludeReturnOperatingAirline",
            operator: "IN",
            from_value: String(convertedReExclude),
            to_value: "",
            value_type: operatingAirlineReturn.isExcludeFromGroup ? "S" : "D"
          }
        ]
      : []
  };
  props.setOperatingAirlineObjFn(convertedObj);
  const checkBoxChanged = (isReturn, isExclude, isReturnChange) => {
    if (isReturnChange) {
      setIsReturn(!isReturnAirLine);
    } else {
      if (isReturn) {
        if (isExclude) {
          let tmp = { ...operatingAirlineReturn };
          tmp.isExcludeFromGroup = !tmp.isExcludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setOperatingAirlineReturn(tmp);
        } else {
          let tmp = { ...operatingAirlineReturn };
          tmp.isIncludeFromGroup = !tmp.isIncludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setOperatingAirlineReturn(tmp);
        }
      } else {
        if (isExclude) {
          let tmp = { ...operatingAirline };
          tmp.isExcludeFromGroup = !tmp.isExcludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setOperatingAirline(tmp);
        } else {
          let tmp = { ...operatingAirline };
          tmp.isIncludeFromGroup = !tmp.isIncludeFromGroup;
          tmp.array = [];
          tmp.exclude = [];
          tmp.include = [];
          tmp.exclude = [];
          setOperatingAirline(tmp);
        }
      }
    }
  };
  const selectedDropDown = (isReturn, isExclude, val) => {
    if (isReturn) {
      if (isExclude) {
        let tmp = { ...operatingAirlineReturn };
        tmp.exclude = val;
        tmp.errorExcludeAirline = ""
        setOperatingAirlineReturn(tmp);
      } else {
        let tmp = { ...operatingAirlineReturn };
        tmp.include = val;
        tmp.errorIncludeAirline = ""
        setOperatingAirlineReturn(tmp);
      }
    } else {
      if (isExclude) {
        let tmp = { ...operatingAirline };
        tmp.exclude = val;
        tmp.errorExcludeAirline = ""
        setOperatingAirline(tmp);
      } else {
        let tmp = { ...operatingAirline };
        tmp.include = val;
        tmp.errorIncludeAirline = ""
        setOperatingAirline(tmp);
      }
    }
  };
  const searchResponse = (isReturn, isExclude, value) => {
    if (isReturn) {
      if (isExclude) {
        let tmp = { ...operatingAirlineReturn };
        tmp.arrayExclude = value;
        setOperatingAirlineReturn(tmp);
      } else {
        let tmp = { ...operatingAirlineReturn };
        tmp.array = value;
        setOperatingAirlineReturn(tmp);
      }
    } else {
      if (isExclude) {
        let tmp = { ...operatingAirline };
        tmp.arrayExclude = value;
        setOperatingAirline(tmp);
      } else {
        let tmp = { ...operatingAirline };
        tmp.array = value;
        setOperatingAirline(tmp);
      }
    }
  };
  return (
    <CriteriaLayout heading="OperatingAirline">
      {operatingAirline.include ? (
        <CommonChild
          airline={operatingAirline}
          isReturnAirLine={isReturnAirLine}
          airlineReturn={operatingAirlineReturn}
          includePlaceHolder={OPERATING_AIRLINE_PLACEHOLDER}
          excludePlaceHolder={OPERATING_AIRLINE_PLACEHOLDER_EXCLUDE}
          returnIncludePlaceHolder={OPERATING_AIRLINE_PLACEHOLDER_RETURN}
          returnExcludePlaceHolder={
            OPERATING_AIRLINE_PLACEHOLDER_EXCLUDE_RETURN
          }
          returnLabel={OPERATING_AIRLINE_RETURN}
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
    isValid: state.OperatingAirline.isValid,
    isEdit: state.EditDetails.isEdit,
    onwardOperatingAirline: state.EditDetails.onwardOperatingAirline,
    excludeOnwardOperatingAirline:
      state.EditDetails.excludeOnwardOperatingAirline,
    returnOperatingAirline: state.EditDetails.returnOperatingAirline,
    excludeReturnOperatingAirline:
      state.EditDetails.excludeReturnOperatingAirline
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setOperatingAirlineObjFn
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(OperatingAirline);