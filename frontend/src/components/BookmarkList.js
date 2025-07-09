import React from 'react';

const BookmarkList = ({ bookmarks, onEdit, onDelete }) => {
  if (bookmarks.length === 0) {
    return (
      <div className="no-bookmarks">
        <p>No bookmarks found. Add your first bookmark to get started!</p>
      </div>
    );
  }

  return (
    <div className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="bookmark-item">
          <div className="bookmark-content">
            <h3 className="bookmark-title">
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                {bookmark.title}
              </a>
            </h3>
            <p className="bookmark-url">{bookmark.url}</p>
            {bookmark.description && (
              <p className="bookmark-description">{bookmark.description}</p>
            )}
            {bookmark.tags && bookmark.tags.length > 0 && (
              <div className="bookmark-tags">
                {bookmark.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="bookmark-meta">
              <span className="bookmark-date">
                Added: {new Date(bookmark.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="bookmark-actions">
            <button 
              className="edit-btn"
              onClick={() => onEdit(bookmark)}
            >
              Edit
            </button>
            <button 
              className="delete-btn"
              onClick={() => onDelete(bookmark.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
