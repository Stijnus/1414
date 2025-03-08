import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';
import { ClipboardList } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <ClipboardList size={64} className="mb-4 text-gray-300" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
