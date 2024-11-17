import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function BottomTabs() {
  const location = useLocation();

  const tabs = [
    {
      path: '/meal-plans',
      label: 'Meals',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      path: '/grocery-lists',
      label: 'Groceries',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background-light border-t border-gray-700 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              {tab.icon(isActive)}
              <span className={`text-xs mt-1 ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomTabs; 