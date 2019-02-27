import { combineReducers } from 'redux';
import bookRed             from './book_reducer';
import userRed             from './user_reducer';

const rootReducer = combineReducers({
    bookRed,
    userRed
})

export default rootReducer;