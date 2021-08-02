import { configureStore } from "@reduxjs/toolkit";
import { expenseReducer } from "./expense";

const store = configureStore({
  reducer: {
    expense: expenseReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
