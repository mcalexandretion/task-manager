import { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#42307F' },
    secondary: { main: '#2E477B' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#25706D', secondary: '#B88E3D' }
  },
  typography: {
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7E6EB3' },
    secondary: { main: '#6B81B0' },
    background: { default: '#1f1e1eff', paper: '#1e1e1e' },
    text: { primary: '#5EA5A3', secondary: '#E7C583' }
  },
  typography: {
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 }
  }
});

interface ThemeContextType {
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProviderWrapper');
  }
  return context;
};