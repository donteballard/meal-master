import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function RecipeDetails({ recipe, onClose, isExistingMeal = true }) {
  useEffect(() => {
    if (recipe) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [recipe]);

  if (!recipe) return null;

  const prepStepsArray = Array.isArray(recipe.prepSteps) 
    ? recipe.prepSteps 
    : recipe.prepSteps.split(/[.]\s+/).filter(step => step.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background-light rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">{recipe.name}</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.dietaryTags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-background text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-auto">
          {/* Nutritional Information */}
          <div className="bg-background rounded-lg p-4 h-fit">
            <h3 className="text-lg font-semibold text-primary mb-4">Nutrition Facts</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Calories</span>
                <span className="text-text">{recipe.calories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Protein</span>
                <span className="text-text">{recipe.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Carbs</span>
                <span className="text-text">{recipe.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Fat</span>
                <span className="text-text">{recipe.fat}g</span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-background rounded-lg p-4 h-fit">
            <h3 className="text-lg font-semibold text-primary mb-4">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-text-muted">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preparation Time */}
        <div className="mt-6 bg-background rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Preparation Time</span>
            <span className="text-text">{recipe.prepTime}</span>
          </div>
        </div>

        {/* Prep Steps */}
        <div className="mt-6 bg-background rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-4">Prep Steps</h3>
          <div className="space-y-2">
            {prepStepsArray.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-primary font-medium min-w-[1.5rem]">{index + 1}.</span>
                <span className="text-text-muted">{step.trim()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          {isExistingMeal ? (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-background hover:bg-background-light text-text rounded-lg transition-colors"
            >
              Close
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-text-muted hover:text-text"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Add to meal plan
                  onClose();
                }}
                className="btn-primary"
              >
                Add to Meal Plan
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeDetails;