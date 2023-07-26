import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./reducers/locationSlice"
import restaurantsReducer from "./reducers/restaurantsSlice";

export const store = configureStore({
    reducer: {
        locationReducer,
        restaurantsReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;