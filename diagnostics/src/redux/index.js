import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleware = [logger, thunk];
const composeEnhancers = composeWithDevTools({
  trace: true,
  realtime: true,
  name: 'MyTests',
  hostname: 'localhost',
  port: 3000,
});

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
export default store;
