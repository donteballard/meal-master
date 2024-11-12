import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddOptionButton from './AddOptionButton';
import { processSurveyData } from '../../utils/surveyProcessor';

const ACTIVITY_LEVELS = {
  SEDENTARY: 'Sedentary (little or no exercise)',
  LIGHT: 'Lightly active (light exercise/sports 1-3 days/week)',
  MODERATE: 'Moderately active (moderate exercise/sports 3-5 days/week)',
  VERY: 'Very active (hard exercise/sports 6-7 days/week)',
  EXTRA: 'Extra active (very hard exercise/sports & physical job or training twice/day)'
};

const GOALS = {
  LOSE_WEIGHT: 'Lose weight',
  MAINTAIN: 'Maintain weight',
  GAIN_MUSCLE: 'Gain muscle',
  IMPROVE_HEALTH: 'Improve overall health',
  ATHLETIC: 'Athletic performance'
};

const DIETARY_RESTRICTIONS = {
  NONE: 'None',
  VEGETARIAN: 'Vegetarian',
  VEGAN: 'Vegan',
  GLUTEN_FREE: 'Gluten-free',
  DAIRY_FREE: 'Dairy-free',
  KETO: 'Ketogenic',
  PALEO: 'Paleo'
};

const CUISINES = {
  ITALIAN: 'Italian',
  MEXICAN: 'Mexican',
  ASIAN: 'Asian',
  MEDITERRANEAN: 'Mediterranean',
  AMERICAN: 'American',
  INDIAN: 'Indian',
  JAPANESE: 'Japanese',
  THAI: 'Thai'
};

const COMMON_ALLERGIES = {
  NONE: 'No allergies',
  DAIRY: 'Dairy',
  EGGS: 'Eggs',
  PEANUTS: 'Peanuts',
  TREE_NUTS: 'Tree nuts',
  SOY: 'Soy',
  WHEAT: 'Wheat',
  FISH: 'Fish',
  SHELLFISH: 'Shellfish'
};

const COMMON_DISLIKES = [
  'Mushrooms', 'Olives', 'Bell Peppers', 'Onions', 
  'Tomatoes', 'Seafood', 'Cilantro', 'Spicy Food',
  'Brussels Sprouts', 'Eggplant'
];

