import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AddMealModal({ isOpen, onClose, selectedDay, selectedMealType, onSubmit }) {
  const [mealData, setMealData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: selectedMealType
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mealData);
    setMealData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      mealType: selectedMealType
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData(prev => ({
      ...prev,
      [name]: value
    }));
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
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background-light rounded-lg p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-primary mb-4">
              Add Meal for {selectedDay}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text-muted mb-1">Meal Name</label>
                <input 
                  type="text"
                  name="name"
                  value={mealData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                  placeholder="Enter meal name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-muted mb-1">Calories</label>
                  <input 
                    type="number"
                    name="calories"
                    value={mealData.calories}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                    placeholder="kcal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-muted mb-1">Protein</label>
                  <input 
                    type="number"
                    name="protein"
                    value={mealData.protein}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                    placeholder="grams"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-muted mb-1">Carbs</label>
                  <input 
                    type="number"
                    name="carbs"
                    value={mealData.carbs}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                    placeholder="grams"
                    required
                  />
                </div>
                <div>
                  <label className="block text-text-muted mb-1">Fat</label>
                  <input 
                    type="number"
                    name="fat"
                    value={mealData.fat}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                    placeholder="grams"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-text-muted hover:text-text"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddMealModal; 