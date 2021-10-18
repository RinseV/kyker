import { combineReducers } from 'redux';
import preferenceReducer from './preference.slice';
import queryReducer from './query.slice';

export const rootReducer = combineReducers({ preferences: preferenceReducer, query: queryReducer });
