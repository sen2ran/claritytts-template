export function setFlightNumberFn(payload) {
    return {
        type: "SET_FLIGHT_NUMBER",
        payload: payload
    }
}

export function setExcludeFlightNumberFn(payload) {
    return {
        type: "SET_EXCLUDE_FLIGHT_NUMBER",
        payload: payload
    }
}

export function setReturnFlightNumberFn(payload) {
    return {
        type: "SET_RETURN_FLIGHT_NUMBER",
        payload: payload
    }
}

export function setReturnExcludeFlightNumberFn(payload) {
    return {
        type: "SET_RETURN_EXCLUDE_FLIGHT_NUMBER",
        payload: payload
    }
}

export function setIsValid(payload){
    return {
        type: "SET_FLIGHT_NUMBER_IS_REQUIRED",
        payload: payload
    }
}