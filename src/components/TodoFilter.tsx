import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    all: number;
    active: number;
    completed: number;
  };
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange, todoCount }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
            filter === 'all'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          All
          <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
            {todoCount.all}
          </span>
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'active'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Active
          <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
            {todoCount.active}
          </span>
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Completed
          <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full">
            {todoCount.completed}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;
