import {combineReducers, compose, createStore} from "redux";

import { MainReducer } from "../reducers";

let reducers = combineReducers({
  mainTree: MainReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers());

export default store;
