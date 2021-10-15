import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferenceState {
    hiddenAnimals: number[];
}

const initialState: PreferenceState = {
    hiddenAnimals: []
};

export const preferenceSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        addHiddenAnimal: (state, action: PayloadAction<number>) => {
            state.hiddenAnimals.push(action.payload);
        },
        removeHiddenAnimal: (state, action: PayloadAction<number>) => {
            state.hiddenAnimals = state.hiddenAnimals.filter((id) => id !== action.payload);
        }
    }
});

export const { addHiddenAnimal, removeHiddenAnimal } = preferenceSlice.actions;

export default preferenceSlice.reducer;
