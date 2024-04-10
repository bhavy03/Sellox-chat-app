import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./features/cardSlice";

export const store = configureStore({
  reducer: {
    card: cardsReducer,
  },
});
