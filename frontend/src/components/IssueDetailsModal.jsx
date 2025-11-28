import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../services/api';
import { formatDate, getStatusClass, getCategoryIcon } from '../utils/helpers';
import CommentsSection from './CommentsSection';
import LoadingSpinner from './LoadingSpinner';

const IssueDetailsModal = ({ issueId, onClose, onStatusChange, onDelete, isAdmin }) => {
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssueDetails();
  }, [issueId]);

  const fetchIssueDetails = async () => {
    try {
      setLoading(true);
      const response = await issuesAPI.getById(issueId);
      setIssue(response.data);

      // Mark issue as viewed to clear notifications
      try {
        const viewerType = isAdmin ? 'admin' : 'reporter';
        await issuesAPI.markAsViewed(issueId, viewerType);
      } catch (markError) {
        // Silently fail if marking as viewed fails
        console.error('Failed to mark as viewed:', markError);
      }
    } catch (error) {
      console.error('Failed to fetch issue details:', error);
      alert('Failed to load issue details');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    if (onStatusChange) {
      await onStatusChange(issueId, e.target.value);
      fetchIssueDetails();
    }
  };

  const handleDelete = async () => {
    if (onDelete && window.confirm('Are you sure you want to delete this issue?')) {
      await onDelete(issueId);
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 max-w-4xl w-full">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!issue) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-dark-700 dark:to-dark-800 text-white px-8 py-6 rounded-t-2xl shadow-lg z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{getCategoryIcon(issue.category)}</span>
                <h2 className="text-3xl font-bold">{issue.title}</h2>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className={`${getStatusClass(issue.status)} shadow-lg`}>
                  {issue.status}
                </span>
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {issue.category}
                </span>
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {issue.location}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-3 transition-all transform hover:scale-110 active:scale-95"
              aria-label="Close modal"
            >
              <span className="text-2xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          {isAdmin && (
            <div className="mb-6 p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl border border-primary-200 dark:border-primary-800">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Admin Actions
              </h3>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Update Status
                  </label>
                  <select
                    value={issue.status}
                    onChange={handleStatusChange}
                    className="input"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    Delete Issue
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {issue.description}
            </p>
          </div>

          {issue.photoUrl && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Photo Evidence
              </h3>
              <img
                src={issue.photoUrl}
                alt={issue.title}
                className="w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700"
              />
            </div>
          )}

          {(issue.reporterName || issue.reporterEmail || issue.reporterPhone) && (
            <div className="mb-6 p-6 bg-gray-50 dark:bg-dark-700 rounded-2xl border border-gray-200 dark:border-dark-600">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Reporter Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {issue.reporterName && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{issue.reporterName}</p>
                  </div>
                )}
                {issue.reporterEmail && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{issue.reporterEmail}</p>
                  </div>
                )}
                {issue.reporterPhone && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{issue.reporterPhone}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mb-6 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              🕒 Reported on {formatDate(issue.createdAt)}
            </span>
            {issue.updatedAt !== issue.createdAt && (
              <span className="flex items-center gap-2">
                🔄 Updated on {formatDate(issue.updatedAt)}
              </span>
            )}
          </div>

          <CommentsSection issueId={issue.id} reporterEmail={issue.reporterEmail} />
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsModal;
