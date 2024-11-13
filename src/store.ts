import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { authApi } from "./services/auth";
import authSlice from "./services/authSlice";

// Create the history context
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

// Define root reducer type
const rootReducer = combineReducers({
  router: routerReducer,
  [authApi.reducerPath]: authApi.reducer,
});

// Create the store with proper TypeScript types
export const store = configureStore({
  reducer: {
      auth: authSlice,
      [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
});

// Infer types from the store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Setup RTK Query listeners
setupListeners(store.dispatch);

// Create and export history
export const history = createReduxHistory(store);