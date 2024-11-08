import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-background-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Personalized Meal Plans</h2>
          <p className="text-text-muted">
            Get customized meal plans based on your dietary preferences and goals.
          </p>
          <button 
            onClick={() => navigate('/meal-plans')}
            className="mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-text rounded-lg transition-colors"
          >
            Create Meal Plan
          </button>
        </div>

        <div className="bg-background-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Smart Grocery Lists</h2>
          <p className="text-text-muted">
            Automatically generate shopping lists from your meal plans.
          </p>
          <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-text rounded-lg transition-colors">
            View Grocery List
          </button>
        </div>

        <div className="bg-background-light rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Track Your Budget</h2>
          <p className="text-text-muted">
            Set and monitor your grocery budget with smart tracking.
          </p>
          <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-text rounded-lg transition-colors">
            Set Budget
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home; 