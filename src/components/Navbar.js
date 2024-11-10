import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, children }) => (
  <Link 
    to={to}
    className="text-text-muted hover:text-primary transition-colors px-3 py-2"
  >
    {children}
  </Link>
);

function Navbar() {
  return (
    <nav className="bg-background-light shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              MealMaster
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink to="/meal-plans">Meal Plans</NavLink>
            <NavLink to="/grocery-lists">Grocery Lists</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button className="text-text-muted hover:text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 