import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  useEffect(() => {
    // Check localStorage for existing user and survey data
    const savedUser = localStorage.getItem('user');
    const savedSurveyData = localStorage.getItem('surveyData');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setSurveyCompleted(!!savedSurveyData);
    }
    
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Check if user has completed survey
    const savedSurveyData = localStorage.getItem('surveyData');
    setSurveyCompleted(!!savedSurveyData);
  };

  const logout = () => {
    setUser(null);
    setSurveyCompleted(false);
    localStorage.removeItem('user');
    localStorage.removeItem('surveyData');
    localStorage.removeItem('mealPlan');
  };

  const completeSurvey = (surveyData) => {
    setSurveyCompleted(true);
    localStorage.setItem('surveyData', JSON.stringify(surveyData));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      surveyCompleted,
      login,
      logout,
      completeSurvey
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 