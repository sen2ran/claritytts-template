import React from "react";

import ArrivalDate from "./Criterias/ArrivalDate";
import ArrivalDayScheduler from "./Criterias/ArrivalDayScheduler";
import BlockedDepartureDate from "./Criterias/BlockedDepartureDate";
import BlockoutArrivalDate from "./Criterias/BlockoutArrivalDate";
import BlockoutDepartureDate from "./Criterias/BlockoutDepartureDate";
import BookingBlockoutDate from "./Criterias/BookingBlockoutDate";
import BookingClass from "./Criterias/BookingClass";
import BookingDayScheduler from "./Criterias/BookingDayScheduler";
import BookingPeriod from "./Criterias/BookingPeriod";
import ContentSourceMapping from "./Criterias/ContentSourceMapping";
import DaysToDeparture from "./Criterias/DaysToDeparture";
import DepartureDate from "./Criterias/DepartureDate";
import DepartureDayScheduler from "./Criterias/DepartureDayScheduler";
import Destination from "./Criterias/Destination";
import FareBasisCode from "./Criterias/FareBasisCode";
import FlightNumber from "./Criterias/FlightNumber";
import MarketingAirline from "./Criterias/MarketingAirline";
import MaxStay from "./Criterias/MaxStay";
import MinStay from "./Criterias/MinStay";
import NoOfSeats from "./Criterias/NoOfSeats";
import NoOfStops from "./Criterias/NoOfStops";
import OperatingAirline from "./Criterias/OperatingAirline";
import Origin from "./Criterias/Origin";
import OriginalTripType from "./Criterias/OriginalTripType";
import PassengerType from "./Criterias/PassengerType";
import SegmentCount from "./Criterias/SegmentCount";
import StopOver from "./Criterias/StopOver";
import TicketingDate from "./Criterias/TicketingDate";
import TourCode from "./Criterias/TourCode";
import TripType from "./Criterias/TripType";
import ValidatingAirline from "./Criterias/ValidatingAirline";
import FareRange from './Criterias/FareRange'

const CriteriaLoader = (props) => {
  const ComponentArrray = [
    { id: "arrivalDate", Component: ArrivalDate },
    { id: "arrivalDayScheduler", Component: ArrivalDayScheduler },
    { id: "blockedDepartureDate", Component: BlockedDepartureDate },
    { id: "blockoutArrivalDate", Component: BlockoutArrivalDate },
    { id: "blockoutDepartureDate", Component: BlockoutDepartureDate },
    { id: "bookingBlockoutDate", Component: BookingBlockoutDate },
    { id: "bookingClass", Component: BookingClass },
    { id: "bookingDayScheduler", Component: BookingDayScheduler },
    { id: "bookingPeriod", Component: BookingPeriod },
    { id: "contentSourceMapping", Component: ContentSourceMapping },
    { id: "daysToDeparture", Component: DaysToDeparture },
    { id: "departureDate", Component: DepartureDate },
    { id: "departureDayScheduler", Component: DepartureDayScheduler },
    { id: "destination", Component: Destination },
    { id: "fareBasisCode", Component: FareBasisCode },
    { id: "fareRange", Component: FareRange },
    { id: "flightNumber", Component: FlightNumber },
    { id: "marketingAirline", Component: MarketingAirline },
    { id: "maxStay", Component: MaxStay },
    { id: "minStay", Component: MinStay },
    { id: "noOfSeats", Component: NoOfSeats },
    { id: "noOfStops", Component: NoOfStops },
    { id: "operatingAirline", Component: OperatingAirline },
    { id: "origin", Component: Origin },
    { id: "originalTripType", Component: OriginalTripType },
    { id: "passengerType", Component: PassengerType },
    { id: "segmentCount", Component: SegmentCount },
    { id: "stopOver", Component: StopOver },
    { id: "ticketingDate", Component: TicketingDate },
    { id: "tourCode", Component: TourCode },
    { id: "tripType", Component: TripType },
    { id: "validatingAirline", Component: ValidatingAirline }
  ];
  const { CriteriasList } = props;
  return (
    <div className="card mt-2">
      <div className="card-header">
        <h3>CriteriaLoader</h3>
      </div>
      <div className="card-body">
        <div className="row">
          {ComponentArrray.map(obj => {
            return CriteriasList.includes(obj.id) ? (
              <obj.Component key={obj.id} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CriteriaLoader;
