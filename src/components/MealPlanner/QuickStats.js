import React from 'react';
import { useMeals } from '../../context/MealContext';

function QuickStats({ day }) {
  const { getDayTotals } = useMeals();
  const totals = getDayTotals(day);

  const targets = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  };

  const stats = [
    {
      label: 'Calories',
      current: totals.calories,
      target: targets.calories,
      color: 'text-primary',
      bgColor: 'bg-primary'
    },
    {
      label: 'Protein',
      current: totals.protein,
      target: targets.protein,
      color: 'text-[#22c55e]',
      bgColor: 'bg-[#22c55e]',
      unit: 'g'
    },
    {
      label: 'Carbs',
      current: totals.carbs,
      target: targets.carbs,
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#3b82f6]',
      unit: 'g'
    },
    {
      label: 'Fat',
      current: totals.fat,
      target: targets.fat,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
      unit: 'g'
    }
  ];

  // Calculate remaining values
  const remaining = {
    calories: targets.calories - totals.calories,
    protein: targets.protein - totals.protein
  };

  return (
    <div className="bg-background-light rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Quick Stats</h2>
        <div className="flex gap-3">
          <span className={`px-3 py-1 rounded-full text-sm ${
            remaining.calories >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          }`}>
            {Math.abs(remaining.calories)} kcal {remaining.calories >= 0 ? 'remaining' : 'exceeded'}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            remaining.protein >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          }`}>
            {Math.abs(remaining.protein)}g protein {remaining.protein >= 0 ? 'remaining' : 'exceeded'}
          </span>
        </div>
      </div>

      {/* Macro Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-background rounded-lg p-4">
            <h4 className="text-sm text-text-muted mb-1">{stat.label}</h4>
            <div className="flex items-baseline gap-1">
              <p className={`text-xl font-bold ${stat.color}`}>
                {stat.current}
              </p>
              <p className="text-sm text-text-muted">
                / {stat.target}{stat.unit || ' kcal'}
              </p>
            </div>
            <div className="mt-2 h-1 bg-background-light rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  stat.current > stat.target ? 'bg-red-500' : stat.bgColor
                }`}
                style={{ 
                  width: `${Math.min((stat.current / stat.target) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickStats; 