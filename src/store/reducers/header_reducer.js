const iniState = {
    country: 'en',
    navDetails: [{
            name: "React",
            linkTo: '/react'
        },
        {
            name: 'Angular',
            linkTo: '/angular'
        },
        {
            name: "Vue js",
            linkTo: '/vue'
        },
        {
            name: 'Svelte',
            linkTo: '/svelte'
        }
    ]
}

export default function (state = iniState, action) {
    switch (action.type) {
        case 'SET_LANG':
            const newState = {
                ...state
            }
            newState.country = action.payload
            return newState
        default:
            return state
    }
}