import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary-200 dark:border-primary-900"></div>
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-primary-600 dark:border-t-primary-400 absolute top-0 left-0"></div>
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-600 dark:text-gray-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
