import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMeals } from '../../context/MealContext';
import DietarySurvey from '../Survey/DietarySurvey';
import { convertHeightFromMetric, convertWeightFromMetric } from '../../utils/conversions';

function Profile() {
  const { user, logout } = useAuth();
  const { generatePersonalizedMealPlan } = useMeals();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatSurveyDataForEditing = (surveyData) => {
    if (!surveyData) return null;

    const height = convertHeightFromMetric(surveyData.personalInfo.height);
    const weightLbs = convertWeightFromMetric(surveyData.personalInfo.weight);

    return {
      // Basic Info
      age: surveyData.personalInfo.age.toString(),
      gender: surveyData.personalInfo.gender,
      heightFeet: height.feet.toString(),
      heightInches: height.inches.toString(),
      weightLbs: weightLbs.toString(),
      activityLevel: surveyData.personalInfo.activityLevel,
      
      // Goals
      primaryGoal: surveyData.goals.primary || [],
      targetWeightLbs: surveyData.goals.targetWeight 
        ? convertWeightFromMetric(surveyData.goals.targetWeight).toString()
        : '',
      weeklyGoal: surveyData.goals.weeklyGoal.toString(),
      
      // Dietary Preferences
      dietaryRestrictions: surveyData.preferences.dietaryRestrictions || [],
      allergies: surveyData.preferences.allergies || [],
      dislikedIngredients: surveyData.preferences.dislikedIngredients || [],
      
      // Meal Preferences
      mealsPerDay: surveyData.nutritionTargets.mealsPerDay.toString(),
      cookingTime: surveyData.personalInfo.maxCookingTime.toString(),
      preferredCuisines: surveyData.preferences.preferredCuisines || [],
      cookingSkill: surveyData.personalInfo.cookingSkill,
      weeklyBudget: surveyData.preferences.weeklyBudget.toString(),
      
      // Add attempted flag to prevent validation errors
      attempted: false
    };
  };

  const handleSurveyUpdate = (updatedData) => {
    // Save the updated survey data
    localStorage.setItem('surveyData', JSON.stringify(updatedData));
    
    // Generate new meal plan based on updated preferences
    generatePersonalizedMealPlan(updatedData);
    
    setIsEditing(false);
  };

  if (isEditing) {
    const currentSurveyData = JSON.parse(localStorage.getItem('surveyData'));
    const formattedData = formatSurveyDataForEditing(currentSurveyData);

    console.log('Formatted Data:', formattedData); // Add this for debugging

    return (
      <div>
        <div className="max-w-3xl mx-auto p-4">
          <button
            onClick={() => setIsEditing(false)}
            className="text-text-muted hover:text-text mb-4"
          >
            ← Back to Profile
          </button>
          <DietarySurvey 
            onComplete={handleSurveyUpdate}
            initialData={formattedData}
            isEditing={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-background-light rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Profile</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-text-muted hover:text-text"
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-4">Account Information</h2>
          <div className="bg-background rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted text-sm">Email</label>
                <p className="text-text">{user.email}</p>
              </div>
              <div>
                <label className="block text-text-muted text-sm">Member Since</label>
                <p className="text-text">{new Date(user.id).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Survey Data Summary */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-primary">Meal Plan Preferences</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            >
              Edit Preferences
            </button>
          </div>
          <div className="space-y-4">
            <PreferenceSection />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component to display preference sections
function PreferenceSection() {
  const surveyData = JSON.parse(localStorage.getItem('surveyData'));

  if (!surveyData) {
    return (
      <div className="bg-background rounded-lg p-4">
        <p className="text-text-muted">No preference data available.</p>
      </div>
    );
  }

  const sections = [
    {
      title: 'Basic Information',
      items: [
        { label: 'Age', value: surveyData.personalInfo.age },
        { label: 'Gender', value: surveyData.personalInfo.gender },
        { label: 'Activity Level', value: surveyData.personalInfo.activityLevel.toLowerCase().replace(/_/g, ' ') }
      ]
    },
    {
      title: 'Goals',
      items: [
        { label: 'Primary Goals', value: surveyData.goals.primary.join(', ').toLowerCase().replace(/_/g, ' ') },
        { label: 'Weekly Goal', value: surveyData.goals.weeklyGoal ? `${surveyData.goals.weeklyGoal} lbs per week` : 'N/A' }
      ]
    },
    {
      title: 'Dietary Preferences',
      items: [
        { 
          label: 'Restrictions', 
          value: surveyData.preferences.dietaryRestrictions.length > 0 
            ? surveyData.preferences.dietaryRestrictions.join(', ').toLowerCase().replace(/_/g, ' ')
            : 'None'
        },
        {
          label: 'Allergies',
          value: surveyData.preferences.allergies.length > 0
            ? surveyData.preferences.allergies.join(', ').toLowerCase().replace(/_/g, ' ')
            : 'None'
        }
      ]
    },
    {
      title: 'Meal Preferences',
      items: [
        { label: 'Meals per Day', value: surveyData.nutritionTargets.mealsPerDay },
        { label: 'Daily Calories', value: `${surveyData.nutritionTargets.dailyCalories} kcal` },
        { label: 'Cooking Time', value: `${surveyData.personalInfo.maxCookingTime} minutes` },
        { label: 'Cooking Skill', value: surveyData.personalInfo.cookingSkill }
      ]
    }
  ];

  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className="bg-background rounded-lg p-4">
          <h3 className="text-primary font-medium mb-3">{section.title}</h3>
          <div className="grid grid-cols-2 gap-4">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                <label className="block text-text-muted text-sm">{item.label}</label>
                <p className="text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default Profile; 