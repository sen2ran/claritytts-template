export function setIsValid(payload){
    return {
        type: 'SET_DESTINATION_IS_VALID',
        payload: payload
    }
}

export function setDestinationGroup(payload) {
    return {
        type: 'SET_DESTINATION_GROUP',
        payload: payload
    }
}

export function setDestinationCountry(payload) {
    return {
        type: 'SET_DESTINATION_COUNTRY',
        payload: payload
    }
}


export function setDestinationAirport(payload) {
    return {
        type: 'SET_DESTINATION_AIRPORT',
        payload: payload
    }
}

export function setExcludeDestinationGroup(payload) {
    return {
        type: 'SET_EXCLUDE_DESTINATION_GROUP',
        payload: payload
    }
}

export function setExcludeDestinationCountry(payload) {
    return {
        type: 'SET_EXCLUDE_DESTINATION_COUNTRY',
        payload: payload
    }
}


export function setExcludeDestinationAirport(payload) {
    return {
        type: 'SET_EXCLUDE_DESTINATION_AIRPORT',
        payload: payload
    }
}
