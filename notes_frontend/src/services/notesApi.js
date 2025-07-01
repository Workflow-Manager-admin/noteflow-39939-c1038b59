const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://vscode-internal-1843-beta.beta01.cloud.kavia.ai:3001';

class NotesApiService {
  // PUBLIC_INTERFACE
  /**
   * Fetch all notes from the API
   * @returns {Promise<Array>} Array of notes
   */
  async getAllNotes() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new note
   * @param {Object} noteData - Note data containing title and content
   * @returns {Promise<Object>} Created note object
   */
  async createNote(noteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Update an existing note
   * @param {number} id - Note ID
   * @param {Object} noteData - Updated note data
   * @returns {Promise<Object>} Updated note object
   */
  async updateNote(id, noteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note
   * @param {number} id - Note ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteNote(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
}

export default new NotesApiService();
