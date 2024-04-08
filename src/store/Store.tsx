import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'
import { combineReducers } from 'redux'
import CustomizerReducer from './customizer/CustomizerSlice'

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
  },
})

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
})

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store
export const useDispatch = () => useAppDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector

export default store
