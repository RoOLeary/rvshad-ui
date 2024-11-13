import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { authApi } from "./services/auth/auth";
import authSlice from "./services/auth/authSlice";
import { documentApi } from "./services/documents/document";
import documentSlice from "./services/documents/documentSlice";

// Create the history context
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

// Define root reducer type
const rootReducer = combineReducers({
  router: routerReducer,
  auth: authSlice,
  documents: documentSlice,
  [authApi.reducerPath]: authApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
});

// Create the store with proper TypeScript types
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['router.location.key'],
      },
    }).concat([
      authApi.middleware,
      documentApi.middleware,
      routerMiddleware,
    ]),
});

// Infer types from the store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Setup RTK Query listeners
setupListeners(store.dispatch);

// Create and export history
export const history = createReduxHistory(store);

// Export type-safe hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;