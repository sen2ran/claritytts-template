import React, { Component } from 'react';

import NoOfSeats from './Criterias/NoOfSeats';
import MarketingAirline from './Criterias/MarketingAirline';
import PassengerType from './Criterias/PassengerType';
import BlockoutDepartureDate from './Criterias/BlockoutDepartureDate';
import DepartureDate from './Criterias/DepartureDate'
import BookingPeriod from './Criterias/BookingPeriod'
import BookingDayScheduler from './Criterias/BookingDayScheduler'
import NoOfStops from './Criterias/NoOfStops'
class CriteriaLoader extends Component {
    render() {
        const ComponentArrray = [
            {
                id: 'marketingAirline',
                Component: MarketingAirline
            },
            {
                id: 'noOfSeats',
                Component: NoOfSeats
            },
            {
                id: 'passengerType',
                Component: PassengerType
            },
            {
                id: 'blockoutDepartureDate',
                Component: BlockoutDepartureDate
            },
            {
                id: 'departureDate',
                Component: DepartureDate
            },
            {
                id: 'bookingPeriod',
                Component: BookingPeriod
            },
            {
                id: 'bookingDayScheduler',
                Component: BookingDayScheduler
            },
            {
                id: 'noOfStops',
                Component: NoOfStops
            },


        ]
        const { CriteriasList } = this.props
        return (
            <div>
                <h3>CriteriaLoader</h3>
                <hr />
                <div className="row" >
                    {
                        ComponentArrray.map(obj => {
                            return CriteriasList.includes(obj.id) ? < obj.Component /> : null
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CriteriaLoader;