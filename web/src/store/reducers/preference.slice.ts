import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferenceState {
    hiddenAnimals: number[];
    hideCamps: boolean;
    hideGates: boolean;
}

const initialState: PreferenceState = {
    hiddenAnimals: [],
    hideCamps: false,
    hideGates: false
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
        },
        toggleHiddenAnimal: (state, action: PayloadAction<number>) => {
            // Get index of animal in hiddenAnimals
            const index = state.hiddenAnimals.indexOf(action.payload);
            if (index > -1) {
                // If animal is in hiddenAnimals, remove it
                state.hiddenAnimals.splice(index, 1);
            } else {
                // If animal is not in hiddenAnimals, add it
                state.hiddenAnimals.push(action.payload);
            }
        },
        toggleHideCamps: (state) => {
            state.hideCamps = !state.hideCamps;
        },
        toggleHideGates: (state) => {
            state.hideGates = !state.hideGates;
        }
    }
});

export const { addHiddenAnimal, removeHiddenAnimal, toggleHiddenAnimal, toggleHideCamps, toggleHideGates } =
    preferenceSlice.actions;

export default preferenceSlice.reducer;
