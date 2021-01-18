import { combineReducers } from 'redux';
import testsReducer from './tests/reducer';

export default combineReducers({
  tests: testsReducer,
});
