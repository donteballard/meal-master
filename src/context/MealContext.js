import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { RECIPES } from '../data/recipes';
import { generateMealPlan } from '../utils/mealPlanGenerator';

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
  SNACK: 'snack'
};

// Initial state
const initialState = {
  mealsByDay: {
    Monday: {
      breakfast: [{ ...RECIPES.breakfast[0], id: Date.now() + Math.random(), mealType: 'breakfast' }],
      lunch: [{ ...RECIPES.lunch[0], id: Date.now() + Math.random(), mealType: 'lunch' }],
      dinner: [{ ...RECIPES.dinner[0], id: Date.now() + Math.random(), mealType: 'dinner' }],
      snack: [{ ...RECIPES.snacks[0], id: Date.now() + Math.random(), mealType: 'snack' }]
    },
    Tuesday: {
      breakfast: [{ ...RECIPES.breakfast[1], id: Date.now() + Math.random(), mealType: 'breakfast' }],
      lunch: [{ ...RECIPES.lunch[1], id: Date.now() + Math.random(), mealType: 'lunch' }],
      dinner: [{ ...RECIPES.dinner[1], id: Date.now() + Math.random(), mealType: 'dinner' }],
      snack: [{ ...RECIPES.snacks[1], id: Date.now() + Math.random(), mealType: 'snack' }]
    },
    Wednesday: {
      breakfast: [{ ...RECIPES.breakfast[2], id: Date.now() + Math.random(), mealType: 'breakfast' }],
      lunch: [{ ...RECIPES.lunch[2], id: Date.now() + Math.random(), mealType: 'lunch' }],
      dinner: [{ ...RECIPES.dinner[2], id: Date.now() + Math.random(), mealType: 'dinner' }],
      snack: [{ ...RECIPES.snacks[2], id: Date.now() + Math.random(), mealType: 'snack' }]
    },
    Thursday: {
      breakfast: [{ ...RECIPES.breakfast[0], id: Date.now() + Math.random(), mealType: 'breakfast' }],
      lunch: [{ ...RECIPES.lunch[0], id: Date.now() + Math.random(), mealType: 'lunch' }],
      dinner: [{ ...RECIPES.dinner[0], id: Date.now() + Math.random(), mealType: 'dinner' }],
      snack: [{ ...RECIPES.snacks[0], id: Date.now() + Math.random(), mealType: 'snack' }]
    },
    Friday: {
      breakfast: [{ ...RECIPES.breakfast[1], id: Date.now() + Math.random(), mealType: 'breakfast' }],
      lunch: [{ ...RECIPES.lunch[1], id: Date.now() + Math.random(), mealType: 'lunch' }],
      dinner: [{ ...RECIPES.dinner[1], id: Date.now() + Math.random(), mealType: 'dinner' }],
      snack: [{ ...RECIPES.snacks[1], id: Date.now() + Math.random(), mealType: 'snack' }]
    },
    Saturday: {
      breakfast: [{ ...RECIPES.breakfast[2], id: Date.now() + Math.random(), mealType: 'breakfast' }],
      lunch: [{ ...RECIPES.lunch[2], id: Date.now() + Math.random(), mealType: 'lunch' }],
      dinner: [{ ...RECIPES.dinner[2], id: Date.now() + Math.random(), mealType: 'dinner' }],
      snack: [{ ...RECIPES.snacks[2], id: Date.now() + Math.random(), mealType: 'snack' }]
    },
    Sunday: {
      breakfast: [{ ...RECIPES.breakfast[0], id: Date.now() + Math.random(), mealType: 'breakfast' }],
      lunch: [{ ...RECIPES.lunch[0], id: Date.now() + Math.random(), mealType: 'lunch' }],
      dinner: [{ ...RECIPES.dinner[0], id: Date.now() + Math.random(), mealType: 'dinner' }],
      snack: [{ ...RECIPES.snacks[0], id: Date.now() + Math.random(), mealType: 'snack' }]
    }
  }
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
            ...state.mealsByDay[action.payload.day],
            [action.payload.meal.mealType]: [
              ...state.mealsByDay[action.payload.day][action.payload.meal.mealType],
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

  // Load meals and survey data from localStorage on mount
  useEffect(() => {
    const savedMeals = localStorage.getItem('mealPlan');
    const savedSurveyData = localStorage.getItem('surveyData');
    
    if (savedSurveyData && savedMeals) {
      // If we have both survey data and meal plan, load them
      setSurveyData(JSON.parse(savedSurveyData));
      dispatch({ type: SET_MEALS, payload: JSON.parse(savedMeals) });
    } else if (!savedMeals) {
      // If no saved meal plan, use default
      generateDefaultMealPlan();
    }
  }, []);

  // Save meals to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(state.mealsByDay));
  }, [state.mealsByDay]);

  // Generate personalized meal plan based on survey data
  const generatePersonalizedMealPlan = (newSurveyData) => {
    setSurveyData(newSurveyData);
    const personalizedPlan = generateMealPlan(newSurveyData);
    dispatch({ type: SET_MEALS, payload: personalizedPlan });
    localStorage.setItem('mealPlan', JSON.stringify(personalizedPlan));
  };

  // Generate default meal plan with variety
  const generateDefaultMealPlan = () => {
    const defaultPlan = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach((day, index) => {
      // Rotate through recipes to add variety
      const recipeIndex = index % 3; // We have 3 recipes for each type
      defaultPlan[day] = {
        breakfast: [{ ...RECIPES.breakfast[recipeIndex], id: Date.now() + Math.random(), mealType: 'breakfast' }],
        lunch: [{ ...RECIPES.lunch[recipeIndex], id: Date.now() + Math.random(), mealType: 'lunch' }],
        dinner: [{ ...RECIPES.dinner[recipeIndex], id: Date.now() + Math.random(), mealType: 'dinner' }],
        snack: [{ ...RECIPES.snacks[recipeIndex], id: Date.now() + Math.random(), mealType: 'snack' }]
      };
    });

    dispatch({ type: SET_MEALS, payload: defaultPlan });
  };

  // Helper functions
  const addMeal = (day, meal) => {
    dispatch({ type: ADD_MEAL, payload: { day, meal } });
  };

  const removeMeal = (day, mealId, mealType) => {
    dispatch({ 
      type: REMOVE_MEAL, 
      payload: { day, mealId, mealType }  // Make sure mealType is included
    });
  };

  const getDayMeals = (day, mealType) => {
    return state.mealsByDay[day]?.[mealType] || [];
  };

  const getDayTotals = (day) => {
    const mealTypes = Object.values(MEAL_TYPES);
    return mealTypes.reduce((dayTotals, type) => {
      const meals = state.mealsByDay[day]?.[type] || [];
      return meals.reduce((totals, meal) => ({
        calories: totals.calories + Number(meal.calories),
        protein: totals.protein + Number(meal.protein),
        carbs: totals.carbs + Number(meal.carbs),
        fat: totals.fat + Number(meal.fat),
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
      generateDefaultMealPlan,
      generatePersonalizedMealPlan,
      surveyData
    }}>
      {children}
    </MealContext.Provider>
  );
}

// Custom hook to use the meal context
export function useMeals() {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealProvider');
  }
  return context;
} 