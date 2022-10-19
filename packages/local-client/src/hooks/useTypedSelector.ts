import { RootState } from 'state/store';
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
