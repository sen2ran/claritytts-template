export function setDateFn(payload) {
    return {
        type: 'SET_ARRIVAL_DATE',
        payload: payload
    }
}

export function setReturnDateFn(payload) {
    return {
        type: 'SET_RETURN_ARRIVAL_DATE',
        payload: payload
    }
}

export function setIsValid(payload){
    return {
        type : "SET_ARIVAL_IS_VALID",
        payload: payload
    }
}