function DietarySurvey({ onComplete, initialData, isEditing = false }) {
  const [step, setStep] = useState(1);
  const formTitle = isEditing ? "Update Your Preferences" : "Personalize Your Meal Plan";
  
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      console.log('Initial Data:', initialData); // For debugging
      return {
        // Basic Info
        age: initialData.age || '',
        gender: initialData.gender || '',
        heightFeet: initialData.heightFeet || '',
        heightInches: initialData.heightInches || '',
        weightLbs: initialData.weightLbs || '',
        activityLevel: initialData.activityLevel || '',
        
        // Goals
        primaryGoal: initialData.primaryGoal || [],
        targetWeightLbs: initialData.targetWeightLbs || '',
        weeklyGoal: initialData.weeklyGoal || '',
        
        // Dietary Preferences
        dietaryRestrictions: initialData.dietaryRestrictions || [],
        allergies: initialData.allergies || [],
        dislikedIngredients: initialData.dislikedIngredients || [],
        
        // Meal Preferences
        mealsPerDay: initialData.mealsPerDay || '3',
        cookingTime: initialData.cookingTime || '30',
        preferredCuisines: initialData.preferredCuisines || [],
        cookingSkill: initialData.cookingSkill || 'intermediate',
        weeklyBudget: initialData.weeklyBudget || '',
        
        // Add attempted flag
        attempted: initialData.attempted || false
      };
    }
    
    // Default initial state for new survey
    return {
      // Basic Info
      age: '',
      gender: '',
      heightFeet: '',
      heightInches: '',
      weightLbs: '',
      activityLevel: '',
      
      // Goals
      primaryGoal: [],
      targetWeightLbs: '',
      weeklyGoal: '',
      
      // Dietary Preferences
      dietaryRestrictions: [],
      allergies: [],
      dislikedIngredients: [],
      
      // Meal Preferences
      mealsPerDay: '3',
      cookingTime: '30',
      preferredCuisines: [],
      cookingSkill: 'intermediate',
      weeklyBudget: '',
      
      // Add attempted flag
      attempted: false
    };
  });

  const normalizeValue = (value) => value.trim().toLowerCase();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const normalizedValue = normalizeValue(value);
      
      // Check against predefined options first
      let predefinedOptions;
      if (name === 'dietaryRestrictions') {
        predefinedOptions = Object.entries(DIETARY_RESTRICTIONS)
          .find(([key, label]) => normalizeValue(label) === normalizedValue)?.[0];
      } else if (name === 'allergies') {
        predefinedOptions = Object.entries(COMMON_ALLERGIES)
          .find(([key, label]) => normalizeValue(label) === normalizedValue)?.[0];
      } else if (name === 'dislikedIngredients') {
        predefinedOptions = COMMON_DISLIKES
          .find(item => normalizeValue(item) === normalizedValue);
      }

      // If it matches a predefined option, select that instead
      if (predefinedOptions) {
        return {
          ...prev,
          [name]: prev[name].includes(predefinedOptions)
            ? prev[name].filter(item => item !== predefinedOptions)
            : [...prev[name], predefinedOptions]
        };
      }

      // Check against existing custom options
      const normalizedArray = prev[name].map(normalizeValue);
      if (normalizedArray.includes(normalizedValue)) {
        return {
          ...prev,
          [name]: prev[name].filter(item => normalizeValue(item) !== normalizedValue)
        };
      }
      
      // Add as new custom option if no matches found
      return {
        ...prev,
        [name]: [...prev[name], value]
      };
    });
  };

  const handleMultiSelectWithNone = (name, value, noneValue = 'NONE') => {
    setFormData(prev => {
      // If selecting "None"
      if (value === noneValue) {
        return {
          ...prev,
          [name]: prev[name].includes(noneValue) ? [] : [noneValue]
        };
      }

      const normalizedValue = normalizeValue(value);
      
      // Check against predefined options first
      let predefinedOptions;
      if (name === 'dietaryRestrictions') {
        predefinedOptions = Object.entries(DIETARY_RESTRICTIONS)
          .find(([key, label]) => normalizeValue(label) === normalizedValue)?.[0];
      } else if (name === 'allergies') {
        predefinedOptions = Object.entries(COMMON_ALLERGIES)
          .find(([key, label]) => normalizeValue(label) === normalizedValue)?.[0];
      }

      // If selecting other options
      const currentValues = prev[name];
      if (currentValues.includes(noneValue)) {
        // Remove "None" and add the new value
        return {
          ...prev,
          [name]: [predefinedOptions || value]
        };
      }

      // If it matches a predefined option, use that instead
      if (predefinedOptions) {
        return {
          ...prev,
          [name]: currentValues.includes(predefinedOptions)
            ? currentValues.filter(item => item !== predefinedOptions)
            : [...currentValues, predefinedOptions]
        };
      }

      // Check against existing custom options
      const normalizedArray = currentValues.map(normalizeValue);
      if (normalizedArray.includes(normalizedValue)) {
        return {
          ...prev,
          [name]: currentValues.filter(item => normalizeValue(item) !== normalizedValue)
        };
      }
      
      // Add as new custom option if no matches found
      return {
        ...prev,
        [name]: [...currentValues, value]
      };
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">Basic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-text-muted mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
            required
          />
        </div>

        <div>
          <label className="block text-text-muted mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-text-muted mb-2">Height</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center">
                <input
                  type="number"
                  name="heightFeet"
                  value={formData.heightFeet}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                  min="1"
                  max="8"
                  required
                />
                <span className="ml-2 text-text-muted">ft</span>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <input
                  type="number"
                  name="heightInches"
                  value={formData.heightInches}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
                  min="0"
                  max="11"
                  required
                />
                <span className="ml-2 text-text-muted">in</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-text-muted mb-2">Weight (lbs)</label>
          <div className="flex items-center">
            <input
              type="number"
              name="weightLbs"
              value={formData.weightLbs}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
              required
            />
            <span className="ml-2 text-text-muted">lbs</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-text-muted mb-2">Activity Level</label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
          required
        >
          <option value="">Select activity level</option>
          {Object.entries(ACTIVITY_LEVELS).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const isWeightFieldsValid = formData.targetWeightLbs && formData.weeklyGoal;
    const showValidationErrors = formData.attempted && !isWeightFieldsValid;

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-primary">Goals</h2>
        
        <div>
          <label className="block text-text-muted mb-2">Primary Goals</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(GOALS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleMultiSelect('primaryGoal', key)}
                className={`p-4 rounded-lg border ${
                  formData.primaryGoal.includes(key)
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-gray-700 hover:border-primary'
                } transition-colors`}
              >
                <span className="text-text">{value}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-muted mb-2">
            Target Weight (lbs)
            <span className="text-primary ml-1">*</span>
          </label>
          <div className="flex items-center">
            <input
              type="number"
              name="targetWeightLbs"
              value={formData.targetWeightLbs}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-md bg-background border ${
                showValidationErrors && !formData.targetWeightLbs
                  ? 'border-red-500'
                  : 'border-gray-700'
              } text-text`}
              placeholder="Enter target weight"
              required
            />
            <span className="ml-2 text-text-muted">lbs</span>
          </div>
          {showValidationErrors && !formData.targetWeightLbs && (
            <p className="mt-1 text-sm text-red-500">Target weight is required</p>
          )}
        </div>

        <div>
          <label className="block text-text-muted mb-2">
            Weekly Goal
            <span className="text-primary ml-1">*</span>
          </label>
          <select
            name="weeklyGoal"
            value={formData.weeklyGoal}
            onChange={handleInputChange}
            className={`w-full p-2 rounded-md bg-background border ${
              showValidationErrors && !formData.weeklyGoal
                ? 'border-red-500'
                : 'border-gray-700'
            } text-text`}
            required
          >
            <option value="">Select weekly goal</option>
            <option value="0">Maintain current weight</option>
            <option value="0.5">0.5 lbs per week</option>
            <option value="1">1 lb per week</option>
            <option value="1.5">1.5 lbs per week</option>
            <option value="2">2 lbs per week</option>
          </select>
          {showValidationErrors && !formData.weeklyGoal && (
            <p className="mt-1 text-sm text-red-500">Weekly goal is required</p>
          )}
        </div>

        {showValidationErrors && (
          <p className="text-red-500 text-sm">
            Please fill out all required fields to continue
          </p>
        )}
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">Dietary Preferences</h2>
      
      <div>
        <label className="block text-text-muted mb-2">Dietary Restrictions</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Predefined restrictions */}
          {Object.entries(DIETARY_RESTRICTIONS).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleMultiSelectWithNone('dietaryRestrictions', key)}
              className={`p-4 rounded-lg border ${
                formData.dietaryRestrictions.includes(key)
                  ? 'border-primary bg-primary bg-opacity-10'
                  : formData.dietaryRestrictions.includes('NONE') && key !== 'NONE'
                    ? 'border-gray-700 opacity-50 cursor-not-allowed'
                    : 'border-gray-700 hover:border-primary'
              } transition-colors`}
              disabled={formData.dietaryRestrictions.includes('NONE') && key !== 'NONE'}
            >
              <span className="text-text">{value}</span>
            </button>
          ))}
          
          {/* Custom restrictions */}
          {formData.dietaryRestrictions
            .filter(restriction => !Object.keys(DIETARY_RESTRICTIONS).includes(restriction))
            .map(restriction => (
              <button
                key={restriction}
                type="button"
                onClick={() => handleMultiSelect('dietaryRestrictions', restriction)}
                className="p-4 rounded-lg border border-primary bg-primary bg-opacity-10 transition-colors group relative"
              >
                <span className="text-text">{restriction}</span>
                <span 
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-text-muted hover:text-text cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMultiSelect('dietaryRestrictions', restriction);
                  }}
                >
                  ×
                </span>
              </button>
            ))}
            
          {/* Add custom option button always last */}
          {!formData.dietaryRestrictions.includes('NONE') && (
            <AddOptionButton
              onAdd={(value) => handleMultiSelect('dietaryRestrictions', value)}
              placeholder="Type dietary restriction..."
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-text-muted mb-2">Allergies</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Predefined allergies */}
          {Object.entries(COMMON_ALLERGIES).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleMultiSelectWithNone('allergies', key)}
              className={`p-4 rounded-lg border ${
                formData.allergies.includes(key)
                  ? 'border-primary bg-primary bg-opacity-10'
                  : formData.allergies.includes('NONE') && key !== 'NONE'
                    ? 'border-gray-700 opacity-50 cursor-not-allowed'
                    : 'border-gray-700 hover:border-primary'
              } transition-colors`}
              disabled={formData.allergies.includes('NONE') && key !== 'NONE'}
            >
              <span className="text-text">{value}</span>
            </button>
          ))}
          
          {/* Custom allergies */}
          {formData.allergies
            .filter(allergy => !Object.keys(COMMON_ALLERGIES).includes(allergy))
            .map(allergy => (
              <button
                key={allergy}
                type="button"
                onClick={() => handleMultiSelect('allergies', allergy)}
                className="p-4 rounded-lg border border-primary bg-primary bg-opacity-10 transition-colors group relative"
              >
                <span className="text-text">{allergy}</span>
                <span 
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-text-muted hover:text-text cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMultiSelect('allergies', allergy);
                  }}
                >
                  ×
                </span>
              </button>
            ))}
            
          {/* Add custom option button always last */}
          {!formData.allergies.includes('NONE') && (
            <AddOptionButton
              onAdd={(value) => handleMultiSelect('allergies', value)}
              placeholder="Type allergy..."
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-text-muted mb-2">Foods You Don't Like</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Common dislikes */}
          {COMMON_DISLIKES.map(food => (
            <button
              key={food}
              type="button"
              onClick={() => handleMultiSelect('dislikedIngredients', food)}
              className={`p-4 rounded-lg border ${
                formData.dislikedIngredients.includes(food)
                  ? 'border-primary bg-primary bg-opacity-10'
                  : 'border-gray-700 hover:border-primary'
              } transition-colors`}
            >
              <span className="text-text">{food}</span>
            </button>
          ))}
          
          {/* Custom dislikes */}
          {formData.dislikedIngredients
            .filter(food => !COMMON_DISLIKES.includes(food))
            .map(food => (
              <button
                key={food}
                type="button"
                onClick={() => handleMultiSelect('dislikedIngredients', food)}
                className="p-4 rounded-lg border border-primary bg-primary bg-opacity-10 transition-colors group relative"
              >
                <span className="text-text">{food}</span>
                <span 
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-text-muted hover:text-text cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMultiSelect('dislikedIngredients', food);
                  }}
                >
                  ×
                </span>
              </button>
            ))}
            
          {/* Add custom option button always last */}
          <AddOptionButton
            onAdd={(value) => handleMultiSelect('dislikedIngredients', value)}
            placeholder="Type food..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary">Meal Preferences</h2>
      
      <div>
        <label className="block text-text-muted mb-2">Meals Per Day</label>
        <select
          name="mealsPerDay"
          value={formData.mealsPerDay}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
        >
          <option value="1">1 meal</option>
          <option value="2">2 meals</option>
          <option value="3">3 meals</option>
          <option value="4">4 meals</option>
          <option value="5">5 meals</option>
          <option value="6">6 meals</option>
        </select>
      </div>

      <div>
        <label className="block text-text-muted mb-2">Maximum Cooking Time</label>
        <select
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
        </select>
      </div>

      <div>
        <label className="block text-text-muted mb-2">Preferred Cuisines</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(CUISINES).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleMultiSelect('preferredCuisines', key)}
              className={`p-4 rounded-lg border ${
                formData.preferredCuisines.includes(key)
                  ? 'border-primary bg-primary bg-opacity-10'
                  : 'border-gray-700 hover:border-primary'
              } transition-colors`}
            >
              <span className="text-text">{value}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-text-muted mb-2">Cooking Skill Level</label>
        <select
          name="cookingSkill"
          value={formData.cookingSkill}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block text-text-muted mb-2">Weekly Budget for Groceries</label>
        <input
          type="number"
          name="weeklyBudget"
          value={formData.weeklyBudget}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md bg-background border border-gray-700 text-text"
          placeholder="Enter amount"
        />
      </div>
    </div>
  );

  const handleSurveyComplete = (formData) => {
    const processedData = processSurveyData(formData);
    onComplete(processedData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-background-light rounded-lg p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary">{formTitle}</h1>
            <span className="text-text-muted">Step {step} of 4</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (step === 2) {
            const isWeightFieldsRequired = formData.primaryGoal.includes('LOSE_WEIGHT') || formData.primaryGoal.includes('GAIN_MUSCLE');
            const isWeightFieldsValid = formData.targetWeightLbs && formData.weeklyGoal;
            
            if (isWeightFieldsRequired && !isWeightFieldsValid) {
              setFormData(prev => ({ ...prev, attempted: true }));
              return;
            }
          }
          
          if (step < 4) {
            setStep(step + 1);
          } else {
            handleSurveyComplete(formData);
          }
        }}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </motion.div>

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-text-muted hover:text-text"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="btn-primary ml-auto"
            >
              {step < 4 ? 'Next' : 'Complete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DietarySurvey; 