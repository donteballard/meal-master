import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeals } from '../../context/MealContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../common/Notifications';
import LoadingState from '../common/LoadingState';
import DietarySurvey from './DietarySurvey';

function SurveyWrapper() {
  const navigate = useNavigate();
  const { generatePersonalizedMealPlan } = useMeals();
  const { completeSurvey } = useAuth();
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleSurveyComplete = async (data) => {
    try {
      setIsLoading(true);
      // Save survey data and generate meal plan
      completeSurvey(data);
      generatePersonalizedMealPlan(data);
      
      addNotification({
        type: 'success',
        message: 'Your meal plan has been generated successfully!',
        duration: 5000
      });
      
      navigate('/meal-plans');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to generate meal plan. Please try again.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Generating your personalized meal plan..." fullScreen />;
  }

  return <DietarySurvey onComplete={handleSurveyComplete} />;
}

export default SurveyWrapper; 