import React, { useState, useEffect } from 'react';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';
import LoadingSpinner from './LoadingSpinner';
import Toast from './Toast';
import notesApi from '../services/notesApi';
import useToast from '../hooks/useToast';
import './Notes.css';

// PUBLIC_INTERFACE
/**
 * Main Notes component that handles the complete notes management interface
 */
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, showToast, removeToast } = useToast();

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Load all notes from the API
   */
  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const notesData = await notesApi.getAllNotes();
      setNotes(Array.isArray(notesData) ? notesData : []);
    } catch (error) {
      showToast('Failed to load notes. Please try again.', 'error');
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handle creating a new note
   */
  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  // PUBLIC_INTERFACE
  /**
   * Handle editing an existing note
   * @param {Object} note - Note to edit
   */
  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  // PUBLIC_INTERFACE
  /**
   * Handle deleting a note
   * @param {Object} note - Note to delete
   */
  const handleDeleteNote = async (note) => {
    if (!window.confirm(`Are you sure you want to delete "${note.title}"?`)) {
      return;
    }

    try {
      await notesApi.deleteNote(note.id);
      setNotes(prev => prev.filter(n => n.id !== note.id));
      showToast('Note deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete note. Please try again.', 'error');
      console.error('Error deleting note:', error);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handle saving a note (create or update)
   * @param {Object} noteData - Note data to save
   */
  const handleSaveNote = async (noteData) => {
    try {
      setIsModalLoading(true);
      
      if (editingNote) {
        // Update existing note
        const updatedNote = await notesApi.updateNote(editingNote.id, noteData);
        setNotes(prev => prev.map(note => 
          note.id === editingNote.id ? updatedNote : note
        ));
        showToast('Note updated successfully!', 'success');
      } else {
        // Create new note
        const newNote = await notesApi.createNote(noteData);
        setNotes(prev => [newNote, ...prev]);
        showToast('Note created successfully!', 'success');
      }
      
      setIsModalOpen(false);
      setEditingNote(null);
    } catch (error) {
      showToast('Failed to save note. Please try again.', 'error');
      console.error('Error saving note:', error);
    } finally {
      setIsModalLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handle closing the modal
   */
  const handleCloseModal = () => {
    if (isModalLoading) return; // Prevent closing while saving
    setIsModalOpen(false);
    setEditingNote(null);
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="notes-container">
      <Toast toasts={toasts} onRemove={removeToast} />
      
      <div className="notes-header">
        <div className="notes-header-content">
          <h1 className="notes-title">My Notes</h1>
          <p className="notes-subtitle">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
        
        <div className="notes-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <button 
            className="fab"
            onClick={handleCreateNote}
            aria-label="Create new note"
          >
            +
          </button>
        </div>
      </div>

      <div className="notes-content">
        {isLoading ? (
          <div className="loading-container">
            <LoadingSpinner size="large" />
            <p className="loading-text">Loading your notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="empty-state">
            {searchQuery ? (
              <>
                <div className="empty-icon">🔍</div>
                <h3>No notes found</h3>
                <p>No notes match your search query "{searchQuery}"</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <div className="empty-icon">📝</div>
                <h3>No notes yet</h3>
                <p>Create your first note to get started!</p>
                <button 
                  className="btn btn-primary"
                  onClick={handleCreateNote}
                >
                  Create Your First Note
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNote}
        note={editingNote}
        isLoading={isModalLoading}
      />
    </div>
  );
};

export default Notes;
