import React, { useState, useEffect } from 'react';

const BookmarkForm = ({ bookmark, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookmark) {
      setFormData({
        url: bookmark.url || '',
        title: bookmark.title || '',
        description: bookmark.description || '',
        tags: bookmark.tags || [],
      });
    }
  }, [bookmark]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        setError(errorMessages);
      } else {
        setError('Failed to save bookmark. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bookmark-form">
      <h3>{bookmark ? 'Edit Bookmark' : 'Add New Bookmark'}</h3>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Tags:</label>
          <div className="tag-input">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button type="button" onClick={handleAddTag}>Add Tag</button>
          </div>
          <div className="tags">
            {formData.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Bookmark'}
          </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BookmarkForm;
