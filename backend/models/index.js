const User = require('./User');
const Bookmark = require('./Bookmark');

// Define associations
User.hasMany(Bookmark, { foreignKey: 'userId', as: 'bookmarks' });
Bookmark.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  User,
  Bookmark
};
