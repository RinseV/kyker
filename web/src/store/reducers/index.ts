import { combineReducers } from 'redux';
import preferenceReducer from './preference.slice';
import queryReducer from './query.slice';
import onlineReducer from './online.slice';

export const rootReducer = combineReducers({
    preferences: preferenceReducer,
    query: queryReducer,
    online: onlineReducer
});
