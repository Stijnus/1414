import React from 'react';
import { CheckCircle, Clock, BarChart } from 'lucide-react';

interface TodoStatsProps {
  completed: number;
  total: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1">
        <BarChart size={16} />
        Task Progress
      </h3>
      
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <CheckCircle size={16} className="text-green-500" />
          <span>{completed} completed</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock size={16} className="text-amber-500" />
          <span>{total - completed} remaining</span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="text-right mt-1">
        <span className="text-xs font-medium text-gray-500">{percentage}% complete</span>
      </div>
    </div>
  );
};

export default TodoStats;
