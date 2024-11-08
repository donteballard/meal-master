import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMeals } from '../../context/MealContext';

// Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-light border border-primary/20 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-text text-sm font-medium">
          {payload[0].payload.name}: {payload[0].value}g
        </p>
      </div>
    );
  }
  return null;
};

function MealStats({ day }) {
  const { getDayTotals } = useMeals();
  const totals = getDayTotals(day);

  const macroData = [
    { name: 'Protein', value: totals.protein, color: '#22c55e' },
    { name: 'Carbs', value: totals.carbs, color: '#3b82f6' },
    { name: 'Fat', value: totals.fat, color: '#f97316' }
  ];

  const targetCalories = 2000;
  const calorieProgress = (totals.calories / targetCalories) * 100;

  return (
    <div className="bg-background-light rounded-lg p-4">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-muted">Calories</span>
          <span className="text-sm text-text">{totals.calories} / {targetCalories}</span>
        </div>
        <div className="h-1.5 bg-background rounded-full">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${Math.min(calorieProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* Macro Distribution */}
      <div className="h-32 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={macroData} margin={{ top: 0, right: 0, bottom: 0, left: -32 }}>
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af"
              fontSize={10}
              tickLine={false}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false} // This removes the white overlay
            />
            <Bar 
              dataKey="value" 
              fill="#f97316"
              radius={[4, 4, 0, 0]}
              className="transition-colors hover:fill-[#ea580c]"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Macro Breakdown */}
      <div className="grid grid-cols-3 gap-2">
        {macroData.map(macro => (
          <div 
            key={macro.name}
            className="text-center p-1.5 rounded-md bg-background"
          >
            <div className="text-base font-semibold" style={{ color: macro.color }}>
              {macro.value}g
            </div>
            <div className="text-xs text-text-muted">
              {macro.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealStats;