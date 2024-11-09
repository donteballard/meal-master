// Random ranges for nutritional values based on meal type
const NUTRITION_RANGES = {
  BREAKFAST: {
    calories: { min: 250, max: 450 },
    protein: { min: 15, max: 30 },
    carbs: { min: 30, max: 50 },
    fat: { min: 8, max: 20 },
  },
  LUNCH: {
    calories: { min: 400, max: 600 },
    protein: { min: 25, max: 40 },
    carbs: { min: 40, max: 60 },
    fat: { min: 10, max: 25 },
  },
  DINNER: {
    calories: { min: 450, max: 700 },
    protein: { min: 30, max: 45 },
    carbs: { min: 35, max: 65 },
    fat: { min: 15, max: 30 },
  },
  SNACK: {
    calories: { min: 150, max: 300 },
    protein: { min: 5, max: 15 },
    carbs: { min: 15, max: 30 },
    fat: { min: 5, max: 15 },
  },
};

// Ingredients with their dietary properties
const INGREDIENTS_INFO = {
  'olive oil': { tags: ['vegan', 'gluten-free'] },
  'salt': { tags: ['vegan', 'gluten-free'] },
  'pepper': { tags: ['vegan', 'gluten-free'] },
  'garlic': { tags: ['vegan', 'gluten-free'] },
  'onion': { tags: ['vegan', 'gluten-free'] },
  'tomatoes': { tags: ['vegan', 'gluten-free'] },
  'chicken breast': { tags: ['high-protein', 'gluten-free'] },
  'rice': { tags: ['vegan', 'gluten-free'] },
  'pasta': { tags: ['vegan'] },
  'quinoa': { tags: ['vegan', 'gluten-free'] },
  'beans': { tags: ['vegan', 'gluten-free', 'high-protein'] },
  'eggs': { tags: ['vegetarian', 'gluten-free', 'high-protein'] },
  'spinach': { tags: ['vegan', 'gluten-free'] },
  'broccoli': { tags: ['vegan', 'gluten-free'] },
  'carrots': { tags: ['vegan', 'gluten-free'] },
  'sweet potato': { tags: ['vegan', 'gluten-free'] },
  'avocado': { tags: ['vegan', 'gluten-free'] },
  'tofu': { tags: ['vegan', 'gluten-free', 'high-protein'] },
  'salmon': { tags: ['gluten-free', 'high-protein'] },
  'greek yogurt': { tags: ['vegetarian', 'gluten-free', 'high-protein'] },
  'chickpeas': { tags: ['vegan', 'gluten-free', 'high-protein'] },
  'lentils': { tags: ['vegan', 'gluten-free', 'high-protein'] },
  'almonds': { tags: ['vegan', 'gluten-free'] },
  'quinoa': { tags: ['vegan', 'gluten-free'] }
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomIngredients = () => {
  const count = getRandomNumber(4, 8);
  const ingredients = [];
  const availableIngredients = Object.keys(INGREDIENTS_INFO);
  
  while (ingredients.length < count) {
    const ingredient = availableIngredients[getRandomNumber(0, availableIngredients.length - 1)];
    if (!ingredients.includes(ingredient)) {
      ingredients.push(ingredient);
    }
  }
  
  return ingredients;
};

const generateDietaryTags = (ingredients, nutritionValues) => {
  const tags = new Set(['custom']);
  
  // Add tags based on ingredients
  let isVegan = true;
  let isVegetarian = true;
  let isGlutenFree = true;
  
  ingredients.forEach(ingredient => {
    const ingredientTags = INGREDIENTS_INFO[ingredient]?.tags || [];
    
    // Check if the meal remains vegan/vegetarian/gluten-free
    if (!ingredientTags.includes('vegan')) {
      isVegan = false;
      if (!ingredientTags.includes('vegetarian')) {
        isVegetarian = false;
      }
    }
    if (!ingredientTags.includes('gluten-free')) {
      isGlutenFree = false;
    }
    
    // Add high-protein tag if any ingredient has it
    if (ingredientTags.includes('high-protein')) {
      tags.add('high-protein');
    }
  });
  
  // Add diet type tags
  if (isVegan) tags.add('vegan');
  if (isVegetarian) tags.add('vegetarian');
  if (isGlutenFree) tags.add('gluten-free');
  
  // Add tags based on nutrition values
  if (nutritionValues.protein >= 25) tags.add('high-protein');
  if (nutritionValues.carbs <= 20) tags.add('low-carb');
  if (nutritionValues.fat <= 10) tags.add('low-fat');
  
  return Array.from(tags);
};

export const generateMockMealData = (mealName, mealType) => {
  const ranges = NUTRITION_RANGES[mealType.toUpperCase()];
  const ingredients = getRandomIngredients();
  
  const nutritionValues = {
    calories: getRandomNumber(ranges.calories.min, ranges.calories.max),
    protein: getRandomNumber(ranges.protein.min, ranges.protein.max),
    carbs: getRandomNumber(ranges.carbs.min, ranges.carbs.max),
    fat: getRandomNumber(ranges.fat.min, ranges.fat.max),
  };
  
  const dietaryTags = generateDietaryTags(ingredients, nutritionValues);
  
  return {
    id: Date.now(),
    name: mealName,
    ...nutritionValues,
    ingredients,
    dietaryTags,
    goals: ['custom'],
    prepTime: `${getRandomNumber(10, 45)} mins`,
    prepSteps: [
      `Gather all ingredients: ${ingredients.join(', ')}`,
      'Prepare and measure all ingredients according to the nutritional values',
      'Combine ingredients in a suitable cooking vessel',
      'Cook according to your preferred method',
      'Season to taste and serve'
    ],
    isCustomMeal: true
  };
}; 