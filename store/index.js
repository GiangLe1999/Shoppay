import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import cart from "./cartSlice";
import expandSidebar from "./expandSlice";

const reducers = combineReducers({ cart, expandSidebar });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});

export default store;
