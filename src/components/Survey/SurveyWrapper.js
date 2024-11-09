import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeals } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import DietarySurvey from './DietarySurvey';

function SurveyWrapper() {
  const navigate = useNavigate();
  const { generatePersonalizedMealPlan } = useMeals();
  const { completeSurvey } = useAuth();

  const handleSurveyComplete = (data) => {
    // Save survey data and generate meal plan
    completeSurvey(data);
    generatePersonalizedMealPlan(data);
    navigate('/meal-plans');
  };

  return <DietarySurvey onComplete={handleSurveyComplete} />;
}

export default SurveyWrapper; 