import { IDays } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ItineraryState = {
    itineraryDays: IDays[];
    itineraryLoading: boolean
};

const initialState = {
    itineraryDays: [],
    itineraryLoading: true
} as ItineraryState;

export const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        reset: () => initialState,
        
        setItineraryDays: (state, action: PayloadAction<IDays[]>) => {
            state.itineraryDays = action.payload
            state.itineraryLoading = false
        },

    },
});

export const {
    setItineraryDays,
    reset,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
