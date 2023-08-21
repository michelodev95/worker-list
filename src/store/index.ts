// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/slice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("reduxState", JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
