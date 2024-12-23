import userReducer from "@hooks/reducers"; // Correctly imported
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
