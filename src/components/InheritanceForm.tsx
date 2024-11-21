import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface InheritanceFormProps {
  onCalculate: (result: {
    amount: number;
    sons: number;
    daughters: number;
    sonShare: number;
    daughterShare: number;
  }) => void;
  t: (key: string) => string;
}

export function InheritanceForm({ onCalculate, t }: InheritanceFormProps) {
  const [amount, setAmount] = useState('');
  const [sons, setSons] = useState('');
  const [daughters, setDaughters] = useState('');
  const { language } = useApp();

  const formatAmount = (value: string) => {
    // Remove any non-digit characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Convert to number and format with thousand separators
    const formatted = new Intl.NumberFormat(language === 'ur' ? 'ur-PK' : 'en-US').format(
      Number(numericValue) || 0
    );
    
    return formatted;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Store the formatted value for display
    setAmount(formatAmount(rawValue));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert the formatted amount back to a number for calculations
    const numericAmount = parseFloat(amount.replace(/[^\d.]/g, ''));
    const numSons = parseInt(sons);
    const numDaughters = parseInt(daughters);
    
    const totalParts = (numSons * 2) + numDaughters;
    const partValue = numericAmount / totalParts;
    
    const sonShare = partValue * 2;
    const daughterShare = partValue;

    onCalculate({
      amount: numericAmount,
      sons: numSons,
      daughters: numDaughters,
      sonShare,
      daughterShare,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h2 className={`text-xl font-semibold text-gray-900 dark:text-white ${language === 'ur' ? 'font-urdu' : ''}`}>
          {t('calculateShares')}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" dir={language === 'ur' ? 'rtl' : 'ltr'}>
        <div>
          <label htmlFor="amount" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {t('totalAmount')}
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder={t('enterAmount')}
            inputMode="numeric"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sons" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
              {t('numberOfSons')}
            </label>
            <input
              type="number"
              id="sons"
              value={sons}
              onChange={(e) => setSons(e.target.value)}
              min="0"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="daughters" className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
              {t('numberOfDaughters')}
            </label>
            <input
              type="number"
              id="daughters"
              value={daughters}
              onChange={(e) => setDaughters(e.target.value)}
              min="0"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          {t('calculate')}
        </button>
      </form>
    </div>
  );
}