const express = require('express');
const {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssueStatus,
  deleteIssue,
  getStatistics,
  exportToCSV,
  addComment,
  getComments,
  markIssueAsViewed
} = require('../controllers/issueController');
const authMiddleware = require('../middleware/auth');
const { upload } = require('../utils/fileUpload');

const router = express.Router();

// Public routes
router.get('/', getAllIssues);
router.get('/stats', getStatistics);
router.get('/:id', getIssueById);
router.post('/', upload.single('photo'), createIssue);
router.get('/:id/comments', getComments);
router.post('/:id/comments', addComment);
router.post('/:id/mark-viewed', markIssueAsViewed);

// Admin protected routes
router.patch('/:id/status', authMiddleware, updateIssueStatus);
router.delete('/:id', authMiddleware, deleteIssue);
router.get('/export/csv', authMiddleware, exportToCSV);

module.exports = router;
