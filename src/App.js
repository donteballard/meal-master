import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MealProvider } from './context/MealContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import SurveyWrapper from './components/Survey/SurveyWrapper';
import MealPlanLayout from './components/MealPlanner/MealPlanLayout';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MealProvider>
          <div className="min-h-screen bg-background text-text">
            <Navbar />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route path="/survey" element={
                <PrivateRoute>
                  <SurveyWrapper />
                </PrivateRoute>
              } />
              <Route path="/meal-plans" element={
                <PrivateRoute>
                  <MealPlanLayout />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </MealProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
