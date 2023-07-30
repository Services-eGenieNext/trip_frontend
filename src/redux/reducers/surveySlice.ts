import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SurveyState = {
    surveySlice: any;
};

const initialState = {
    surveySlice: {},
} as SurveyState;

export const surveyValues = createSlice({
    name: "survey",
    initialState,
    reducers: {
        reset: () => initialState,
        
        setSurveyValue: (state, action: PayloadAction<any[]>) => {
            state.surveySlice = action.payload
        }
    },
});

export const {
    setSurveyValue,
    reset,
} = surveyValues.actions;

export default surveyValues.reducer;
