import { AppState, useDispatch, useSelector } from '@/store/Store';
import { setDarkMode } from '@/store/customizer/CustomizerSlice';
import { IconMoon, IconSun } from '@tabler/icons-react';

const ToggleMode = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      const newMode = customizer.activeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode); // Persist theme mode change
      dispatch(setDarkMode(newMode));
    }
  };

  return customizer.activeMode === 'light' ? (
    <IconMoon onClick={toggleTheme} cursor="pointer" size={20} />
  ) : (
    <IconSun onClick={toggleTheme} cursor="pointer" size={20} />
  );
};


export default ToggleMode
