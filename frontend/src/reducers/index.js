
// Dependencies
import { combineReducers } from 'redux';

// Shared Reducers
import auth from './authReducer';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
