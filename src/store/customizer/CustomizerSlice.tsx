import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  activeDir?: string | any;
  activeMode?: string; // This can be light or dark
  activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth?: number;
  isLanguage?: string;
  borderRadius?: number | any;
}

const initialState: StateType = {
  activeDir: 'ltr',
  activeMode: 'light', // This can be light or dark
  activeTheme: 'GREEN_THEME', // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  isLanguage: 'PT_BR',
  borderRadius: 7,
}

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setTheme: (state: StateType, action) => {
      state.activeTheme = action.payload
    },
    setDarkMode: (state: StateType, action) => {
      state.activeMode = action.payload
    },
    setDir: (state: StateType, action) => {
      state.activeDir = action.payload
    },
    setLanguage: (state: StateType, action) => {
      state.isLanguage = action.payload
    },
  },
})

export const {
  setTheme,
  setDarkMode,
  setDir,
  setLanguage
} = CustomizerSlice.actions

export default CustomizerSlice.reducer
