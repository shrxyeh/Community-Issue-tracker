import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../services/api';
import { formatDate } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

const CommentsSection = ({ issueId, reporterEmail }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { admin } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [issueId]);

  const fetchComments = async () => {
    try {
      const response = await issuesAPI.getComments(issueId);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !authorName.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const commentData = {
        content: newComment,
        authorName: authorName,
        authorType: admin ? 'admin' : 'reporter'
      };

      await issuesAPI.addComment(issueId, commentData);
      setNewComment('');
      setAuthorName('');
      setShowCommentForm(false);
      fetchComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          Comments
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({comments.length})
          </span>
        </h3>
        {!showCommentForm && (
          <button
            onClick={() => setShowCommentForm(true)}
            className="btn btn-primary text-sm"
          >
            Add Comment
          </button>
        )}
      </div>

      {showCommentForm && (
        <div className="card mb-6 animate-slide-in border-2 border-primary-200 dark:border-primary-800">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {admin ? 'Add Admin Response' : 'Add Your Comment'}
          </h4>
          <form onSubmit={handleSubmitComment}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="input"
                placeholder={admin ? "Admin Name" : "Your Name"}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Comment
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="input min-h-[100px] resize-y"
                placeholder="Write your comment here..."
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? '⏳ Posting...' : '📤 Post Comment'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCommentForm(false);
                  setNewComment('');
                  setAuthorName('');
                }}
                className="btn btn-secondary"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {comments.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            💭 No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className={`comment-bubble animate-slide-up ${
                comment.authorType === 'admin' ? 'admin-comment' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {comment.authorType === 'admin' ? '👨‍💼' : '👤'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {comment.authorName}
                    </span>
                    {comment.authorType === 'admin' && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full shadow-sm">
                        ⭐ Admin
                      </span>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      • {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
