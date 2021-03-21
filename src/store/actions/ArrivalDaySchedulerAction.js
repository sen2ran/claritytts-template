export function setTime(payload) {
    return {
        type: 'SET_START_TIME_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setMonth(payload) {
    return {
        type: 'SET_MONTH_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setType(payload) {
    return {
        type: 'SET_TYPE_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setWeek(payload) {
    return {
        type: 'SET_WEEK_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setDay(payload) {
    return {
        type: 'SET_DAY_ARRIVAL_SCHEDULER',
        payload: payload
    }
}



export function setTimeReturn(payload) {
    return {
        type: 'SET_RETURN_START_TIME_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setMonthReturn(payload) {
    return {
        type: 'SET_RETURN_MONTH_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setTypeReturn(payload) {
    return {
        type: 'SET_RETURN_TYPE_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setWeekReturn(payload) {
    return {
        type: 'SET_RETURN_WEEK_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setDayReturn(payload) {
    return {
        type: 'SET_RETURN_DAY_ARRIVAL_SCHEDULER',
        payload: payload
    }
}

export function setIsValid(payload) {
    return {
        type: 'SET_ARRIVAL_SCHEDULER_IS_VALID',
        payload: payload
    }
}