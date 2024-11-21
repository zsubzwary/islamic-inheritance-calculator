import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  language: 'en' | 'ur';
  currency: string;
  setLanguage: (lang: 'en' | 'ur') => void;
  setCurrency: (currency: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [currency, setCurrency] = useState('PKR');

  return (
    <AppContext.Provider value={{ language, currency, setLanguage, setCurrency }}>
      {children}
    </AppContext.Provider>
  );
}