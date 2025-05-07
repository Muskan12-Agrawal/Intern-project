import  { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { useNotesStore } from '../store';
import EditorToolbar from './EditorToolbar';
import ChatButton from './ChatButton';
import ChatInterface from './ChatInterface';

const NoteEditor = () => {
  const { notes, activeNoteId, updateNoteContent, updateNoteTitle } = useNotesStore();
  const [showChat, setShowChat] = useState(false);
  const [title, setTitle] = useState('');
  
  const activeNote = notes.find(note => note.id === activeNoteId);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: activeNote?.content || '',
    onUpdate: ({ editor }) => {
      if (activeNoteId) {
        updateNoteContent(activeNoteId, editor.getHTML());
      }
    },
  });
  
  useEffect(() => {
    if (activeNote && editor) {
      editor.commands.setContent(activeNote.content);
      setTitle(activeNote.title);
    }
  }, [activeNoteId, activeNote, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (activeNoteId) {
      updateNoteTitle(activeNoteId, newTitle);
    }
  };

  if (!activeNote) return <div className="p-8 text-center">No note selected</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white border-b">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full text-2xl font-bold outline-none"
          placeholder="Untitled Note"
        />
      </div>
      
      <EditorToolbar editor={editor} />
      
      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} className="h-full" />
      </div>
      
      {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
      
      <ChatButton onClick={() => setShowChat(!showChat)} />
    </div>
  );
};

export default NoteEditor;
 