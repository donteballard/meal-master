// Base price ranges for different food categories
const PRICE_RANGES = {
  protein: {
    premium: { min: 8.99, max: 15.99 },    // Salmon, steak, etc.
    standard: { min: 4.99, max: 7.99 },    // Chicken, pork, etc.
    budget: { min: 2.99, max: 4.99 }       // Eggs, tofu, etc.
  },
  produce: {
    premium: { min: 3.99, max: 6.99 },     // Berries, asparagus, etc.
    standard: { min: 1.99, max: 3.99 },    // Bell peppers, tomatoes, etc.
    budget: { min: 0.99, max: 1.99 }       // Carrots, onions, etc.
  },
  grains: {
    premium: { min: 4.99, max: 7.99 },     // Quinoa, specialty rice, etc.
    standard: { min: 2.99, max: 4.99 },    // Regular rice, pasta, etc.
    budget: { min: 1.99, max: 2.99 }       // Oats, basic pasta, etc.
  },
  dairy: {
    premium: { min: 5.99, max: 8.99 },     // Specialty cheese, Greek yogurt, etc.
    standard: { min: 3.99, max: 5.99 },    // Regular cheese, milk, etc.
    budget: { min: 2.99, max: 3.99 }       // Basic milk, etc.
  },
  pantry: {
    premium: { min: 7.99, max: 12.99 },    // Olive oil, specialty sauces, etc.
    standard: { min: 3.99, max: 6.99 },    // Basic oils, sauces, etc.
    budget: { min: 1.99, max: 3.99 }       // Basic spices, etc.
  }
};

// Food categorization with tier assignments
const FOOD_CATEGORIES = {
  protein: {
    premium: ['salmon', 'steak', 'shrimp', 'tuna'],
    standard: ['chicken breast', 'pork', 'ground beef', 'turkey'],
    budget: ['eggs', 'tofu', 'chickpeas', 'lentils']
  },
  produce: {
    premium: ['berries', 'asparagus', 'avocado', 'mushrooms'],
    standard: ['bell peppers', 'tomatoes', 'spinach', 'broccoli'],
    budget: ['carrots', 'onions', 'cabbage', 'potatoes']
  },
  grains: {
    premium: ['quinoa', 'wild rice', 'specialty grains'],
    standard: ['brown rice', 'whole grain pasta', 'couscous'],
    budget: ['white rice', 'oats', 'pasta']
  },
  dairy: {
    premium: ['greek yogurt', 'specialty cheese', 'organic milk'],
    standard: ['cheese', 'yogurt', 'milk'],
    budget: ['basic milk', 'basic yogurt']
  },
  pantry: {
    premium: ['olive oil', 'maple syrup', 'nuts', 'specialty sauces'],
    standard: ['vegetable oil', 'sauces', 'seeds'],
    budget: ['spices', 'basic condiments']
  }
};

const getRandomPrice = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

const categorizeAndPriceIngredient = (ingredient) => {
  const normalizedIngredient = ingredient.toLowerCase();
  
  // Find category and tier
  for (const [category, tiers] of Object.entries(FOOD_CATEGORIES)) {
    for (const [tier, items] of Object.entries(tiers)) {
      if (items.some(item => normalizedIngredient.includes(item))) {
        const priceRange = PRICE_RANGES[category][tier];
        return {
          category,
          tier,
          estimatedPrice: getRandomPrice(priceRange.min, priceRange.max)
        };
      }
    }
  }

  // Default categorization if no match found
  return {
    category: 'pantry',
    tier: 'standard',
    estimatedPrice: getRandomPrice(PRICE_RANGES.pantry.standard.min, PRICE_RANGES.pantry.standard.max)
  };
};

// Function to generate estimated prices for all ingredients in a recipe
export const generateIngredientPrices = (ingredients) => {
  const priceMap = {};
  
  ingredients.forEach(ingredient => {
    if (!priceMap[ingredient]) {
      const { estimatedPrice } = categorizeAndPriceIngredient(ingredient);
      priceMap[ingredient] = estimatedPrice;
    }
  });

  return priceMap;
};

// Function to get a single ingredient's estimated price
export const getIngredientPrice = (ingredient) => {
  return categorizeAndPriceIngredient(ingredient).estimatedPrice;
};

// Function to estimate total recipe cost
export const estimateRecipeCost = (ingredients) => {
  return ingredients.reduce((total, ingredient) => {
    return total + getIngredientPrice(ingredient);
  }, 0);
}; 