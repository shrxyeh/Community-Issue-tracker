import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-white/20 shadow-lg' : '';
  };

  return (
    <nav className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 dark:from-dark-800 dark:via-dark-700 dark:to-dark-800 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center group">
            <span className="text-base sm:text-xl md:text-2xl font-bold bg-white/10 px-3 sm:px-4 py-2 rounded-xl backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
              <span className="hidden sm:inline">Community Issue Tracker</span>
              <span className="sm:hidden">CIT</span>
            </span>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link
              to="/"
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium transform hover:scale-105 text-sm sm:text-base ${isActive('/')}`}
            >
              <span className="hidden sm:inline">Home</span>
              <span className="sm:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </span>
            </Link>
            <Link
              to="/report"
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium transform hover:scale-105 text-sm sm:text-base ${isActive('/report')}`}
            >
              <span className="hidden sm:inline">Report</span>
              <span className="sm:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
            </Link>

            {admin ? (
              <>
                <Link
                  to="/admin"
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium transform hover:scale-105 text-sm sm:text-base ${isActive('/admin')}`}
                >
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-3 sm:px-5 py-2 sm:py-2.5 bg-white text-primary-600 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base ${isActive('/login')}`}
              >
                <span className="hidden sm:inline">Login</span>
                <span className="sm:hidden">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </span>
              </Link>
            )}

            <div className="ml-1 sm:ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
