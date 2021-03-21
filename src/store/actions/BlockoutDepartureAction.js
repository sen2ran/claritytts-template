export function setDateFn(payload) {
    return {
        type: 'SET_BLOCKOUT_DATE',
        payload: payload
    }
}

export function setReturnDateFn(payload) {
    return {
        type: 'SET_RETURN_BLOCKOUT_DATE',
        payload: payload
    }
}


export function setIsValid(payload){
    return{
        type : "SET_BLOCK_OUT_DEPARTURE_DATE_IS_VALID",
        payload: payload
    }
}