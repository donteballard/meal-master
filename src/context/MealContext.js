import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { generateMealPlan } from '../utils/mealPlanGenerator';
import { useNotification } from '../components/common/Notifications';

const MealContext = createContext();

// Action types
const ADD_MEAL = 'ADD_MEAL';
const REMOVE_MEAL = 'REMOVE_MEAL';
const SET_MEALS = 'SET_MEALS';

// Add meal type constants
export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACKS: 'snacks'
};

// Initial state with empty meal plan
const initialState = {
  mealsByDay: {}
};

// Reducer
function mealReducer(state, action) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        ...state,
        mealsByDay: {
          ...state.mealsByDay,
          [action.payload.day]: {
            ...state.mealsByDay[action.payload.day] || {},
            [action.payload.meal.mealType]: [
              ...(state.mealsByDay[action.payload.day]?.[action.payload.meal.mealType] || []),
              { ...action.payload.meal, id: Date.now() }
            ]
          }
        }
      };
    
    case REMOVE_MEAL:
      return {
        ...state,
        mealsByDay: {
          ...state.mealsByDay,
          [action.payload.day]: {
            ...state.mealsByDay[action.payload.day],
            [action.payload.mealType]: state.mealsByDay[action.payload.day][action.payload.mealType]
              .filter(meal => meal.id !== action.payload.mealId)
          }
        }
      };

    case SET_MEALS:
      return {
        ...state,
        mealsByDay: action.payload
      };

    default:
      return state;
  }
}

export function MealProvider({ children }) {
  const [state, dispatch] = useReducer(mealReducer, initialState);
  const [surveyData, setSurveyData] = useState(null);
  const { addNotification } = useNotification();

  // Load meals and survey data from localStorage on mount
  useEffect(() => {
    const savedMeals = localStorage.getItem('mealPlan');
    const savedSurveyData = localStorage.getItem('surveyData');
    
    if (savedSurveyData && savedMeals) {
      // If we have both survey data and meal plan, load them
      setSurveyData(JSON.parse(savedSurveyData));
      dispatch({ type: SET_MEALS, payload: JSON.parse(savedMeals) });
    }
  }, []);

  // Save meals to localStorage when state changes
  useEffect(() => {
    if (Object.keys(state.mealsByDay).length > 0) {
      localStorage.setItem('mealPlan', JSON.stringify(state.mealsByDay));
    }
  }, [state.mealsByDay]);

  // Generate personalized meal plan based on survey data
  const generatePersonalizedMealPlan = (newSurveyData) => {
    try {
      setSurveyData(newSurveyData);
      const personalizedPlan = generateMealPlan(newSurveyData);
      dispatch({ type: SET_MEALS, payload: personalizedPlan });
      localStorage.setItem('mealPlan', JSON.stringify(personalizedPlan));
      
      // Only show notification if this is an update, not initial generation
      if (state.mealsByDay && Object.keys(state.mealsByDay).length > 0) {
        addNotification({
          type: 'success',
          message: 'Your meal plan has been updated successfully!',
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Error generating meal plan:', error);
      addNotification({
        type: 'error',
        message: 'Failed to generate meal plan. Please try again.',
        duration: 5000
      });
    }
  };

  // Helper functions
  const addMeal = (day, meal) => {
    const correctedMealType = meal.mealType === 'snack' ? 'snacks' : meal.mealType;
    
    dispatch({
      type: ADD_MEAL,
      payload: {
        day,
        meal: { ...meal, mealType: correctedMealType }
      }
    });
  };

  const removeMeal = (day, mealId, mealType) => {
    dispatch({ 
      type: REMOVE_MEAL, 
      payload: { day, mealId, mealType }
    });
  };

  const getDayMeals = (day, mealType) => {
    return state.mealsByDay[day]?.[mealType] || [];
  };

  const getDayTotals = (day) => {
    if (!state.mealsByDay[day]) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    return Object.values(state.mealsByDay[day]).reduce((dayTotals, meals) => {
      return meals.reduce((totals, meal) => ({
        calories: totals.calories + Number(meal.calories || 0),
        protein: totals.protein + Number(meal.protein || 0),
        carbs: totals.carbs + Number(meal.carbs || 0),
        fat: totals.fat + Number(meal.fat || 0),
      }), dayTotals);
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <MealContext.Provider value={{
      mealsByDay: state.mealsByDay,
      addMeal,
      removeMeal,
      getDayMeals,
      getDayTotals,
      generatePersonalizedMealPlan,
      surveyData
    }}>
      {children}
    </MealContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealProvider');
  }
  return context;
} 