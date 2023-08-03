import { IDays } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationState = {
    days: IDays[];
};

const initialState = {
    days: [],
} as LocationState;

export const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        reset: () => initialState,
        
        setDays: (state, action: PayloadAction<any[]>) => {
            state.days = action.payload
        },

    },
});

export const {
    setDays,
    reset,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
