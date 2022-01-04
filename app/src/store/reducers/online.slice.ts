import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OnlineState {
    online: boolean;
}

const initialState: OnlineState = {
    online: true
};

export const onlineSlice = createSlice({
    name: 'online',
    initialState,
    reducers: {
        setOnline: (state, action: PayloadAction<boolean>) => {
            state.online = action.payload;
        }
    }
});

export const { setOnline } = onlineSlice.actions;

// eslint-disable-next-line import/no-default-export
export default onlineSlice.reducer;
