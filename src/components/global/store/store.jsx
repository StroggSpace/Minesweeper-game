import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Создание slice для лидеров
const leadersSlice = createSlice({
  name: "leaders",
  initialState: {
    leaders: [],
  },
  reducers: {
    addLeader: (state, action) => {
      if (!state.leaders.includes(action.payload)) {
        if (state.leaders.length < 10) {
          state.leaders.push(action.payload);
          state.leaders.sort((a, b) => a - b);
        } else {
          state.leaders.shift();
          state.leaders.push(action.payload);
          state.leaders.sort((a, b) => a - b);
        }
      }
    },
  },
});

// Middleware для сохранения состояния лидеров в localStorage
const persistConfig = {
  key: "leaders",
  storage,
};

const persistedReducer = persistReducer(persistConfig, leadersSlice.reducer);

// Создание store с использованием persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export const { addLeader } = leadersSlice.actions;
