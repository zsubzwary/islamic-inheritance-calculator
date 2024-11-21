import React from 'react';
import { Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'PKR', symbol: '₨' },
  { code: 'SAR', symbol: '﷼' },
  { code: 'AED', symbol: 'د.إ' },
  { code: 'EUR', symbol: '€' },
];

export function SettingsBar({ t }: { t: (key: string) => string }) {
  const { language, setLanguage, currency, setCurrency } = useApp();

  return (
    <div className="flex items-center space-x-4 mb-6">
      <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'ur')}
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm"
      >
        <option value="en">English</option>
        <option value="ur">اردو</option>
      </select>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} ({c.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}