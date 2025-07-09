const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarkController');
const { validateBookmark } = require('../validators/validation');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// GET /api/bookmarks
router.get('/', getBookmarks);

// GET /api/bookmarks/:id
router.get('/:id', getBookmark);

// POST /api/bookmarks
router.post('/', validateBookmark, createBookmark);

// PUT /api/bookmarks/:id
router.put('/:id', validateBookmark, updateBookmark);

// DELETE /api/bookmarks/:id
router.delete('/:id', deleteBookmark);

module.exports = router;
