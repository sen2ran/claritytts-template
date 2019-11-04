import {
    combineReducers
} from 'redux'
import headerData from './HeaderReducer'
import Criteria from './CriteriaReducer'

const rootReducer = combineReducers({
    headerData,
    Criteria
})

export default rootReducer;