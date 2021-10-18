import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { ISO_DATE_FORMAT } from '../../utils/constants';

export interface PreferenceState {
    hiddenAnimals: number[];
    hideCamps: boolean;
    hideGates: boolean;
    queryDate: string;
    startHour: string;
    endHour: string;
}

const initialState: PreferenceState = {
    hiddenAnimals: [],
    hideCamps: false,
    hideGates: false,
    queryDate: format(new Date(), ISO_DATE_FORMAT),
    startHour: '00:00',
    endHour: '23:59'
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
        },
        setQueryDate: (state, action: PayloadAction<Date>) => {
            state.queryDate = format(action.payload, ISO_DATE_FORMAT);
        },
        setHours: (state, action: PayloadAction<{ startHour: string; endHour: string }>) => {
            state.startHour = action.payload.startHour;
            state.endHour = action.payload.endHour;
        }
    }
});

export const {
    addHiddenAnimal,
    removeHiddenAnimal,
    toggleHiddenAnimal,
    toggleHideCamps,
    toggleHideGates,
    setQueryDate,
    setHours
} = preferenceSlice.actions;

// eslint-disable-next-line import/no-default-export
export default preferenceSlice.reducer;
