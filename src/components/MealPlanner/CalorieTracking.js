import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useMeals } from '../../context/MealContext';

const CALORIE_GOAL = 2000; // This could be moved to user preferences later

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const calories = payload[0].value;
    const difference = calories - CALORIE_GOAL;
    const isOverGoal = calories > CALORIE_GOAL;

    return (
      <div className="bg-background-light border border-primary/20 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-text text-sm font-medium mb-1">{label}</p>
        <p className="text-text text-sm">Calories: {calories}</p>
        <p className={`text-sm ${isOverGoal ? 'text-red-500' : 'text-green-500'}`}>
          {isOverGoal ? '+' : ''}{difference} from goal
        </p>
      </div>
    );
  }
  return null;
};

function CalorieTracking() {
  const { getDayTotals } = useMeals();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const calorieData = days.map(day => {
    const totals = getDayTotals(day);
    return {
      name: day.slice(0, 3),
      calories: totals.calories,
      difference: totals.calories - CALORIE_GOAL
    };
  });

  const weeklyStats = calorieData.reduce((stats, day) => ({
    totalCalories: stats.totalCalories + day.calories,
    daysOverGoal: stats.daysOverGoal + (day.calories > CALORIE_GOAL ? 1 : 0),
    daysUnderGoal: stats.daysUnderGoal + (day.calories < CALORIE_GOAL ? 1 : 0),
    maxCalories: Math.max(stats.maxCalories, day.calories),
    minCalories: Math.min(stats.minCalories, day.calories || Infinity)
  }), {
    totalCalories: 0,
    daysOverGoal: 0,
    daysUnderGoal: 0,
    maxCalories: 0,
    minCalories: Infinity
  });

  const averageCalories = Math.round(weeklyStats.totalCalories / 7);
  const weeklyGoal = CALORIE_GOAL * 7;
  const weeklyDifference = weeklyStats.totalCalories - weeklyGoal;

  return (
    <div className="bg-background-light rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-primary mb-6">Calorie Goal Tracking</h2>

      {/* Calorie Trend Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={calorieData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={CALORIE_GOAL} 
              stroke="#f97316" 
              strokeDasharray="3 3"
              label={{ 
                value: 'Goal', 
                position: 'right',
                fill: '#f97316',
                fontSize: 12
              }}
            />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={{ fill: '#22c55e', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-background rounded-lg p-4">
          <h3 className="text-sm text-text-muted mb-1">Weekly Average</h3>
          <p className="text-2xl font-bold text-primary">{averageCalories}</p>
          <p className="text-xs text-text-muted">calories/day</p>
        </div>
        <div className="bg-background rounded-lg p-4">
          <h3 className="text-sm text-text-muted mb-1">Weekly Total</h3>
          <p className="text-2xl font-bold text-primary">{weeklyStats.totalCalories}</p>
          <p className="text-xs text-text-muted">calories</p>
        </div>
        <div className="bg-background rounded-lg p-4">
          <h3 className="text-sm text-text-muted mb-1">Highest Day</h3>
          <p className="text-2xl font-bold text-primary">{weeklyStats.maxCalories}</p>
          <p className="text-xs text-text-muted">calories</p>
        </div>
        <div className="bg-background rounded-lg p-4">
          <h3 className="text-sm text-text-muted mb-1">Lowest Day</h3>
          <p className="text-2xl font-bold text-primary">
            {weeklyStats.minCalories === Infinity ? 0 : weeklyStats.minCalories}
          </p>
          <p className="text-xs text-text-muted">calories</p>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="bg-background rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm text-text-muted">Weekly Goal Progress</h3>
          <span className="text-sm text-text">
            {weeklyStats.totalCalories} / {weeklyGoal} calories
          </span>
        </div>
        <div className="h-2 bg-background-light rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              weeklyDifference > 0 ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((weeklyStats.totalCalories / weeklyGoal) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted">
          <span>{weeklyStats.daysUnderGoal} days under goal</span>
          <span>{weeklyStats.daysOverGoal} days over goal</span>
        </div>
      </div>
    </div>
  );
}

export default CalorieTracking; 