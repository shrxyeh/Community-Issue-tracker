import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { admin, login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="card shadow-2xl border-2 border-primary-200 dark:border-primary-800">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 gradient-text">Admin Login</h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Sign in to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 border-2 border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl shadow-lg animate-fade-in">
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@community.com"
                className="input text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input text-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg py-4 shadow-xl"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
