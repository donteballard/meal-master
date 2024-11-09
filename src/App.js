import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MealPlan from './components/MealPlanner/MealPlan';
import QuickStats from './components/MealPlanner/QuickStats';
import WeeklyOverview from './components/MealPlanner/WeeklyOverview';
import CalorieTracking from './components/MealPlanner/CalorieTracking';
import DietarySurvey from './components/Survey/DietarySurvey';
import { MealProvider } from './context/MealContext';

function App() {
  return (
    <Router>
      <MealProvider>
        <div className="min-h-screen bg-background text-text">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/survey" element={<DietarySurvey onComplete={(data) => {
              console.log('Survey completed:', data);
              // TODO: Save survey data and redirect to meal plans
            }} />} />
            <Route path="/meal-plans" element={
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
            } />
          </Routes>
        </div>
      </MealProvider>
    </Router>
  );
}

export default App;
