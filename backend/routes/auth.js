const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/validation');
const auth = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/login
router.post('/login', validateLogin, login);

// GET /api/auth/me
router.get('/me', auth, getCurrentUser);

module.exports = router;
