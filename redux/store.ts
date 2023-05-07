import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PERSIST } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import rootReducer from './reducers/rootReducer';
import { commonActionTypes } from './actionTypes/commonActionTypes';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'pinCode'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

// Check if token is expired on every store change
store.subscribe(() => {
  const { auth } = store.getState();
  const token = auth.authData.token;

  if (token) {
    const decodedToken: { exp: number } = jwtDecode(token);

    if (decodedToken.exp < Date.now() / 1000) {
      store.dispatch({ type: commonActionTypes.SIGN_OUT });
    }
  }
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
