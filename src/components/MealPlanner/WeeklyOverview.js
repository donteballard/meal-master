import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMeals } from '../../context/MealContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-light border border-primary/20 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-text text-sm font-medium mb-1">{label}</p>
        <p className="text-text text-sm">
          Calories: {payload[0].value}
        </p>
        <p className="text-text text-sm">
          Protein: {payload[1].value}g
        </p>
      </div>
    );
  }
  return null;
};

function WeeklyOverview() {
  const { getDayTotals } = useMeals();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const weekData = days.map(day => {
    const totals = getDayTotals(day);
    return {
      name: day.slice(0, 3),
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fat: totals.fat
    };
  });

  const weeklyTotals = weekData.reduce((acc, day) => ({
    calories: acc.calories + day.calories,
    protein: acc.protein + day.protein,
    carbs: acc.carbs + day.carbs,
    fat: acc.fat + day.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const dailyAverage = {
    calories: Math.round(weeklyTotals.calories / 7),
    protein: Math.round(weeklyTotals.protein / 7),
    carbs: Math.round(weeklyTotals.carbs / 7),
    fat: Math.round(weeklyTotals.fat / 7)
  };

  return (
    <div className="bg-background-light rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-primary mb-3">Weekly Overview</h2>
      
      {/* Chart Container */}
      <div className="h-32 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weekData}>
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="#f97316" 
              strokeWidth={2}
              dot={{ fill: '#f97316', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="protein" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={{ fill: '#22c55e', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-background rounded-lg p-2">
          <h3 className="text-sm text-text-muted">Weekly Total</h3>
          <p className="text-lg font-bold text-primary">{weeklyTotals.calories}</p>
          <p className="text-xs text-text-muted">calories</p>
        </div>
        <div className="bg-background rounded-lg p-2">
          <h3 className="text-sm text-text-muted">Daily Average</h3>
          <p className="text-lg font-bold text-primary">{dailyAverage.calories}</p>
          <p className="text-xs text-text-muted">calories</p>
        </div>
        <div className="bg-background rounded-lg p-2">
          <h3 className="text-sm text-text-muted">Protein Average</h3>
          <p className="text-lg font-bold text-[#22c55e]">{dailyAverage.protein}g</p>
          <p className="text-xs text-text-muted">per day</p>
        </div>
        <div className="bg-background rounded-lg p-2">
          <h3 className="text-sm text-text-muted">Carbs Average</h3>
          <p className="text-lg font-bold text-[#3b82f6]">{dailyAverage.carbs}g</p>
          <p className="text-xs text-text-muted">per day</p>
        </div>
      </div>
    </div>
  );
}

export default WeeklyOverview;