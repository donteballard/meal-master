import { RECIPES } from '../data/recipes';

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
      case 'KETO':
        return recipe.dietaryTags.includes('keto') || recipe.carbs <= 20;
      case 'PALEO':
        return recipe.dietaryTags.includes('paleo');
      case 'NONE':
        return true;
      default:
        // For any custom dietary restrictions, check if the recipe contains the restricted ingredient
        const restrictionLower = restriction.toLowerCase();
        return !recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(restrictionLower)
        );
    }
  });
};

// Enhanced helper function to check recipe safety
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

// Enhanced helper function to match goals with weighted scoring
const getGoalScore = (recipe, goals) => {
  let score = 0;
  goals.forEach(goal => {
    switch (goal) {
      case 'LOSE_WEIGHT':
        score += recipe.calories < 400 ? 2 : 
                recipe.calories < 600 ? 1 : 0;
        score += recipe.fat < 15 ? 1 : 0;
        break;
      case 'GAIN_MUSCLE':
        score += recipe.protein > 30 ? 2 : 
                recipe.protein > 20 ? 1 : 0;
        score += recipe.calories > 400 ? 1 : 0;
        break;
      case 'IMPROVE_HEALTH':
        score += recipe.dietaryTags.includes('heart-health') ? 2 : 0;
        score += recipe.dietaryTags.some(tag => 
          ['mediterranean', 'low-fat', 'gluten-free'].includes(tag)
        ) ? 1 : 0;
        break;
      case 'ATHLETIC':
        score += recipe.protein > 25 ? 1 : 0;
        score += recipe.carbs > 40 ? 1 : 0;
        break;
      case 'MAINTAIN':
        score += recipe.calories >= 300 && recipe.calories <= 600 ? 1 : 0;
        score += recipe.protein >= 15 && recipe.protein <= 30 ? 1 : 0;
        break;
      default:
        // For any unrecognized goals, give a neutral score
        score += 0.5;
        break;
    }
  });
  return score / goals.length; // Normalize score
};

// Helper function to check cooking skill match
const getSkillScore = (recipe, userSkill) => {
  const skillLevels = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3
  };

  const recipeDifficulty = recipe.prepSteps.length <= 3 ? 1 :
                          recipe.prepSteps.length <= 5 ? 2 : 3;
  
  const userSkillLevel = skillLevels[userSkill];
  
  // Perfect match or recipe is easier than skill level
  if (recipeDifficulty <= userSkillLevel) return 1;
  
  // Recipe is one level above skill
  if (recipeDifficulty === userSkillLevel + 1) return 0.5;
  
  // Recipe is too difficult
  return 0;
};

// Helper function to check cuisine preferences
const getCuisineScore = (recipe, preferredCuisines) => {
  if (!preferredCuisines || preferredCuisines.length === 0) return 1;
  
  return recipe.dietaryTags.some(tag => 
    preferredCuisines.some(cuisine => 
      tag.toLowerCase().includes(cuisine.toLowerCase())
    )
  ) ? 1 : 0.5;
};

// Helper function to get recipes for a specific meal type that meet all criteria
const getValidRecipes = (mealType, surveyData) => {
  const { preferences, personalInfo, goals } = surveyData;
  const recipeType = mealType.toLowerCase();
  const allRecipes = RECIPES[recipeType] || [];
  
  // First filter for hard requirements
  const validRecipes = allRecipes.filter(recipe => 
    meetsRestrictions(recipe, preferences.dietaryRestrictions) &&
    isRecipeSafe(recipe, preferences.allergies, preferences.dislikedIngredients) &&
    meetsTimeConstraint(recipe, personalInfo.maxCookingTime)
  );

  // Score and sort remaining recipes
  return validRecipes.map(recipe => ({
    ...recipe,
    score: (
      getGoalScore(recipe, goals.primary) * 0.4 +    // 40% weight for goals
      getSkillScore(recipe, personalInfo.cookingSkill) * 0.3 +  // 30% weight for skill
      getCuisineScore(recipe, preferences.preferredCuisines) * 0.3  // 30% weight for cuisine
    )
  })).sort((a, b) => b.score - a.score);
};

// Helper function to filter recipes based on cooking time
const meetsTimeConstraint = (recipe, maxTime) => {
  const prepTimeMinutes = parseInt(recipe.prepTime);
  return !isNaN(prepTimeMinutes) && prepTimeMinutes <= maxTime;
};

// Main function to generate a meal plan
export const generateMealPlan = (surveyData) => {
  const { nutritionTargets } = surveyData;
  const mealsPerDay = parseInt(nutritionTargets.mealsPerDay);
  const mealCalories = nutritionTargets.mealCalories;

  // Define meal types based on number of meals per day
  const getMealTypes = (numMeals) => {
    switch (numMeals) {
      case 1: return ['dinner'];
      case 2: return ['breakfast', 'dinner'];
      case 3: return ['breakfast', 'lunch', 'dinner'];
      case 4: return ['breakfast', 'lunch', 'dinner', 'snacks'];
      case 5: return ['breakfast', 'snacks', 'lunch', 'dinner', 'snacks'];
      case 6: return ['breakfast', 'snacks', 'lunch', 'snacks', 'dinner', 'snacks'];
      default: return ['breakfast', 'lunch', 'dinner'];
    }
  };

  const mealTypes = getMealTypes(mealsPerDay);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Track used recipes to ensure variety
  const usedRecipes = new Set();
  
  // Generate meal plan for each day
  const mealPlan = {};
  
  days.forEach(day => {
    mealPlan[day] = {};
    mealTypes.forEach((type, index) => {
      const validRecipes = getValidRecipes(type, surveyData)
        .filter(recipe => !usedRecipes.has(recipe.id));
      
      if (validRecipes.length === 0) {
        // If no valid recipes found or all used, reset used recipes and try again
        usedRecipes.clear();
        const allValidRecipes = getValidRecipes(type, surveyData);
        const bestMatch = selectBestMatch(allValidRecipes, mealCalories[index]);
        
        mealPlan[day][type] = [{
          ...bestMatch,
          id: Date.now() + Math.random(),
          mealType: type
        }];
        
        usedRecipes.add(bestMatch.id);
      } else {
        const bestMatch = selectBestMatch(validRecipes, mealCalories[index]);
        
        mealPlan[day][type] = [{
          ...bestMatch,
          id: Date.now() + Math.random(),
          mealType: type
        }];
        
        usedRecipes.add(bestMatch.id);
      }
    });
  });

  return mealPlan;
};

// Helper function to select best matching recipe based on calories and score
const selectBestMatch = (recipes, targetCalories) => {
  return recipes.reduce((best, current) => {
    const currentCalorieDiff = Math.abs(current.calories - targetCalories);
    const bestCalorieDiff = Math.abs(best.calories - targetCalories);
    
    // Consider both score and calorie match
    const currentScore = current.score - (currentCalorieDiff / targetCalories) * 0.5;
    const bestScore = best.score - (bestCalorieDiff / targetCalories) * 0.5;
    
    return currentScore > bestScore ? current : best;
  });
}; 