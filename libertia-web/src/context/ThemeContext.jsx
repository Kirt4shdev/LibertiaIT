import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Oscuro',
    class: 'dark',
    icon: '🌙',
    description: 'Tema oscuro profesional'
  },
  light: {
    name: 'Claro', 
    class: 'light',
    icon: '☀️',
    description: 'Tema claro limpio'
  },
  'dark-glass': {
    name: 'Dark Glass',
    class: 'dark-glass',
    icon: '✨',
    description: 'Efecto cristal con transparencias'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('libertia-theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName) => {
    const root = document.documentElement;
    const body = document.body;
    
    // Remove all theme classes from both html and body
    root.classList.remove('dark', 'light', 'dark-glass');
    body.classList.remove('dark', 'light', 'dark-glass');
    
    // Add new theme class
    const themeClass = themes[themeName].class;
    root.classList.add(themeClass);
    body.classList.add(themeClass);
    
    // Set data attribute for additional styling hooks
    root.setAttribute('data-theme', themeName);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', 
        themeName === 'light' ? '#ffffff' : '#030712'
      );
    }
  };

  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
      localStorage.setItem('libertia-theme', theme);
    }
  }, [theme, mounted]);

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIndex];
    setTheme(nextTheme);
    
    // Show a brief notification
    console.log(`Tema cambiado a: ${themes[nextTheme].name}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
