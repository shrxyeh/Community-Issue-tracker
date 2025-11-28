import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { issuesAPI } from '../services/api';
import IssueCard from '../components/IssueCard';
import IssueDetailsModal from '../components/IssueDetailsModal';
import StatsWidget from '../components/StatsWidget';
import FilterBar from '../components/FilterBar';
import CategoryChart from '../components/CategoryChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { downloadFile } from '../utils/helpers';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, loading: authLoading } = useAuth();
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: ''
  });

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/login');
    }
  }, [admin, authLoading, navigate]);

  useEffect(() => {
    if (admin) {
      fetchData();
    }
  }, [admin, filters]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.status) params.status = filters.status;

      const [issuesRes, statsRes] = await Promise.all([
        issuesAPI.getAll(params),
        issuesAPI.getStatistics()
      ]);

      setIssues(issuesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleStatusChange = async (id, status) => {
    try {
      await issuesAPI.updateStatus(id, status);
      fetchData();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update issue status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await issuesAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Failed to delete issue:', error);
      alert('Failed to delete issue');
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await issuesAPI.exportCSV();
      const blob = new Blob([response.data], { type: 'text/csv' });
      downloadFile(blob, `issues-export-${new Date().toISOString().split('T')[0]}.csv`);
    } catch (error) {
      console.error('Failed to export CSV:', error);
      alert('Failed to export issues');
    }
  };

  const handleIssueClick = (issueId) => {
    setSelectedIssueId(issueId);
  };

  const handleCloseModal = () => {
    setSelectedIssueId(null);
    fetchData();
  };

  if (authLoading || !admin) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12 flex justify-between items-center animate-fade-in flex-wrap gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 gradient-text">Admin Dashboard</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Manage and track community issues efficiently
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center gap-2 shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>

      <StatsWidget stats={stats} />

      {stats?.byCategory && stats.byCategory.length > 0 && (
        <div className="mb-8 animate-slide-up">
          <CategoryChart data={stats.byCategory} />
        </div>
      )}

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <LoadingSpinner />
      ) : issues.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <p className="text-2xl text-gray-600 dark:text-gray-400 font-semibold">No issues found</p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Managing <span className="font-bold text-primary-600 dark:text-primary-400">{issues.length}</span> issue{issues.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {issues.map((issue, index) => (
              <div
                key={issue.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-slide-up"
              >
                <IssueCard
                  issue={issue}
                  isAdmin={true}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onClick={handleIssueClick}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {selectedIssueId && (
        <IssueDetailsModal
          issueId={selectedIssueId}
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          isAdmin={true}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
