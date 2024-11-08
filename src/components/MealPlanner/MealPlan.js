import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import AddMealModal from './AddMealModal';
import { useMeals, MEAL_TYPES } from '../../context/MealContext';
import MealStats from './MealStats';
import RecipeSelector from './RecipeSelector';
import RecipeDetails from './RecipeDetails';

const MealTypeSection = ({ type, meals, onAddMeal, onRemoveMeal, onMealClick }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case MEAL_TYPES.BREAKFAST: return 'border-blue-500';
      case MEAL_TYPES.LUNCH: return 'border-green-500';
      case MEAL_TYPES.DINNER: return 'border-purple-500';
      case MEAL_TYPES.SNACK: return 'border-yellow-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className={`border-l-4 ${getTypeColor(type)} pl-3 mb-4`}>
      <h3 className="text-sm font-medium text-text-muted mb-2 capitalize">{type}</h3>
      <div className="space-y-2">
        {meals.map((meal) => (
          <div 
            key={meal.id} 
            className="p-3 bg-background rounded-md hover:bg-background/80 transition-colors group cursor-pointer"
            onClick={() => onMealClick(meal)}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-text">{meal.name}</h4>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening details when removing
                  onRemoveMeal(meal.id, type);
                }}
                className="text-text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
            <p className="text-text-muted text-sm">
              {meal.calories} cal | {meal.protein}g protein
            </p>
          </div>
        ))}
        <button 
          className="text-sm text-primary hover:text-primary-dark transition-colors"
          onClick={() => onAddMeal(type)}
        >
          + Add {type}
        </button>
      </div>
    </div>
  );
};

function MealPlan() {
  const [isRecipeSelectorOpen, setIsRecipeSelectorOpen] = useState(false);
  const [isCustomMealModalOpen, setIsCustomMealModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { getDayMeals, removeMeal, addMeal, generateDefaultMealPlan } = useMeals();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDayIndex = days.indexOf(selectedDay);

  const navigateDay = (direction) => {
    setSlideDirection(direction);
    const newIndex = (currentDayIndex + direction + days.length) % days.length;
    setSelectedDay(days[newIndex]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateDay(1),
    onSwipedRight: () => navigateDay(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleAddMeal = (mealType) => {
    setSelectedMealType(mealType);
    setIsRecipeSelectorOpen(true);
  };

  const handleSelectRecipe = (recipe) => {
    addMeal(selectedDay, {
      ...recipe,
      mealType: selectedMealType
    });
  };

  const handleCustomMeal = () => {
    setIsRecipeSelectorOpen(false);
    setTimeout(() => {
      setIsCustomMealModalOpen(true);
    }, 200);
  };

  const handleRemoveMeal = (mealId, mealType) => {
    removeMeal(selectedDay, mealId, mealType);
  };

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleAddCustomMeal = (mealData) => {
    addMeal(selectedDay, {
      ...mealData,
      id: Date.now(),
      mealType: selectedMealType,
      isCustomMeal: true
    });
    setIsCustomMealModalOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Day Navigation */}
      <motion.div 
        className="rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigateDay(-1)}
            className="p-2 text-text-muted hover:text-primary transition-colors"
            aria-label="Previous day"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex flex-col items-center space-y-3">
            <motion.h2 
              key={selectedDay}
              className="text-xl font-semibold text-primary"
              initial={{ opacity: 0, x: slideDirection * 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedDay}
            </motion.h2>
            <div className="flex space-x-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSlideDirection(days.indexOf(day) - currentDayIndex);
                    setSelectedDay(day);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    day === selectedDay 
                      ? 'bg-primary scale-125' 
                      : 'bg-text-muted hover:bg-primary/50'
                  }`}
                  aria-label={day}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={() => navigateDay(1)}
            className="p-2 text-text-muted hover:text-primary transition-colors"
            aria-label="Next day"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Add Reset Button */}
        <div className="mt-4 text-center">
          <button
            onClick={generateDefaultMealPlan}
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            Reset to Default Meal Plan
          </button>
        </div>
      </motion.div>

      {/* Daily View with Meals */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          {...handlers}
          className="cursor-grab active:cursor-grabbing"
          initial={{ opacity: 0, x: slideDirection * 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideDirection * -100 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <div className="text-text-muted text-sm text-center mb-4 sm:mb-6">
              Swipe or drag to change days
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {Object.values(MEAL_TYPES).map((type) => (
                <MealTypeSection
                  key={type}
                  type={type}
                  meals={getDayMeals(selectedDay, type)}
                  onAddMeal={(mealType) => handleAddMeal(mealType)}
                  onRemoveMeal={(mealId, mealType) => handleRemoveMeal(mealId, mealType)}
                  onMealClick={handleMealClick}
                />
              ))}
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-background">
              <MealStats day={selectedDay} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <RecipeSelector
        isOpen={isRecipeSelectorOpen}
        onClose={() => setIsRecipeSelectorOpen(false)}
        selectedDay={selectedDay}
        mealType={selectedMealType}
        onSelectRecipe={handleSelectRecipe}
        onCustomMeal={handleCustomMeal}
      />

      <AddMealModal 
        isOpen={isCustomMealModalOpen}
        onClose={() => setIsCustomMealModalOpen(false)}
        selectedDay={selectedDay}
        selectedMealType={selectedMealType}
        onSubmit={handleAddCustomMeal}
      />

      <RecipeDetails 
        recipe={selectedMeal}
        onClose={() => setSelectedMeal(null)}
        isExistingMeal={true}
      />
    </div>
  );
}

export default MealPlan;