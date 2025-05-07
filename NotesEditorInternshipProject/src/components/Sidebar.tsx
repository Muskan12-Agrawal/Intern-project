import  { useNotesStore } from '../store';
import { FileText, Plus } from 'lucide-react';

const Sidebar = () => {
  const { notes, activeNoteId, addNote, setActiveNote } = useNotesStore();

  return (
    <div className="w-64 border-r bg-white h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Notes</h1>
      </div>

      <div className="p-2">
        <button 
          onClick={addNote}
          className="flex items-center space-x-2 w-full p-2 rounded hover:bg-gray-100 text-gray-700"
        >
          <Plus size={18} />
          <span>New Note</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <div 
            key={note.id}
            onClick={() => setActiveNote(note.id)}
            className={`p-3 border-b cursor-pointer flex items-center space-x-2 ${
              activeNoteId === note.id ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
          >
            <FileText size={16} className="text-gray-500" />
            <span className="truncate">{note.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
 