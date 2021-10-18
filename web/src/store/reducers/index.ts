import { combineReducers } from 'redux';
import preferenceReducer from './preference.slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Blacklist queryDate since we don't want to persist that (should reset on refresh)
const preferenceConfig = {
    key: 'preferences',
    storage,
    blacklist: ['queryDate', 'startHour', 'endHour']
};

export const rootReducer = combineReducers({ preferences: persistReducer(preferenceConfig, preferenceReducer) });
