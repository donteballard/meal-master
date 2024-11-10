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
      // Save survey data
      completeSurvey(data);
      // Generate meal plan
      await generatePersonalizedMealPlan(data);
      
      // Single notification for the whole process
      addNotification({
        type: 'success',
        message: 'Survey completed and meal plan generated successfully!',
        duration: 5000
      });
      
      navigate('/meal-plans');
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to complete setup. Please try again.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Setting up your personalized meal plan..." fullScreen />;
  }

  return <DietarySurvey onComplete={handleSurveyComplete} />;
}

export default SurveyWrapper; 