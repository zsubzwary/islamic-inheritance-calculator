import React from 'react';
import { DollarSign } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ResultCardProps {
  amount: number;
  sons: number;
  daughters: number;
  sonShare: number;
  daughterShare: number;
  t: (key: string) => string;
}

export function ResultCard({ amount, sons, daughters, sonShare, daughterShare, t }: ResultCardProps) {
  const { language, currency } = useApp();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'ur' ? 'ur-PK' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const ShareRow = ({ label, value, count, type }: { label: string; value: number; count: number; type: string }) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-emerald-50/50 dark:bg-emerald-900/30 p-3 rounded-lg">
        <span className={`text-gray-600 dark:text-gray-400 ${language === 'ur' ? 'font-urdu' : ''}`}>
          {label}
        </span>
        <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
          {formatCurrency(value)}
        </div>
      </div>
      <div className="bg-emerald-50/30 dark:bg-emerald-900/20 p-3 rounded-lg">
        <span className={`text-gray-600 dark:text-gray-400 ${language === 'ur' ? 'font-urdu' : ''}`}>
          {t('total')} ({count} {t(type)})
        </span>
        <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
          {formatCurrency(value * count)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h2 className={`text-xl font-semibold text-gray-900 dark:text-white ${language === 'ur' ? 'font-urdu' : ''}`}>
          {t('distributionResults')}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="bg-emerald-50/80 dark:bg-emerald-900/40 p-4 rounded-lg flex justify-between items-center">
          <span className={`text-gray-700 dark:text-gray-300 ${language === 'ur' ? 'font-urdu' : ''}`}>
            {t('totalAmountLabel')}
          </span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(amount)}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className={`font-medium text-emerald-800 dark:text-emerald-400 mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
              {t('sonsShare')}
            </h3>
            <ShareRow label={t('perSon')} value={sonShare} count={sons} type="sons" />
          </div>

          <div>
            <h3 className={`font-medium text-emerald-800 dark:text-emerald-400 mb-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
              {t('daughtersShare')}
            </h3>
            <ShareRow label={t('perDaughter')} value={daughterShare} count={daughters} type="daughters" />
          </div>
        </div>
      </div>
    </div>
  );
}