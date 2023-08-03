import { IDays } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ItineraryState = {
    itineraryDays: IDays[];
};

const initialState = {
    itineraryDays: [],
} as ItineraryState;

export const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        reset: () => initialState,
        
        setItineraryDays: (state, action: PayloadAction<IDays[]>) => {
            state.itineraryDays = action.payload
        },

    },
});

export const {
    setItineraryDays,
    reset,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
