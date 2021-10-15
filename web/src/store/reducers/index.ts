import { combineReducers } from 'redux';
import preferenceReducer from './preference.slice';

export const rootReducer = combineReducers({ preferences: preferenceReducer });
