
export function setOriginGroup(payload) {
    return {
        type: 'SET_ORIGIN_GROUP',
        payload: payload
    }
}

export function setOriginCountry(payload) {
    return {
        type: 'SET_ORIGIN_COUNTRY',
        payload: payload
    }
}


export function setOriginAirport(payload) {
    return {
        type: 'SET_ORIGIN_AIRPORT',
        payload: payload
    }
}

export function setExcludeOriginGroup(payload) {
    return {
        type: 'SET_EXCLUDE_ORIGIN_GROUP',
        payload: payload
    }
}

export function setExcludeOriginCountry(payload) {
    return {
        type: 'SET_EXCLUDE_ORIGIN_COUNTRY',
        payload: payload
    }
}


export function setExcludeOriginAirport(payload) {
    return {
        type: 'SET_EXCLUDE_ORIGIN_AIRPORT',
        payload: payload
    }
}

export function setIsValid(payload){
    return {
        type: 'SET_ORIGIN_IS_VALID',
        payload: payload
    }
}

