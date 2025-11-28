const { PrismaClient } = require('@prisma/client');
const { uploadToSupabase } = require('../utils/fileUpload');

const prisma = new PrismaClient();

// Get all issues with optional filtering
const getAllIssues = async (req, res) => {
  try {
    const { status, category, search } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }

    const issues = await prisma.issue.findMany({
      where,
      include: {
        comments: {
          select: {
            id: true,
            authorType: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate unread counts for each issue
    const issuesWithUnreadCounts = issues.map(issue => {
      const adminUnreadCount = issue.comments.filter(comment =>
        comment.authorType === 'reporter' &&
        (!issue.lastAdminView || comment.createdAt > issue.lastAdminView)
      ).length;

      const reporterUnreadCount = issue.comments.filter(comment =>
        comment.authorType === 'admin' &&
        (!issue.lastReporterView || comment.createdAt > issue.lastReporterView)
      ).length;

      return {
        ...issue,
        unreadAdminComments: adminUnreadCount,
        unreadReporterComments: reporterUnreadCount,
        totalComments: issue.comments.length
      };
    });

    res.json(issuesWithUnreadCounts);
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

// Get single issue by ID
const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    console.error('Get issue error:', error);
    res.status(500).json({ error: 'Failed to fetch issue' });
  }
};

// Create new issue
const createIssue = async (req, res) => {
  try {
    const { title, description, category, location, reporterName, reporterEmail, reporterPhone } = req.body;

    // Validate input
    if (!title || !description || !category || !location) {
      return res.status(400).json({
        error: 'Title, description, category, and location are required'
      });
    }

    // Validate category
    const validCategories = ['Electricity', 'Roads', 'Water', 'Waste', 'Safety'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: 'Invalid category. Must be one of: ' + validCategories.join(', ')
      });
    }

    let photoUrl = null;

    // Upload photo if provided
    if (req.file) {
      try {
        photoUrl = await uploadToSupabase(req.file);
      } catch (uploadError) {
        console.error('Photo upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload photo' });
      }
    }

    // Create issue
    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        category,
        location,
        photoUrl,
        reporterName,
        reporterEmail,
        reporterPhone,
        status: 'Pending'
      }
    });

    res.status(201).json({
      message: 'Issue reported successfully',
      issue
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({ error: 'Failed to create issue' });
  }
};

// Update issue status (Admin only)
const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'In-Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const issue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json({
      message: 'Issue status updated successfully',
      issue
    });
  } catch (error) {
    console.error('Update status error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.status(500).json({ error: 'Failed to update issue status' });
  }
};

// Delete issue (Admin only)
const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.issue.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    console.error('Delete issue error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.status(500).json({ error: 'Failed to delete issue' });
  }
};

// Get statistics (Admin dashboard)
const getStatistics = async (req, res) => {
  try {
    const totalIssues = await prisma.issue.count();
    const pendingIssues = await prisma.issue.count({
      where: { status: 'Pending' }
    });
    const inProgressIssues = await prisma.issue.count({
      where: { status: 'In-Progress' }
    });
    const resolvedIssues = await prisma.issue.count({
      where: { status: 'Resolved' }
    });

    // Get category-wise count
    const categoryStats = await prisma.issue.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    });

    res.json({
      total: totalIssues,
      pending: pendingIssues,
      inProgress: inProgressIssues,
      resolved: resolvedIssues,
      byCategory: categoryStats.map(stat => ({
        category: stat.category,
        count: stat._count.id
      }))
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

// Export issues to CSV (Admin only)
const exportToCSV = async (req, res) => {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Create CSV content
    const headers = ['ID', 'Title', 'Description', 'Category', 'Location', 'Status', 'Created At', 'Photo URL'];
    const csvRows = [headers.join(',')];

    issues.forEach(issue => {
      const row = [
        issue.id,
        `"${issue.title.replace(/"/g, '""')}"`,
        `"${issue.description.replace(/"/g, '""')}"`,
        issue.category,
        `"${issue.location.replace(/"/g, '""')}"`,
        issue.status,
        issue.createdAt.toISOString(),
        issue.photoUrl || ''
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=issues-export.csv');
    res.send(csvContent);
  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({ error: 'Failed to export issues' });
  }
};

// Add comment to issue
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, authorName, authorType } = req.body;

    // Validate input
    if (!content || !authorName || !authorType) {
      return res.status(400).json({
        error: 'Content, author name, and author type are required'
      });
    }

    // Validate author type
    if (!['admin', 'reporter'].includes(authorType)) {
      return res.status(400).json({
        error: 'Author type must be either "admin" or "reporter"'
      });
    }

    // Check if issue exists
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) }
    });

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        issueId: parseInt(id),
        content,
        authorName,
        authorType
      }
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Get comments for an issue
const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await prisma.comment.findMany({
      where: { issueId: parseInt(id) },
      orderBy: { createdAt: 'asc' }
    });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Mark issue as viewed (for notification tracking)
const markIssueAsViewed = async (req, res) => {
  try {
    const { id } = req.params;
    const { viewerType } = req.body; // "admin" or "reporter"

    if (!['admin', 'reporter'].includes(viewerType)) {
      return res.status(400).json({
        error: 'viewerType must be either "admin" or "reporter"'
      });
    }

    const updateData = viewerType === 'admin'
      ? { lastAdminView: new Date() }
      : { lastReporterView: new Date() };

    const issue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      message: 'Issue marked as viewed',
      issue
    });
  } catch (error) {
    console.error('Mark as viewed error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.status(500).json({ error: 'Failed to mark issue as viewed' });
  }
};

module.exports = {
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
};
