import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MealProvider } from './context/MealContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import BottomTabs from './components/navigation/BottomTabs';
import Header from './components/navigation/Header';
import Home from './components/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import SurveyWrapper from './components/Survey/SurveyWrapper';
import MealPlanLayout from './components/MealPlanner/MealPlanLayout';
import Profile from './components/Profile/Profile';
import GroceryList from './components/GroceryList/GroceryList';
import { NotificationProvider } from './components/common/Notifications';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <MealProvider>
            <div className="min-h-screen bg-background text-text">
              <Header />
              <main className="pt-16 pb-16">
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
                  <Route path="/grocery-lists" element={
                    <PrivateRoute>
                      <GroceryList />
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
              </main>
              <BottomTabs />
            </div>
          </MealProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;