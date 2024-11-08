import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RECIPES } from '../../data/recipes';
import { MEAL_TYPES } from '../../context/MealContext';

function RecipeSelector({ isOpen, onClose, selectedDay, mealType, onSelectRecipe, onCustomMeal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const getMealTypeKey = (type) => {
    switch (type) {
      case MEAL_TYPES.BREAKFAST: return 'breakfast';
      case MEAL_TYPES.LUNCH: return 'lunch';
      case MEAL_TYPES.DINNER: return 'dinner';
      case MEAL_TYPES.SNACK: return 'snacks';
      default: return type;
    }
  };

  const recipes = RECIPES[getMealTypeKey(mealType)] || [];
  const allTags = [...new Set(recipes.flatMap(recipe => recipe.dietaryTags))];

  const filteredRecipes = recipes.filter(recipe => 
    (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.includes(searchTerm.toLowerCase()))) &&
    (selectedTag === 'all' || recipe.dietaryTags.includes(selectedTag))
  );

  const handleCustomMealClick = () => {
    onClose();
    setTimeout(() => {
      onCustomMeal();
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background-light rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">
                Select {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </h2>
              <button 
                onClick={onClose}
                className="text-text-muted hover:text-text"
              >
                ×
              </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === 'all' 
                      ? 'bg-primary text-text' 
                      : 'bg-background text-text-muted hover:text-text'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTag === tag 
                        ? 'bg-primary text-text' 
                        : 'bg-background text-text-muted hover:text-text'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecipes.map(recipe => (
                <motion.div 
                  key={recipe.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-background rounded-lg p-4 hover:bg-background/80 transition-colors cursor-pointer"
                  onClick={() => {
                    onSelectRecipe({
                      ...recipe,
                      mealType
                    });
                    onClose();
                  }}
                >
                  <h3 className="font-medium text-text mb-2">{recipe.name}</h3>
                  <p className="text-text-muted text-sm mb-2">
                    {recipe.calories} cal | {recipe.protein}g protein
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.dietaryTags.map(tag => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-background-light text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted mt-2">
                    Prep time: {recipe.prepTime}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Custom Meal Option */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={handleCustomMealClick}
                className="w-full p-4 rounded-lg bg-background hover:bg-background/80 transition-colors text-text-muted hover:text-text text-center"
              >
                + Add Custom Meal Instead
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RecipeSelector; 