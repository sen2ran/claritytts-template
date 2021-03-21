export function setDateFn(payload) {
    return {
        type: 'SET_DATE_DEPARTURE',
        payload: payload
    }
}

export function setReturnDateFn(payload) {
    return {
        type: 'SET_RETURN_DATE_DEPARTURE',
        payload: payload
    }
}

export function setIsValid(payload){
    return{
        type: "SET_DEPARTURE_DATE_IS_VALID",
        payload: payload
    }
}