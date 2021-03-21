import React, { useState } from "react";

import DataLoader from "./DataLoader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";

const MainButton = props => {
  const [tmpReduxState, setTmpReduxState] = useState(null);
  const [jsonVal, setJsonVal] = useState({});
  const btnFn = async () => {
    setTmpReduxState({ ...props.reduxState });

    console.log(props.reduxState.ArrivalDate.onwardArrivalDate);
    console.log(props.reduxState.ArrivalDate.returnArrivalDate);

    // let tmpObj = [

    //   ...props.reduxState.ArrivalDate.onwardArrivalDate,
    //   ...props.reduxState.ArrivalDate.returnArrivalDate,

    //   ...props.reduxState.BookingPeriod.bookingPeriod,

    //   ...props.reduxState.ArrivalDayScheduler.onwardArrivalTime,
    //   ...props.reduxState.ArrivalDayScheduler.onwardArrivalMonth,
    //   ...props.reduxState.ArrivalDayScheduler.arrivalSchedulerType,
    //   ...props.reduxState.ArrivalDayScheduler.onwardArrivalDay,
    //   ...props.reduxState.ArrivalDayScheduler.onwardArrivalWeek,
    //   ...props.reduxState.ArrivalDayScheduler.returnArrivalTime,
    //   ...props.reduxState.ArrivalDayScheduler.returnArrivalMonth,
    //   ...props.reduxState.ArrivalDayScheduler.returnArrivalSchedulerType,
    //   ...props.reduxState.ArrivalDayScheduler.returnArrivalWeek,
    //   ...props.reduxState.ArrivalDayScheduler.returnArrivalDay,

    //   ...props.reduxState.BlockoutDeparture.onwardBlockoutDepartureDate,
    //   ...props.reduxState.BlockoutDeparture.returnBlockoutDepartureDate,

    //   ...props.reduxState.BookingClass.onwardBookingClass,
    //   ...props.reduxState.BookingClass.excludeOnwardBookingClass,
    //   ...props.reduxState.BookingClass.returnBookingClass,
    //   ...props.reduxState.BookingClass.excludeReturnBookingClass,

    //   ...props.reduxState.BookingDaySchedular.bookingTime,
    //   ...props.reduxState.BookingDaySchedular.bookingMonth,
    //   ...props.reduxState.BookingDaySchedular.schedulerType,
    //   ...props.reduxState.BookingDaySchedular.bookingDay,
    //   ...props.reduxState.BookingDaySchedular.bookingWeek,

    //   ...props.reduxState.ContentSourceMapping.contentSource,
    //   ...props.reduxState.ContentSourceMapping.excludeContentSource,

    //   ...props.reduxState.DaysToDeparture.daysToDeparture,

    //   ...props.reduxState.DepartureDate.onwardBlockoutDepartureDate,
    //   ...props.reduxState.DepartureDate.returnBlockoutDepartureDate,

    //   ...props.reduxState.DepartureDaySchedular.onwardDepartureTime,
    //   ...props.reduxState.DepartureDaySchedular.onwardDepartureMonth,
    //   ...props.reduxState.DepartureDaySchedular.arrivalSchedulerType,
    //   ...props.reduxState.DepartureDaySchedular.onwardDepartureDay,
    //   ...props.reduxState.DepartureDaySchedular.onwardDepartureWeek,
    //   ...props.reduxState.DepartureDaySchedular.returnDepartureTime,
    //   ...props.reduxState.DepartureDaySchedular.returnDepartureMonth,
    //   ...props.reduxState.DepartureDaySchedular.returnDepartureSchedulerType,
    //   ...props.reduxState.DepartureDaySchedular.returnDepartureWeek,
    //   ...props.reduxState.DepartureDaySchedular.returnDepartureDay,

    //   ...props.reduxState.Destination.destinationGroup,
    //   ...props.reduxState.Destination.destinationCountry,
    //   ...props.reduxState.Destination.destinationAirport,
    //   ...props.reduxState.Destination.excludeDestinationGroup,
    //   ...props.reduxState.Destination.excludeDestinationCountry,
    //   ...props.reduxState.Destination.excludeDestinationAirport,

    //   ...props.reduxState.FareBasisCode.onwardFareBasisCode,
    //   ...props.reduxState.FareBasisCode.excludeOnwardFareBasisCode,

    //   ...props.reduxState.FlightNumber.onwardFlightNumber,
    //   ...props.reduxState.FlightNumber.excludeOnwardFlightNumber,
    //   ...props.reduxState.FlightNumber.returnFlightNumber,
    //   ...props.reduxState.FlightNumber.excludeReturnFlightNumber,

    //   ...props.reduxState.FareRange.fareRange,

    //   ...props.reduxState.MarketingAirline.onwardMarketingAirline,
    //   ...props.reduxState.MarketingAirline.excludeOnwardMarketingAirline,
    //   ...props.reduxState.MarketingAirline.returnMarketingAirline,
    //   ...props.reduxState.MarketingAirline.excludeReturnMarketingAirline,

    //   ...props.reduxState.MaxStay.maxStay,
    //   ...props.reduxState.MinStay.minStay,

    //   ...props.reduxState.NoOfSeats.noOfSeats,

    //   ...props.reduxState.NoOfStops.onwardNoOfStops,

    //   ...props.reduxState.OperatingAirline.onwardOperatingAirline,
    //   ...props.reduxState.OperatingAirline.excludeOnwardOperatingAirline,
    //   ...props.reduxState.OperatingAirline.returnOperatingAirline,
    //   ...props.reduxState.OperatingAirline.excludeReturnOperatingAirline,

    //   ...props.reduxState.OriginalTripType.originalTripType,

    //   ...props.reduxState.Origin.originGroup,
    //   ...props.reduxState.Origin.originCountry,
    //   ...props.reduxState.Origin.originAirport,
    //   ...props.reduxState.Origin.excludeOriginGroup,
    //   ...props.reduxState.Origin.excludeOriginCountry,
    //   ...props.reduxState.Origin.excludeOriginAirport,

    //   ...props.reduxState.PassengerType.passengerType,

    //   ...props.reduxState.SegmentCount.onwardSegmentCount,
    //   ...props.reduxState.SegmentCount.returnSegmentCount,

    //   ...props.reduxState.StopOver.stopOverGroup,
    //   ...props.reduxState.StopOver.stopOverCountry,
    //   ...props.reduxState.StopOver.stopOverAirport,
    //   ...props.reduxState.StopOver.excludeStopOverGroup,
    //   ...props.reduxState.StopOver.excludeStopOverCountry,
    //   ...props.reduxState.StopOver.excludeStopOverAirport,

    //   ...props.reduxState.TicketingDate.ticketingDate,

    //   ...props.reduxState.TourCode.tourCode,
    //   ...props.reduxState.TourCode.excludeTourCode,

    //   ...props.reduxState.TripType.tripType
    // ];

    // const filteredObj = tmpObj.filter(obj => obj);

    // setJsonVal(filteredObj);

    // await axios
    //   .post("https://newb2b.uat5.tltid.com/api/postCriteriasJson", {
    //     criteria: filteredObj
    //   })
    //   .then(function(response) {
    //     if (response.data.status === "Success") {
    //       alert("SuccessFully Inserted");
    //     }
    //   })
    //   .catch(function(error) {});
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
          value="Save"
        />
        <textarea
          cols="30"
          readOnly={true}
          style={{ width: "100%", outline: "none" }}
          rows="10"
          value={JSON.stringify(jsonVal, undefined, 4)}
        ></textarea>
        <br />
        {DataLoading()}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    defaultCriteriasList: state.Criteria.defaultCriteriasList,
    selectedOptionalCriteriasList: state.Criteria.defaultCriteriasList,
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

export default connect(mapStateToProps, null)(MainButton);
