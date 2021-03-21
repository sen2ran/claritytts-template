export function setTime(payload) {
    return {
        type: 'SET_START_TIME_BOOKING_DAY_SCHEDULER',
        payload: payload
    }
}

export function setMonth(payload) {
    return {
        type: 'SET_MONTH_BOOKING_DAY_SCHEDULER',
        payload: payload
    }
}

export function setType(payload) {
    return {
        type: 'SET_TYPE_BOOKING_DAY_SCHEDULER',
        payload: payload
    }
}

export function setWeek(payload) {
    return {
        type: 'SET_WEEK_BOOKING_DAY_SCHEDULER',
        payload: payload
    }
}

export function setDay(payload) {
    return {
        type: 'SET_DAY_BOOKING_DAY_SCHEDULER',
        payload: payload
    }
}

export function setIsValid(payload) {
    return {
        type: 'SET_BOOKING_DAY_SCHEDULER_IS_VALID',
        payload: payload
    }
}