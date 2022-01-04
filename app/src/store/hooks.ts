import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = (): ThunkDispatch<RootState, null, AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
