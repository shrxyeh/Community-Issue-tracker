import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<ReportIssue />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>

            <footer className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 dark:from-dark-800 dark:to-dark-900 text-white py-6 sm:py-8 mt-12 sm:mt-16 shadow-2xl">
              <div className="container mx-auto px-4 sm:px-6 text-center">
                <p className="text-base sm:text-lg font-semibold">&copy; 2024 Community Issue Tracker. Built for ProU Technology Assessment.</p>
                <p className="text-xs sm:text-sm text-gray-200 dark:text-gray-400 mt-2">
                  A platform for reporting and tracking local community issues
                </p>
                <div className="mt-3 sm:mt-4 flex justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                  <span>Made for the community</span>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
