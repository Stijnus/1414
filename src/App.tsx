import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoStats from './components/TodoStats';
import { Todo } from './types/todo';
import { Trash2 } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      })) : [];
    } catch (e) {
      console.error('Error loading todos:', e);
      return [];
    }
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Memoized callbacks for better performance
  const addTodo = useCallback((text: string) => {
    setTodos(prev => [...prev, {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    }]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Optimized localStorage updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (e) {
        console.error('Error saving todos:', e);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const todoCount = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Header />
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <TodoForm onAdd={addTodo} />
          
          <TodoStats 
            completed={todoCount.completed} 
            total={todoCount.all} 
          />
          
          <TodoFilter 
            filter={filter} 
            onFilterChange={setFilter} 
            todoCount={todoCount}
          />
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
          
          {todoCount.completed > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={clearCompleted}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
                Clear completed
              </button>
            </div>
          )}
        </div>
        
        <footer className="text-center text-sm text-gray-500">
          <p>TaskMaster &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
