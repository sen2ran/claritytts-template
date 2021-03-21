

export function setStopOverGroup(payload) {
    return {
        type: 'SET_STOP_OVER_GROUP',
        payload: payload
    }
}

export function setStopOverCountry(payload) {
    return {
        type: 'SET_STOP_OVER_COUNTRY',
        payload: payload
    }
}


export function setStopOverAirport(payload) {
    return {
        type: 'SET_STOP_OVER_AIRPORT',
        payload: payload
    }
}

export function setExcludeStopOverGroup(payload) {
    return {
        type: 'SET_EXCLUDE_STOP_OVER_GROUP',
        payload: payload
    }
}

export function setExcludeStopOverCountry(payload) {
    return {
        type: 'SET_EXCLUDE_STOP_OVER_COUNTRY',
        payload: payload
    }
}


export function setExcludeStopOverAirport(payload) {
    return {
        type: 'SET_EXCLUDE_STOP_OVER_AIRPORT',
        payload: payload
    }
}

export function setIsValid(payload){
    return {
        type: 'SET_STOP_OVER__IS_VALID',
        payload: payload
    }
}
