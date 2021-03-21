export function setDateFn(payload) {
    return {
        type: 'SET_TICKETING_DATE',
        payload: payload
    }
}

export function setIsValid(payload) {
    return {
        type: 'SET_TICKETING_DATE_IS_VALID',
        payload: payload
    }
}