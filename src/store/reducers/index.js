import { combineReducers } from "redux";
import headerData from "./HeaderReducer";
import Criteria from "./CriteriaReducer";
import ArrivalDate from "./ArivalDateReducer";
import MaxStay from "./MaxStayReducer";
import MinStay from "./MinStayReducer";
import NoOfSeats from "./NoOfSeatsReducers";
import NoOfStops from "./NoOfStopsReducers";
import PassengerType from "./PassengerTypeReducer";
import BookingClass from "./BookingClassReducer";
import SegmentCount from "./SegmentCountReducer";
import BlockoutDepartue from "./BlockoutDepartureReducer";
import BookingPeriod from "./BookingPeriodReducer";
import DepartureDate from "./DepartureDateReducer";
import TicketingDate from "./TicketingDateReducer";
import Origin from "./OriginReducer";
import Destination from "./DestinationReducer";
import FlightNumber from "./FlightNumberReducer";
import MarketingAirline from "./MarketingAirlineReducer";
import OperatingAirline from "./OperatingAirlineReducer";
import ArrivalDayScheduler from "./ArivalDaySchedulerReducer";
import FareBasisCode from "./FareBasisCodeReducer";
import TripType from "./TripTypeReducer";
import TourCode from "./TourCodeReducer";
import DepartureDaySchedular from "./DepartureDaySchedulerReducer";
import BookingDaySchedular from "./BookingDaySchedulerReducer";
import OriginalTripType from "./OriginalTripTypeReducer";
import FareRange from "./FareRangeReducer";
import DaysToDeparture from "./DaysToDepartureReducer";
import ContentSourceMapping from "./ContentSourceMappingReducer";
import StopOver from "./StopOverReducer";
import EditDetails from "./EditReducer";

const rootReducer = combineReducers({
  headerData,
  Criteria,
  ArrivalDate,
  MaxStay,
  MinStay,
  NoOfSeats,
  NoOfStops,
  PassengerType,
  BookingClass,
  SegmentCount,
  BlockoutDepartue,
  BookingPeriod,
  DepartureDate,
  TicketingDate,
  Origin,
  Destination,
  FlightNumber,
  MarketingAirline,
  OperatingAirline,
  ArrivalDayScheduler,
  FareBasisCode,
  TripType,
  TourCode,
  DepartureDaySchedular,
  BookingDaySchedular,
  OriginalTripType,
  FareRange,
  DaysToDeparture,
  ContentSourceMapping,
  StopOver,
  EditDetails
});

export default rootReducer;
