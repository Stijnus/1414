import React, { useState } from 'react';
import { Check, Trash2, Edit } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center gap-2 py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="flex-grow px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          autoFocus
        />
      ) : (
        <span 
          className={`flex-grow ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
          }`}
        >
          {todo.text}
        </span>
      )}
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
            aria-label="Edit todo"
          >
            <Edit size={18} />
          </button>
        )}
        <button 
          onClick={() => onDelete(todo.id)}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Delete todo"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
