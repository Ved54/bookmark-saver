import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { bookmarksAPI } from '../services/api';
import BookmarkForm from '../components/BookmarkForm';
import BookmarkList from '../components/BookmarkList';

const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchBookmarks();
    }
  }, [user, navigate, currentPage, searchTerm]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await bookmarksAPI.getBookmarks({
        page: currentPage,
        limit: 10,
        search: searchTerm,
      });
      setBookmarks(response.data.bookmarks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBookmark = async (bookmarkData) => {
    try {
      await bookmarksAPI.createBookmark(bookmarkData);
      setShowForm(false);
      fetchBookmarks();
    } catch (error) {
      setError('Failed to create bookmark');
    }
  };

  const handleUpdateBookmark = async (bookmarkData) => {
    try {
      await bookmarksAPI.updateBookmark(editingBookmark.id, bookmarkData);
      setEditingBookmark(null);
      setShowForm(false);
      fetchBookmarks();
    } catch (error) {
      setError('Failed to update bookmark');
    }
  };

  const handleDeleteBookmark = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await bookmarksAPI.deleteBookmark(id);
        fetchBookmarks();
      } catch (error) {
        setError('Failed to delete bookmark');
      }
    }
  };

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBookmark(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBookmarks();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bookmark Saver</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button 
            className="add-bookmark-btn"
            onClick={() => setShowForm(true)}
            disabled={showForm}
          >
            Add Bookmark
          </button>
          
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {showForm && (
          <BookmarkForm
            bookmark={editingBookmark}
            onSubmit={editingBookmark ? handleUpdateBookmark : handleCreateBookmark}
            onCancel={handleCancel}
          />
        )}

        <BookmarkList
          bookmarks={bookmarks}
          onEdit={handleEdit}
          onDelete={handleDeleteBookmark}
        />

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
