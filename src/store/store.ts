import {combineReducers, compose, createStore} from "redux";

import { MainReducer } from "../reducers";

let reducers = combineReducers({
  mainTree: MainReducer,
});

const store = createStore(reducers);

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
