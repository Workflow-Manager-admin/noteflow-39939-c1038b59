import React, { useState } from 'react';
import './NoteCard.css';

// PUBLIC_INTERFACE
/**
 * NoteCard component for displaying individual note information
 * @param {Object} note - Note object with id, title, content, and created_at
 * @param {function} onEdit - Callback for editing note
 * @param {function} onDelete - Callback for deleting note
 */
const NoteCard = ({ note, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit(note);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    onDelete(note);
  };

  return (
    <div className="note-card" onClick={() => onEdit(note)}>
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>
        <div className="note-card-menu">
          <button
            className="note-card-menu-trigger"
            onClick={handleMenuToggle}
            aria-label="Note options"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="note-card-menu-dropdown">
              <button onClick={handleEdit} className="menu-item">
                <span className="menu-icon">✏️</span>
                Edit
              </button>
              <button onClick={handleDelete} className="menu-item menu-item-danger">
                <span className="menu-icon">🗑️</span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="note-card-content">
        <p>{truncateContent(note.content)}</p>
      </div>
      
      <div className="note-card-footer">
        <time className="note-card-date">
          {formatDate(note.created_at || note.timestamp)}
        </time>
        <span className="note-card-status">
          Note
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
