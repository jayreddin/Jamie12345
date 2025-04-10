'use client';

import {createContext, useContext, useState, useEffect} from 'react';

interface SettingsContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  textSize: number;
  setTextSize: (size: number) => void;
  openRouterApiKey: string;
  setOpenRouterApiKey: (apiKey: string) => void;
  activeModel: string;
  setActiveModel: (model: string) => void;
  apiProvider: string;
  setApiProvider: (provider: string) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });
  const [textSize, setTextSize] = useState<number>(() => {
    if (typeof localStorage !== 'undefined') {
      const storedTextSize = localStorage.getItem('textSize');
      return storedTextSize ? parseInt(storedTextSize, 10) : 16;
    }
    return 16;
  });
  const [openRouterApiKey, setOpenRouterApiKey] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('openRouterApiKey') || '';
    }
    return '';
  });
    const [activeModel, setActiveModel] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('activeModel') || 'mistralai/Mistral-7B-Instruct-v0.1';
    }
    return 'mistralai/Mistral-7B-Instruct-v0.1';
  });
  const [apiProvider, setApiProvider] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('apiProvider') || 'openrouter';
    }
    return 'openrouter';
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('textSize', textSize.toString());
      document.documentElement.style.setProperty('--text-size', `${textSize}px`);
    }
  }, [textSize]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('openRouterApiKey', openRouterApiKey);
    }
  }, [openRouterApiKey]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('activeModel', activeModel);
    }
  }, [activeModel]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('apiProvider', apiProvider);
    }
  }, [apiProvider]);

  const value = {
    theme,
    setTheme,
    textSize,
    setTextSize,
    openRouterApiKey,
    setOpenRouterApiKey,
    activeModel,
    setActiveModel,
    apiProvider,
    setApiProvider,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
