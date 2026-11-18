import { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, Colors } from './appTheme';

interface ThemeContextProps {
  colors: Colors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const system = useColorScheme();
  const [isDark, setIsDark] = useState(system === 'dark');

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{ colors: isDark ? darkColors : lightColors, isDark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);