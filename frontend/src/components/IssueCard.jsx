import React from 'react';
import { formatDate, getStatusClass, getCategoryIcon } from '../utils/helpers';

const IssueCard = ({ issue, onStatusChange, onDelete, isAdmin, onClick }) => {
  const handleStatusChange = (e) => {
    e.stopPropagation();
    if (onStatusChange) {
      onStatusChange(issue.id, e.target.value);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete && window.confirm('Are you sure you want to delete this issue?')) {
      onDelete(issue.id);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(issue.id);
    }
  };

  return (
    <div
      className="card-uniform cursor-pointer animate-fade-in group hover:-translate-y-2"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
              {getCategoryIcon(issue.category)}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {issue.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={getStatusClass(issue.status)}>{issue.status}</span>

            {/* Total comments badge */}
            {issue.totalComments > 0 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {issue.totalComments}
              </span>
            )}

            {/* WhatsApp-style notification badge for admins */}
            {isAdmin && issue.unreadAdminComments > 0 && (
              <span className="relative inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-bold shadow-lg animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                {issue.unreadAdminComments} New
              </span>
            )}

            {/* WhatsApp-style notification badge for reporters */}
            {!isAdmin && issue.unreadReporterComments > 0 && (
              <span className="relative inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-bold shadow-lg animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                {issue.unreadReporterComments} New
              </span>
            )}
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <select
              value={issue.status}
              onChange={handleStatusChange}
              className="input text-sm py-1 px-2 h-9"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <button
              onClick={handleDelete}
              className="btn btn-danger text-sm py-1 px-3 h-9"
              aria-label="Delete issue"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
        {issue.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-dark-700 px-3 py-1.5 rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium truncate max-w-[150px]">{issue.location}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-dark-700 px-3 py-1.5 rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="font-medium">{issue.category}</span>
        </div>
      </div>

      {issue.photoUrl && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={issue.photoUrl}
            alt={issue.title}
            className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-dark-600 mt-auto">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="truncate">{formatDate(issue.createdAt)}</span>
        </span>
        <span className="text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
          View Details
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
