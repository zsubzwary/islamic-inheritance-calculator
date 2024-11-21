import React, { useState, useEffect } from 'react';
import { Calculator, Moon, Sun } from 'lucide-react';
import { InheritanceForm } from './components/InheritanceForm';
import { ResultCard } from './components/ResultCard';
import { SettingsBar } from './components/SettingsBar';
import { AppProvider, useApp } from './contexts/AppContext';
import { translations } from './localization/translations';

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [calculation, setCalculation] = useState<{
    amount: number;
    sons: number;
    daughters: number;
    sonShare: number;
    daughterShare: number;
  } | null>(null);

  const { language } = useApp();
  const t = (key: string) => translations[language][key as keyof typeof translations['en']];

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Calculator className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              <h1 className={`text-2xl font-bold text-gray-900 dark:text-white ${language === 'ur' ? 'font-urdu' : ''}`}>
                {t('title')}
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </header>

          <main className="max-w-2xl mx-auto">
            <SettingsBar t={t} />
            <InheritanceForm onCalculate={setCalculation} t={t} />
            {calculation && <ResultCard {...calculation} t={t} />}
          </main>

          <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
            <p className={language === 'ur' ? 'font-urdu' : ''}>{t('footer')}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;