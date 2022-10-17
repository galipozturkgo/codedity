import { AppDispatch } from 'state/store';
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
