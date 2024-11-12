import React, { useState, useEffect } from 'react';
import { useMeals } from '../../context/MealContext';
import { motion } from 'framer-motion';
import { getIngredientPrice } from '../../utils/priceEstimator';

function GroceryList() {
  const { mealsByDay } = useMeals();
  const [groceryList, setGroceryList] = useState({});
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const aggregateIngredients = () => {
      const ingredients = {};
      let totalCost = 0;
      let itemCount = 0;

      Object.values(mealsByDay).forEach(day => {
        Object.values(day).forEach(meals => {
          meals.forEach(meal => {
            meal.ingredients.forEach(ingredient => {
              const normalizedIngredient = ingredient.toLowerCase();
              if (ingredients[normalizedIngredient]) {
                ingredients[normalizedIngredient].count += 1;
                itemCount += 1;
              } else {
                const estimatedPrice = getIngredientPrice(ingredient);
                ingredients[normalizedIngredient] = {
                  name: ingredient,
                  count: 1,
                  category: categorizeIngredient(normalizedIngredient),
                  estimatedCost: estimatedPrice
                };
                itemCount += 1;
              }
              totalCost += getIngredientPrice(ingredient);
            });
          });
        });
      });

      setGroceryList(groupByCategory(ingredients));
      setEstimatedCost(totalCost);
      setTotalItems(itemCount);
    };

    aggregateIngredients();
  }, [mealsByDay]);

  const handleDeleteItem = (category, itemName) => {
    setGroceryList(prevList => {
      const newList = { ...prevList };
      const items = newList[category].filter(item => item.name !== itemName);
      
      if (items.length === 0) {
        delete newList[category];
      } else {
        newList[category] = items;
      }

      // Recalculate total cost and items
      let newTotalCost = 0;
      let newTotalItems = 0;
      Object.values(newList).forEach(categoryItems => {
        categoryItems.forEach(item => {
          newTotalCost += item.estimatedCost * item.count;
          newTotalItems += item.count;
        });
      });

      setEstimatedCost(newTotalCost);
      setTotalItems(newTotalItems);

      return newList;
    });
  };

  const categorizeIngredient = (ingredient) => {
    const categories = {
      protein: [
        'chicken', 'beef', 'fish', 'tofu', 'eggs', 'salmon', 'tuna', 'turkey', 
        'bacon', 'whey protein', 'protein powder', 'edamame', 'chickpeas', 'lentils',
        'egg whites'
      ],
      produce: [
        'tomato', 'lettuce', 'cucumber', 'carrot', 'spinach', 'avocado', 'banana',
        'berries', 'apple', 'kale', 'broccoli', 'bell pepper', 'onion', 'garlic',
        'sweet potato', 'mushroom', 'zucchini', 'asparagus', 'peas', 'cherry tomatoes',
        'mixed vegetables', 'cauliflower', 'olives', 'snap peas'
      ],
      grains: [
        'rice', 'quinoa', 'pasta', 'bread', 'oats', 'granola', 'rice cakes',
        'whole grain', 'brown rice', 'oat flour', 'pita'
      ],
      dairy: [
        'milk', 'cheese', 'yogurt', 'butter', 'greek yogurt', 'feta', 'parmesan',
        'almond milk', 'coconut milk'
      ],
      pantry: [
        'oil', 'sauce', 'nuts', 'seeds', 'peanut butter', 'almond butter',
        'honey', 'maple syrup', 'soy sauce', 'tahini', 'olive oil', 'coconut oil',
        'vanilla extract', 'baking powder', 'cocoa powder', 'stevia', 'hummus',
        'marinara', 'nutritional yeast', 'chia seeds', 'protein powder',
        'vegetable broth', 'chicken broth', 'beef broth'
      ],
      snacks: [
        'almonds', 'walnuts', 'dried cranberries', 'dark chocolate', 'dates',
        'mixed nuts', 'trail mix', 'chocolate chips'
      ],
      'herbs and spices': [
        'cinnamon', 'turmeric', 'za\'atar', 'herbs', 'ginger', 'mexican spices',
        'curry spices', 'spices', 'basil', 'oregano', 'thyme', 'rosemary',
        'cilantro', 'parsley', 'mint', 'bay leaves', 'pepper', 'salt'
      ],
      legumes: [
        'chickpeas', 'black beans', 'lentils', 'beans', 'hummus', 'edamame'
      ],
      condiments: [
        'mayo', 'honey', 'maple syrup', 'soy sauce', 'tahini', 'lemon juice',
        'lime juice', 'marinara sauce', 'dressing', 'lemon', 'lime', 'vinegar',
        'mustard', 'hot sauce', 'worcestershire sauce'
      ]
    };

    const normalizedIngredient = ingredient.toLowerCase();

    for (const [category, items] of Object.entries(categories)) {
      if (items.some(item => normalizedIngredient.includes(item))) {
        return category;
      }
    }
    return 'other';
  };

  const groupByCategory = (ingredients) => {
    const grouped = {};
    Object.values(ingredients).forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-background-light rounded-lg p-6 grocery-list">
        <div className="hidden print:block text-center mb-8">
          <h1 className="text-3xl font-bold text-primary print-brand">MealMaster</h1>
          <div className="w-full border-b border-gray-300 mt-2 mb-6"></div>
        </div>

        <div className="flex justify-between items-center mb-6 no-print">
          <h1 className="text-2xl font-bold text-primary">Grocery List</h1>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <div className="text-text-muted">
                Total Items: <span className="text-text font-semibold">{totalItems}</span>
              </div>
              <div className="text-text-muted">
                Estimated Cost: <span className="text-text font-semibold">${estimatedCost.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            >
              Print List
            </button>
          </div>
        </div>

        <div className="hidden print:block mb-4">
          <div className="flex justify-between text-sm text-text-muted">
            <span>Total Items: {totalItems}</span>
            <span>Estimated Cost: ${estimatedCost.toFixed(2)}</span>
          </div>
          <div className="border-b border-gray-300 mt-2"></div>
        </div>

        <motion.div 
          className="space-y-6 print-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Object.entries(groceryList).map(([category, items]) => (
            <div key={category} className="bg-background rounded-lg p-4 print-item">
              <h2 className="text-lg font-semibold text-primary capitalize mb-4 print-category">
                {category.replace(/_/g, ' ')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 hover:bg-background-light rounded-md print-row group"
                  >
                    <span className="text-text print-text">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-text-muted print-text">×{item.count}</span>
                      {item.estimatedCost > 0 && (
                        <span className="text-text-muted print-text">
                          ~${(item.estimatedCost * item.count).toFixed(2)}
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteItem(category, item.name)}
                        className="text-text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 no-print"
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 20mm;
          }

          body {
            background: white !important;
            color: black !important;
          }

          .no-print {
            display: none !important;
          }

          .print-brand {
            color: black !important;
            margin-bottom: 1rem !important;
          }

          .grocery-list {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .print-content {
            display: block !important;
          }

          .print-item {
            background: white !important;
            page-break-inside: avoid;
            margin-bottom: 1rem !important;
            border: none !important;
          }

          .print-category {
            color: black !important;
            font-size: 1.2rem !important;
            margin-bottom: 0.5rem !important;
            border-bottom: 1px solid #ccc !important;
          }

          .print-row {
            padding: 0.25rem 0 !important;
            background: white !important;
          }

          .print-text {
            color: black !important;
          }

          .motion-div {
            opacity: 1 !important;
            transform: none !important;
          }

          /* Reset grid for printing */
          .grid {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

export default GroceryList; 