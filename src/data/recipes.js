export const RECIPES = {
  breakfast: [
    {
      id: 'b1',
      name: 'Protein Oatmeal Bowl',
      calories: 350,
      protein: 24,
      carbs: 45,
      fat: 12,
      ingredients: ['oats', 'whey protein', 'banana', 'almond milk', 'peanut butter'],
      dietaryTags: ['vegetarian', 'high-protein'],
      goals: ['muscle-gain', 'weight-loss'],
      prepTime: '5 mins',
      prepSteps: 'Boil the oats in water for 5 minutes. Add the whey protein, banana, almond milk, and peanut butter. Stir and serve.'
    },
    {
      id: 'b2',
      name: 'Greek Yogurt Parfait',
      calories: 280,
      protein: 20,
      carbs: 35,
      fat: 8,
      ingredients: ['greek yogurt', 'mixed berries', 'granola', 'honey'],
      dietaryTags: ['vegetarian', 'low-fat'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '5 mins',
      prepSteps: 'Mix the greek yogurt, mixed berries, granola, and honey. Serve and enjoy.'
    },
    {
      id: 'b3',
      name: 'Avocado Toast with Eggs',
      calories: 420,
      protein: 22,
      carbs: 35,
      fat: 28,
      ingredients: ['whole grain bread', 'avocado', 'eggs', 'cherry tomatoes'],
      dietaryTags: ['vegetarian'],
      goals: ['muscle-gain', 'maintenance'],
      prepTime: '10 mins',
      prepSteps: 'Toast the whole grain bread. Add the avocado, eggs, and cherry tomatoes. Serve and enjoy.'
    }
  ],
  lunch: [
    {
      id: 'l1',
      name: 'Chicken Quinoa Bowl',
      calories: 450,
      protein: 35,
      carbs: 48,
      fat: 15,
      ingredients: ['chicken breast', 'quinoa', 'mixed vegetables', 'olive oil'],
      dietaryTags: ['high-protein', 'gluten-free'],
      goals: ['muscle-gain', 'weight-loss'],
      prepTime: '25 mins',
      prepSteps: 'Cook the quinoa in water for 15 minutes. Add the chicken breast, mixed vegetables, and olive oil. Stir and serve.'
    },
    {
      id: 'l2',
      name: 'Tuna Salad Wrap',
      calories: 380,
      protein: 28,
      carbs: 40,
      fat: 14,
      ingredients: ['tuna', 'whole wheat wrap', 'lettuce', 'mayo', 'tomato'],
      dietaryTags: ['high-protein'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '10 mins',
      prepSteps: 'Mix the tuna, whole wheat wrap, lettuce, mayo, and tomato. Serve and enjoy.'
    },
    {
      id: 'l3',
      name: 'Buddha Bowl',
      calories: 420,
      protein: 18,
      carbs: 65,
      fat: 16,
      ingredients: ['sweet potato', 'chickpeas', 'kale', 'tahini dressing'],
      dietaryTags: ['vegan', 'gluten-free'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '30 mins',
      prepSteps: 'Cook the sweet potato in the oven for 20 minutes. Add the chickpeas, kale, and tahini dressing. Stir and serve.'
    }
  ],
  dinner: [
    {
      id: 'd1',
      name: 'Salmon with Sweet Potato',
      calories: 520,
      protein: 42,
      carbs: 38,
      fat: 22,
      ingredients: ['salmon fillet', 'sweet potato', 'broccoli', 'olive oil'],
      dietaryTags: ['high-protein', 'gluten-free'],
      goals: ['muscle-gain', 'maintenance'],
      prepTime: '25 mins',
      prepSteps: 'Cook the sweet potato in the oven for 20 minutes. Add the salmon fillet, broccoli, and olive oil. Stir and serve.'
    },
    {
      id: 'd2',
      name: 'Turkey Meatballs with Zucchini Noodles',
      calories: 380,
      protein: 35,
      carbs: 15,
      fat: 20,
      ingredients: ['ground turkey', 'zucchini', 'marinara sauce', 'parmesan'],
      dietaryTags: ['low-carb', 'high-protein'],
      goals: ['weight-loss', 'muscle-gain'],
      prepTime: '30 mins',
      prepSteps: 'Cook the ground turkey in the oven for 20 minutes. Add the zucchini, marinara sauce, and parmesan. Stir and serve.'
    },
    {
      id: 'd3',
      name: 'Tofu Stir-Fry',
      calories: 350,
      protein: 20,
      carbs: 42,
      fat: 14,
      ingredients: ['tofu', 'brown rice', 'mixed vegetables', 'soy sauce'],
      dietaryTags: ['vegan', 'vegetarian'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '20 mins',
      prepSteps: 'Cook the brown rice in water for 15 minutes. Add the tofu, mixed vegetables, and soy sauce. Stir and serve.'
    }
  ],
  snacks: [
    {
      id: 's1',
      name: 'Protein Smoothie',
      calories: 220,
      protein: 25,
      carbs: 25,
      fat: 5,
      ingredients: ['whey protein', 'banana', 'almond milk', 'spinach'],
      dietaryTags: ['vegetarian', 'high-protein'],
      goals: ['muscle-gain', 'post-workout'],
      prepTime: '5 mins',
      prepSteps: 'Blend the whey protein, banana, almond milk, and spinach. Serve and enjoy.'
    },
    {
      id: 's2',
      name: 'Mixed Nuts and Dried Fruit',
      calories: 180,
      protein: 6,
      carbs: 15,
      fat: 14,
      ingredients: ['almonds', 'walnuts', 'dried cranberries', 'dark chocolate chips'],
      dietaryTags: ['vegan', 'gluten-free'],
      goals: ['maintenance', 'energy'],
      prepTime: '0 mins',
      prepSteps: 'Mix the almonds, walnuts, dried cranberries, and dark chocolate chips. Serve and enjoy.'
    },
    {
      id: 's3',
      name: 'Rice Cakes with Peanut Butter',
      calories: 160,
      protein: 7,
      carbs: 18,
      fat: 8,
      ingredients: ['rice cakes', 'peanut butter', 'banana slices'],
      dietaryTags: ['gluten-free', 'vegetarian'],
      goals: ['pre-workout', 'weight-loss'],
      prepTime: '2 mins',
      prepSteps: 'Spread the peanut butter on the rice cakes. Add the banana slices. Serve and enjoy.'
    }
  ]
};

export const DIETARY_TAGS = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'high-protein',
  'low-carb',
  'low-fat'
];

export const FITNESS_GOALS = [
  'weight-loss',
  'muscle-gain',
  'maintenance',
  'performance'
]; 