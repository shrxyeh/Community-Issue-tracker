import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { issuesAPI } from '../services/api';
import LocationPicker from '../components/LocationPicker';
import { validateImageFile } from '../utils/helpers';

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electricity',
    location: '',
    photo: null,
    reporterName: '',
    reporterEmail: '',
    reporterPhone: ''
  });
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const categories = ['Electricity', 'Roads', 'Water', 'Waste', 'Safety'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      setFormData(prev => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({ ...prev, location }));
    setShowMap(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('location', formData.location);
      if (formData.reporterName) submitData.append('reporterName', formData.reporterName);
      if (formData.reporterEmail) submitData.append('reporterEmail', formData.reporterEmail);
      if (formData.reporterPhone) submitData.append('reporterPhone', formData.reporterPhone);
      if (formData.photo) {
        submitData.append('photo', formData.photo);
      }

      await issuesAPI.create(submitData);
      alert('Issue reported successfully! Thank you for helping improve our community.');
      navigate('/');
    } catch (error) {
      console.error('Failed to report issue:', error);
      setError(error.response?.data?.error || 'Failed to report issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-3xl">
      <div className="mb-8 sm:mb-12 text-center animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">Report an Issue</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 px-4">
          Help improve our community by reporting local issues
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
        {error && (
          <div className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 border-2 border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl shadow-lg animate-fade-in">
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <div className="card bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-2 border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Issue Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Issue Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Broken streetlight on Main Street"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about the issue..."
                rows="5"
                className="input resize-y"
                required
              />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Your Information (Optional)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Provide your contact information so we can update you on the progress of this issue
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="reporterEmail"
                  value={formData.reporterEmail}
                  onChange={handleChange}
                  placeholder="e.g., john@example.com"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="reporterPhone"
                  value={formData.reporterPhone}
                  onChange={handleChange}
                  placeholder="e.g., +1 234 567 8900"
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Location
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Location Details <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Main Street near Building #45"
                className="input"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="btn btn-secondary w-full md:w-auto"
            >
              {showMap ? 'Hide Map' : 'Pick Location on Map'}
            </button>

            {showMap && (
              <div className="mt-4 animate-slide-in">
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </div>
            )}
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Photo Evidence (Optional)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Upload Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900/40 dark:file:text-primary-300"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Max file size: 5MB. Formats: JPEG, PNG, GIF
              </p>
            </div>

            {preview && (
              <div className="mt-4 animate-fade-in">
                <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Preview:</p>
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl shadow-lg border-2 border-purple-200 dark:border-purple-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData(prev => ({ ...prev, photo: null }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex-1 text-lg py-4 shadow-xl"
          >
            {loading ? '⏳ Submitting...' : '📤 Report Issue'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary px-8 text-lg py-4"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;
