import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './NoteModal.css';

// PUBLIC_INTERFACE
/**
 * NoteModal component for creating and editing notes
 * @param {boolean} isOpen - Whether modal is open
 * @param {function} onClose - Callback to close modal
 * @param {function} onSave - Callback to save note
 * @param {Object} note - Note object for editing (null for creating)
 * @param {boolean} isLoading - Loading state
 */
const NoteModal = ({ isOpen, onClose, onSave, note = null, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
    } else {
      setTitle('');
      setContent('');
    }
    setErrors({});
  }, [note, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const noteData = {
      title: title.trim(),
      content: content.trim(),
    };
    
    onSave(noteData);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button 
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            disabled={isLoading}
          >
            <FiX />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="note-title" className="form-label">
              Title *
            </label>
            <input
              id="note-title"
              type="text"
              className={`form-input ${errors.title ? 'form-input-error' : ''}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              disabled={isLoading}
              autoFocus
            />
            {errors.title && (
              <span className="form-error">{errors.title}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="note-content" className="form-label">
              Content *
            </label>
            <textarea
              id="note-content"
              className={`form-textarea ${errors.content ? 'form-input-error' : ''}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={8}
              disabled={isLoading}
            />
            {errors.content && (
              <span className="form-error">{errors.content}</span>
            )}
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (note ? 'Update Note' : 'Create Note')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
