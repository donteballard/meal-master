import { RECIPES } from '../data/recipes';
import { generateMockMealData } from './mealGenerator';

// Helper function to check if a recipe meets dietary restrictions
const meetsRestrictions = (recipe, restrictions) => {
  // If no restrictions or only 'NONE', all recipes are valid
  if (!restrictions.length || (restrictions.length === 1 && restrictions[0] === 'NONE')) {
    return true;
  }

  // Check if recipe meets all dietary restrictions
  return restrictions.every(restriction => {
    switch (restriction) {
      case 'VEGETARIAN':
        return recipe.dietaryTags.includes('vegetarian') || recipe.dietaryTags.includes('vegan');
      case 'VEGAN':
        return recipe.dietaryTags.includes('vegan');
      case 'GLUTEN_FREE':
        return recipe.dietaryTags.includes('gluten-free');
      case 'DAIRY_FREE':
        return !recipe.ingredients.some(ing => 
          ['milk', 'cheese', 'yogurt', 'cream', 'butter'].some(dairy => 
            ing.toLowerCase().includes(dairy)
          )
        );
      // Add more restriction checks as needed
      default:
        return true;
    }
  });
};

// Helper function to check if a recipe contains allergens or disliked ingredients
const isRecipeSafe = (recipe, allergies, dislikes) => {
  const allergyCheck = allergies.length === 0 || 
    (allergies.length === 1 && allergies[0] === 'NONE') ||
    !allergies.some(allergy => 
      recipe.ingredients.some(ing => ing.toLowerCase().includes(allergy.toLowerCase()))
    );

  const dislikeCheck = !dislikes.some(dislike =>
    recipe.ingredients.some(ing => ing.toLowerCase().includes(dislike.toLowerCase()))
  );

  return allergyCheck && dislikeCheck;
};

// Helper function to check if recipe matches user's goals
const matchesGoals = (recipe, goals) => {
  return goals.some(goal => recipe.goals.includes(goal.toLowerCase()));
};

// Helper function to filter recipes based on cooking time
const meetsTimeConstraint = (recipe, maxTime) => {
  const prepTimeMinutes = parseInt(recipe.prepTime);
  return !isNaN(prepTimeMinutes) && prepTimeMinutes <= maxTime;
};

// Helper function to get recipes for a specific meal type that meet all criteria
const getValidRecipes = (mealType, surveyData, preferences) => {
  const allRecipes = RECIPES[mealType.toLowerCase()] || [];
  
  return allRecipes.filter(recipe => 
    meetsRestrictions(recipe, preferences.dietaryRestrictions) &&
    isRecipeSafe(recipe, preferences.allergies, preferences.dislikedIngredients) &&
    matchesGoals(recipe, surveyData.goals.primary) &&
    meetsTimeConstraint(recipe, surveyData.personalInfo.maxCookingTime)
  );
};

// Main function to generate a meal plan
export const generateMealPlan = (surveyData) => {
  const { nutritionTargets, preferences } = surveyData;
  const mealsPerDay = nutritionTargets.mealsPerDay;
  const mealCalories = nutritionTargets.mealCalories;

  // Define meal types based on number of meals per day
  const getMealTypes = (numMeals) => {
    switch (numMeals) {
      case 1: return ['dinner'];
      case 2: return ['breakfast', 'dinner'];
      case 3: return ['breakfast', 'lunch', 'dinner'];
      case 4: return ['breakfast', 'lunch', 'dinner', 'snack'];
      case 5: return ['breakfast', 'snack', 'lunch', 'dinner', 'snack'];
      case 6: return ['breakfast', 'snack', 'lunch', 'snack', 'dinner', 'snack'];
      default: return ['breakfast', 'lunch', 'dinner'];
    }
  };

  const mealTypes = getMealTypes(mealsPerDay);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Generate meal plan for each day
  const mealPlan = {};
  
  days.forEach(day => {
    mealPlan[day] = {};
    mealTypes.forEach((type, index) => {
      const validRecipes = getValidRecipes(type, surveyData, preferences);
      
      if (validRecipes.length === 0) {
        // If no valid recipes found, generate a custom meal
        const customMeal = generateMockMealData(
          `Custom ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          type.toUpperCase()
        );
        mealPlan[day][type] = [{ ...customMeal, id: Date.now() + Math.random() }];
      } else {
        // Select a recipe that best matches the calorie target for this meal
        const targetCalories = mealCalories[index];
        const bestMatch = validRecipes.reduce((prev, curr) => {
          const prevDiff = Math.abs(prev.calories - targetCalories);
          const currDiff = Math.abs(curr.calories - targetCalories);
          return currDiff < prevDiff ? curr : prev;
        });
        
        mealPlan[day][type] = [{
          ...bestMatch,
          id: Date.now() + Math.random(),
          mealType: type
        }];
      }
    });
  });

  return mealPlan;
}; 