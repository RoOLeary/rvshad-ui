import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createBrowserHistory } from "history";
import { combineReducers } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { authApi } from "../src/services/auth";
import authSlice from "./services/auth/authSlice";
import { documentApi } from "./services/documents/document";
import documentSlice from "./services/documents/documentSlice";

import { entityApi } from './services/entities/entity';  // Import the API slice
import entitySlice from './services/entities/entitySlice';

import { studyApi } from './services/study/study';
import studySlice from './services/study/studySlice';

import { activityApi } from './services/activity/activity';
import activitySlice from './services/activity/activitySlice';


import { searchApi } from './services/search/search';
import searchSlice from './services/search/searchSlice';

// Create the history context
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

// Define and export root reducer explicitly for typing
export const rootReducer = combineReducers({
  router: routerReducer,
  auth: authSlice,
  documents: documentSlice,
  entities: entitySlice,
  activities: activitySlice,
  search: searchSlice,
  studies: studySlice,
  [authApi.reducerPath]: authApi.reducer,
  [documentApi.reducerPath]: documentApi.reducer,
  [entityApi.reducerPath]: entityApi.reducer,
  [activityApi.reducerPath]: activityApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [studyApi.reducerPath]: studyApi.reducer,
});

// Define RootState type directly from rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Create the store with proper TypeScript types
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["router.location.key"],
      },
    }).concat(authApi.middleware, documentApi.middleware, entityApi.middleware, activityApi.middleware, searchApi.middleware, studyApi.middleware, routerMiddleware),
});

// Define AppDispatch directly from store
export type AppDispatch = typeof store.dispatch;

// Setup RTK Query listeners
setupListeners(store.dispatch);

// Create and export history
export const history = createReduxHistory(store);

// Export type-safe hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
