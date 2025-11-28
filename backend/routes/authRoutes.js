const express = require('express');
const { login, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login - Admin login
router.post('/login', login);

// GET /api/auth/verify - Verify token
router.get('/verify', authMiddleware, verifyToken);

module.exports = router;
