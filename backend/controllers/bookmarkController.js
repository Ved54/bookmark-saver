const { validationResult } = require('express-validator');
const { Bookmark } = require('../models');
const { Op } = require('sequelize');

// Get all bookmarks for the authenticated user
const getBookmarks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', tag = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { userId: req.user.id };
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (tag) {
      whereClause.tags = { [Op.like]: `%${tag}%` };
    }

    const bookmarks = await Bookmark.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      bookmarks: bookmarks.rows,
      totalPages: Math.ceil(bookmarks.count / limit),
      currentPage: parseInt(page),
      totalBookmarks: bookmarks.count
    });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single bookmark
const getBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json(bookmark);
  } catch (error) {
    console.error('Get bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new bookmark
const createBookmark = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ 
        message: errorMessages.join(', '),
        errors: errors.array() 
      });
    }

    const { url, title, description, tags } = req.body;

    const bookmark = await Bookmark.create({
      url,
      title,
      description,
      tags,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Bookmark created successfully',
      bookmark
    });
  } catch (error) {
    console.error('Create bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update bookmark
const updateBookmark = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ 
        message: errorMessages.join(', '),
        errors: errors.array() 
      });
    }

    const bookmark = await Bookmark.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    const { url, title, description, tags } = req.body;

    await bookmark.update({
      url,
      title,
      description,
      tags
    });

    res.json({
      message: 'Bookmark updated successfully',
      bookmark
    });
  } catch (error) {
    console.error('Update bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete bookmark
const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    await bookmark.destroy();

    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Delete bookmark error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark
};
