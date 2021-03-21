import React, { useState } from "react";

import DataLoader from "./DataLoader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setArivalIsValid,
  setBlockedOutDepartureDateIsValid,
  setBookingClassIsValid,
  setBookingPeriodIsValid,
  setContentSourceMappingIsValid,
  setDaysToDepartureIsValid,
  setDepartureDateIsValid,
  setDestinationIsValid,
  setFareBasisCodeIsValid,
  setFareRangeIsValid,
  setFlightNumberIsValid,
  setMarketingAirlineIsValid,
  setMaxStayIsValid,
  setMinStayIsValid,
  setNoOfSeatsIsValid,
  setNoOfStopsIsValid,
  setOperatingAirlineIsValid,
  setOriginIsValid,
  setOriginalTripTypeIsValid,
  setPassengerTypeIsValid,
  setTripTypeIsValid,
  setTourCodeIsValid,
  setTicketingDateIsValid,
  setStopOverIsValid,
  setSegmentCountIsValid,
  setArrivalDaySchedulerIsValid,
  setBookingDaySchedulerIsValid,
  setDepartureDaySchedulerIsValid
} from "../store/actions/IsValidAction";
import axios from "axios";

const MainButton = props => {
  const [tmpReduxState, setTmpReduxState] = useState(null);
  const [jsonVal, setJsonVal] = useState({});

  const btnFn = async () => {
    setTmpReduxState({ ...props.reduxState });

    const CriteriasList = [
      ...props.defaultCriteriasList.filter(obj => obj),
      ...props.selectedOptionalCriteriasList.filter(obj => obj)
    ];
    console.log(CriteriasList);

    var CriteriaArray = [];
    let ValidArray = [];
    /**
     *  Check with Default and optional
     *  Check IsReturn
     *  validate the value depends on component
     */
    /**
     * ArrivalDate , Mulitple , isReturn
     */
    let onwardArrivalDate = props.reduxState.ArrivalDate.onwardArrivalDate;
    let returnArrivalDate = props.reduxState.ArrivalDate.returnArrivalDate;
    if (CriteriasList.includes("arrivalDate")) {
      let isSingleComponentValid = true;
      if (onwardArrivalDate && onwardArrivalDate.length > 0) {
        let lastObj = onwardArrivalDate[onwardArrivalDate.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...onwardArrivalDate);
        } else {
          isSingleComponentValid = false;
        }
      }
      if (returnArrivalDate && returnArrivalDate.length > 0) {
        let lastObj = returnArrivalDate[returnArrivalDate.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...returnArrivalDate);
        } else {
          isSingleComponentValid = false;
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setArivalIsValid(false);
        console.log("Error in Validation ArrivalDate");
      } else {
        // Valid
        props.setArivalIsValid(true);
      }
    }
    /**
     * DepartureDate , Mulitple , isReturn
     */
    let onwardDepartureDate =
      props.reduxState.DepartureDate.onwardDepartureDate;
    let returnDepartureDate =
      props.reduxState.DepartureDate.returnDepartureDate;
    if (CriteriasList.includes("departureDate")) {
      let isSingleComponentValid = true;
      if (onwardDepartureDate && onwardDepartureDate.length > 0) {
        let lastObj = onwardDepartureDate[onwardDepartureDate.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...onwardDepartureDate);
        } else {
          isSingleComponentValid = false;
        }
      }
      if (returnDepartureDate && returnDepartureDate.length > 0) {
        let lastObj = returnDepartureDate[returnDepartureDate.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...returnDepartureDate);
        } else {
          isSingleComponentValid = false;
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setDepartureDateIsValid(false);
        console.log("Error in Validation DepartureDate");
      } else {
        // Valid
        props.setDepartureDateIsValid(true);
      }
    }
    /**
     * BookingPeriod , Mulitple
     */
    let bookingPeriod = props.reduxState.BookingPeriod.bookingPeriod;

    if (CriteriasList.includes("bookingPeriod")) {
      let isSingleComponentValid = true;
      if (bookingPeriod && bookingPeriod.length > 0) {
        let lastObj = bookingPeriod[bookingPeriod.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...bookingPeriod);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation bookingPeriod");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setBookingPeriodIsValid(false);
        console.log("Error in Validation bookingPeriod");
      } else {
        props.setBookingPeriodIsValid(true);
        // Valid
      }
    }
    /**
     * DaysToDeparture , Mulitple
     */
    let daysToDeparture = props.reduxState.DaysToDeparture.daysToDeparture;
    if (CriteriasList.includes("daysToDeparture")) {
      let isSingleComponentValid = true;
      if (daysToDeparture && daysToDeparture.length > 0) {
        let lastObj = daysToDeparture[daysToDeparture.length - 1];
        if (lastObj.operator && lastObj.from_value) {
          CriteriaArray.push(...daysToDeparture);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation daysToDeparture");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setDaysToDepartureIsValid(false);
        console.log("Error in Validation daysToDeparture");
      } else {
        props.setDaysToDepartureIsValid(true);
        // Valid
      }
    }
    /**
     * FareRange , Mulitple
     */
    let fareRange = props.reduxState.FareRange.fareRange;
    if (CriteriasList.includes("fareRange")) {
      let isSingleComponentValid = true;
      if (fareRange && fareRange.length > 0) {
        let lastObj = fareRange[fareRange.length - 1];
        if (lastObj.operator && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...fareRange);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation fareRange");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setFareRangeIsValid(false);
        console.log("Error in Validation fareRange");
      } else {
        props.setFareRangeIsValid(true);

        // Valid
      }
    }
    /**
     * TripType
     */
    let tripType = props.reduxState.TripType.tripType;
    if (CriteriasList.includes("tripType")) {
      let isSingleComponentValid = true;
      if (tripType && tripType.length > 0) {
        let lastObj = tripType[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...tripType);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation tripType");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setTripTypeIsValid(false);
        console.log("Error in Validation tripType");
      } else {
        props.setTripTypeIsValid(true);
        // Valid
      }
    }
    /**
     * TicketingDate , Mulitple
     */
    let ticketingDate = props.reduxState.TicketingDate.ticketingDate;
    if (CriteriasList.includes("ticketingDate")) {
      let isSingleComponentValid = true;
      if (ticketingDate && ticketingDate.length > 0) {
        let lastObj = ticketingDate[ticketingDate.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...ticketingDate);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation ticketingDate");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setTicketingDateIsValid(false);
        console.log("Error in Validation ticketingDate");
      } else {
        props.setTicketingDateIsValid(true);
        // Valid
      }
    }
    /**
     * MaxStay
     */
    let maxStay = props.reduxState.MaxStay.maxStay;
    if (CriteriasList.includes("maxStay")) {
      let isSingleComponentValid = true;

      if (maxStay && maxStay.length > 0) {
        let lastObj = maxStay[0];
        if (lastObj.operator && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...maxStay);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation maxStay");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setMaxStayIsValid(false);
        console.log("Error in Validation maxStay");
      } else {
        props.setMaxStayIsValid(true);
        // Valid
      }
    }
    /**
     * MinStay
     */
    let minStay = props.reduxState.MinStay.minStay;
    if (CriteriasList.includes("minStay")) {
      let isSingleComponentValid = true;
      if (minStay && minStay.length > 0) {
        let lastObj = minStay[0];
        if (lastObj.operator && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...minStay);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation minStay");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setMinStayIsValid(false);
        console.log("Error in Validation minStay");
      } else {
        props.setMinStayIsValid(true);

        // Valid
      }
    }
    /**
     * PassengerType
     */
    let passengerType = props.reduxState.PassengerType.passengerType;
    if (CriteriasList.includes("passengerType")) {
      let isSingleComponentValid = true;
      if (passengerType && passengerType.length > 0) {
        let lastObj = passengerType[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...passengerType);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation passengerType");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setPassengerTypeIsValid(false);
        console.log("Error in Validation PassengerType");
      } else {
        props.setPassengerTypeIsValid(true);
        // Valid
      }
    }
    /**
     * OriginalTripType
     */
    let originalTripType = props.reduxState.OriginalTripType.originalTripType;
    if (CriteriasList.includes("originalTripType")) {
      let isSingleComponentValid = true;
      if (originalTripType && originalTripType.length > 0) {
        let lastObj = originalTripType[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...originalTripType);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation originalTripType");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setOriginalTripTypeIsValid(false);
        console.log("Error in Validation originalTripType");
      } else {
        props.setOriginalTripTypeIsValid(true);
        // Valid
      }
    }
    /**
     * TourCode
     */
    let tourCode = props.reduxState.TourCode.tourCode;
    let excludeTourCode = props.reduxState.TourCode.excludeTourCode;
    if (CriteriasList.includes("tourCode")) {
      let isSingleComponentValid = true;
      if (tourCode && tourCode.length > 0) {
        let lastObj = tourCode[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...tourCode);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation tourCode");
        }
      }

      if (excludeTourCode && excludeTourCode.length > 0) {
        let lastObj = excludeTourCode[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...excludeTourCode);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeTourCode");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setTourCodeIsValid(false);
        console.log("Error in Validation tourCode");
      } else {
        props.setTourCodeIsValid(true);
        // Valid
      }
    }
    /**
     * SegmentCount
     * Exrta validation for "BETWEEN"  ,  "NOTBETWEEN"
     */
    let onwardSegmentCount = props.reduxState.SegmentCount.onwardSegmentCount;
    let returnSegmentCount = props.reduxState.SegmentCount.returnSegmentCount;
    if (CriteriasList.includes("segmentCount")) {
      let isSingleComponentValid = true;
      if (onwardSegmentCount && onwardSegmentCount.length > 0) {
        let lastObj = onwardSegmentCount[0];
        let is_to_value = false;
        if (lastObj.operator == "BETWEEN" || lastObj.operator == "NOTBETWEEN") {
          is_to_value = true;
        } else {
          is_to_value = false;
        }
        if (
          lastObj.from_value != "" &&
          lastObj.operator &&
          (is_to_value ? lastObj.to_value : true)
        ) {
          CriteriaArray.push(...onwardSegmentCount);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation onwardSegmentCount");
        }
      }

      if (returnSegmentCount && returnSegmentCount.length > 0) {
        let lastObj = returnSegmentCount[0];
        let is_to_value = false;
        if (lastObj.operator == "BETWEEN" || lastObj.operator == "NOTBETWEEN") {
          is_to_value = true;
        } else {
          is_to_value = false;
        }
        if (
          lastObj.from_value &&
          lastObj.operator &&
          (is_to_value ? lastObj.to_value : true)
        ) {
          CriteriaArray.push(...returnSegmentCount);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation returnSegmentCount");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setSegmentCountIsValid(false);
        console.log("Error in Validation SegmentCount");
      } else {
        props.setSegmentCountIsValid(true);
        // Valid
      }
    }
    /**
     * NoOfSeats
     * Exrta validation for "BETWEEN"  ,  "NOTBETWEEN"
     */
    let noOfSeats = props.reduxState.NoOfSeats.noOfSeats;
    if (CriteriasList.includes("noOfSeats")) {
      let isSingleComponentValid = true;
      if (noOfSeats && noOfSeats.length > 0) {
        let lastObj = noOfSeats[0];
        let is_to_value = false;
        if (lastObj.operator == "BETWEEN" || lastObj.operator == "NOTBETWEEN") {
          is_to_value = true;
        } else {
          is_to_value = false;
        }
        if (
          lastObj.from_value &&
          lastObj.operator &&
          (is_to_value ? lastObj.to_value : true)
        ) {
          CriteriaArray.push(...noOfSeats);
        } else {
          isSingleComponentValid = false;
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setNoOfSeatsIsValid(false);
        console.log("Error in Validation noOfSeats");
      } else {
        props.setNoOfSeatsIsValid(true);
        // Valid
      }
    }
    /**
     * NoOfStops
     * Exrta validation for "BETWEEN"  ,  "NOTBETWEEN"
     */
    let onwardNoOfStops = props.reduxState.NoOfStops.onwardNoOfStops;
    if (CriteriasList.includes("noOfStops")) {
      let isSingleComponentValid = true;

      if (onwardNoOfStops && onwardNoOfStops.length > 0) {
        let lastObj = onwardNoOfStops[0];
        let is_to_value = false;
        if (lastObj.operator == "BETWEEN" || lastObj.operator == "NOTBETWEEN") {
          is_to_value = true;
        } else {
          is_to_value = false;
        }
        if (
          lastObj.from_value &&
          lastObj.operator &&
          (is_to_value ? lastObj.to_value : true)
        ) {
          CriteriaArray.push(...onwardNoOfStops);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation noOfStops");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setNoOfStopsIsValid(false);
        console.log("Error in Validation NoOfStops");
      } else {
        props.setNoOfStopsIsValid(true);
        // Valid
      }
    }

    /**
     * BlockoutDepartureDate , Mulitple , isReturn
     */
    let onwardBlockoutDepartureDate =
      props.reduxState.BlockoutDeparture.onwardBlockoutDepartureDate;
    let returnBlockoutDepartureDate =
      props.reduxState.BlockoutDeparture.returnBlockoutDepartureDate;

    if (CriteriasList.includes("blockoutDepartureDate")) {
      let isSingleComponentValid = true;
      if (
        onwardBlockoutDepartureDate &&
        onwardBlockoutDepartureDate.length > 0
      ) {
        let lastObj =
          onwardBlockoutDepartureDate[onwardBlockoutDepartureDate.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...onwardBlockoutDepartureDate);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation onwardBlockoutDepartureDate");
        }
      }
      if (
        returnBlockoutDepartureDate &&
        returnBlockoutDepartureDate.length > 0
      ) {
        let lastObj =
          returnBlockoutDepartureDate[returnBlockoutDepartureDate.length - 1];
        if (lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...returnBlockoutDepartureDate);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation returnBlockoutDepartureDate");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setBlockedOutDepartureDateIsValid(false);
        console.log("Error in Validation BlockoutDepartureDate");
      } else {
        props.setBlockedOutDepartureDateIsValid(true);
        // Valid
      }
    }
    /**
     * ContentSourceMapping
     */
    let contentSource = props.reduxState.ContentSourceMapping.contentSource;
    let excludeContentSource =
      props.reduxState.ContentSourceMapping.excludeContentSource;
    if (CriteriasList.includes("contentSourceMapping")) {
      let isSingleComponentValid = true;
      if (contentSource && contentSource.length > 0) {
        let lastObj = contentSource[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...contentSource);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation contentSource");
        }
      }

      if (excludeContentSource && excludeContentSource.length > 0) {
        let lastObj = excludeContentSource[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...excludeContentSource);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeContentSource");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setContentSourceMappingIsValid(false);
        console.log("Error in Validation ContentSourceMapping");
      } else {
        props.setContentSourceMappingIsValid(true);
        // Valid
      }
    }
    /**
     * FareBasisCode
     * Extra validation = "NTH"
     */
    let onwardFareBasisCode =
      props.reduxState.FareBasisCode.onwardFareBasisCode;
    let excludeOnwardFareBasisCode =
      props.reduxState.FareBasisCode.excludeOnwardFareBasisCode;
    if (CriteriasList.includes("fareBasisCode")) {
      let isSingleComponentValid = true;
      if (onwardFareBasisCode && onwardFareBasisCode.length > 0) {
        let lastObj = onwardFareBasisCode[0];
        let is_to_value = false;
        if (lastObj.operator == "NTH") {
          is_to_value = true;
        } else {
          is_to_value = false;
        }
        if (
          lastObj.from_value &&
          lastObj.operator &&
          (is_to_value ? lastObj.to_value : true)
        ) {
          CriteriaArray.push(...onwardFareBasisCode);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation onwardFareBasisCode");
        }
      }

      if (excludeOnwardFareBasisCode && excludeOnwardFareBasisCode.length > 0) {
        let lastObj = excludeOnwardFareBasisCode[0];
        let is_to_value = false;
        if (lastObj.operator == "NTH") {
          is_to_value = true;
        } else {
          is_to_value = false;
        }
        if (
          lastObj.from_value &&
          lastObj.operator &&
          (is_to_value ? lastObj.to_value : true)
        ) {
          CriteriaArray.push(...excludeOnwardFareBasisCode);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOnwardFareBasisCode");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setFareBasisCodeIsValid(false);
        console.log("Error in Validation FareBasisCode");
      } else {
        props.setFareBasisCodeIsValid(true);
        // Valid
      }
    }
    /**
     * BookingClass , isReturn
     */
    let onwardBookingClass = props.reduxState.BookingClass.onwardBookingClass;
    let excludeOnwardBookingClass =
      props.reduxState.BookingClass.excludeOnwardBookingClass;
    let returnBookingClass = props.reduxState.BookingClass.returnBookingClass;
    let excludeReturnBookingClass =
      props.reduxState.BookingClass.excludeReturnBookingClass;
    if (CriteriasList.includes("bookingClass")) {
      let isSingleComponentValid = true;

      if (onwardBookingClass && onwardBookingClass.length > 0) {
        let lastObj = onwardBookingClass[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...onwardBookingClass);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation onwardBookingClass");
        }
      }

      if (excludeOnwardBookingClass && excludeOnwardBookingClass.length > 0) {
        let lastObj = excludeOnwardBookingClass[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...excludeOnwardBookingClass);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOnwardBookingClass");
        }
      }

      if (returnBookingClass && returnBookingClass.length > 0) {
        let lastObj = returnBookingClass[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...returnBookingClass);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation returnBookingClass");
        }
      }

      if (excludeReturnBookingClass && excludeReturnBookingClass.length > 0) {
        let lastObj = excludeReturnBookingClass[0];
        if (lastObj.from_value) {
          CriteriaArray.push(...excludeReturnBookingClass);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeReturnBookingClass");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        console.log("Error in Validation BookingClass");
        props.setBookingClassIsValid(false);
      } else {
        // Valid
        props.setBookingClassIsValid(true);
      }
    }
    /**
     * StopOver
     */
    let stopOverGroup = props.reduxState.StopOver.stopOverGroup;
    let stopOverCountry = props.reduxState.StopOver.stopOverCountry;
    let stopOverAirport = props.reduxState.StopOver.stopOverAirport;
    let excludeStopOverGroup = props.reduxState.StopOver.excludeStopOverGroup;
    let excludeStopOverCountry =
      props.reduxState.StopOver.excludeStopOverCountry;
    let excludeStopOverAirport =
      props.reduxState.StopOver.excludeStopOverAirport;
    if (CriteriasList.includes("stopOver")) {
      let isSingleComponentValid = true;
      if (stopOverGroup && stopOverGroup.length > 0) {
        let lastObj = stopOverGroup[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...stopOverGroup);
        } else {
          // console.log("Error in Validation stopOverGroup");
          isSingleComponentValid = false;
        }
      }
      if (stopOverCountry && stopOverCountry.length > 0) {
        let lastObj = stopOverCountry[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...stopOverCountry);
        } else {
          // console.log("Error in Validation stopOverCountry");
          isSingleComponentValid = false;
        }
      }
      if (stopOverAirport && stopOverAirport.length > 0) {
        let lastObj = stopOverAirport[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...stopOverAirport);
        } else {
          // console.log("Error in Validation stopOverAirport");
          isSingleComponentValid = false;
        }
      }
      if (excludeStopOverGroup && excludeStopOverGroup.length > 0) {
        let lastObj = excludeStopOverGroup[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeStopOverGroup);
        } else {
          // console.log("Error in Validation excludeStopOverGroup");
          isSingleComponentValid = false;
        }
      }
      if (excludeStopOverCountry && excludeStopOverCountry.length > 0) {
        let lastObj = excludeStopOverCountry[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeStopOverCountry);
        } else {
          // console.log("Error in Validation excludeStopOverCountry");
          isSingleComponentValid = false;
        }
      }
      if (excludeStopOverAirport && excludeStopOverAirport.length > 0) {
        let lastObj = excludeStopOverAirport[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeStopOverAirport);
        } else {
          // console.log("Error in Validation excludeStopOverAirport");
          isSingleComponentValid = false;
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setStopOverIsValid(false);
        console.log("Error in Validation StopOver");
      } else {
        props.setStopOverIsValid(true);
        // Valid
      }
    }
    /**
     * Origin
     */
    let originGroup = props.reduxState.Origin.originGroup;
    let originCountry = props.reduxState.Origin.originCountry;
    let originAirport = props.reduxState.Origin.originAirport;
    let excludeOriginGroup = props.reduxState.Origin.excludeOriginGroup;
    let excludeOriginCountry = props.reduxState.Origin.excludeOriginCountry;
    let excludeOriginAirport = props.reduxState.Origin.excludeOriginAirport;
    if (CriteriasList.includes("origin")) {
      let isSingleComponentValid = true;
      if (originGroup && originGroup.length > 0) {
        let lastObj = originGroup[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...originGroup);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation originGroup");
        }
      }
      if (originCountry && originCountry.length > 0) {
        let lastObj = originCountry[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...originCountry);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation originCountry");
        }
      }
      if (originAirport && originAirport.length > 0) {
        let lastObj = originAirport[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...originAirport);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation originAirport");
        }
      }
      if (excludeOriginGroup && excludeOriginGroup.length > 0) {
        let lastObj = excludeOriginGroup[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeOriginGroup);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOriginGroup");
        }
      }
      if (excludeOriginCountry && excludeOriginCountry.length > 0) {
        let lastObj = excludeOriginCountry[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeOriginCountry);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOriginCountry");
        }
      }
      if (excludeOriginAirport && excludeOriginAirport.length > 0) {
        let lastObj = excludeOriginAirport[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeOriginAirport);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOriginAirport");
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setOriginIsValid(false);
        console.log("Error in Validation Origin");
      } else {
        props.setOriginIsValid(true);
        // Valid
      }
    }
    /**
     * Destination
     */
    let destinationGroup = props.reduxState.Destination.destinationGroup;
    let destinationCountry = props.reduxState.Destination.destinationCountry;
    let destinationAirport = props.reduxState.Destination.destinationAirport;
    let excludeDestinationGroup =
      props.reduxState.Destination.excludeDestinationGroup;
    let excludeDestinationCountry =
      props.reduxState.Destination.excludeDestinationCountry;
    let excludeDestinationAirport =
      props.reduxState.Destination.excludeDestinationAirport;

    if (CriteriasList.includes("destination")) {
      let isSingleComponentValid = true;
      if (destinationGroup && destinationGroup.length > 0) {
        let lastObj = destinationGroup[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...destinationGroup);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation destinationGroup");
        }
      }
      if (destinationCountry && destinationCountry.length > 0) {
        let lastObj = destinationCountry[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...destinationCountry);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation destinationCountry");
        }
      }
      if (destinationAirport && destinationAirport.length > 0) {
        let lastObj = destinationAirport[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...destinationAirport);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation destinationAirport");
        }
      }
      if (excludeDestinationGroup && excludeDestinationGroup.length > 0) {
        let lastObj = excludeDestinationGroup[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeDestinationGroup);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeDestinationGroup");
        }
      }
      if (excludeDestinationCountry && excludeDestinationCountry.length > 0) {
        let lastObj = excludeDestinationCountry[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeDestinationCountry);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeDestinationCountry");
        }
      }
      if (excludeDestinationAirport && excludeDestinationAirport.length > 0) {
        let lastObj = excludeDestinationAirport[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeDestinationAirport);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeDestinationAirport");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setDestinationIsValid(false);
        console.log("Error in Validation Destination");
      } else {
        props.setDestinationIsValid(true);
        // Valid
      }
    }

    /**
     * OperatingAirline
     */
    let onwardOperatingAirline =
      props.reduxState.OperatingAirline.onwardOperatingAirline;
    let excludeOnwardOperatingAirline =
      props.reduxState.OperatingAirline.excludeOnwardOperatingAirline;
    let returnOperatingAirline =
      props.reduxState.OperatingAirline.returnOperatingAirline;
    let excludeReturnOperatingAirline =
      props.reduxState.OperatingAirline.excludeReturnOperatingAirline;
    if (CriteriasList.includes("operatingAirline")) {
      let isSingleComponentValid = true;
      if (onwardOperatingAirline && onwardOperatingAirline.length > 0) {
        let lastObj = onwardOperatingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...onwardOperatingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation onwardOperatingAirline");
        }
      }

      if (
        excludeOnwardOperatingAirline &&
        excludeOnwardOperatingAirline.length > 0
      ) {
        let lastObj = excludeOnwardOperatingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeOnwardOperatingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOnwardOperatingAirline");
        }
      }

      if (returnOperatingAirline && returnOperatingAirline.length > 0) {
        let lastObj = returnOperatingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...returnOperatingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation returnOperatingAirline");
        }
      }

      if (
        excludeReturnOperatingAirline &&
        excludeReturnOperatingAirline.length > 0
      ) {
        let lastObj = excludeReturnOperatingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeReturnOperatingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeReturnOperatingAirline");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setOperatingAirlineIsValid(false);
        console.log("Error in Validation OperatingAirline");
      } else {
        props.setOperatingAirlineIsValid(true);
        // Valid
      }
    }
    /**
     * MarketingAirline
     */
    let onwardMarketingAirline =
      props.reduxState.MarketingAirline.onwardMarketingAirline;
    let excludeOnwardMarketingAirline =
      props.reduxState.MarketingAirline.excludeOnwardMarketingAirline;
    let returnMarketingAirline =
      props.reduxState.MarketingAirline.returnMarketingAirline;
    let excludeReturnMarketingAirline =
      props.reduxState.MarketingAirline.excludeReturnMarketingAirline;
    if (CriteriasList.includes("marketingAirline")) {
      let isSingleComponentValid = true;
      if (onwardMarketingAirline && onwardMarketingAirline.length > 0) {
        let lastObj = onwardMarketingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...onwardMarketingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation onwardMarketingAirline");
        }
      }

      if (
        excludeOnwardMarketingAirline &&
        excludeOnwardMarketingAirline.length > 0
      ) {
        let lastObj = excludeOnwardMarketingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeOnwardMarketingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOnwardMarketingAirline");
        }
      }

      if (returnMarketingAirline && returnMarketingAirline.length > 0) {
        let lastObj = returnMarketingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...returnMarketingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation returnMarketingAirline");
        }
      }

      if (
        excludeReturnMarketingAirline &&
        excludeReturnMarketingAirline.length > 0
      ) {
        let lastObj = excludeReturnMarketingAirline[0];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...excludeReturnMarketingAirline);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeReturnMarketingAirline");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setMarketingAirlineIsValid(false);
        console.log("Error in Validation MarketingAirline");
      } else {
        props.setMarketingAirlineIsValid(true);
        // Valid
      }
    }
    /**
     * FlightNumber , Mulitple
     */
    let onwardFlightNumber = props.reduxState.FlightNumber.onwardFlightNumber;
    let excludeOnwardFlightNumber =
      props.reduxState.FlightNumber.excludeOnwardFlightNumber;

    if (CriteriasList.includes("flightNumber")) {
      let isSingleComponentValid = true;
      if (onwardFlightNumber && onwardFlightNumber.length > 0) {
        let lastObj = onwardFlightNumber[onwardFlightNumber.length - 1];
        if (
          lastObj &&
          lastObj.from_value &&
          lastObj.operator &&
          lastObj.to_value
        ) {
          CriteriaArray.push(...onwardFlightNumber);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation onwardFlightNumber");
        }
      }

      if (excludeOnwardFlightNumber && excludeOnwardFlightNumber.length > 0) {
        let lastObj =
          excludeOnwardFlightNumber[excludeOnwardFlightNumber.length - 1];
        if (
          lastObj &&
          lastObj.from_value &&
          lastObj.operator &&
          lastObj.to_value
        ) {
          CriteriaArray.push(...excludeOnwardFlightNumber);
        } else {
          isSingleComponentValid = false;
          // console.log("Error in Validation excludeOnwardFlightNumber");
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setFlightNumberIsValid(false);
        console.log("Error in Validation FlightNumber");
      } else {
        props.setFlightNumberIsValid(true);
        // Valid
      }
    }
    /**
     * ArrivalDayScheduler , Mulitple , isReturn
     */
    let onwardArrivalTime =
      props.reduxState.ArrivalDayScheduler.onwardArrivalTime;
    let onwardArrivalMonth =
      props.reduxState.ArrivalDayScheduler.onwardArrivalMonth;
    let arrivalSchedulerType =
      props.reduxState.ArrivalDayScheduler.arrivalSchedulerType;
    let onwardArrivalDay =
      props.reduxState.ArrivalDayScheduler.onwardArrivalDay;
    let onwardArrivalWeek =
      props.reduxState.ArrivalDayScheduler.onwardArrivalWeek;
    let returnArrivalTime =
      props.reduxState.ArrivalDayScheduler.returnArrivalTime;
    let returnArrivalMonth =
      props.reduxState.ArrivalDayScheduler.returnArrivalMonth;
    let returnArrivalSchedulerType =
      props.reduxState.ArrivalDayScheduler.returnArrivalSchedulerType;
    let returnArrivalWeek =
      props.reduxState.ArrivalDayScheduler.returnArrivalWeek;
    let returnArrivalDay =
      props.reduxState.ArrivalDayScheduler.returnArrivalDay;
    if (CriteriasList.includes("arrivalDayScheduler")) {
      let isSingleComponentValid = true;
      if (onwardArrivalTime && onwardArrivalTime.length > 0) {
        let lastObj = onwardArrivalTime[onwardArrivalTime.length - 1];
        if (lastObj && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...onwardArrivalTime);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (onwardArrivalMonth && onwardArrivalMonth.length > 0) {
        let lastObj = onwardArrivalMonth[onwardArrivalMonth.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...onwardArrivalMonth);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (arrivalSchedulerType && arrivalSchedulerType.length > 0) {
        let lastObj = arrivalSchedulerType[arrivalSchedulerType.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...arrivalSchedulerType);
          if (lastObj.from_value == "dates") {
            // onwardArrivalDay
            if (onwardArrivalDay && onwardArrivalDay.length > 0) {
              let lastObjOnwardArrivalDay =
                onwardArrivalDay[onwardArrivalDay.length - 1];
              if (
                lastObjOnwardArrivalDay &&
                lastObjOnwardArrivalDay.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...onwardArrivalDay);
              }
            } else {
              isSingleComponentValid = false;
            }
          } else {
            // onwardArrivalWeek
            if (onwardArrivalWeek && onwardArrivalWeek.length > 0) {
              let lastObjOnwardArrivalWeek =
                onwardArrivalWeek[onwardArrivalWeek.length - 1];
              if (
                lastObjOnwardArrivalWeek &&
                lastObjOnwardArrivalWeek.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...onwardArrivalWeek);
              } else {
                isSingleComponentValid = false;
              }
            }
          }
        } else {
          isSingleComponentValid = false;
        }
      }

      if (returnArrivalTime && returnArrivalTime.length > 0) {
        let lastObj = returnArrivalTime[returnArrivalTime.length - 1];
        if (lastObj && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...returnArrivalTime);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (returnArrivalMonth && returnArrivalMonth.length > 0) {
        let lastObj = returnArrivalMonth[returnArrivalMonth.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...returnArrivalMonth);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (returnArrivalSchedulerType && returnArrivalSchedulerType.length > 0) {
        let lastObj =
          returnArrivalSchedulerType[returnArrivalSchedulerType.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...returnArrivalSchedulerType);
          if (lastObj.from_value != "dates") {
            // onwardArrivalDay
            if (returnArrivalWeek && returnArrivalWeek.length > 0) {
              let lastObjReturnArrivalWeek =
                returnArrivalWeek[returnArrivalWeek.length - 1];
              if (
                lastObjReturnArrivalWeek &&
                lastObjReturnArrivalWeek.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...returnArrivalWeek);
              }
            } else {
              isSingleComponentValid = false;
            }
          } else {
            // onwardArrivalWeek
            if (returnArrivalDay && returnArrivalDay.length > 0) {
              let lastObjReturnArrivalDay =
                returnArrivalDay[returnArrivalDay.length - 1];
              if (
                lastObjReturnArrivalDay &&
                lastObjReturnArrivalDay.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...returnArrivalDay);
              } else {
                isSingleComponentValid = false;
              }
            }
          }
        } else {
          isSingleComponentValid = false;
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setArrivalDaySchedulerIsValid(false);
        console.log("Error in Validation Arrival Day Scheduler");
      } else {
        props.setArrivalDaySchedulerIsValid(true);
        // Valid
      }
    }
    /**
     * DepartureDaySchedular , Mulitple , isReturn
     */
    let onwardDepartureTime =
      props.reduxState.DepartureDaySchedular.onwardDepartureTime;
    let onwardDepartureMonth =
      props.reduxState.DepartureDaySchedular.onwardDepartureMonth;
    let onwardDepartureDay =
      props.reduxState.DepartureDaySchedular.onwardDepartureDay;
    let onwardDepartureWeek =
      props.reduxState.DepartureDaySchedular.onwardDepartureWeek;
    let departureSchedulerType =
      props.reduxState.DepartureDaySchedular.arrivalSchedulerType;

    let returnDepartureTime =
      props.reduxState.DepartureDaySchedular.returnDepartureTime;
    let returnDepartureMonth =
      props.reduxState.DepartureDaySchedular.returnDepartureMonth;
    let returnDepartureSchedulerType =
      props.reduxState.DepartureDaySchedular.returnDepartureSchedulerType;
    let returnDepartureWeek =
      props.reduxState.DepartureDaySchedular.returnDepartureWeek;
    let returnDepartureDay =
      props.reduxState.DepartureDaySchedular.returnDepartureDay;

    if (CriteriasList.includes("departureDayScheduler")) {
      let isSingleComponentValid = true;
      if (onwardDepartureTime && onwardDepartureTime.length > 0) {
        let lastObj = onwardDepartureTime[onwardDepartureTime.length - 1];
        if (lastObj && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...onwardDepartureTime);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (onwardDepartureMonth && onwardDepartureMonth.length > 0) {
        let lastObj = onwardDepartureMonth[onwardDepartureMonth.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...onwardDepartureMonth);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (departureSchedulerType && departureSchedulerType.length > 0) {
        let lastObj = departureSchedulerType[departureSchedulerType.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...departureSchedulerType);
          if (lastObj.from_value == "dates") {
            // onwardArrivalDay
            if (onwardDepartureDay && onwardDepartureDay.length > 0) {
              let lastObjOnwardDepartureDay =
                onwardDepartureDay[onwardDepartureDay.length - 1];
              if (
                lastObjOnwardDepartureDay &&
                lastObjOnwardDepartureDay.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...onwardDepartureDay);
              }
            } else {
              isSingleComponentValid = false;
            }
          } else {
            // onwardArrivalWeek
            if (onwardDepartureWeek && onwardDepartureWeek.length > 0) {
              let lastObjOnwardDepartureWeek =
                onwardDepartureWeek[onwardDepartureWeek.length - 1];
              if (
                lastObjOnwardDepartureWeek &&
                lastObjOnwardDepartureWeek.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...onwardDepartureWeek);
              } else {
                isSingleComponentValid = false;
              }
            }
          }
        } else {
          isSingleComponentValid = false;
        }
      }

      if (returnDepartureTime && returnDepartureTime.length > 0) {
        let lastObj = returnDepartureTime[returnDepartureTime.length - 1];
        if (lastObj && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...returnDepartureTime);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (returnDepartureMonth && returnDepartureMonth.length > 0) {
        let lastObj = returnDepartureMonth[returnDepartureMonth.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...returnDepartureMonth);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (
        returnDepartureSchedulerType &&
        returnDepartureSchedulerType.length > 0
      ) {
        let lastObj =
          returnDepartureSchedulerType[returnDepartureSchedulerType.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...returnDepartureSchedulerType);
          if (lastObj.from_value != "dates") {
            // onwardArrivalDay
            if (returnDepartureWeek && returnDepartureWeek.length > 0) {
              let lastObjReturnDepartureWeek =
                returnDepartureWeek[returnDepartureWeek.length - 1];
              if (
                lastObjReturnDepartureWeek &&
                lastObjReturnDepartureWeek.from_value.split(",").length > 1
              ) {
                CriteriaArray.push(...returnDepartureWeek);
              }
            } else {
              isSingleComponentValid = false;
            }
          } else {
            // onwardArrivalWeek
            if (returnDepartureDay && returnDepartureDay.length > 0) {
              let lastObjreturnDepartureDay =
                returnDepartureDay[returnDepartureDay.length - 1];
              if (
                lastObjreturnDepartureDay &&
                lastObjreturnDepartureDay.from_value.split(",").length > 1
              ) {
                CriteriaArray.push(...returnDepartureDay);
              } else {
                isSingleComponentValid = false;
              }
            }
          }
        } else {
          isSingleComponentValid = false;
        }
      }
      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setDepartureDaySchedulerIsValid(false);
        console.log("Error in Validation Departure Day Scheduler");
      } else {
        props.setDepartureDaySchedulerIsValid(true);
        // Valid
      }
    }
    /**
     * BookingDaySchedular , Mulitple
     */
    let bookingTime = props.reduxState.BookingDaySchedular.bookingTime;
    let bookingMonth = props.reduxState.BookingDaySchedular.bookingMonth;
    let schedulerType = props.reduxState.BookingDaySchedular.schedulerType;
    let bookingDay = props.reduxState.BookingDaySchedular.bookingDay;
    let bookingWeek = props.reduxState.BookingDaySchedular.bookingWeek;
    if (CriteriasList.includes("bookingDayScheduler")) {
      let isSingleComponentValid = true;
      if (bookingTime && bookingTime.length > 0) {
        let lastObj = bookingTime[onwardArrivalTime.length - 1];
        if (lastObj && lastObj.from_value && lastObj.to_value) {
          CriteriaArray.push(...bookingTime);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (bookingMonth && bookingMonth.length > 0) {
        let lastObj = bookingMonth[bookingMonth.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...bookingMonth);
        } else {
          isSingleComponentValid = false;
        }
      }

      if (schedulerType && schedulerType.length > 0) {
        let lastObj = schedulerType[schedulerType.length - 1];
        if (lastObj && lastObj.from_value) {
          CriteriaArray.push(...schedulerType);
          if (lastObj.from_value == "dates") {
            // onwardArrivalDay
            if (bookingDay && bookingDay.length > 0) {
              let lastObjBookingDay = bookingDay[bookingDay.length - 1];
              if (
                lastObjBookingDay &&
                lastObjBookingDay.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...bookingDay);
              }
            } else {
              isSingleComponentValid = false;
            }
          } else {
            // onwardArrivalWeek
            if (bookingWeek && bookingWeek.length > 0) {
              let lastObjBookingWeek = bookingWeek[bookingWeek.length - 1];
              if (
                lastObjBookingWeek &&
                lastObjBookingWeek.from_value.split(",").length > 2
              ) {
                CriteriaArray.push(...bookingWeek);
              } else {
                isSingleComponentValid = false;
              }
            }
          }
        } else {
          isSingleComponentValid = false;
        }
      }

      ValidArray.push(isSingleComponentValid);
      if (!isSingleComponentValid) {
        props.setBookingDaySchedulerIsValid(false);
        console.log("Error in Validation Booking Day Schedular");
      } else {
        props.setBookingDaySchedulerIsValid(true);
        // Valid
      }
    }
    // props.reduxState.BookingDaySchedular

    // DepartureDaySchedular;

    // console.log(ValidArray);
    console.log(ValidArray.filter(obj => obj == false).length);
    // console.log(
    //   "Value : ",
    //   props.reduxState.FlightNumber.onwardFlightNumber,
    //   props.reduxState.FlightNumber.excludeOnwardFlightNumber
    // );
    // operator: "";
    // from_value: 0;
    // to_value
    let tmpObj = [...CriteriaArray];

    if (ValidArray.filter(obj => obj == false).length == 0) {
      let payload = {
        criteria: tmpObj
      };

      if (props.isEdit) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        payload.id = id;
      }

      await axios
        .post("https://newb2b.uat5.tltid.com/api/postCriteriasJson", payload)
        .then(function(response) {
          if (response.data.status === "Success") {
            alert("SuccessFully Inserted :" + response.data.id);
          }
        })
        .catch(function(error) {});
    }
  };

  const DataLoading = () => {
    var reduxSet = [];
    if (tmpReduxState) {
      Object.keys(tmpReduxState).forEach(function(key, index) {
        reduxSet.push(
          <DataLoader
            index={index}
            key={index}
            heading={key}
            jsonVal={tmpReduxState[key]}
          />
        );
      });
    } else {
      reduxSet = null;
    }

    return reduxSet;
  };

  return (
    <div className="card mt-2">
      <div className="card-header">
        <h2>Main Button</h2>
      </div>
      <div className="card-body">
        <input
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => btnFn()}
          name="mainBtn"
          value={props.isEdit ? "Edit" : "Save"}
        />
        {/* <textarea
          cols="30"
          readOnly={true}
          style={{ width: "100%", outline: "none" }}
          rows="10"
          value={JSON.stringify(jsonVal, undefined, 4)}
        ></textarea>
        <br />
        {DataLoading()} */}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    defaultCriteriasList: state.Criteria.defaultCriteriasList,
    selectedOptionalCriteriasList: state.Criteria.selectedOptionalCriteriasList,
    isEdit: state.EditDetails.isEdit,
    reduxState: {
      ArrivalDate: state.ArrivalDate,
      MaxStay: state.MaxStay,
      MinStay: state.MinStay,
      NoOfSeats: state.NoOfSeats,
      NoOfStops: state.NoOfStops,
      PassengerType: state.PassengerType,
      BookingClass: state.BookingClass,
      SegmentCount: state.SegmentCount,
      BlockoutDepartue: state.BlockoutDepartue,
      BookingPeriod: state.BookingPeriod,
      DepartureDate: state.DepartureDate,
      TicketingDate: state.TicketingDate,
      Origin: state.Origin,
      Destination: state.Destination,
      FlightNumber: state.FlightNumber,
      MarketingAirline: state.MarketingAirline,
      OperatingAirline: state.OperatingAirline,
      FareBasisCode: state.FareBasisCode,
      TripType: state.TripType,
      TourCode: state.TourCode,
      OriginalTripType: state.OriginalTripType,
      FareRange: state.FareRange,
      DaysToDeparture: state.DaysToDeparture,
      ArrivalDayScheduler: state.ArrivalDayScheduler,
      DepartureDaySchedular: state.DepartureDaySchedular,
      BookingDaySchedular: state.BookingDaySchedular,
      BlockoutDeparture: state.BlockoutDepartue,
      ContentSourceMapping: state.ContentSourceMapping,
      StopOver: state.StopOver
    }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setArivalIsValid, //working
      setBlockedOutDepartureDateIsValid, //have to do
      setBookingClassIsValid, //working
      setBookingPeriodIsValid, //working
      setContentSourceMappingIsValid, //working
      setDaysToDepartureIsValid, //working
      setDepartureDateIsValid, //working
      setDestinationIsValid, //working
      setFareBasisCodeIsValid, //working
      setFareRangeIsValid, //working
      setFlightNumberIsValid, //working
      setMarketingAirlineIsValid, //working
      setMaxStayIsValid, //working
      setMinStayIsValid, //working
      setNoOfSeatsIsValid, //working
      setNoOfStopsIsValid, //working
      setOperatingAirlineIsValid, //working
      setOriginIsValid, //working
      setOriginalTripTypeIsValid, //working
      setPassengerTypeIsValid, //working
      setTourCodeIsValid, //working
      setTripTypeIsValid, //working
      setTicketingDateIsValid, //working
      setStopOverIsValid, //working
      setSegmentCountIsValid, //working
      setArrivalDaySchedulerIsValid, //working
      setBookingDaySchedulerIsValid, //working
      setDepartureDaySchedulerIsValid //working
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainButton);
