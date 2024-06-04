import { combineReducers } from 'redux';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  movie: movieReducer,
});

export default rootReducer;