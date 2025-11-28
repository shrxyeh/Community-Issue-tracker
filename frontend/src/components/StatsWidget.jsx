import React from 'react';

const StatsWidget = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      label: 'Total Issues',
      value: stats.total,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgCard: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      ring: 'ring-blue-500/20'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      bgCard: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      ring: 'ring-yellow-500/20'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      bgCard: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      border: 'border-indigo-200 dark:border-indigo-800',
      ring: 'ring-indigo-500/20'
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      bgCard: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      border: 'border-green-200 dark:border-green-800',
      ring: 'ring-green-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 animate-slide-up">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgCard} border-2 ${stat.border} rounded-2xl p-6 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ring-4 ${stat.ring}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </div>
            <div className={`${stat.gradient} text-white p-3 sm:p-4 rounded-2xl shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsWidget;
