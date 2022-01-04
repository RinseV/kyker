import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { ISO_DATE_FORMAT } from '../../utils/constants';

export interface QueryState {
    date: string;
    startHour: string;
    endHour: string;
}

const initialState: QueryState = {
    date: format(new Date(), ISO_DATE_FORMAT),
    startHour: '00:00',
    endHour: '23:59'
};

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setHours: (state, action: PayloadAction<{ startHour: string; endHour: string }>) => {
            state.startHour = action.payload.startHour;
            state.endHour = action.payload.endHour;
        }
    }
});

export const { setDate, setHours } = querySlice.actions;

// eslint-disable-next-line import/no-default-export
export default querySlice.reducer;
