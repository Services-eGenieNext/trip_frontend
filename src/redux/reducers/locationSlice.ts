import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationState = {
    locationsState: any[];
};

const initialState = {
    locationsState: [],
} as LocationState;

export const locationSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        reset: () => initialState,
        
        setLocations: (state, action: PayloadAction<any[]>) => {
            state.locationsState = action.payload
        }
    },
});

export const {
    setLocations,
    reset,
} = locationSlice.actions;

export default locationSlice.reducer;
