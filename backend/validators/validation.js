const { body } = require('express-validator');

// Registration validation
const validateRegister = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Bookmark validation
const validateBookmark = [
  body('url')
    .isURL()
    .withMessage('Please provide a valid URL'),
  body('title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters')
    .trim(),
  body('tags')
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) {
        return value.every(tag => typeof tag === 'string' && tag.trim().length > 0);
      }
      return true;
    })
    .withMessage('Tags must be an array of non-empty strings')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateBookmark
};
