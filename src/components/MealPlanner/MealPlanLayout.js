import React from 'react';
import MealPlan from './MealPlan';
import QuickStats from './QuickStats';
import WeeklyOverview from './WeeklyOverview';
import CalorieTracking from './CalorieTracking';

function MealPlanLayout() {
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <QuickStats day="Monday" />
        </div>
        <div className="flex justify-center">
          <div className="bg-background-light rounded-lg p-6 w-full max-w-4xl">
            <MealPlan />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
          <div className="h-fit -mb-3 lg:mb-0">
            <WeeklyOverview />
          </div>
          <CalorieTracking />
        </div>
      </div>
    </div>
  );
}

export default MealPlanLayout; 