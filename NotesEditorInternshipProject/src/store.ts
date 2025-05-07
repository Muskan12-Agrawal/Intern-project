import  { create } from 'zustand';
import { Note, Message } from './types';

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  addNote: () => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  setActiveNote: (id: string) => void;
  addMessage: (noteId: string, content: string, isUser: boolean) => void;
}

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome Note',
    content: '<h1>Welcome to Notes Editor!</h1><p>This is your first note. You can edit it or create a new one.</p><ul><li>Use the editor toolbar to format text</li><li>Try creating headings, lists, and more</li></ul>',
    messages: [],
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: '<h2>Team Meeting - June 12</h2><p>Key points discussed:</p><ol><li>Project timeline update</li><li>New feature requests</li><li>Budget approval</li></ol>',
    messages: [],
  }
];

export const useNotesStore = create<NotesState>((set) => ({
  notes: initialNotes,
  activeNoteId: '1',
  
  addNote: () => set((state) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '<p>Start writing...</p>',
      messages: [],
    };
    
    return { 
      notes: [...state.notes, newNote],
      activeNoteId: newNote.id
    };
  }),
  
  updateNoteTitle: (id, title) => set((state) => ({
    notes: state.notes.map((note) => 
      note.id === id ? { ...note, title } : note
    ),
  })),
  
  updateNoteContent: (id, content) => set((state) => ({
    notes: state.notes.map((note) => 
      note.id === id ? { ...note, content } : note
    ),
  })),
  
  setActiveNote: (id) => set({ activeNoteId: id }),
  
  addMessage: (noteId, content, isUser) => set((state) => ({
    notes: state.notes.map((note) => 
      note.id === noteId 
        ? { 
            ...note, 
            messages: [
              ...note.messages, 
              { 
                id: Date.now().toString(), 
                content, 
                isUser 
              }
            ] 
          } 
        : note
    ),
  })),
}));
 