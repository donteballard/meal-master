import { convertHeightToMetric, convertWeightToMetric } from './conversions';

const calculateBMR = (weight, height, age, gender) => {
  // Mifflin-St Jeor Equation
  const bmr = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? bmr + 5 : bmr - 161;
};

const getActivityMultiplier = (activityLevel) => {
  const multipliers = {
    SEDENTARY: 1.2,      // Little or no exercise
    LIGHT: 1.375,        // Light exercise 1-3 days/week
    MODERATE: 1.55,      // Moderate exercise 3-5 days/week
    VERY: 1.725,         // Hard exercise 6-7 days/week
    EXTRA: 1.9           // Very hard exercise & physical job or training twice/day
  };
  return multipliers[activityLevel] || 1.2;
};

const calculateMacroSplit = (goals) => {
  if (goals.includes('GAIN_MUSCLE')) {
    return {
      protein: 0.3,    // 30% protein
      fat: 0.25,       // 25% fat
      carbs: 0.45      // 45% carbs
    };
  } else if (goals.includes('LOSE_WEIGHT')) {
    return {
      protein: 0.35,    // 35% protein
      fat: 0.3,         // 30% fat
      carbs: 0.35       // 35% carbs
    };
  }
  // Default/maintenance split
  return {
    protein: 0.25,     // 25% protein
    fat: 0.3,          // 30% fat
    carbs: 0.45        // 45% carbs
  };
};

const calculateDailyCalories = (tdee, goals, weeklyGoal) => {
  if (goals.includes('LOSE_WEIGHT')) {
    // Create caloric deficit (weeklyGoal is in lbs, multiply by 500 for daily deficit)
    return tdee - (parseFloat(weeklyGoal) * 500);
  } else if (goals.includes('GAIN_MUSCLE')) {
    // Create caloric surplus
    return tdee + (parseFloat(weeklyGoal) * 500);
  }
  return tdee; // Maintenance calories
};

const distributeMealCalories = (totalCalories, mealsPerDay) => {
  const mealDistribution = {
    1: [1],                    // 100%
    2: [0.6, 0.4],            // 60%, 40%
    3: [0.35, 0.4, 0.25],     // 35%, 40%, 25%
    4: [0.3, 0.3, 0.25, 0.15],// 30%, 30%, 25%, 15%
    5: [0.25, 0.25, 0.25, 0.15, 0.1], // 25%, 25%, 25%, 15%, 10%
    6: [0.2, 0.2, 0.2, 0.15, 0.15, 0.1] // 20%, 20%, 20%, 15%, 15%, 10%
  };

  const distribution = mealDistribution[mealsPerDay] || mealDistribution[3];
  return distribution.map(percentage => Math.round(totalCalories * percentage));
};

export const processSurveyData = (surveyData) => {
  // Convert measurements to metric
  const heightCm = convertHeightToMetric(
    parseInt(surveyData.heightFeet), 
    parseInt(surveyData.heightInches)
  );
  const weightKg = convertWeightToMetric(parseInt(surveyData.weightLbs));

  // Calculate BMR and TDEE
  const bmr = calculateBMR(weightKg, heightCm, parseInt(surveyData.age), surveyData.gender);
  const activityMultiplier = getActivityMultiplier(surveyData.activityLevel);
  const tdee = Math.round(bmr * activityMultiplier);

  // Calculate target calories based on goals
  const dailyCalories = calculateDailyCalories(tdee, surveyData.primaryGoal, surveyData.weeklyGoal);
  
  // Calculate macro split
  const macroSplit = calculateMacroSplit(surveyData.primaryGoal);
  
  // Calculate meal calories distribution
  const mealCalories = distributeMealCalories(dailyCalories, parseInt(surveyData.mealsPerDay));

  return {
    personalInfo: {
      age: parseInt(surveyData.age),
      gender: surveyData.gender,
      height: heightCm,
      weight: weightKg,
      activityLevel: surveyData.activityLevel,
      cookingSkill: surveyData.cookingSkill,
      maxCookingTime: parseInt(surveyData.cookingTime)
    },
    nutritionTargets: {
      dailyCalories,
      macroSplit,
      mealCalories,
      mealsPerDay: parseInt(surveyData.mealsPerDay)
    },
    preferences: {
      dietaryRestrictions: surveyData.dietaryRestrictions,
      allergies: surveyData.allergies,
      dislikedIngredients: surveyData.dislikedIngredients,
      preferredCuisines: surveyData.preferredCuisines,
      weeklyBudget: parseFloat(surveyData.weeklyBudget)
    },
    goals: {
      primary: surveyData.primaryGoal,
      targetWeight: surveyData.targetWeightLbs ? convertWeightToMetric(parseInt(surveyData.targetWeightLbs)) : null,
      weeklyGoal: parseFloat(surveyData.weeklyGoal) || 0
    }
  };
}; 