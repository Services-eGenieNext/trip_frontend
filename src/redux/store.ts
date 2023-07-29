import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./reducers/locationSlice"
import restaurantsReducer from "./reducers/restaurantsSlice";
import popularActivities from "./reducers/popularActivities";
import reviewsReducer from './reducers/reviews'

export const store = configureStore({
    reducer: {
        locationReducer,
        restaurantsReducer,
        popularActivities,
        reviewsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;