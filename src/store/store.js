import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from './reducers/data'
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
  data: dataReducer,
})


const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));

export default store;