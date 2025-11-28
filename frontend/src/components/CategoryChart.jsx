import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CategoryChart = ({ data }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Number of Issues',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // Blue
          'rgba(168, 85, 247, 0.8)',   // Purple
          'rgba(34, 197, 94, 0.8)',    // Green
          'rgba(251, 191, 36, 0.8)',   // Yellow
          'rgba(239, 68, 68, 0.8)'     // Red
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(59, 130, 246, 0.95)',
          'rgba(168, 85, 247, 0.95)',
          'rgba(34, 197, 94, 0.95)',
          'rgba(251, 191, 36, 0.95)',
          'rgba(239, 68, 68, 0.95)'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 13
          },
          color: isDark ? '#9ca3af' : '#6b7280'
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        border: {
          display: false
        }
      },
      x: {
        ticks: {
          font: {
            size: 13,
            weight: '600'
          },
          color: isDark ? '#d1d5db' : '#374151'
        },
        grid: {
          display: false
        },
        border: {
          display: false
        }
      }
    }
  };

  return (
    <div className="card bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 border-2 border-gray-200 dark:border-dark-700 shadow-xl animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Category Analytics</span>
        </h3>
        <div className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
          {data.reduce((acc, item) => acc + item.count, 0)} Total
        </div>
      </div>
      <div className="bg-white dark:bg-dark-700/50 rounded-xl p-4" style={{ height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategoryChart;
