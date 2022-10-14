import { AppDispatch, RootState } from 'state/store';
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
