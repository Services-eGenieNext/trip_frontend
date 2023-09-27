import { IDays } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDestinationDetails {
    origin: string,
    destination: string,
    waypoints?: any[]
}

type ItineraryState = {
    itineraryDays: IDays[];
    itineraryLoading: boolean;
    destinationModel: boolean;
    destinationDetails: IDestinationDetails | null
};

const initialState = {
    itineraryDays: [],
    itineraryLoading: true,
    destinationModel: false,
    destinationDetails: null
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

        setDestination: (state, action: PayloadAction<IDestinationDetails>) => {
            state.destinationDetails = action.payload
            state.destinationModel = true
        },

        clearDestinationModel: (state) => {
            state.destinationModel = false
        }

    },
});

export const {
    setItineraryDays,
    setDestination,
    clearDestinationModel,
    reset,
} = itinerarySlice.actions;

export default itinerarySlice.reducer;
