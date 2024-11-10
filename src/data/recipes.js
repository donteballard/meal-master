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
      prepSteps: [
        'Boil the oats in water for 5 minutes',
        'Add the whey protein and stir until well combined',
        'Slice the banana and add it to the bowl',
        'Pour in the almond milk',
        'Top with peanut butter and serve'
      ]
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
      prepSteps: [
        'Add a layer of greek yogurt to your serving bowl',
        'Add a layer of mixed berries',
        'Sprinkle a layer of granola',
        'Repeat layers until ingredients are used up',
        'Drizzle with honey and serve'
      ]
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
      prepSteps: [
        'Toast the whole grain bread',
        'Add the avocado, eggs, and cherry tomatoes',
        'Serve and enjoy'
      ]
    },
    {
      id: 'b4',
      name: 'Tofu Scramble',
      calories: 320,
      protein: 22,
      carbs: 25,
      fat: 18,
      ingredients: ['firm tofu', 'nutritional yeast', 'turmeric', 'spinach', 'mushrooms', 'onions', 'bell peppers'],
      dietaryTags: ['vegan', 'gluten-free', 'high-protein'],
      goals: ['weight-loss', 'muscle-gain', 'maintenance'],
      prepTime: '20 mins',
      prepSteps: [
        'Crumble tofu into a bowl',
        'Heat pan and sauté onions, mushrooms, and peppers',
        'Add tofu and seasonings',
        'Add spinach and cook until wilted',
        'Serve hot'
      ]
    },
    {
      id: 'b5',
      name: 'Keto Breakfast Bowl',
      calories: 450,
      protein: 28,
      carbs: 8,
      fat: 35,
      ingredients: ['eggs', 'avocado', 'bacon', 'cherry tomatoes', 'spinach', 'cheese'],
      dietaryTags: ['keto', 'gluten-free', 'low-carb'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '15 mins',
      prepSteps: [
        'Cook bacon until crispy',
        'Scramble eggs in the same pan',
        'Slice avocado and tomatoes',
        'Arrange all ingredients in a bowl',
        'Top with cheese and serve'
      ]
    },
    {
      id: 'b6',
      name: 'Overnight Chia Pudding',
      calories: 280,
      protein: 12,
      carbs: 32,
      fat: 14,
      ingredients: ['chia seeds', 'almond milk', 'maple syrup', 'vanilla extract', 'mixed berries', 'almonds'],
      dietaryTags: ['vegan', 'gluten-free', 'dairy-free'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '5 mins + overnight',
      prepSteps: [
        'Mix chia seeds with almond milk, maple syrup, and vanilla',
        'Refrigerate overnight',
        'Top with berries and almonds before serving'
      ]
    },
    {
      id: 'b7',
      name: 'High-Protein Pancakes',
      calories: 400,
      protein: 35,
      carbs: 42,
      fat: 12,
      ingredients: ['protein powder', 'oat flour', 'egg whites', 'banana', 'baking powder', 'cinnamon'],
      dietaryTags: ['high-protein', 'vegetarian'],
      goals: ['muscle-gain', 'post-workout'],
      prepTime: '15 mins',
      prepSteps: [
        'Mix all ingredients until smooth',
        'Heat non-stick pan over medium heat',
        'Pour batter to form pancakes',
        'Cook until bubbles form, then flip',
        'Serve with desired toppings'
      ]
    },
    {
      id: 'b8',
      name: 'Mediterranean Breakfast Plate',
      calories: 380,
      protein: 18,
      carbs: 35,
      fat: 22,
      ingredients: ['hummus', 'whole grain pita', 'cucumber', 'tomatoes', 'olives', 'feta cheese', 'za\'atar'],
      dietaryTags: ['vegetarian', 'mediterranean'],
      goals: ['maintenance', 'heart-health'],
      prepTime: '10 mins',
      prepSteps: [
        'Toast pita bread',
        'Slice vegetables',
        'Arrange all ingredients on a plate',
        'Sprinkle with za\'atar',
        'Serve immediately'
      ]
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
      prepSteps: [
        'Cook the quinoa in water for 15 minutes',
        'Add the chicken breast, mixed vegetables, and olive oil',
        'Stir and serve'
      ]
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
      prepSteps: [
        'Mix the tuna, whole wheat wrap, lettuce, mayo, and tomato',
        'Serve and enjoy'
      ]
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
      prepSteps: [
        'Cook the sweet potato in the oven for 20 minutes',
        'Add the chickpeas, kale, and tahini dressing',
        'Stir and serve'
      ]
    },
    {
      id: 'l4',
      name: 'Mediterranean Chickpea Salad',
      calories: 380,
      protein: 15,
      carbs: 45,
      fat: 18,
      ingredients: ['chickpeas', 'cucumber', 'tomatoes', 'red onion', 'feta cheese', 'olive oil', 'lemon juice', 'herbs'],
      dietaryTags: ['vegetarian', 'mediterranean', 'gluten-free'],
      goals: ['weight-loss', 'heart-health'],
      prepTime: '15 mins',
      prepSteps: [
        'Drain and rinse chickpeas',
        'Chop cucumber, tomatoes, and red onion',
        'Combine all ingredients in a bowl',
        'Drizzle with olive oil and lemon juice',
        'Season with herbs and serve'
      ]
    },
    {
      id: 'l5',
      name: 'Asian Tofu Stir-Fry Bowl',
      calories: 420,
      protein: 25,
      carbs: 48,
      fat: 16,
      ingredients: ['firm tofu', 'brown rice', 'broccoli', 'carrots', 'snap peas', 'soy sauce', 'ginger', 'garlic'],
      dietaryTags: ['vegan', 'dairy-free'],
      goals: ['muscle-gain', 'weight-loss'],
      prepTime: '25 mins',
      prepSteps: [
        'Press and cube tofu',
        'Cook brown rice according to package instructions',
        'Stir-fry vegetables with ginger and garlic',
        'Add tofu and soy sauce',
        'Serve over rice'
      ]
    },
    {
      id: 'l6',
      name: 'Keto Turkey Club Lettuce Wraps',
      calories: 350,
      protein: 28,
      carbs: 6,
      fat: 24,
      ingredients: ['turkey breast', 'bacon', 'lettuce leaves', 'avocado', 'tomato', 'mayo'],
      dietaryTags: ['keto', 'low-carb', 'gluten-free'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '15 mins',
      prepSteps: [
        'Cook bacon until crispy',
        'Wash and dry lettuce leaves',
        'Layer turkey, bacon, and toppings',
        'Add mayo and serve'
      ]
    },
    {
      id: 'l7',
      name: 'Quinoa Buddha Bowl with Tahini Dressing',
      calories: 450,
      protein: 20,
      carbs: 52,
      fat: 18,
      ingredients: [
        'quinoa',
        'roasted chickpeas',
        'sweet potato',
        'kale',
        'avocado',
        'tahini',
        'lemon juice',
        'garlic'
      ],
      dietaryTags: ['vegan', 'gluten-free', 'mediterranean'],
      goals: ['weight-loss', 'heart-health'],
      prepTime: '35 mins',
      prepSteps: [
        'Cook quinoa according to package instructions',
        'Roast chickpeas and sweet potato cubes with spices',
        'Massage kale with olive oil and lemon juice',
        'Make tahini dressing by combining tahini, lemon juice, and garlic',
        'Assemble bowl and top with sliced avocado and dressing'
      ]
    },
    {
      id: 'l8',
      name: 'Spicy Chicken Fajita Bowl',
      calories: 520,
      protein: 45,
      carbs: 38,
      fat: 22,
      ingredients: [
        'chicken breast',
        'bell peppers',
        'onions',
        'cauliflower rice',
        'avocado',
        'lime',
        'cilantro',
        'Mexican spices'
      ],
      dietaryTags: ['high-protein', 'gluten-free', 'low-carb'],
      goals: ['muscle-gain', 'weight-loss'],
      prepTime: '25 mins',
      prepSteps: [
        'Season chicken breast with Mexican spices',
        'Sauté bell peppers and onions until soft',
        'Cook chicken until done',
        'Prepare cauliflower rice',
        'Assemble bowl and top with avocado, lime, and cilantro'
      ]
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
      prepSteps: [
        'Cook the sweet potato in the oven for 20 minutes',
        'Add the salmon fillet, broccoli, and olive oil',
        'Stir and serve'
      ]
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
      prepSteps: [
        'Cook the ground turkey in the oven for 20 minutes',
        'Add the zucchini, marinara sauce, and parmesan',
        'Stir and serve'
      ]
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
      prepSteps: [
        'Cook the brown rice in water for 15 minutes',
        'Add the tofu, mixed vegetables, and soy sauce',
        'Stir and serve'
      ]
    },
    {
      id: 'd4',
      name: 'Mexican Cauliflower Rice Bowl',
      calories: 420,
      protein: 32,
      carbs: 15,
      fat: 28,
      ingredients: ['ground beef', 'cauliflower rice', 'bell peppers', 'onions', 'tomatoes', 'avocado', 'Mexican spices'],
      dietaryTags: ['keto', 'low-carb', 'gluten-free'],
      goals: ['weight-loss', 'maintenance'],
      prepTime: '30 mins',
      prepSteps: [
        'Rice the cauliflower in a food processor',
        'Brown the ground beef with spices',
        'Sauté vegetables',
        'Combine all ingredients',
        'Top with avocado and serve'
      ]
    },
    {
      id: 'd5',
      name: 'High-Protein Quinoa Power Bowl',
      calories: 550,
      protein: 40,
      carbs: 55,
      fat: 22,
      ingredients: ['quinoa', 'chicken breast', 'black beans', 'sweet potato', 'kale', 'tahini dressing'],
      dietaryTags: ['gluten-free', 'high-protein'],
      goals: ['muscle-gain', 'performance'],
      prepTime: '35 mins',
      prepSteps: [
        'Cook quinoa according to package instructions',
        'Roast sweet potato cubes',
        'Grill chicken breast',
        'Sauté kale',
        'Assemble bowl and drizzle with tahini dressing'
      ]
    },
    {
      id: 'd6',
      name: 'Vegan Lentil Shepherd\'s Pie',
      calories: 380,
      protein: 18,
      carbs: 58,
      fat: 12,
      ingredients: ['lentils', 'cauliflower mash', 'carrots', 'peas', 'mushrooms', 'onions', 'vegetable broth'],
      dietaryTags: ['vegan', 'gluten-free'],
      goals: ['weight-loss', 'heart-health'],
      prepTime: '45 mins',
      prepSteps: [
        'Cook lentils in vegetable broth',
        'Steam and mash cauliflower',
        'Sauté vegetables',
        'Layer lentil mixture and cauliflower mash',
        'Bake until golden'
      ]
    },
    {
      id: 'd7',
      name: 'Grilled Salmon with Roasted Vegetables',
      calories: 480,
      protein: 42,
      carbs: 25,
      fat: 24,
      ingredients: [
        'salmon fillet',
        'asparagus',
        'cherry tomatoes',
        'garlic',
        'lemon',
        'olive oil',
        'herbs',
        'quinoa'
      ],
      dietaryTags: ['gluten-free', 'high-protein', 'mediterranean'],
      goals: ['muscle-gain', 'heart-health'],
      prepTime: '30 mins',
      prepSteps: [
        'Preheat grill or oven',
        'Season salmon with herbs, garlic, and lemon',
        'Toss vegetables with olive oil and seasonings',
        'Cook quinoa according to package instructions',
        'Grill salmon and roast vegetables until done'
      ]
    },
    {
      id: 'd8',
      name: 'Vegetarian Chickpea Curry',
      calories: 380,
      protein: 18,
      carbs: 45,
      fat: 16,
      ingredients: [
        'chickpeas',
        'coconut milk',
        'spinach',
        'tomatoes',
        'onion',
        'garlic',
        'curry spices',
        'brown rice'
      ],
      dietaryTags: ['vegan', 'gluten-free', 'vegetarian'],
      goals: ['weight-loss', 'heart-health'],
      prepTime: '35 mins',
      prepSteps: [
        'Cook brown rice according to package instructions',
        'Sauté onions and garlic until soft',
        'Add spices and toast until fragrant',
        'Add chickpeas, coconut milk, and tomatoes',
        'Simmer until thickened and add spinach at the end'
      ]
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
      prepSteps: [
        'Blend the whey protein, banana, almond milk, and spinach',
        'Serve and enjoy'
      ]
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
      prepSteps: [
        'Mix the almonds, walnuts, dried cranberries, and dark chocolate chips',
        'Serve and enjoy'
      ]
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
      prepSteps: [
        'Spread the peanut butter on the rice cakes',
        'Add the banana slices',
        'Serve and enjoy'
      ]
    },
    {
      id: 's4',
      name: 'Greek Yogurt Protein Bowl',
      calories: 250,
      protein: 20,
      carbs: 20,
      fat: 10,
      ingredients: ['Greek yogurt', 'protein powder', 'berries', 'chia seeds', 'honey'],
      dietaryTags: ['vegetarian', 'gluten-free', 'high-protein'],
      goals: ['muscle-gain', 'post-workout'],
      prepTime: '5 mins',
      prepSteps: [
        'Mix Greek yogurt with protein powder',
        'Top with berries and chia seeds',
        'Drizzle with honey'
      ]
    },
    {
      id: 's5',
      name: 'Keto Fat Bombs',
      calories: 180,
      protein: 4,
      carbs: 2,
      fat: 18,
      ingredients: ['coconut oil', 'almond butter', 'cocoa powder', 'stevia'],
      dietaryTags: ['keto', 'vegan', 'gluten-free'],
      goals: ['weight-loss', 'ketosis'],
      prepTime: '15 mins + freezing',
      prepSteps: [
        'Melt coconut oil',
        'Mix in remaining ingredients',
        'Pour into molds',
        'Freeze until solid'
      ]
    },
    {
      id: 's6',
      name: 'Pre-Workout Energy Bites',
      calories: 120,
      protein: 6,
      carbs: 15,
      fat: 6,
      ingredients: ['dates', 'oats', 'protein powder', 'peanut butter', 'chia seeds'],
      dietaryTags: ['vegetarian', 'dairy-free'],
      goals: ['pre-workout', 'energy'],
      prepTime: '15 mins',
      prepSteps: [
        'Process dates until paste-like',
        'Mix in remaining ingredients',
        'Roll into balls',
        'Refrigerate until firm'
      ]
    },
    {
      id: 's7',
      name: 'Protein-Packed Trail Mix',
      calories: 210,
      protein: 12,
      carbs: 18,
      fat: 12,
      ingredients: [
        'roasted edamame',
        'almonds',
        'pumpkin seeds',
        'dried cranberries',
        'dark chocolate chips'
      ],
      dietaryTags: ['vegetarian', 'gluten-free', 'high-protein'],
      goals: ['muscle-gain', 'energy'],
      prepTime: '5 mins',
      prepSteps: [
        'Combine all ingredients in a bowl',
        'Mix well',
        'Store in an airtight container',
        'Portion into 1/4 cup servings'
      ]
    },
    {
      id: 's8',
      name: 'Cucumber Hummus Bites',
      calories: 150,
      protein: 8,
      carbs: 12,
      fat: 9,
      ingredients: [
        'cucumber',
        'hummus',
        'cherry tomatoes',
        'za\'atar spice',
        'olive oil'
      ],
      dietaryTags: ['vegan', 'gluten-free', 'low-carb'],
      goals: ['weight-loss', 'snack'],
      prepTime: '10 mins',
      prepSteps: [
        'Slice cucumber into thick rounds',
        'Top each round with hummus',
        'Add halved cherry tomatoes',
        'Drizzle with olive oil',
        'Sprinkle with za\'atar spice'
      ]
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