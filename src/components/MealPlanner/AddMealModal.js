import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMockMealData } from '../../utils/mealGenerator';
import { useNotification } from '../common/Notifications';

function AddMealModal({ isOpen, onClose, selectedDay, selectedMealType, onSubmit }) {
  const [mealName, setMealName] = useState('');
  const { addNotification } = useNotification();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate mock data based on the meal name and type
    const generatedMealData = generateMockMealData(mealName, selectedMealType);
    
    onSubmit(generatedMealData);
    setMealName('');
    
    addNotification({
      type: 'success',
      message: 'Custom meal added successfully',
      duration: 3000
    });
    
    onClose();
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
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background-light rounded-lg p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-primary mb-4">
              Add Custom Meal for {selectedDay}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-text-muted mb-1">Meal Name</label>
                <input 
                  type="text"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                  placeholder="Enter meal name"
                  required
                />
              </div>

              <p className="text-sm text-text-muted italic">
                Nutritional information and recipe details will be automatically generated.
              </p>

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