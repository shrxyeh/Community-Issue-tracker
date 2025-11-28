import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../services/api';
import IssueCard from '../components/IssueCard';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import IssueDetailsModal from '../components/IssueDetailsModal';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: ''
  });
  const { admin } = useAuth();

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.status) params.status = filters.status;

      const response = await issuesAPI.getAll(params);
      setIssues(response.data);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
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
      fetchIssues();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update issue status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await issuesAPI.delete(id);
      fetchIssues();
    } catch (error) {
      console.error('Failed to delete issue:', error);
      alert('Failed to delete issue');
    }
  };

  const handleIssueClick = (issueId) => {
    setSelectedIssueId(issueId);
  };

  const handleCloseModal = () => {
    setSelectedIssueId(null);
    fetchIssues();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 sm:mb-12 text-center animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
          Community Issues
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          View and track local community issues reported by residents. Together, we make our community better!
        </p>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <LoadingSpinner />
      ) : issues.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <svg className="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-2xl text-gray-600 dark:text-gray-400 font-semibold mb-2">No issues found</p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            Try adjusting your filters or report a new issue
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Found <span className="font-bold text-primary-600 dark:text-primary-400">{issues.length}</span> issue{issues.length !== 1 ? 's' : ''}
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
                  isAdmin={!!admin}
                  onStatusChange={admin ? handleStatusChange : null}
                  onDelete={admin ? handleDelete : null}
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
          onStatusChange={admin ? handleStatusChange : null}
          onDelete={admin ? handleDelete : null}
          isAdmin={!!admin}
        />
      )}
    </div>
  );
};

export default Home;
