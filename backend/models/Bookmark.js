const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bookmark = sequelize.define('Bookmark', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const tags = this.getDataValue('tags');
      return tags ? tags.split(',') : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('tags', value.join(','));
      } else {
        this.setDataValue('tags', value);
      }
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = Bookmark;
