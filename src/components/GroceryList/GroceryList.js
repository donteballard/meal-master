import React, { useState, useEffect } from 'react';
import { useMeals } from '../../context/MealContext';
import { motion } from 'framer-motion';
import { getIngredientPrice } from '../../utils/priceEstimator';

function GroceryList() {
  const { mealsByDay } = useMeals();
  const [groceryList, setGroceryList] = useState({});
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    const aggregateIngredients = () => {
      const ingredients = {};
      let totalCost = 0;

      Object.values(mealsByDay).forEach(day => {
        Object.values(day).forEach(meals => {
          meals.forEach(meal => {
            meal.ingredients.forEach(ingredient => {
              const normalizedIngredient = ingredient.toLowerCase();
              if (ingredients[normalizedIngredient]) {
                ingredients[normalizedIngredient].count += 1;
              } else {
                const estimatedPrice = getIngredientPrice(ingredient);
                ingredients[normalizedIngredient] = {
                  name: ingredient,
                  count: 1,
                  category: categorizeIngredient(normalizedIngredient),
                  estimatedCost: estimatedPrice
                };
                totalCost += estimatedPrice;
              }
            });
          });
        });
      });

      setGroceryList(groupByCategory(ingredients));
      setEstimatedCost(totalCost);
    };

    aggregateIngredients();
  }, [mealsByDay]);

  const categorizeIngredient = (ingredient) => {
    const categories = {
      protein: ['chicken', 'beef', 'fish', 'tofu', 'eggs', 'salmon'],
      produce: ['tomato', 'lettuce', 'cucumber', 'carrot', 'spinach', 'avocado'],
      grains: ['rice', 'quinoa', 'pasta', 'bread', 'oats'],
      dairy: ['milk', 'cheese', 'yogurt', 'butter'],
      pantry: ['oil', 'spices', 'sauce', 'nuts', 'seeds'],
      // Add more categories as needed
    };

    for (const [category, items] of Object.entries(categories)) {
      if (items.some(item => ingredient.includes(item))) {
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
            <span className="text-text-muted">
              Estimated Total: <span className="text-text font-semibold">${estimatedCost.toFixed(2)}</span>
            </span>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            >
              Print List
            </button>
          </div>
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
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 hover:bg-background-light rounded-md print-row"
                  >
                    <span className="text-text print-text">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-text-muted print-text">×{item.count}</span>
                      {item.estimatedCost > 0 && (
                        <span className="text-text-muted print-text">
                          ~${(item.estimatedCost * item.count).toFixed(2)}
                        </span>
                      )}
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