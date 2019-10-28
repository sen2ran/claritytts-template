import {
    combineReducers
} from 'redux'
import headerData from './header_reducer'

const rootReducer = combineReducers({
    headerData
})

export default rootReducer;